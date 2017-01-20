varying vec4 varying_mvPose; 

vec4 diffuseColor ;
vec4 specularColor ;
vec4 ambientColor;
vec4 light ;


void main() {
	if(light.w < 0.0 ){
	   outColor.xyz = s.Albedo.xyz ; 
	}else{
	   outColor.xyzw = light ; 
	}
    outColor.xyzw *= varying_color.xyzw;
}
