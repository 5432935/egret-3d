//##FilterBegin## ##Particle##
attribute float attribute_rotationZ ;

void rotateParticleUnit(){
	float rot = currentTime * attribute_rotationZ * (PI / 180.0);
	mat4 temp = buildRotMat4(vec3(0.0,0.0,rot));
	rotVertexMatrix = temp * rotVertexMatrix;
	localPosition = temp * localPosition;
}

//##FilterEnd##
