//##FilterBegin## ##Particle##
uniform float uniform_scaleSizeBezier1[35];

void main() {
	scaleChange = calcBezierSize(uniform_scaleSizeBezier1, currentTime, curParticle.life);
	scaleSize *= scaleChange;
}


//##FilterEnd##
