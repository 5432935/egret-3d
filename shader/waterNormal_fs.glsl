uniform vec2 waterNormalData[4];
uniform float time ;
uniform sampler2D normalTextureA;
uniform sampler2D normalTextureB;

varying vec4 varying_mvPose;
varying vec2 varying_uv0;
mat3 TBN ;
mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) {
    vec3 dp1 = dFdx(p);
    vec3 dp2 = dFdy(p);
    vec2 duv1 = dFdx(uv);
    vec2 duv2 = dFdy(uv);

    vec3 dp2perp = cross(dp2, N);
    vec3 dp1perp = cross(N, dp1);
    vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
    vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;

    float invmax = 1.0 / sqrt(max(dot(T,T), dot(B,B)));
    return mat3(T * invmax, B * invmax, N);
}

vec3 tbn(vec3 map, vec3 N, vec3 V, vec2 texcoord) {
    mat3 TBN = cotangentFrame(N, -V, texcoord);
    return normalize(TBN * map);
}

void main(void){

    TBN = cotangentFrame(normal,varying_mvPose.xyz, varying_uv0) ;
    float tempTime = mod(time,100000.0); 
    vec2 uvA = uv_0 * waterNormalData[3].x + waterNormalData[0] * tempTime ; 
    vec2 uvB = uv_0 * waterNormalData[3].y + waterNormalData[1] * tempTime  ; 

    vec3 bump1 = texture2D( normalTextureA, uvA ).rgb * 2.0-1.0 ; 
    bump1.y *= -1.0;
    bump1.xyz = TBN * bump1 ; 
    normal.xyz = bump1.xyz ;
    
    vec3 bump2 = texture2D( normalTextureB, uvB ).rgb * 2.0-1.0 ; 
    bump2.y *= -1.0;
    bump2.xyz = TBN * bump2 ; 
    normal.xyz = (normal.xyz + bump2.xyz)*0.5 ;
    
} 