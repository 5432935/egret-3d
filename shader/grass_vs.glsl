attribute vec3 attribute_grassOffset;
attribute float attribute_grassAngleY;
uniform float uniform_grass_data[9];
uniform float uniform_squeeze_data[6];
uniform float uniform_lightMap_data[5];
uniform mat4 uniform_cameraMatrix;
uniform mat4 uniform_billboardMatrix;

varying vec4 varying_mvPose; 
varying vec4 varying_scenePose;
const float TrueOrFalse = 0.5;
const float PI_2 = 6.283;

struct SqueezeData{
	float enable;
	vec3 position;
	float strength;
	float radius;
};

SqueezeData squeezeData;


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

vec4 buildQuat(vec3 axis, float angle){
  axis = normalize(axis);
  vec4 ret;
  
  float halfAngle = angle * 0.5;
  float sin_a = sin(angle);
  ret.w = cos(halfAngle);
  ret.x = axis.x * sin_a;
  ret.y = axis.y * sin_a;
  ret.z = axis.z * sin_a;
  
  ret = normalize(ret);
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


void main(void){

	
	if(uniform_grass_data[8] > TrueOrFalse){
		rotVertexMatrix = uniform_billboardMatrix;
	}else{
		rotVertexMatrix = buildRotMat4(vec3(0.0, attribute_grassAngleY, 0.0));
	}
	e_position.xyz = (rotVertexMatrix * vec4(e_position, 1.0)).xyz;
	e_normal.xyz = (rotVertexMatrix * vec4(e_normal, 1.0)).xyz;

	if(e_position.y > 0.0){ 
		float windDirectionX			= uniform_grass_data[0];
		float windDirectionZ			= uniform_grass_data[1];
		float windSpaceX				= uniform_grass_data[2];
		float windSpaceZ				= uniform_grass_data[3];
		float windStrength				= uniform_grass_data[4];
		float windSpeed					= uniform_grass_data[5];
		float shakeScale				= uniform_grass_data[6];
		float grassTime					= uniform_grass_data[7];

		squeezeData.enable			= uniform_squeeze_data[0];
		squeezeData.position.x		= uniform_squeeze_data[1];
		squeezeData.position.y		= uniform_squeeze_data[2];
		squeezeData.position.z		= uniform_squeeze_data[3];
		squeezeData.radius			= uniform_squeeze_data[4];
		squeezeData.strength		= uniform_squeeze_data[5];

		windSpaceX = PI_2 * (attribute_grassOffset.x + abs(windDirectionX) * windSpeed * grassTime) / windSpaceX;
		windSpaceZ = PI_2 * (attribute_grassOffset.z + abs(windDirectionZ) * windSpeed * grassTime) / windSpaceZ;
		
		float angle = sin(windSpaceX + windSpaceZ) * shakeScale + windStrength;
		angle = clamp(angle, -1.57, 1.57);
    
		vec3 windDir = vec3(windSpaceX, 0.0, windSpaceZ);
		vec3 windDirY = vec3(0.0, 1.0, 0.0);
		windDir = normalize(windDir);
    
		vec3 axis = cross(windDirY,windDir); 
		vec4 quat = buildQuat(axis, angle);
		mat4 matrix = buildMat4Quat(quat);
    
		vec2 orgXZ = vec2(e_position.x, e_position.z);
		e_position.x = e_position.z = 0.0;
		e_position = (matrix * vec4(e_position, 1.0)).xyz;
   
		e_position.xz += orgXZ;

		//挤压,之检测xz所在平面内的位置
		if(squeezeData.enable > TrueOrFalse){
			vec3 distanceVec3 = squeezeData.position - attribute_grassOffset;
			vec2 distance2D = vec2(distanceVec3.x, distanceVec3.z);
			float distanceFloat = sqrt(dot(distance2D, distance2D));
			if(distanceFloat < squeezeData.radius){
				float ratio = distanceFloat / squeezeData.radius;
				ratio = 1.0 - ratio;
				distanceVec3 = normalize(distanceVec3);
				distanceVec3 *= squeezeData.strength * ratio * abs(e_position.y - squeezeData.position.y);
				e_position -= distanceVec3;
			}
		}
	}


	e_position += attribute_grassOffset;
	mat4 mvMatrix = mat4(uniform_ViewMatrix * uniform_ModelMatrix);
	varying_mvPose = outPosition = mvMatrix * vec4( e_position , 1.0 ); 
    varying_scenePose = vec4( e_position, 1.0 );

    mat4 normalMatrix = inverse(mvMatrix) ;
    normalMatrix = transpose(normalMatrix); 

    varying_eyeNormal = mat3(normalMatrix) * - e_normal; 
    varying_color = attribute_color; 
    
}

