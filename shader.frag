#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform sampler2D u_text;

float circle(vec2 uv, float radius) {
  return smoothstep(radius, radius - 0.01, length(uv));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 normUV = uv * 2.0 - 1.0;
  normUV.x *= u_resolution.x / u_resolution.y;

  float r = 0.3 + 0.1 * sin(u_time * 2.0);
  float mask = circle(normUV, r);

  vec4 textColor = texture2D(u_text, uv);
  vec4 finalColor = mix(vec4(1.0), textColor, mask);

  gl_FragColor = finalColor;
}
