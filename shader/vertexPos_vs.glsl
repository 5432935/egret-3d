uniform mat4 uniform_ModelMatrix;
uniform mat4 uniform_ViewMatrix;

varying vec4 varying_mvPose;
void main() {
       varying_mvPose = uniform_ViewMatrix * uniform_ModelMatrix * vec4(e_position, 1.0) ; 
}

                      