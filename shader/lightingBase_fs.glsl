vec4 LightingBlinnPhong(vec3 lightDir, vec3 lightColor , vec3 lightAmbient , vec3 normal , vec3 viewDir, float atten){ 
	vec3 h = normalize(lightDir + normalize(viewDir)); 
	float diff = max(dot(normal, lightDir),0.0); 
	float nh = max(dot(normal,h),0.0); 
	float spec = pow(nh, materialSource.shininess ) * materialSource.specularScale ; 
	vec4 c ; 
	c.rgb = (s.Albedo * lightColor * diff + lightColor * materialSource.specular.rgb * s.Specular.rgb * spec) * (atten * 2.0); 
	c.a = s.Alpha + spec * atten; 
	return c; 
}

void main(void) {
}
