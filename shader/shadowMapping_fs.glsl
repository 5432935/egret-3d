uniform sampler2D shadowMapTexture;

varying vec2 varying_ShadowCoord;

float unpackDepth(vec4 rgbaDepth){
    vec4 bitShift = vec4( 1.0 , 1.0/256.0 , 1.0/(256.0*256.0) , 1.0/(256.0*256.0*256.0) );
    float depth = dot(rgbaDepth,bitShift);
    return depth ;
}

void main() {
	vec3 shadowColor = vec3(1.0,1.0,1.0);

	float shadow = 0.0;
	if (varying_ShadowCoord.w > 0.0) {
		vec3 shadowDepth = varying_ShadowCoord.xyz / varying_ShadowCoord.w * 0.5 + 0.5;
		vec2 sample = clamp(shadowDepth.xy,0.0,1.0);
		float sampleDepth = unpackDepth(texture2D(shadowMapTexture, sample));
		if(sampleDepth < shadowDepth.z-0.002)
			shadowColor = vec3(0.5,0.5,0.6)  ; // ���渳ֵ����ɫ�� ��Ӱ����ɫ
	}

	diffuseColor.xyz = diffuseColor.xyz * shadowColor;
}
