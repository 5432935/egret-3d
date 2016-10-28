precision highp float;            	
varying vec2 varying_uv0; 
uniform float saturation; 
uniform sampler2D diffuseTexture; 
uniform sampler2D lutTexture; 

float Luminance( vec3 c ){ 
return dot( c , vec3(0.22,0.707,0.071) ); 
}
void main() 
{ 
vec2 uv = varying_uv0 ; 
vec4 color = texture2D(diffuseTexture, uv); 
float red = texture2D(lutTexture, color.rr).r ;
float green = texture2D(lutTexture,color.gg ).g ;
float blue = texture2D(lutTexture, color.bb ).b ;
color = vec4(red,green,blue, color.a); 
gl_FragColor = color ; 
}