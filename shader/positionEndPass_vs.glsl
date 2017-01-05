varying vec4 varying_position ;
void main(){
		outPosition = uniform_ProjectionMatrix * outPosition ; 
		varying_position = outPosition.xyzw; 
}