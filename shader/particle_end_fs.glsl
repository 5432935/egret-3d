//##FilterBegin## ##Particle##
varying vec4 varying_particleData;
varying vec4 varying_mvPose;


void main() {
	vec3 fc ;
	if(materialSource.refraction<2.41){ 
	   float vl = dot(normal,-normalize(varying_mvPose.xyz)); 
	   fc = Fresnel_Schlick(vl,vec3(materialSource.refraction)) * materialSource.refractionintensity ; 
	   fc.xyz = max(fc,vec3(0.0)) ; 
	} 
  
	s.Albedo = diffuseColor.rgb * globalColor.xyz ;//+ materialSource.ambient * diffuseColor.rgb; 
	s.Albedo = pow(s.Albedo, vec3(materialSource.gamma)) * varying_color.xyz ; 
	s.Alpha = diffuseColor.a * globalColor.w * materialSource.alpha * varying_color.w ; 
	outColor.xyz = s.Albedo ; 
	outColor.w = s.Alpha; 
	if(varying_particleData.w > 0.5){ 
	outColor.xyz *= outColor.w; 
	} 
	outColor = clamp(outColor, 0.0, 1.0) ; 
}

//##FilterEnd##




