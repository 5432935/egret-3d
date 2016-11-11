//##FilterBegin## ##Particle##
attribute vec3 attribute_rotSpeedXYZ ;
attribute vec3 attribute_rotBirthXYZ ;

void getUnitRotate(){
	rotResultVec3 = (attribute_rotBirthXYZ + particleStateData.time * attribute_rotSpeedXYZ);
	rotResultVec3 = mod(rotResultVec3, 360.0);
}

//##FilterEnd##
