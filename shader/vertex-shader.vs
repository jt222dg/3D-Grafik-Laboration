attribute vec4 position;
attribute vec4 color;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec4 fragColor;

void main(void) {
	gl_Position = projectionMatrix * modelViewMatrix * position;
	fragColor = color;
}