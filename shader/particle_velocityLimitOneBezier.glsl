//##FilterBegin## ##Particle##

uniform float uniform_velocityLimit[35];

void main() {
	velocityLimitVec2.x = calcBezierArea(uniform_velocityLimit, currentTime, curParticle.life);
	velocityLimitVec2.y = 1.0;
}

//##FilterEnd##
