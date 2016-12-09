//##FilterBegin## ##Particle##
varying vec4 varying_particleData;
void main() {

	materialSource.diffuse *= globalColor.xyz;
	outColor.xyz = (light.xyz+materialSource.ambient) * (diffuseColor.xyz * materialSource.diffuse * varying_color.xyz) + specularColor.xyz ; 
	outColor.w = materialSource.alpha * diffuseColor.w * varying_color.w; 
	outColor.w *= globalColor.w; 

	//ALPHA
	if(varying_particleData.w > 0.5){ 
		outColor.xyz *= outColor.w; 
	}
	outColor = clamp(outColor, 0.0, 1.0); 
}

//##FilterEnd##




