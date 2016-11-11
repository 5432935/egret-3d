//##FilterBegin## ##Particle##
attribute float attribute_rotationRandomSeed;
uniform float uniform_rotationBezier[35];
uniform float uniform_rotationBezier2[35];

void getUnitRotate(){
	vec2 rotationTwoBezier = vec2(0.0);
	rotationTwoBezier.x = calcBezierArea(uniform_rotationBezier, currentTime, curParticle.life);
	rotationTwoBezier.y = calcBezierArea(uniform_rotationBezier2, currentTime, curParticle.life);
	float rot = mix(rotationTwoBezier.x, rotationTwoBezier.y, attribute_rotationRandomSeed);
	rotResultVec3.z = currentTime * rot;
}
//##FilterEnd##
