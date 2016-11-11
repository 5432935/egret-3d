uniform vec2 waterNormalData[4];
uniform vec4 horizonColor;

uniform float time ;
uniform sampler2D bumpTexture;
uniform sampler2D colorControlTexture;
varying vec2 varying_uv0        ;
varying vec2 varying_uv0        ;

vec4 UnpackNormal( vec4 nT ){
    vec4 t ;
    t.xyzw = nT.xyzw * 2.0 - 1.0 ;
    return t ;
}

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

void main(void){

    float tempTime = mod(time,10000000.0); 
    vec2 uvA = uv_0 * waterNormalData[3].x + waterNormalData[0] * tempTime ; 
    vec2 uvB = uv_0 * waterNormalData[3].y + waterNormalData[1] * tempTime  ; 

    TBN = cotangentFrame(normal,varying_mvPose.xyz, varying_uv0) ;
    vec3 viewDir = normalize(varying_mvPose.xyz/varying_mvPose.w) ;
    vec3 bump1 = UnpackNormal(texture2D( bumpTexture, uvA )).rgb;
	vec3 bump2 = UnpackNormal(texture2D( bumpTexture, uvB )).rgb;
	vec3 bump = (bump1 + bump2) * 0.5;
    normal = TBN * bump ;
	
	float fresnel = dot( viewDir, bump );
	vec4 water = texture2D( colorControlTexture, vec2(fresnel,fresnel) );
	
	vec4 col;
	diffuseColor.rgb = mix( water.rgb, horizonColor.rgb, water.a );
	diffuseColor.a = horizonColor.a;
}