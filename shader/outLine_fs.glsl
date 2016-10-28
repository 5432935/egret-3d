uniform float uniform_ouline[5] ;

void main(){
     diffuseColor = vec4(uniform_ouline[1],
                    uniform_ouline[2],
                    uniform_ouline[3],
                    uniform_ouline[4]) ;
    outColor = diffuseColor; 
}