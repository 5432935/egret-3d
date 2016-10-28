//##FilterBegin## ##Particle##
//按秒为单位，当前时间
float currentTime = 0.0;
float totalTime = 0.0;
float discard_particle = 0.0;

const float PI = 3.1415926;
const float TrueOrFalse = 0.5;
const float Tiny = 0.0001;

varying vec3 varying_particleData;

attribute vec3 attribute_time;//(bornTime 秒, life, index)
attribute vec4 attribute_color;
attribute vec3 attribute_offsetPosition;
attribute float attribute_rotationBirth;

uniform mat4 uniform_cameraMatrix;
uniform mat4 uniform_billboardMatrix;
uniform mat4 uniform_ViewMatrix;
uniform float uniform_particleState[25];

vec3 cubicPos = vec3(1.0,1.0,1.0);

vec4 localPosition = vec4(0.0,0.0,0.0,1.0);
vec3 velocityBaseVec3 = vec3(0.0,0.0,0.0);
vec3 velocityOverVec3 = vec3(0.0,0.0,0.0);
vec3 velocityForceVec3 = vec3(0.0,0.0,0.0);
vec2 velocityBezierWeightVec2 = vec2(1.0, 1.0);
vec2 velocityLimitVec2 = vec2(0.0,0.0);

vec3 followTargetPosition = vec3(0.0,0.0,0.0);
vec3 followTargetScale = vec3(1.0,1.0,1.0);
vec4 followTargetRotation = vec4(0.0,0.0,0.0,0.0);

//render mode
const float Billboard				= 0.0;
const float StretchedBillboard		= 1.0;
const float HorizontalBillboard		= 2.0;
const float VerticalBillboard		= 3.0;
const float Mesh					= 4.0;


struct ParticleData{
	float bornTime;			//出生时间(加过rate，但是没有加delay)
	float life;				//单次生命周期时间
	float index;			//下标
};                   
ParticleData curParticle;

struct ParticleStateData{
	float time;						
	float loop;						
	float worldSpace;				

	float scaleX;					
	float scaleY;					
	float scaleZ;					
	float rotationX;				
	float rotationY;				
	float rotationZ;				
	float rotationW;

	float positionX;				
	float positionY;				
	float positionZ;				

	float loopTime;					
	float delay;					
	float duration;					
	float gravity;					
	float velocityOverWorldSpace;	
	float velocityForceWorldSpace;	
	float velocityLimitDampen;

	float cameraScale;
	float speedScale;
	float lengthScale;
	float renderMode;
	float stayAtEnd;
};
ParticleStateData particleStateData;



