precision highp float;

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

  if (mode.gaussianBlur)
  {
    // One pixel in texture coords
    const float dt  = 1.0/256.0;
    
    vec2 tc = fragTexCoord;
    
    textureColor += texture2D(textureSampler, vec2(tc.s - 4.0*dt, tc.t - 4.0*dt) * textureScale) * 0.0162162162;
    textureColor += texture2D(textureSampler, vec2(tc.s - 3.0*dt, tc.t - 3.0*dt) * textureScale) * 0.0540540541;
    textureColor += texture2D(textureSampler, vec2(tc.s - 2.0*dt, tc.t - 2.0*dt) * textureScale) * 0.1216216216;
    textureColor += texture2D(textureSampler, vec2(tc.s - 1.0*dt, tc.t - 1.0*dt) * textureScale) * 0.1945945946;
    
    textureColor += texture2D(textureSampler, vec2(tc.s, tc.t) * textureScale) * 0.2270270270;
    
    textureColor += texture2D(textureSampler, vec2(tc.s + 1.0*dt, tc.t + 1.0*dt) * textureScale) * 0.1945945946;
    textureColor += texture2D(textureSampler, vec2(tc.s + 2.0*dt, tc.t + 2.0*dt) * textureScale) * 0.1216216216;
    textureColor += texture2D(textureSampler, vec2(tc.s + 3.0*dt, tc.t + 3.0*dt) * textureScale) * 0.0540540541;
    textureColor += texture2D(textureSampler, vec2(tc.s + 4.0*dt, tc.t + 4.0*dt) * textureScale) * 0.0162162162;
    
    textureColor /= 2.0;
  }
  if (mode.renderOdds)
  {
    // One pixel in texture coords
    const float dt = 1.0/256.0;
    
    
    // One pixel in integer
    float pixel = fragTexCoord.x / dt;
    
    if (floor(mod(pixel, 2.0)) == floor(0.0))
    {
      textureColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  }
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
  
  textureColor = vec4(textureColor.rgb * fragLighting, textureColor.a);
  gl_FragColor = textureColor;
}