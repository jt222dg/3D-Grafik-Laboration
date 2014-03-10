attribute vec4 position;
attribute vec4 color;

uniform mat4 matrix;

varying vec4 fragColor;

void main(void) {
	gl_Position = position * matrix;
	fragColor = color;
}