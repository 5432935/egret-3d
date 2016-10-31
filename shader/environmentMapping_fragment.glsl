uniform samplerCube environmentMapTex ;
uniform float reflectValue;
varying vec3 varying_ViewDir ;
void main(){

	 vec3 N = normalize(normal);
	vec3 V = normalize(varying_mvPose.xyz/varying_mvPose.w);
	float dotNV = clamp(dot(N,V), 0.0, 1.0); //0d
	float FV = pow((1.0 - dotNV), 2.0);
	
	mat4 invViewMatrix = inverse(uniform_ViewMatrix);
	vec3 ecReflected = reflect(normalize(varying_ViewDir.xyz), normalize(mat3(invViewMatrix)*normal)); //eye coordinates reflection vector
	vec4 reflectiveColor = textureCube(environmentMapTex,-normalize(ecReflected.xyz)); 
	diffuseColor.xyz = mix( diffuseColor.xyz,reflectiveColor.xyz, reflectValue + FV );  
	
}
         