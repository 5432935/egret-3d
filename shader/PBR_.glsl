#extension GL_OES_standard_derivatives:enable
#define baseColorMapEnabled true 
#define custom false 
precision highp float ;

uniform sampler2D albedoTex; 
uniform sampler2D normalTex; 
uniform sampler2D glossTex; 
uniform sampler2D specularTex; 
uniform sampler2D opacityTex; 
uniform mat4 uniform_ViewMatrix; 

varying vec2 varying_uv0; 
varying vec3 varying_eyeNormal; 
varying vec4 varying_mvPose; 
varying vec3 wcNormal; 
varying vec3 wcCoords; 

uniform samplerCube reflectionMap;
const float PI = 3.14159265358979323846;

//-------to uniform
bool correctGamma =true;
float globalRoughness = 0.1 ;
float globalSpecular = 1.0 ;
vec4 specularColor = vec4(1.0,1.0,1.0,1.0);
//-------
mat4 invViewMatrix;
mat4 normalMatrix ;
mat3 TBN;

float triPlanarScale = 0.5;
vec4 baseColor = vec4(1.8,0.8,0.5,1.0) ;

float material_cubemapSize = 128.0;
float material_cubemapSize2 = 32.0;

mat4 transpose(mat4 inMatrix) {
    vec4 i0 = inMatrix[0];
    vec4 i1 = inMatrix[1];
    vec4 i2 = inMatrix[2];
    vec4 i3 = inMatrix[3];

    mat4 outMatrix = mat4(
                 vec4(i0.x, i1.x, i2.x, i3.x),
                 vec4(i0.y, i1.y, i2.y, i3.y),
                 vec4(i0.z, i1.z, i2.z, i3.z),
                 vec4(i0.w, i1.w, i2.w, i3.w)
                 );

    return outMatrix;
}

mat4 inverse(mat4 m) {
  float
      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],

      b00 = a00 * a11 - a01 * a10,
      b01 = a00 * a12 - a02 * a10,
      b02 = a00 * a13 - a03 * a10,
      b03 = a01 * a12 - a02 * a11,
      b04 = a01 * a13 - a03 * a11,
      b05 = a02 * a13 - a03 * a12,
      b06 = a20 * a31 - a21 * a30,
      b07 = a20 * a32 - a22 * a30,
      b08 = a20 * a33 - a23 * a30,
      b09 = a21 * a32 - a22 * a31,
      b10 = a21 * a33 - a23 * a31,
      b11 = a22 * a33 - a23 * a32,

      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

  return mat4(
      a11 * b11 - a12 * b10 + a13 * b09,
      a02 * b10 - a01 * b11 - a03 * b09,
      a31 * b05 - a32 * b04 + a33 * b03,
      a22 * b04 - a21 * b05 - a23 * b03,
      a12 * b08 - a10 * b11 - a13 * b07,
      a00 * b11 - a02 * b08 + a03 * b07,
      a32 * b02 - a30 * b05 - a33 * b01,
      a20 * b05 - a22 * b02 + a23 * b01,
      a10 * b10 - a11 * b08 + a13 * b06,
      a01 * b08 - a00 * b10 - a03 * b06,
      a30 * b04 - a31 * b02 + a33 * b00,
      a21 * b02 - a20 * b04 - a23 * b00,
      a11 * b07 - a10 * b09 - a12 * b06,
      a00 * b09 - a01 * b07 + a02 * b06,
      a31 * b01 - a30 * b03 - a32 * b00,
      a20 * b03 - a21 * b01 + a22 * b00) / det;
}

mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) { 
vec3 dp1 = dFdx(p); 
vec3 dp2 = dFdy(p); 
vec2 duv1 = dFdx(uv); 
vec2 duv2 = dFdy(uv);  
vec3 dp2perp = cross(dp2, N); 
vec3 dp1perp = cross(N, dp1); 
vec3 T = dp2perp * duv1.x + dp1perp * duv2.x; 
vec3 B = dp2perp * duv1.y + dp1perp * duv2.y; 
float invmax = 1.0 / sqrt(max(dot(T,T), dot(B,B))); 
return mat3(T * invmax, B * invmax, N); 
}

vec3 unpackNormal(vec4 packednormal)
{
	return packednormal.xyz * 2.0 - 1.0;
}

vec4 gammaToLinear(vec4 color) {
  if (correctGamma) {
    return vec4(pow(color.rgb, vec3(2.2)), color.a);
  }
  else {
    return color;
  }
}

vec4 linearToGamma(vec4 color) {
  if (correctGamma) {
    return vec4(pow(color.rgb, vec3(1.0 / 2.2)), color.a);
  }
  else {
    return color;
  }
}

vec4 sampleTex(sampler2D tex) {
  return gammaToLinear(texture2D(tex, varying_uv0));
}

vec4 sampleEnvMap(samplerCube envMap, vec3 ecN, vec3 ecPos, float mipmapIndex, float size) {
  vec3 eyeDir = normalize(-ecPos); //Direction to eye = camPos (0,0,0) - ecPos
  vec3 ecReflected = reflect(-eyeDir, ecN); //eye coordinates reflection vector

  float mipmap = mipmapIndex;

//   if (skyBox) {
//     ecReflected = normalize(ecPos);
//     mipmap = 0.0;
//     vec3 wcReflected = vec3(invViewMatrix * vec4(ecReflected, 0.0)); //world coordinates reflection vector
//     return textureCubeLod(envMap, fixSeams(wcReflected, mipmap, size), mipmap);
//   }

  vec3 wcReflected = vec3(invViewMatrix * vec4(ecReflected, 0.0)); //world coordinates reflection vector
  //return textureCubeLod(envMap, fixSeams(wcReflected, mipmap), mipmap);
  return textureCube(envMap, wcReflected );
}

