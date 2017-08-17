void main() 
{
	//s.Albedo.xyz = vec3(1.0, 1.0, 1.0);
	//s.Alpha = 1.0 ; 
  
	s.Albedo.xyz = materialSource.diffuse;
	s.Alpha = materialSource.alpha;
	
	if( varying_color.w < materialSource.cutAlpha ){ 
		discard; 
	}
}