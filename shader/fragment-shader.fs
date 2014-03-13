precision mediump float;

uniform sampler2D textureSampler;

varying vec2 fragTexCoord;

void main(void) {
  vec3 ambientLight = vec3(0.8, 0.8, 0.8);
  vec4 textureColor = texture2D(textureSampler, vec2(fragTexCoord.s, fragTexCoord.t));
  gl_FragColor = vec4(textureColor.rgb * ambientLight, textureColor.a);
}