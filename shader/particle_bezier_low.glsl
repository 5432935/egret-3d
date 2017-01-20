//##FilterBegin## ##Particle##
//const float Tiny1 = 0.0001;
float calcBezierArea(float bzData[35], float tCurrent, float tTotal){
	float res = 0.0;

	float v0;
	float v1;
	float t0;
	float t1;
	float deltaTime = 0.0;
	float a_deltaTime;

	for(int i = 0; i < 4; i ++)
	{
	
		t0 = bzData[i * 8] * tTotal;
		v0 = bzData[i * 8 + 1];
		t1 = bzData[(i + 1) * 8] * tTotal;
		v1 = bzData[(i + 1) * 8 + 1];

		deltaTime = t1 - t0;

		a_deltaTime = 0.5 * (v1 - v0);
		if(tCurrent >= t1)
		{
			res += deltaTime * (v0 + a_deltaTime);
		}else
		{
			deltaTime = tCurrent - t0;
			res += deltaTime * (v0 + a_deltaTime);
			break;
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
	float deltaTime = 0.0;
	float v;

	for(int i = 0; i < 4; i ++)
	{
		t0 = bzData[i * 8] * tTotal;
		y0 = bzData[i * 8 + 1];
		t1 = bzData[(i + 1) * 8] * tTotal;
		y1 = bzData[(i + 1) * 8 + 1];

		deltaTime = t1 - t0;
		
		if(tCurrent <= t1)
		{
			v = (y1 - y0) / deltaTime;
			deltaTime = tCurrent - t0;
			res = y0 + v * deltaTime;
			break;
		}

	}

	return res;
}

//##FilterEnd##
