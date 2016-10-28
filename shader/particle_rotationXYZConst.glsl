//##FilterBegin## ##Particle##
attribute vec3 attribute_rotSpeedXYZ ;
attribute vec3 attribute_rotBirthXYZ ;

void rotateParticleUnit(){
	vec3 rot = (attribute_rotBirthXYZ + particleStateData.time * attribute_rotSpeedXYZ);
	rot = mod(rot, 360.0) * (PI / 180.0);
	mat4 temp = buildRotMat4(rot);
	rotVertexMatrix = temp * rotVertexMatrix;
	localPosition = temp * localPosition; 
}

//##FilterEnd##