void main(void){
  vec4 albedo;
  vec2 vTexCoord;
  vec4 lightColor = vec4(1.0, 1.0, 1.0, 1.0);
  invViewMatrix = inverse(uniform_ViewMatrix);
   //sampler albedo texture
  if (baseColorMapEnabled) {
    albedo = sampleTex(albedoTex);
  }
  else {
    albedo =  gammaToLinear(baseColor);
  }
  
  vec3 specular = sampleTex(specularTex).rgb;
  float glossines = (sampleTex(glossTex)).b;

//    if (custom) {
//      glossines = 1.0 - globalRoughness;
//      specular = vec3(globalSpecular);
//    }
  
  //---temp---
  vec3 lightPos = vec3(0.0,200.0,0.0);
  vec3 ecNormal = varying_eyeNormal.xyz;
  vec3 ecLightPos = (uniform_ViewMatrix * vec4(lightPos, 1.0)).xyz;
  //---------
  
  vec3 normal = sampleTex(normalTex).rgb * 2.0 - 1.0;
  vec3 eyePos = vec3(0.0, 0.0, -1.0);
  vec3 N = normalize(varying_eyeNormal);
  vec3 L = normalize(ecLightPos - varying_mvPose.xyz);
  vec3 V = normalize(eyePos - varying_mvPose.xyz);
  vec3 H = normalize(L + V);
  TBN = cotangentFrame(normalize(varying_eyeNormal), normalize(-varying_mvPose.xyz) , varying_uv0); 
  if (!custom) {
    N = normalize(TBN * normal);
  }
  
  float dotNL = clamp(dot(N,L), 0.0, 1.0); //0l
  float dotNV = clamp(dot(N,V), 0.0, 1.0); //0d
  float dotNH = clamp(dot(N,H), 0.0, 1.0); //0h
  float dotLH = clamp(dot(L,H), 0.0, 1.0); //0d
  float dotVH = clamp(dot(V,H), 0.0, 1.0); //== 0d?
  
  float roughness = 1.0 - glossines;
  float smoothness = glossines;
  
  float dotLH5 = pow(1.0 - dotLH, 5.0);
  vec3 F0 = specular; //incidence fresnel reflectance
  vec3 Fschlick = F0 + (1.0 - F0) * dotLH5;
  vec3 F = Fschlick;
  
  //Microfacet Normal Distribution
  float D = 1.0;
  
  //          D(h) * F(v,h) * G(l,v,h)
  // f(l,v) = ------------------------
  //              4 * n.l * n.v
  
  //Alpha: Based on "Real Shading in Unreal Engine 4"
  float a = pow(1.0 - smoothness * 0.7, 6.0);
  
  float aSqr = a * a;
  float Ddenom = dotNH * dotNH * (aSqr - 1.0) + 1.0;
  float Dh = aSqr / ( PI * Ddenom * Ddenom);
  
  //Diffuse Fresnel (Disney) aka glossy Fresnel
  //Should be 2D lookup texture for IBL as in UnreadEngine4
  float FL = pow((1.0 - dotNL), 5.0);
  float FV = pow((1.0 - dotNV), 5.0);
  float Fd90 = 0.5 + 2.0 * roughness * dotLH*dotLH; //0d
  vec3 Fd = (specularColor).rgb / PI * (1.0 + (Fd90 - 1.0) * FL) * (1.0 + (Fd90 - 1.0) * FV); //0l 0f
    
  vec3 Fvh = F0 + (1.0 - F0) * pow((1.0 - dotVH), 5.0);

  float k = pow(0.8 + 0.5 * a, 2.0) / 2.0;
  float G1l = dotNL / (dotNL * (1.0 - k) + k);
  float G1v = dotNV / (dotNV * (1.0 - k) + k);
  float Glvn = G1l * G1v;
  
  //Complete Cook-Torrance
  vec3 flv = Dh * Fvh * Glvn / (4.0 * dotNL * dotNV);
  
   float roughness2 = roughness;//1.0 - (1.0 - roughness) * (1.0 - roughness);
  smoothness = 1.0 - roughness;
  float maxMipMapLevel = 8.0;
  //vec4 ambientDiffuse = gammaToLinear(sampleEnvMap(diffuseMap, N, ecPosition, 0.0, material_cubemapSize2));
  vec4 ambientReflection = (sampleEnvMap(reflectionMap, N, varying_mvPose.xyz , roughness2 * maxMipMapLevel, material_cubemapSize));
  vec4 color = vec4(0.0);
  //vec4 ao = texture2D(ssaoMap, gl_FragCoord.xy/windowSize);;
  //ao = ao * ao;
  
  color += albedo / PI;
  color += albedo * dotNL * lightColor / PI;
  vec3 Fs = specular + (max(vec3(smoothness), specular) - specular) * pow(1.0 - max(dot(V, N), 0.0), 5.0);
  color = mix(color, ambientReflection + vec4(Fs, 1.0), specular.r);

  float show = 7.0 ;
  if (show == 1.0) gl_FragColor = vec4(N * 0.5 + 0.5, 1.0);
  if (show == 2.0) gl_FragColor = linearToGamma(albedo);
  if (show == 3.0) gl_FragColor = vec4(glossines,glossines,glossines,1.0);
  if (show == 4.0) gl_FragColor = vec4(specular, 1.0);
  //if (show == 5.0) gl_FragColor = linearToGamma(ambientDiffuse);
  if (show == 6.0) gl_FragColor = linearToGamma(ambientReflection);
  if (show == 7.0) gl_FragColor = vec4(color.xyz,1.0) ;

}
