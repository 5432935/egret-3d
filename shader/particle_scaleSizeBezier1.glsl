//##FilterBegin## ##Particle##
uniform float uniform_scaleSizeBezier1[35];

void main() {
	scaleSize = calcBezierSize(uniform_scaleSizeBezier1, currentTime, curParticle.life);
	localPosition.xyz *= scaleSize;
}


//##FilterEnd##
