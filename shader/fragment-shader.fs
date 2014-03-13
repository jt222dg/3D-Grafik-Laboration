precision mediump float;

uniform sampler2D textureSampler;

varying vec2 fragTexCoord;

void main(void) {
  gl_FragColor = texture2D(textureSampler, vec2(fragTexCoord.s, fragTexCoord.t));
  //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}