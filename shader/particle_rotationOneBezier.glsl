//##FilterBegin## ##Particle##
uniform float uniform_rotationBezier[35];
void getUnitRotate(){
	float rot = calcBezierArea(uniform_rotationBezier, currentTime, curParticle.life);
	rotResultVec3.z = rot;
}
//##FilterEnd##
