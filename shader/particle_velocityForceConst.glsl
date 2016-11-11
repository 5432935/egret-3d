//##FilterBegin## ##Particle##
attribute vec3 attribute_velocityForceConst ;
void getNodeData(){
	velocityForceVec3 = 0.5 * attribute_velocityForceConst * currentTime * currentTime;
}
//##FilterEnd##
