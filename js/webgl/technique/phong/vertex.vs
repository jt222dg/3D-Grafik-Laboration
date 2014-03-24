attribute vec4 position;
attribute vec3 normal;
attribute vec2 textureCoord;

struct DirectionalLight {
  vec3 ambient;
  vec3 diffuse;
  vec3 direction;
};

uniform DirectionalLight directionalLight;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat3 normalMatrix;

varying vec2 fragTexCoord;
varying vec3 fragLighting;

void main(void) {
	gl_Position = projectionMatrix * modelViewMatrix * position;
	fragTexCoord = textureCoord;
	
	vec3 transformedNormal = normalMatrix * normal;
	float lightIntensity = max(dot(transformedNormal, directionalLight.direction), 0.0);
	fragLighting = directionalLight.ambient + directionalLight.diffuse * lightIntensity;
}