//##FilterBegin## ##Particle##
attribute float attribute_bezierRandomSeed;
uniform float uniform_scaleSizeBezier1[35];
uniform float uniform_scaleSizeBezier2[35];
void main() {
	vec2 scaleVec2 = vec2(0.0);
	scaleVec2.x = calcBezierArea(uniform_scaleSizeBezier1, currentTime, curParticle.life);
	scaleVec2.y = calcBezierArea(uniform_scaleSizeBezier2, currentTime, curParticle.life);
	scaleSize = mix(scaleVec2.x, scaleVec2.y, attribute_bezierRandomSeed);
	localPosition.xyz *= scaleSize;
}

//##FilterEnd##
