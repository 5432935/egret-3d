//##FilterBegin## ##Particle##
uniform float uniform_rotationBezier[35];
void rotateParticleUnit(){
	float rot = calcBezierSize(uniform_rotationBezier, currentTime, curParticle.life);
	rot = currentTime * rot * (PI / 180.0);
	mat4 temp = buildRotMat4(vec3(0.0,0.0,rot));
	rotVertexMatrix = temp * rotVertexMatrix;
	localPosition = temp * localPosition;
}
//##FilterEnd##
