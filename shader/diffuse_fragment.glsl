uniform sampler2D diffuseTexture;
varying vec4 varying_mvPose;
void main() {
  	vec3 fc = vec3(0.0, 0.0, 0.0);
	vec4 c = texture2D( diffuseTexture , uv_0 );
    c.xyz = c.xyz * materialSource.diffuse * c.a ; 

	if (c.a < materialSource.cutAlpha)
		discard;

	if(materialSource.refraction<2.41){ 
       float vl = dot(normal,-normalize(varying_mvPose.xyz)); 
       fc = Fresnel_Schlick(vl,vec3(materialSource.refraction)) * materialSource.refractionintensity ; 
       fc.xyz = max(fc,vec3(0.0)) ; 
    } 

	s.Normal = normal;
	s.Specular = vec4(1.0) ;
	s.Albedo = c.rgb + fc.xyz * c.rgb + materialSource.ambient * c.rgb;
    s.Albedo.x = pow(s.Albedo.x, materialSource.gamma);
    s.Albedo.y = pow(s.Albedo.y, materialSource.gamma);
    s.Albedo.z = pow(s.Albedo.z, materialSource.gamma);
	s.Alpha = c.a;
	outColor.xyz = s.Albedo * 0.5 ;
	outColor.w = s.Alpha;
}



