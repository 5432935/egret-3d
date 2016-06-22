float particle( ParticleData curParticle ){
	return 1.0 ;
}

mat4 buildModelMatrix(vec4 quat, vec3 scale, vec3 position)
{
	//����
	mat4 ret = mat4( 
		vec4(scale.x, 0.0, 0.0, 0.0), 
		vec4(0.0, scale.y, 0.0, 0.0), 
		vec4(0.0, 0.0, scale.z, 0.0), 
		vec4(0.0, 0.0, 0.0, 1.0) 
	);
	//��ת
	ret = buildMat4Quat(quat) * ret; 
	 
	//ƽ��
	ret[3][0] = position.x;
	ret[3][1] = position.y;
	ret[3][2] = position.z;

	return ret;
}

vec3 calcParticleMove(vec3 speedXYZ, vec3 forceXYZ){
	vec3 distanceXYZ = speedXYZ * currentTime;
	distanceXYZ += forceXYZ * currentTime * currentTime;
	//����
	if(velocityLimitVec2.y == 1.0){
		vec3 temp = distanceXYZ * distanceXYZ;
		float distanceCurrent = sqrt(temp.x + temp.y + temp.z);
		float distanceLimit = currentTime * velocityLimitVec2.x;

		if(distanceCurrent > distanceLimit){
			distanceXYZ *= distanceLimit / distanceCurrent;
		}
	}
	return distanceXYZ;
}

void main(void) {

	if(discard_particle == 1.0){ 
		outPosition = vec4(0.0,0.0,0.0,0.0); 
	}else{

		//vec3 velocityBaseVec3
		//vec3 velocityOverVec3
		//vec2 velocityLimitVec2
		//vec3 velocityForceVec3
		//vec2 velocityBezierWeightVec2
		//float currentTime

		//��Է�������λ��
		vec3 position_emitter = attribute_offsetPosition;

		vec3 velocityLocalVec3 = velocityBaseVec3;
		vec3 velocityWorldVec3 = vec3(0.0,0.0,0.0);
		vec3 velocityMultiVec3 = vec3(0.0,0.0,0.0);
		if(particleStateData.velocityOverWorldSpace == 0.0){
			//���ٶ�Ϊ��������ϵ
			velocityLocalVec3 += velocityOverVec3;
		}else{
			velocityWorldVec3 += velocityOverVec3;
		}


		if(particleStateData.worldSpace == 1.0){
			//followTargetPosition
			//followTargetScale
			//followTargetRotation

		}else{
			followTargetPosition.x = particleStateData.positionX;
			followTargetPosition.y = particleStateData.positionY;
			followTargetPosition.z = particleStateData.positionZ;

			followTargetScale.x = particleStateData.scaleX;
			followTargetScale.y = particleStateData.scaleY;
			followTargetScale.z = particleStateData.scaleZ;

			followTargetRotation.x = particleStateData.rotationX;
			followTargetRotation.y = particleStateData.rotationY;
			followTargetRotation.z = particleStateData.rotationZ;
			followTargetRotation.w = particleStateData.rotationW;

			mat4 followRotQuat = buildMat4Quat(followTargetRotation);
			velocityLocalVec3 = (followRotQuat * vec4(velocityLocalVec3, 1.0)).xyz;
			velocityForceVec3 = (followRotQuat * vec4(velocityForceVec3, 1.0)).xyz;
		}

		mat4 modelMatrix = buildModelMatrix(followTargetRotation, followTargetScale, followTargetPosition);
		position_emitter = (modelMatrix * vec4(position_emitter, 1.0)).xyz; 

		velocityMultiVec3 = velocityLocalVec3 + velocityWorldVec3;

		
		//�����ƶ��ٶȣ��ٶȻ���ĸϵ����ֵӰ��
		position_emitter += calcParticleMove(velocityMultiVec3, velocityForceVec3) * followTargetScale;

		//����Ĭ��Ϊȫ������ϵ
		position_emitter.y -= currentTime * currentTime * particleStateData.gravity;

		localPosition.xyz *= vec3(particleStateData.scaleX, particleStateData.scaleY, particleStateData.scaleZ);
		outPosition = billboardMatrix * localPosition;
		outPosition.xyz += position_emitter.xyz;
		outPosition = uniform_ViewMatrix * outPosition;
	}

	gl_Position = uniform_ProjectionMatrix * outPosition ; 
}
	