//##FilterBegin## ##Particle##
//const float Tiny1 = 0.0001;
float calcBezierArea(float bzData[35], float tCurrent, float tTotal){
	float res = 0.0;

	float v0;
	float v1;
	float t0;
	float t1;

	float breakFlag = 1.0;
	for (int i = 0; i < 3; i++) {
		t1 = bzData[i * 4];
		v1 = bzData[i * 4 + 1];
		t0 = bzData[(i - 1) * 4];
		v0 = bzData[(i - 1) * 4 + 1];
		res += (min(tCurrent, t1) - t0) * (0.5 * (v1 + v0)) * breakFlag;
		if(t1 >= tCurrent) {
			breakFlag = 0.0;
		}
	}

	return res;
}


float calcBezierSize(float bzData[35], float tCurrent, float tTotal){
	float res = 0.0;

	float y0;
	float y1;
	float t0;
	float t1;
	
	for (int i = 1; i < 4; i ++) {
		t1 = bzData[i * 4];
		y1 = bzData[i * 4 + 1];
		if(t1 >= tCurrent) {
			t0 = bzData[(i - 1) * 4];
			y0 = bzData[(i - 1) * 4 + 1];
			float age = (tCurrent - t0) / (t1 - t0);
			res = y0 + (y1 - y0) * age;
		}
	}

	return res;
}

//##FilterEnd##
