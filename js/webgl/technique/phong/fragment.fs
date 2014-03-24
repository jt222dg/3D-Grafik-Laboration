precision mediump float;

uniform sampler2D textureSampler;
uniform float textureScale;

varying vec2 fragTexCoord;
varying vec3 fragLighting;

void main(void) {
  vec4 textureColor = texture2D(textureSampler, vec2(fragTexCoord.s, fragTexCoord.t) * textureScale);
  gl_FragColor = vec4(textureColor.rgb * fragLighting, textureColor.a);
}