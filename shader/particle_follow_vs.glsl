//##FilterBegin## ##Particle##
//目标位置
attribute vec3 attribute_followPosition ;
attribute vec4 attribute_followRotation ;
attribute vec3 attribute_followScale;

void getNodeData(){
	 followTargetPosition = attribute_followPosition;
	 //followTargetScale = attribute_followScale;
	 followTargetRotation = attribute_followRotation;
}
	
//##FilterEnd##