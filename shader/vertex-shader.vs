attribute vec4 position;
uniform mat4 Mmatrix;
void main(void) {
	gl_Position = position * Mmatrix;
}