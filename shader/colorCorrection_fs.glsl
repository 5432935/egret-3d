//uniform float AveLum;
//uniform int imgH,imgW;
varying vec2 varying_uv0;
uniform sampler2D diffuseTexture;
uniform sampler2D lutTexture;
uniform float saturation ;

float Luminance( vec3 c ){
    return dot( c , vec3(0.22,0.707,0.071) );
}

void main()
{
     vec2 uv = varying_uv0 ; 
	 vec4 color = texture2D(diffuseTexture, uv); 
		
	 vec3 red = texture2D(lutTexture, vec2(color.r, 0.5/4.0)).rgb * vec3(1.0,0.0,0.0);
	 vec3 green = texture2D(lutTexture, vec2(color.g, 1.5/4.0)).rgb * vec3(0.0,1.0,0.0);
	 vec3 blue = texture2D(lutTexture, vec2(color.b, 2.5/4.0)).rgb * vec3(0.0,0.0,1.0);
	 
	 color = vec4(red+green+blue, color.a);

	 float lum = Luminance(color.rgb);
	 //color.rgb = lerp(fixed3(lum,lum,lum), color.rgb, _Saturation);
     gl_FragColor = color ;
}