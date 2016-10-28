uniform float uniform_rimData[6] ;
void main(){
    float rim = 1.0 - clamp(dot (vec3(0.0,0.0,1.0), normal ) ,0.0,1.0);  
    vec3 emission = vec3(uniform_rimData[0],uniform_rimData[1],uniform_rimData[2]) * pow(rim, uniform_rimData[4]);  
    outColor.xyz += emission * uniform_rimData[3] * uniform_rimData[5] ;
}