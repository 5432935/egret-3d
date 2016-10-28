varying vec4 varying_mvPose;
uniform float uniform_colorGradientsSource[6] ;
void main(void){

	float posStartY = uniform_colorGradientsSource[0]; 
	float posEndY = uniform_colorGradientsSource[1]; 
	vec4 color = vec4(uniform_colorGradientsSource[2], uniform_colorGradientsSource[3], uniform_colorGradientsSource[4], uniform_colorGradientsSource[5]); 
	color.w *= clamp((varying_mvPose.y - posStartY) / (posEndY - posStartY), 0.0, 1.0); 
	color.xyz *= color.w;
	outColor.xyz = outColor.xyz * (1.0 - color.w) + color.xyz * color.w; 
	

}




 