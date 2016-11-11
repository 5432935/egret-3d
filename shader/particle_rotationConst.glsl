//##FilterBegin## ##Particle##
attribute float attribute_rotationZ ;
void getUnitRotate(){
	rotResultVec3.z = currentTime * attribute_rotationZ;
}

//##FilterEnd##
