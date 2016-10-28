attribute vec3 attribute_normal;
attribute vec4 attribute_color;

varying vec4 varying_mvPose; 
uniform float uniform_ouline[5] ;

void main(void){
    outPosition.xy -= normalize(varying_eyeNormal.xyz).xy * uniform_ouline[0]; 
}