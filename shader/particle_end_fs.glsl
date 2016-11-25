//##FilterBegin## ##Particle##

//far
//near
//blendMode
const float TrueOrFalse = 0.5;
uniform float uniform_particleFsData[3];
varying vec3 varying_particleData;
void main() {
	float blendMode = uniform_particleFsData[2];

	materialSource.diffuse *= globalColor.xyz;
	outColor.xyz = (light.xyz+materialSource.ambient) * (diffuseColor.xyz * materialSource.diffuse * varying_color.xyz) + specularColor.xyz ; 
	outColor.w = materialSource.alpha * diffuseColor.w * varying_color.w; 
	outColor.w *= globalColor.w; 

	//ALPHA
	if(blendMode < TrueOrFalse){ 
		outColor.xyz *= outColor.w; 
	}
	
	outColor = clamp(outColor, 0.0, 1.0); 
}

//##FilterEnd##




