#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.428, 1.0, 1.0);
    vec3 d = vec3(0.618, 0.333, 0.667);

    return a + b*cos(6.28318*(c*t+d));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * 2. - 1.;
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 uvo = uv;
    vec3 finalColor = vec3(0.);

    uv += u_mouse * 0.001;
    uv.y += u_time * .2;

    for (float i = 0.; i < 3.; i++) {
        uv = fract(uv * 1.5) - .5;

        float d = length(uv) * exp(-length(uvo));

        vec3 color = palette(length(uvo) + i * .5 + u_time * .3);

        d = sin(d * 10. + u_time) / 10.;
        d = abs(d);

        d = pow(.01 / d, 1.3);

        finalColor += color * d;
    }

    gl_FragColor = vec4(finalColor, 1);
}