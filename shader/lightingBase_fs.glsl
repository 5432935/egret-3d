void LightingBlinnPhong(vec3 lightDir, vec3 lightColor , vec3 lightAmbient , vec3 normal , vec3 viewDir, float atten){ 
    vec3 H = normalize(lightDir + normalize(viewDir)); 
    float NdotL = max(dot(normal, lightDir),0.0); 
    float NdotH = max(dot(normal,H),0.0); 

    vec3 diffuse = lightColor.xyz * NdotL ; 

    float specPower = pow (NdotH, materialSource.shininess ) * materialSource.specularScale ; 
    vec3 specular = lightColor.xyz * specPower * materialSource.specular ; 

    specularColor.xyz += specular;
    light.xyz += (diffuse+lightAmbient) * (atten * 2.0 ); 
    light.w = materialSource.alpha + (specPower * atten); 
}

void main(void) {
	light.xyzw = vec4(0.0,0.0,0.0,1.0) ;
}
