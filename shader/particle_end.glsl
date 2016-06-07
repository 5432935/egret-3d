float particle( ParticleData emit ){
	return 1.0 ;
}
void main(void) {

	if(discard_particle == 1.0){ 
		outPosition = vec4(0.0,0.0,0.0,0.0); 
	}else{
		//���ٶ�Ϊ��������ϵ
		if(particleStateData.accelerationWorld == 0.0){
			globalPosition.xyz += accelerationOffset.xyz;
		}
		if(particleStateData.worldSpace == 1.0){
		  globalPosition = followTargetMatrix * globalPosition;
		}else{
		  globalPosition = uniform_ModelMatrix * globalPosition; 
		}
		//���ٶ�Ϊȫ������ϵ
		if(particleStateData.accelerationWorld == 1.0){
			globalPosition.xyz += accelerationOffset.xyz;
		}
		//����Ĭ��Ϊȫ������ϵ
		globalPosition.y -= currentTime * currentTime * particleStateData.gravity;

		localPosition.xyz *= vec3(particleStateData.scaleX, particleStateData.scaleY, particleStateData.scaleZ);
		outPosition = billboardMatrix * localPosition;
		outPosition.xyz += globalPosition.xyz;
		outPosition = uniform_ViewMatrix * outPosition;
	} 
	gl_Position = uniform_ProjectionMatrix * outPosition ; 
}
	