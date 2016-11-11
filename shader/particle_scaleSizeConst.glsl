//##FilterBegin## ##Particle##
attribute float attribute_scaleSizeConst;
void main() {
	scaleSize = attribute_scaleSizeConst;
	localPosition.xyz *= scaleSize;
}

//##FilterEnd##