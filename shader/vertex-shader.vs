attribute vec4 position;
attribute vec2 textureCoord;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 fragTexCoord;

void main(void) {
	gl_Position = projectionMatrix * modelViewMatrix * position;
	fragTexCoord = textureCoord;
}