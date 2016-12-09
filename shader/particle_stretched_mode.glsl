//##FilterBegin## ##Particle##

float updateStretchedBillBoard(vec4 startPos, vec4 newPos){
	//第一帧无法计算方向
	if(currentTime < 0.016){
		return 0.0;
	}
	vec3 dirVector = newPos.xyz - startPos.xyz; 
	float speed = dot(dirVector, dirVector); 
	speed = sqrt(speed) / currentTime; 
	speed /= 100.0; 
	localPosition.x = localPosition.x * particleStateData.lengthScale + speed * particleStateData.speedScale * localPosition.x/scaleSize;


	mat4 temp = uniform_ViewMatrix;
	startPos = temp * startPos; 
	newPos = temp * newPos; 


	
	float scaleBefore = dot(dirVector, dirVector);
	scaleBefore = sqrt(scaleBefore);
	//too small cannot calc direction;
	if(scaleBefore < Tiny){
		return 0.0;
	}
	dirVector = newPos.xyz - startPos.xyz; 
	float scaleAfter = dot(dirVector.xy, dirVector.xy);
	scaleAfter = sqrt(scaleAfter); 
	scaleAfter = sqrt(scaleAfter / scaleBefore); 
	localPosition.x *= scaleAfter; 
  
	startPos.xyz /= startPos.z; 
	newPos.xyz /= newPos.z; 
	dirVector = newPos.xyz - startPos.xyz;
	dirVector = normalize(dirVector); 

	vec3 dirStartVector = vec3(0.0, 1.0, 0.0); 

	float added = -0.5 * PI;//让图片放倒
	if(dirVector.x > 0.0){ 
		dirVector.xy *= -1.0; 
		added += PI; 
	} 
	float acosValue = dot(dirStartVector, dirVector); 
	float angle = acos(acosValue) + added;
	
	temp = buildRotMat4(vec3(0.0, 0.0, angle)); 
	rotVertexMatrix = temp * rotVertexMatrix;
	localPosition = temp * localPosition;

	return 1.0;

}

//##FilterEnd##
