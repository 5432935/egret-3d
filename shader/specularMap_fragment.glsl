uniform sampler2D specularTexture;
void main(void){
   	s.Specular = texture2D(specularTexture, uv_0).xyzx ;
}
