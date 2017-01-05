varying vec4 varying_mvPose; 

vec4 diffuseColor ;
vec4 specularColor ;
vec4 ambientColor;
vec4 light ;

vec3 Fresnel_Schlick(float cosT, vec3 F0)
{
  return F0 + (1.0-F0) * pow( 1.0 - cosT, 5.0);
}

void main() {

	if(materialSource.refraction<2.41){
		float vl = dot(normal,-normalize(varying_mvPose.xyz));
		vec3 f = Fresnel_Schlick(vl,vec3(1.2)) * materialSource.refractionintensity ;
		light.xyz += max(f,vec3(0.0)) ;//pow(vl,2.0) * vec3(1.0) ;//* 0.3;  
	}

	outColor.xyz = (light.xyz+materialSource.ambient) * (diffuseColor.xyz * materialSource.diffuse * varying_color.xyz) + specularColor.xyz ; 
	outColor.w = materialSource.alpha * diffuseColor.w * varying_color.w; 
	outColor.xyz *= outColor.w; 
	outColor.xyz = pow(outColor.xyz,vec3(materialSource.gamma));
}
