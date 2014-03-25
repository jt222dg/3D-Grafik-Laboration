precision mediump float;

struct Mode {
  bool inverted;
  bool greyscale;
  bool gaussianBlur;
  bool texcoordsAsColors;
  bool renderOdds;
};

uniform Mode mode;
uniform sampler2D textureSampler;
uniform float textureScale;

varying vec2 fragTexCoord;
varying vec3 fragLighting;

void main(void) {
  vec4 textureColor = texture2D(textureSampler, vec2(fragTexCoord.s, fragTexCoord.t) * textureScale);
  textureColor = vec4(textureColor.rgb * fragLighting, textureColor.a);
  
  if (mode.texcoordsAsColors)
  {
    textureColor = vec4(fragTexCoord.s, fragTexCoord.t, 1.0 - textureColor.b, textureColor.a);
  }
  if (mode.inverted)
  {
    textureColor = vec4(1.0 - textureColor.r, 1.0 - textureColor.g, 1.0 - textureColor.b, textureColor.a);
  }
  if (mode.greyscale)
  {
    float grey = dot(textureColor.rgb, vec3(0.299, 0.587, 0.114));
    textureColor = vec4(grey, grey, grey, textureColor.a);
  }
  
  gl_FragColor = textureColor;
}