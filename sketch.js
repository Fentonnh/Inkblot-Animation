let inkShader;
let textGraphic;
let quoteInput;

function preload() {
  inkShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // Reference the HTML text area
  quoteInput = document.getElementById("quoteInput");
  quoteInput.value = "The unknown is not your enemy,\nit is your birthplace.";

  // Create off-screen graphics for the quote
  textGraphic = createGraphics(windowWidth, windowHeight);
  textGraphic.pixelDensity(1);
  updateTextGraphic();

  // Update whenever the input changes
  quoteInput.addEventListener("input", updateTextGraphic);
}

function updateTextGraphic() {
  textGraphic.clear();
  textGraphic.background(255);
  textGraphic.fill(0);
  textGraphic.textAlign(CENTER, CENTER);
  textGraphic.textSize(36);
  textGraphic.textFont("Georgia");
  textGraphic.text(
    quoteInput.value,
    textGraphic.width / 2,
    textGraphic.height / 2
  );
}

function draw() {
  shader(inkShader);
  inkShader.setUniform("u_time", millis() / 1000.0);
  inkShader.setUniform("u_resolution", [width, height]);
  inkShader.setUniform("u_text", textGraphic);

  // ✅ This was missing before — required to bind the texture
  texture(textGraphic);

  // Draw the rectangle with the shader effect applied
  rect(-width / 2, -height / 2, width, height);
}
