varying vec2 varying_uv0; 
uniform sampler2D diffuseTexture; 
uniform float bloom_amount = 0.15;
void main(void) { 

	vec2 uv = vec2( varying_uv0.x , 1.0-varying_uv0.y );
	vec4 color = texture2D(diffuseTexture, uv); 
  	vec4 sum = vec4(0), add = vec4(0), val = texture2D(diffuseTexture, uv);
  
        for( int i = -4 ; i < 4; i++) {
             for ( int j = -4; j < 4; j++) {
                 add += texture2D(diffuseTexture, uv + vec2(j, i)*0.002) * bloom_amount;
             }
        }

	if (val.r < 0.2) { sum = add*add*0.012 + val; } else 
	if (val.r < 0.5) { sum = add*add*0.009 + val; } else {
      sum = add*add*0.0075 + val;
  }
	gl_FragColor = vec4(sum.rgb, 1.0);

}