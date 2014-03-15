precision mediump float;

struct DirectionalLight {
  vec3 ambient;
};

uniform DirectionalLight directionalLight;
uniform sampler2D textureSampler;

varying vec2 fragTexCoord;

void main(void) {
  vec4 textureColor = texture2D(textureSampler, vec2(fragTexCoord.s, fragTexCoord.t));
  gl_FragColor = vec4(textureColor.rgb * directionalLight.ambient, textureColor.a);
}