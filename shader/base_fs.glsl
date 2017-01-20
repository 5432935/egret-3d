#extension GL_OES_standard_derivatives : enable

varying vec3 varying_eyeNormal  ;
varying vec2 varying_uv0;
varying vec4 varying_color;

uniform mat4 uniform_ViewMatrix ;

struct SurfaceOutput{
  vec3 Albedo;
  vec3 Normal;
  vec4 Specular;
  float Alpha ;
};

SurfaceOutput s ;

vec4 outColor ;
vec4 diffuseColor ;
vec4 light ;
vec3 normal;
vec2 uv_0;

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
	diffuseColor  = vec4(1.0);
	light         = vec4(0.0,0.0,0.0,-1.0); 
     
    normal = normalize(varying_eyeNormal) ;
	uv_0 = varying_uv0;
}