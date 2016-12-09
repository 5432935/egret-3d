varying vec2 varying_uv0;
uniform sampler2D positionPass;
uniform sampler2D normalPass;

void main(){
    //texture2D(positionPass,varying_uv0) * texture2D(normalPass,varying_uv0)；
    gl_FragColor = texture2D(positionPass,varying_uv0) + texture2D(normalPass,varying_uv0) ;
}
