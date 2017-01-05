uniform sampler2D diffuseTexture;
vec4 diffuseColor ;
void main() {
	diffuseColor = texture2D(diffuseTexture , uv_0 ); 
	//diffuseColor.xyz = pow(diffuseColor.xyz,vec3(2.0));
    if( diffuseColor.w < materialSource.cutAlpha ){
		discard;
	}
}



