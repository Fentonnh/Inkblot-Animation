let inkShader;
let textGraphic;
let quoteInput;

function preload() {
  try {
    inkShader = loadShader("shader.vert", "shader.frag");
  } catch (e) {
    alert("Shader load failed: " + e.message);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  if (!inkShader) {
    alert("Shader not loaded. Aborting.");
    noLoop();
    return;
  }

  // Create the quote input
  quoteInput = document.getElementById("quoteInput");
  quoteInput.value = "The unknown is not your enemy,\nit is your birthplace.";

  // Set up text graphics
  textGraphic = createGraphics(windowWidth, windowHeight);
  textGraphic.pixelDensity(1);
  updateTextGraphic();

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
  inkShader.setUniform("u_text", textGraphic); // Still here for later

  texture(textGraphic); // Not needed for test shader, but won’t hurt
  rect(-width / 2, -height / 2, width, height);
}
