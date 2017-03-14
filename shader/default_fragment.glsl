#extension GL_OES_standard_derivatives:enable
precision highp float;              
 
struct SurfaceOutput{
  vec3 Albedo;
  vec3 Normal;
  vec4 Specular;
  float Alpha ;
}; 
struct MaterialSource{
    vec3 diffuse;
    vec3 ambient;
    vec3 specular;
    float alpha;
    float cutAlpha;
    float shininess;
    float normalDir;
    vec4 uvRectangle;
    float gamma;
    float specularScale;
    float refraction;
    float refractionintensity;
}; 
varying vec3 varying_eyeNormal; 
varying vec2 varying_uv0; 
varying vec4 varying_color; 
varying vec4 varying_mvPose; 
SurfaceOutput s; 
vec4 outColor; 
vec4 diffuseColor; 
vec4 light; 
vec3 normal; 
vec2 uv_0; 
MaterialSource materialSource; 
vec4 specularColor; 
vec4 ambientColor; 
uniform mat4 uniform_ViewMatrix; 
uniform float uniform_materialSource[20]; 
uniform sampler2D diffuseTexture; 
 
vec3 flatNormals(vec3 pos) {
  vec3 fdx = dFdx(pos);
  vec3 fdy = dFdy(pos);
  return normalize(cross(fdx, fdy));
}
vec3 Fresnel_Schlick(float cosT, vec3 F0)
{
  return F0 + (1.0-F0) * pow( 1.0 - cosT, 5.0);
}
void main() {
    diffuseColor  = vec4(1.0);
    light         = vec4(0.0,0.0,0.0,-1.0); 
      
    normal = normalize(varying_eyeNormal) ;
    uv_0 = varying_uv0;
 
    materialSource.diffuse.x = uniform_materialSource[0];
    materialSource.diffuse.y = uniform_materialSource[1];
    materialSource.diffuse.z = uniform_materialSource[2];
     
    materialSource.ambient.x = uniform_materialSource[3];
    materialSource.ambient.y = uniform_materialSource[4];
    materialSource.ambient.z = uniform_materialSource[5];
     
    materialSource.specular.x = uniform_materialSource[6];
    materialSource.specular.y = uniform_materialSource[7];
    materialSource.specular.z = uniform_materialSource[8];
     
    materialSource.alpha = uniform_materialSource[9];
    materialSource.cutAlpha = uniform_materialSource[10];
    materialSource.shininess = uniform_materialSource[11];
    materialSource.specularScale = uniform_materialSource[12];
    materialSource.normalDir = 1.0 ;    
    materialSource.uvRectangle.x = uniform_materialSource[13];
    materialSource.uvRectangle.y = uniform_materialSource[14];
    materialSource.uvRectangle.z = uniform_materialSource[15];
    materialSource.uvRectangle.w = uniform_materialSource[16];
    materialSource.gamma = uniform_materialSource[17];
    materialSource.refraction = uniform_materialSource[18];
    materialSource.refractionintensity = uniform_materialSource[19];
    uv_0 = varying_uv0.xy * materialSource.uvRectangle.zw + materialSource.uvRectangle.xy ;
 
    vec3 fc = vec3(0.0, 0.0, 0.0);
    vec4 c = texture2D( diffuseTexture , uv_0 );
    c.xyz = c.xyz * materialSource.diffuse * c.a ; 
    if (c.a < materialSource.cutAlpha)
        discard;
    if(materialSource.refraction<2.41){ 
       float vl = dot(normal,-normalize(varying_mvPose.xyz)); 
       fc = Fresnel_Schlick(vl,vec3(materialSource.refraction)) * materialSource.refractionintensity ; 
       fc.xyz = max(fc,vec3(0.0)) ; 
    } 
    s.Normal = normal;
    s.Specular = vec4(1.0) ;
    s.Albedo = c.rgb + fc.xyz * c.rgb + materialSource.ambient * c.rgb;
    s.Albedo.x = pow(s.Albedo.x, materialSource.gamma);
    s.Albedo.y = pow(s.Albedo.y, materialSource.gamma);
    s.Albedo.z = pow(s.Albedo.z, materialSource.gamma);
    s.Alpha = c.a;
    outColor.xyz = s.Albedo * 0.5 ;
    outColor.w = s.Alpha;
 
    if(light.w < 0.0 ){
       outColor.xyz = s.Albedo.xyz ; 
    }else{
       outColor.xyzw = light ; 
    }
    outColor.xyzw *= varying_color.xyzw;
 
    gl_FragColor = outColor;
}