mat4 buildRotMat4(vec3 rot)
{
	//____________
	float s;
	float c;

	s = sin(rot.x);
	c = cos(rot.x);
	
	mat4 ret = mat4(
	vec4(1.0, 0.0, 0.0, 0.0),
	vec4(0.0, c, s, 0.0),
	vec4(0.0, -s, c, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	);
	
	//____________
	s = sin(rot.y);
	c = cos(rot.y);
	
	ret = mat4(
	vec4(c, 0.0, -s, 0.0),
	vec4(0.0, 1.0, 0.0, 0.0),
	vec4(s, 0.0, c, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	) * ret;


	//____________
	s = sin(rot.z);
	c = cos(rot.z);

	ret = mat4(
	vec4(c, s, 0.0, 0.0),
	vec4(-s, c, 0.0, 0.0),
	vec4(0.0, 0.0, 1.0, 0.0),
	vec4(0.0, 0.0, 0.0, 1.0)
	) * ret;

	return ret;
}

mat4 buildMat4Quat(vec4 quat)
{
	float xx = quat.x * quat.x;
	float xy = quat.x * quat.y;
	float xz = quat.x * quat.z;
	float xw = quat.x * quat.w;

	float yy = quat.y * quat.y;
	float yz = quat.y * quat.z;
	float yw = quat.y * quat.w;

	float zz = quat.z * quat.z;
	float zw = quat.z * quat.w;

	return mat4(
		1.0 - 2.0 * (yy + zz),		2.0 * (xy + zw),		2.0 * (xz - yw),		0,
		2.0 * (xy - zw),				1.0 - 2.0 * (xx + zz),	2.0 * (yz + xw),		0,
		2.0 * (xz + yw),				2.0 * (yz - xw),		1.0 - 2.0 * (xx + yy),	0,
		0.0,							0.0,					0.0,					1
	);
}

float easeInOut(float t)
{
	t = clamp(t, 0.0, 1.0);
	float p0;
	float p1;
	float p2;
	if(t <= 0.5){ 
		p0 = 0.0; 
		p1 = 0.0; 
		p2 = 0.5; 
	}else{ 
		p0 = 0.5; 
		p1 = 1.0; 
		p2 = 1.0; 
		t -= 0.5;
	}
	t *= 2.0;
	
	p0 = mix(p0, p1, t);
	p1 = mix(p1, p2, t);
	
	p0 = mix(p0, p1, t);
	return p0;

}

void e_discard()
{
	discard_particle = 1.0;
}

float particle( ParticleData curParticle )
{
	//扣除延迟时间
	float time = particleStateData.time - particleStateData.delay;
	//还未出生
	currentTime = time - curParticle.bornTime;
	if(currentTime <= 0.0){
		return currentTime = 0.0;
	}
	//永久性的粒子
	if(particleStateData.stayAtEnd > TrueOrFalse){
		if(currentTime >= curParticle.life){
			currentTime = curParticle.life * 0.99999;
		}
	}
	if(particleStateData.loop < TrueOrFalse){
		//还没到出生时间，发射器已经死亡
		if(curParticle.bornTime >= particleStateData.duration){
			return currentTime = 0.0;
		}
		//单个粒子本身的生命周期已经结束
		if(time >= curParticle.life + curParticle.bornTime){
			return currentTime = 0.0;
		}
	}

	//计算当前粒子在单次循环中的相对时间
	currentTime = mod(currentTime, particleStateData.loopTime);
	//当前loopTime内超过粒子自身的什么周期，死亡状态
	if(currentTime >= curParticle.life){
		return currentTime = 0.0;
	}
	if( currentTime <= 0.0 ) 
		return currentTime = 0.0;
}



void calcCubicPos(float time, float totalTime, vec3 fromPos, vec3 endPos)
{
	
}

void trackPosition()
{
}

void rotateParticleUnit()
{
	rotVertexMatrix = buildRotMat4(vec3(0.0, 0.0, attribute_rotationBirth * PI / 180.0));
	if(particleStateData.renderMode == HorizontalBillboard){
		rotVertexMatrix *= buildRotMat4(vec3(0.5 * PI, 0.0, 0.0));
		localPosition = rotVertexMatrix * localPosition;
	}else if(particleStateData.renderMode == VerticalBillboard){
		rotVertexMatrix *= buildRotMat4(vec3(-0.5 * PI, 0.0, 0.0));
		localPosition = rotVertexMatrix * localPosition;
	}
}

void main(void) 
{
	localPosition = vec4(e_position, 1.0);
	particleStateData.time							= uniform_particleState[0];
	particleStateData.loop							= uniform_particleState[1];
	particleStateData.worldSpace					= uniform_particleState[2];
	particleStateData.scaleX						= uniform_particleState[3];
	particleStateData.scaleY						= uniform_particleState[4];
	particleStateData.scaleZ						= uniform_particleState[5];
	particleStateData.rotationX						= uniform_particleState[6];
	particleStateData.rotationY						= uniform_particleState[7];
	particleStateData.rotationZ						= uniform_particleState[8];
	particleStateData.rotationW						= uniform_particleState[9];
	particleStateData.positionX						= uniform_particleState[10];
	particleStateData.positionY						= uniform_particleState[11];
	particleStateData.positionZ						= uniform_particleState[12];
	particleStateData.loopTime						= uniform_particleState[13];
	particleStateData.delay							= uniform_particleState[14];
	particleStateData.duration						= uniform_particleState[15];
	particleStateData.gravity						= uniform_particleState[16];
	particleStateData.velocityOverWorldSpace		= uniform_particleState[17];
	particleStateData.velocityForceWorldSpace		= uniform_particleState[18];
	particleStateData.velocityLimitDampen			= uniform_particleState[19];

	particleStateData.cameraScale					= uniform_particleState[20];
	particleStateData.speedScale					= uniform_particleState[21];
	particleStateData.lengthScale					= uniform_particleState[22];
	particleStateData.renderMode					= uniform_particleState[23];
	particleStateData.stayAtEnd						= uniform_particleState[24];



	curParticle.bornTime = attribute_time.x ; 
	curParticle.life = attribute_time.y ; 
	curParticle.index = attribute_time.z ; 
	
	float active = particle( curParticle ) ;
	
	varying_particleData.x = currentTime;
	varying_particleData.y = curParticle.life ;
	varying_particleData.z = curParticle.index;
	
	if( active < TrueOrFalse ){
		e_discard();
		outPosition = localPosition = vec4(0.0, 0.0, 0.0, 1.0);
	}else{
		rotateParticleUnit();
		trackPosition();
		outPosition = localPosition;
		//varying_mvPose = mvMatrix * localPosition ;
	}

}


//##FilterEnd##
