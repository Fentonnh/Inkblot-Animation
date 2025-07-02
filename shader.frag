#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
varying vec2 vTexCoord;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float pulse = 0.5 + 0.5 * sin(u_time * 3.0);
  vec3 col = mix(vec3(1.0), vec3(0.0, 0.0, 0.0), step(0.5, pulse));
  gl_FragColor = vec4(col, 1.0);
}
