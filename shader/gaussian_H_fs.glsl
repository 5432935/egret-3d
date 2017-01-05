varying vec2 varying_uv0;
uniform sampler2D diffuseTexture;

vec4 blur9_1_0(sampler2D image, vec2 uv, float radius , float resolution, vec2 dir) {
    vec4 color = vec4(0.0);
    vec2 tc = uv;
    float blur = radius/resolution ; 
    //(0.0, 1.0) -> y-axis blur
    float hstep = dir.x;
    float vstep = dir.y;
    //apply blurring, using a 9-tap filter with predefined gaussian weights
    color += texture2D(image, vec2(tc.x - 4.0*blur*hstep, tc.y - 4.0*blur*vstep)) * 0.0162162162;
    color += texture2D(image, vec2(tc.x - 3.0*blur*hstep, tc.y - 3.0*blur*vstep)) * 0.0540540541;
    color += texture2D(image, vec2(tc.x - 2.0*blur*hstep, tc.y - 2.0*blur*vstep)) * 0.1216216216;
    color += texture2D(image, vec2(tc.x - 1.0*blur*hstep, tc.y - 1.0*blur*vstep)) * 0.1945945946;
    color += texture2D(image, vec2(tc.x, tc.y)) * 0.2270270270;
    color += texture2D(image, vec2(tc.x + 1.0*blur*hstep, tc.y + 1.0*blur*vstep)) * 0.1945945946;
    color += texture2D(image, vec2(tc.x + 2.0*blur*hstep, tc.y + 2.0*blur*vstep)) * 0.1216216216;
    color += texture2D(image, vec2(tc.x + 3.0*blur*hstep, tc.y + 3.0*blur*vstep)) * 0.0540540541;
    color += texture2D(image, vec2(tc.x + 4.0*blur*hstep, tc.y + 4.0*blur*vstep)) * 0.0162162162;
  return color;
}

void main(void) { 
	vec4 color = vec4(0.0,0.0,0.0,0.0); 
	color =blur9_1_0(diffuseTexture,varying_uv0,3.0,2048.0,vec2(0.0,1.0));
	gl_FragColor  = color; 
}