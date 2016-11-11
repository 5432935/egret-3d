//##FilterBegin## ##Particle##

attribute float attribute_velocityLimit;
void getNodeData(){
	velocityLimitVec2.x = attribute_velocityLimit * currentTime;
	if(velocityLimitVec2.x < 0.0){
		velocityLimitVec2.x = 0.0;
	}
	velocityLimitVec2.y = 1.0;
}

//##FilterEnd##
