//##FilterBegin## ##Particle##
uniform float uniform_rotationBezier[35];
void getUnitRotate(){
	float rot = calcBezierSize(uniform_rotationBezier, currentTime, curParticle.life);
	rotResultVec3.z = currentTime * rot;
}
//##FilterEnd##
