#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_text;

varying vec2 vTexCoord;

vec2 rotate(vec2 v, float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c) * v;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    total += noise(p) * amplitude;
    p = rotate(p * 2.0, 0.5);
    amplitude *= 0.5;
  }
  return total;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 centeredUV = uv * 2.0 - 1.0;
  centeredUV.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.4;
  float radius = 0.2 + 0.1 * sin(t);
  float n = fbm(centeredUV * 2.5 + vec2(t * 0.1, t * 0.2));
  float mask = smoothstep(radius, radius - 0.15, length(centeredUV) - n * 0.2);

  vec4 textColor = texture2D(u_text, vTexCoord);
  vec4 background = vec4(1.0); // white paper

  gl_FragColor = mix(background, textColor, mask);
}
