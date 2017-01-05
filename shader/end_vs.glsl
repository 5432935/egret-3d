vec4 endPosition ;
uniform float uniform_materialSource[20];
void main() {
	 gl_PointSize = uniform_materialSource[17];
     outPosition = uniform_ProjectionMatrix * outPosition ;
}

                      