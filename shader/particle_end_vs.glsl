//##FilterBegin## ##Particle##
varying vec4 varying_pos;

mat4 buildModelMatrix(vec4 quat, vec3 scale, vec3 position)
{
	//缩放
	mat4 ret = mat4( 
		vec4(scale.x, 0.0, 0.0, 0.0), 
		vec4(0.0, scale.y, 0.0, 0.0), 
		vec4(0.0, 0.0, scale.z, 0.0), 
		vec4(0.0, 0.0, 0.0, 1.0) 
	);
	//旋转
	ret = buildMat4Quat(quat) * ret; 
	 
	//平移
	ret[3][0] = position.x;
	ret[3][1] = position.y;
	ret[3][2] = position.z;

	return ret;
}

vec3 calcParticleMove(vec3 distanceXYZ){
	//限速
	if(velocityLimitVec2.y > TrueOrFalse){
		vec3 temp = distanceXYZ * distanceXYZ;
		float distanceCurrent = sqrt(temp.x + temp.y + temp.z);
		float distanceLimit = velocityLimitVec2.x;
		if(distanceLimit < Tiny){
			return vec3(0.0);
		}

		if(distanceCurrent > distanceLimit){

			float nowFrame = currentTime / 0.017;
			float dampen = 1.0 - particleStateData.velocityLimitDampen;
			float startDistance = (distanceCurrent - distanceLimit) / nowFrame;
			float distanceResult = 0.0;
			float tempDistance = startDistance;
			for(int i = 1; i < 600; i++){
				distanceResult += tempDistance;
				tempDistance *= dampen;
				if(float(i) > nowFrame)
					break;
			}

			distanceXYZ *= (distanceResult + distanceLimit) / distanceCurrent;

		}
	}
	return distanceXYZ;
}


//rewrite by stretched
bool updateStretchedBillBoard(vec3 moveVector){
	return true;	
}

void main(void) {
	
	//相对发射器的位置
	vec3 position_emitter = attribute_offsetPosition;

	vec3 velocityLocalVec3 = velocityBaseVec3 * currentTime;
	vec3 velocityWorldVec3 = vec3(0.0,0.0,0.0);
	vec3 velocityMultiVec3 = vec3(0.0,0.0,0.0);

	if(particleStateData.velocityOverWorldSpace < TrueOrFalse){
		velocityLocalVec3 += velocityOverVec3;		
	}else{
		velocityWorldVec3 += velocityOverVec3;
	}

	if(particleStateData.velocityForceWorldSpace < TrueOrFalse){
		velocityLocalVec3 += velocityForceVec3;
	}else{
		velocityWorldVec3 += velocityForceVec3;
	}

	position_emitter *= vec3(particleStateData.scaleX, particleStateData.scaleY, particleStateData.scaleZ);
	if(particleStateData.worldSpace > TrueOrFalse){
		//followTargetPosition
		//followTargetScale
		//followTargetRotation

	}else{
		followTargetPosition.x = particleStateData.positionX;
		followTargetPosition.y = particleStateData.positionY;
		followTargetPosition.z = particleStateData.positionZ;

		followTargetRotation.x = particleStateData.rotationX;
		followTargetRotation.y = particleStateData.rotationY;
		followTargetRotation.z = particleStateData.rotationZ;
		followTargetRotation.w = particleStateData.rotationW;

	}

	mat4 followRotQuat = buildMat4Quat(followTargetRotation);
	velocityLocalVec3 = (followRotQuat * vec4(velocityLocalVec3, 1.0)).xyz;
	if(particleStateData.renderMode == Mesh){ 
		rotVertexMatrix = followRotQuat * rotVertexMatrix; 
	}
	localPosition.xyz *= scaleSize;
	localPosition = rotVertexMatrix * localPosition; 
	trackPosition();
	mat4 modelMatrix = buildModelMatrix(followTargetRotation, followTargetScale, followTargetPosition);
	position_emitter = (modelMatrix * vec4(position_emitter, 1.0)).xyz; 

	//固定速度+速度叠加+加速度叠加
	velocityMultiVec3 = velocityLocalVec3 + velocityWorldVec3;
	//限制速度（计算平均速度）
	velocityMultiVec3 = calcParticleMove(velocityMultiVec3);
	//重力
	velocityMultiVec3.y -= 4.9 * currentTime * currentTime * particleStateData.gravity;// 0.5 * g * t * t;
		
	//是否需要修改local position指向运动方向，直接修改localPosition
	position_emitter += velocityMultiVec3; 
	if(particleStateData.renderMode == StretchedBillboard){
		discard_particle = discard_particle || updateStretchedBillBoard(velocityMultiVec3) == false; 
		outPosition = localPosition;
		rotVertexMatrix = rotVertexMatrix * uniform_billboardMatrix; 
	}else{
		outPosition = uniform_billboardMatrix * localPosition;
	}

	if(discard_particle){
		outPosition = vec4(0.0,0.0,0.0,0.0); 
	}else{
		
		outPosition.xyz += position_emitter.xyz;
		outPosition = uniform_ViewMatrix * outPosition;

		e_normal.xyz = (rotVertexMatrix * vec4(e_normal, 1.0)).xyz;
		e_normal = normalize(e_normal);

		mat4 mvMatrix = mat4(uniform_ViewMatrix * modelMatrix);
		varying_mvPose = outPosition;
    	
		mat4 normalMatrix = inverse(mvMatrix) ;
		normalMatrix = transpose(normalMatrix); 
		
		varying_eyeNormal = mat3(normalMatrix) * - e_normal; 
	}

	varying_pos = outPosition = uniform_ProjectionMatrix * outPosition;
}
	
//##FilterEnd##