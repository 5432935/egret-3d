//##FilterBegin## ##Particle##

bool updateStretchedBillBoard(vec3 moveVector){
	//第一帧无法计算方向
	if(currentTime < 0.016){
		return false;
	}
	float speed = dot(moveVector, moveVector); 
	speed = sqrt(speed) / currentTime; 
	speed /= 100.0;
	if(speed < Tiny){
		return false;
	}
	localPosition.y = localPosition.y * particleStateData.lengthScale + speed * particleStateData.speedScale * localPosition.y / scaleSize;

	vec3 dir1 = vec3(0.0, 1.0, 0.0);
	vec3 dir2 = normalize(moveVector);

	vec3 axis = normalize(cross(dir1, dir2));
    float angle = acos(dot(dir1, dir2));

	vec4 quat = vec4(0.0, 0.0, 0.0, 1.0);
    float halfAngle = angle * 0.5;
    float sin_a = sin(halfAngle);

    quat.w = cos(halfAngle);
    quat.x = axis.x * sin_a;
    quat.y = axis.y * sin_a;
    quat.z = axis.z * sin_a;

    quat = normalize(quat);
	
	localPosition = uniform_billboardMatrix * localPosition;
	rotVertexMatrix = buildMat4Quat(quat); 
	localPosition = rotVertexMatrix * localPosition;

	return true;

}

//##FilterEnd##
