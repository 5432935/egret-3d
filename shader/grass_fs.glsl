uniform float uniform_lightMap_data[5];
uniform sampler2D diffuseTexture;
uniform sampler2D lightMapTexture;
varying vec4 varying_scenePose;
vec4 diffuseColor;
void main() {
	vec2 lightUV;
	diffuseColor = texture2D(diffuseTexture, varying_uv0);
	if( diffuseColor.w < materialSource.cutAlpha ){
		discard;
	}
	if(uniform_lightMap_data[0] > 0.5){
		lightUV.x = (varying_scenePose.x + uniform_lightMap_data[1]) / uniform_lightMap_data[3]; 
		lightUV.y = (varying_scenePose.z + uniform_lightMap_data[2]) / uniform_lightMap_data[4]; 
		diffuseColor *= texture2D(lightMapTexture, lightUV); 
	}
	outColor = diffuseColor;
}