let purplePos, pinkPos, lightBluePos, darkBluePos;
let purpleSize, pinkSize, lightBlueSize, darkBlueSize;
let purpleGradient, darkBlueGradient;
let pinkStrokeWeight = 7; 
let angle = 0; 
let smallLightBlueCircles = []; 
let purpleHexagonPos; 
let img, imgPos, imgScale = 0.1;
let movingRight = true;

function preload() {
  img = loadImage('crescendo_logo.png');
}

function setup() {
  createCanvas(1280, 720);
  frameRate(60); 

  purplePos = createVector(-30, -60);
  pinkPos = createVector(80, 160);
  lightBluePos = createVector(165, 90);
  darkBluePos = createVector(160, -40);
  imgPos = createVector(-80, -200);

  purpleSize = createVector(100, 100);
  pinkSize = 180;
  lightBlueSize = 160;
  darkBlueSize = createVector(60, 245);

  purpleGradient = createGraphics(purpleSize.x + 1, purpleSize.y + 1); 
  let topLeftColor = color(123, 92, 202);
  let bottomRightColor = color(181, 66, 123);

  for (let i = 0; i <= purpleSize.y; i++) {
    let gradientColor = lerpColor(topLeftColor, bottomRightColor, i / purpleSize.y);
    purpleGradient.stroke(gradientColor);
    purpleGradient.line(0, i, purpleSize.x, i);
  }

  darkBlueGradient = createGraphics(darkBlueSize.x + 1, darkBlueSize.y + 1); 
  let topColor = color(54, 121, 165);
  let bottomColor = color(16, 58, 89);

  for (let i = 0; i <= darkBlueSize.y; i++) {
    let gradientColor = lerpColor(topColor, bottomColor, i / darkBlueSize.y);
    darkBlueGradient.stroke(gradientColor);
    darkBlueGradient.line(0, i, darkBlueSize.x, i);
  }

  smallLightBlueCircles = [
    createVector(140, 40),
    createVector(70, 240),
    createVector(160, 270)
  ];

  purpleHexagonPos = createVector(-60, 80);
}

function draw() {
  background(25, 43, 54);
  translate(width / 2, height / 2);

  //drawGrid();

  movePurple();
  movePink();
  moveLightBlue();
  moveDarkBlue();

  if (frameCount < 34) { 
    drawPurple(purplePos.x, purplePos.y, 8, purpleSize); 
  }
  drawPink(pinkPos.x, pinkPos.y, pinkSize, pinkStrokeWeight);
  drawLightBlue(lightBluePos.x, lightBluePos.y, lightBlueSize);

  if (frameCount >= 44 && frameCount <= 52) { 
    let tiltAngle = map(frameCount, 44, 52, 0, -PI / 2); 

    let centerX = darkBluePos.x + darkBlueSize.x / 2;
    let centerY = darkBluePos.y + darkBlueSize.y; 

    push();
    translate(centerX, centerY);
    rotate(tiltAngle);
    translate(-centerX, -centerY);

    drawDarkBlue(darkBluePos.x, darkBluePos.y, 8, darkBlueSize); 

    pop();
  } else if (frameCount <= 42) { 
    drawDarkBlue(darkBluePos.x, darkBluePos.y, 8, darkBlueSize); 
  }

  if (frameCount >= 34) { 
    for (let i = 0; i < smallLightBlueCircles.length; i++) {
      let circle = smallLightBlueCircles[i];
      drawSmallLightBlue(circle.x, circle.y);
    }
  }

  if (frameCount >= 34 && frameCount <= 52) { 
    if (frameCount == 34) { 
      smallLightBlueCircles = [
        createVector(140, 40),
        createVector(70, 240),
        createVector(160, 270)
      ];
    }
    smallLightBlueCircles[0].x -= 3;
    smallLightBlueCircles[1].x -= 5;
    smallLightBlueCircles[2].x -= 10;
  }

  if (frameCount == 54) { 
    pinkSize *= 0.875;
    pinkStrokeWeight -= 2;
    lightBlueSize *= 0.571;

    purplePos = createVector(-60, 240);
    purpleSize = createVector(200, 40); 

    darkBluePos.set(110, -20);
    darkBlueSize.set(30, 30);

    smallLightBlueCircles[0] = createVector(-999, -999);
    smallLightBlueCircles[1].y -= 250;
  }

  if (frameCount >= 56 && frameCount <= 80) { 
    let t = (frameCount - 54) / 24; 
    let radius = dist(50, 30, -60, 20); 
    let angle = lerp(0, -PI, t); 
    smallLightBlueCircles[2].x = 50 + radius * cos(angle);
    smallLightBlueCircles[2].y = 30 + radius * sin(angle);

    smallLightBlueCircles[1].y -= 1;
    pinkPos.y -= 1;
    lightBluePos.y -= 1;
    purplePos.y -= 1;
    purpleSize.y -= 1;

    if (frameCount >= 56 && frameCount <= 62) { 
      darkBluePos.y -= 1;
      purpleHexagonPos.y -= 1;
    }

    if (frameCount >= 54 && frameCount <= 72) {
      let hexagonAngle = map(frameCount, 56, 76, 0, -PI); 
      push();
      translate(purpleHexagonPos.x, purpleHexagonPos.y);
      rotate(hexagonAngle);
      translate(-purpleHexagonPos.x, -purpleHexagonPos.y);
      drawPurpleHexagon(purpleHexagonPos.x, purpleHexagonPos.y, 16);
      pop();
    }

    if (frameCount >= 72) { 
      drawPurpleHexagon(purpleHexagonPos.x, purpleHexagonPos.y, 16);
    }

    drawPurple(purplePos.x, purplePos.y, 8, purpleSize);
    drawPink(pinkPos.x, pinkPos.y, pinkSize, pinkStrokeWeight);
    drawLightBlue(lightBluePos.x, lightBluePos.y, lightBlueSize);
  }

  if (frameCount >= 72) { 
    drawPurpleHexagon(purpleHexagonPos.x, purpleHexagonPos.y, 16);
  }

  if (frameCount == 80) { 
    smallLightBlueCircles[2].x = -60;
    smallLightBlueCircles[2].y = 20;
  }

  if (frameCount >= 64 && frameCount <= 82) { 
    let moveDownAmount = map(frameCount, 64, 82, 0, 200 - darkBluePos.y); 
    darkBluePos.y += moveDownAmount / (82 - 64 + 1); 

    let rotateAngle = map(frameCount, 64, 82, 0, -TWO_PI); 
    push();
    translate(darkBluePos.x + darkBlueSize.x / 2, darkBluePos.y + darkBlueSize.y / 2); 
    rotate(rotateAngle);
    translate(-(darkBluePos.x + darkBlueSize.x / 2), -(darkBluePos.y + darkBlueSize.y / 2));
    drawDarkBlue(darkBluePos.x, darkBluePos.y, 8, darkBlueSize);
    pop();
  }

  if (frameCount == 82) { 
    darkBluePos.y = 200;
    drawDarkBlue(darkBluePos.x, darkBluePos.y, 8, darkBlueSize);
  }

  if (frameCount >= 82 && frameCount <= 90) { 
    let t = (frameCount - 82) / 4;
    let radius = 8;
    let angle = lerp(PI, 2 * PI, t); 
    smallLightBlueCircles[1].x = smallLightBlueCircles[1].x + radius * cos(angle);
    smallLightBlueCircles[1].y = smallLightBlueCircles[1].y + radius * sin(angle);
  }

  if (frameCount >= 82 && frameCount <= 94) { 
    let t = (frameCount - 82) / 6; 
    let radius = 4; 
    let angle = lerp(PI / 2, -PI / 2, t); 
    smallLightBlueCircles[2].x = smallLightBlueCircles[2].x + radius * cos(angle);
    smallLightBlueCircles[2].y = smallLightBlueCircles[2].y + radius * sin(angle);
  }

  if (frameCount >= 92 && frameCount <= 98) { 
    let t = (frameCount - 92) / 6; 
    smallLightBlueCircles[1].x = lerp(smallLightBlueCircles[1].x, purpleHexagonPos.x, t);
    smallLightBlueCircles[1].y = lerp(smallLightBlueCircles[1].y, purpleHexagonPos.y, t);
  }
  if (frameCount >= 100) { 
    smallLightBlueCircles[1].x = -999;
    smallLightBlueCircles[1].y = -999;
  }

  if (frameCount >= 96 && frameCount <= 102) { 
    let t = (frameCount - 96) / 6; 
    smallLightBlueCircles[2].x = lerp(smallLightBlueCircles[2].x, purpleHexagonPos.x, t);
    smallLightBlueCircles[2].y = lerp(smallLightBlueCircles[2].y, purpleHexagonPos.y, t);
  }
  if (frameCount >= 104) { 
    smallLightBlueCircles[2].x = -999;
    smallLightBlueCircles[2].y = -999;
    purpleHexagonPos.x = -999;
    purpleHexagonPos.y = -999;
  }

  if (frameCount >= 84 && frameCount <= 106) { 
    let t = (frameCount - 84) / 22; 
    let rotationAngle = lerp(0, 2 * PI, t); 
    let orbitAngle = lerp(0, -PI, t); 

    let startX = purplePos.x;
    let startY = purplePos.y;
    let finalX = -30 + 50;
    let finalY = -60 + 50;
    let currentX = lerp(startX, finalX, t);
    let currentY = lerp(startY, finalY, t);

    purplePos.x = currentX;
    purplePos.y = currentY;

    push();
    translate(purplePos.x, purplePos.y); 
    rotate(rotationAngle);
    drawPurple(-purpleSize.x / 2, -purpleSize.y / 2, 8, purpleSize); 
    pop();
  } else if (frameCount >= 108) { 
    drawPurple(purplePos.x - purpleSize.x / 2, purplePos.y - purpleSize.y / 2, 8, purpleSize);
  }

  if (frameCount >= 98 && frameCount <= 114) { 
    let t = (frameCount - 98) / 16; 
    purpleSize.x = lerp(100, 50, t);
    purpleSize.y = lerp(100, 50, t); 
  }

  if (frameCount >= 116 && frameCount <= 126) { 
    let t = (frameCount - 116) / 10;
    purpleSize.x = lerp(20, 100, t);
    purpleSize.y = lerp(20, 100, t); 

    drawPurple(purplePos.x - purpleSize.x / 2, purplePos.y - purpleSize.y / 2, 8, purpleSize);
  }

  if (frameCount >= 86 && frameCount <= 126) { 
    let pinkInitialPos = pinkPos.copy();
    let lightBlueInitialPos = lightBluePos.copy();

    if (frameCount >= 86 && frameCount <= 94) {
      let t = (frameCount - 86) / 8;
      pinkSize = lerp(100, 180, t); 
      lightBlueSize = lerp(80, 160, t); 
    }

    let t = (frameCount - 86) / 40; 
    let orbitAngle = lerp(0, 2 * PI, t); 

    let pinkCenterX = (pinkInitialPos.x + 80) / 2;
    let pinkCenterY = (pinkInitialPos.y + 160) / 2;
    let pinkRadiusX = Math.abs(pinkInitialPos.x - 80) / 2;
    let pinkRadiusY = Math.abs(pinkInitialPos.y - 160) / 2;

    let pinkCurrentX = pinkCenterX + pinkRadiusX * cos(orbitAngle);
    let pinkCurrentY = pinkCenterY + pinkRadiusY * sin(orbitAngle);

    pinkPos.x = pinkCurrentX;
    pinkPos.y = pinkCurrentY;

    let lightBlueCenterX = (lightBlueInitialPos.x + 165) / 2;
    let lightBlueCenterY = (lightBlueInitialPos.y + 90) / 2;
    let lightBlueRadiusX = Math.abs(lightBlueInitialPos.x - 165) / 2;
    let lightBlueRadiusY = Math.abs(lightBlueInitialPos.y - 90) / 2;

    let lightBlueCurrentX = lightBlueCenterX + lightBlueRadiusX * cos(orbitAngle);
    let lightBlueCurrentY = lightBlueCenterY + lightBlueRadiusY * sin(orbitAngle);

    lightBluePos.x = lightBlueCurrentX;
    lightBluePos.y = lightBlueCurrentY;
  }

  if (frameCount >= 126) {
    frameCount = 0;
    movingRight = !movingRight;
    resetAnimation();
  }

  moveImage();
  image(img, imgPos.x, imgPos.y, img.width * imgScale, img.height * imgScale); 
}

function resetAnimation() {
  purplePos = createVector(-30, -60);
  pinkPos = createVector(80, 160);
  lightBluePos = createVector(165, 90);
  darkBluePos = createVector(160, -40);

  purpleSize = createVector(100, 100);
  pinkSize = 180;
  lightBlueSize = 160;
  darkBlueSize = createVector(60, 245);

  pinkStrokeWeight = 7;
  angle = 0;

  smallLightBlueCircles = [
    createVector(140, 40),
    createVector(70, 240),
    createVector(160, 270)
  ];

  purpleHexagonPos = createVector(-60, 80);
}

function moveImage() {
  if (movingRight) {
    imgPos.x += 2;  
  } else {
    imgPos.x -= 2;
  }

  if (imgPos.x > 180) {
    movingRight = !movingRight;
  }
}

function drawSmallLightBlue(x, y) {
  fill(117, 239, 255); 
  noStroke(); 
  ellipse(x, y, 13, 13); 
}

function movePurple() {
  if (frameCount == 4) { 
    purplePos.x += 4;
  } else if (frameCount == 6) {
    purpleSize.x += 4;
  } else if (frameCount == 8) { 
    purpleSize.x -= 4;
  } else if (frameCount >= 10 && frameCount <= 26) { 
    purplePos.x -= 36 / 18; 
  } else if (frameCount >= 28 && frameCount <= 32) { 
    purplePos.x += 124 / 6; 
  }
}

function movePink() {
  if (frameCount == 4) {
    pinkSize /= 1.375;
  }
  if (frameCount >= 4 && frameCount <= 42) { 
    pinkPos.x -= cos(angle) * 2; 
    pinkPos.y -= sin(angle) * 2;
    angle += PI / 180; 
  }
  if (frameCount == 34) { 
    lightBluePos = pinkPos.copy();
  }
  if (frameCount >= 44 && frameCount <= 50) {
    pinkPos.x -= cos(angle) * 2; 
    pinkPos.y -= sin(angle) * 2;
    lightBluePos = pinkPos.copy(); 
  }
  if (frameCount == 52) { 
    angle = 0;
  }
}

function moveLightBlue() {
  if (frameCount == 4) { 
    lightBluePos.x -= cos(angle) * 5; 
    lightBluePos.y += sin(angle) * 5;
    angle += PI / 180; 
  }
  if (frameCount >= 6 && frameCount <= 42) { 
    lightBluePos.x -= cos(angle) * 5; 
    lightBluePos.y += sin(angle) * 5;
    angle += PI / 180;
  }
  if (frameCount == 28) { 
    lightBlueSize *= 0.73;
  }
  if (frameCount == 42) { 
    lightBluePos = pinkPos.copy();
  }
  if (frameCount >= 44 && frameCount <= 50) { 
    lightBluePos = pinkPos.copy(); 
  }
  if (frameCount == 52) { 
    angle = 0;
  }
}

function moveDarkBlue() {
  if (frameCount == 4 || frameCount == 6) {
    darkBlueSize.x *= 1.125;
    darkBlueSize.y *= 1.133;
  } else if (frameCount >= 10 && frameCount <= 26) { 
    let targetX = purplePos.x + purpleSize.x + 10; 
    darkBluePos.x -= (darkBluePos.x - targetX) / (28 - frameCount); 
  } else if (frameCount >= 28 && frameCount <= 32) { 
    darkBluePos.x += 148 / 6; 
  } else if (frameCount >= 34 && frameCount <= 42) { 
    darkBlueSize.x -= 60 / 8; 
    darkBlueSize.y += 40 / 8; 
  } else if (frameCount >= 44 && frameCount <= 52) {
    let tiltAngle = map(frameCount, 44, 52, 0, -PI / 2); 

    push();

    let centerX = darkBluePos.x + darkBlueSize.x / 2; 
    let centerY = darkBluePos.y + darkBlueSize.y; 

    translate(centerX, centerY);
    rotate(tiltAngle);
    translate (-centerX, -centerY);

    drawDarkBlue(darkBluePos.x, darkBluePos.y, 8, darkBlueSize);

    pop();
  }
}

function drawPurple(x, y, borderRadius, size) {
  push();
  translate(x, y);
  rectMode(CORNER); 
  fill(123, 92, 202);
  rect(0, 0, size.x, size.y, borderRadius); 
  drawingContext.clip();
  image(purpleGradient, 0, 0); 
  pop();
}

function drawPink(x, y, size, pinkStrokeWeight) {
  stroke(253, 209, 233); 
  strokeWeight(pinkStrokeWeight);
  noFill();
  ellipse(x, y, size, size);
}

function drawLightBlue(x, y, size) {
  fill(117, 239, 255);
  noStroke();
  ellipse(x, y, size, size);
}

function drawDarkBlue(x, y, borderRadius, size) {
  push();
  translate(x, y); 
  beginShape();
  for (let i = 0; i <= size.y; i++) {
    let gradientColor = lerpColor(color(54, 121, 165), color(16, 58, 89), i / size.y);
    stroke(gradientColor);
    line(0, i, size.x, i); 
  }
  endShape();
  pop();
}

function drawGrid() {
  stroke(100, 100, 100, 50); 
  strokeWeight(1);

  for (let x = -width / 2; x < width / 2; x += 4) {
    line(x, -height / 2, x, height / 2);
  }

  for (let y = -height / 2; y < height / 2; y += 4) {
    line(-width / 2, y, width / 2, y);
  }

  fill(255); 
  textSize(12);
  textAlign(CENTER, CENTER);

  for (let x = -width / 2; x < width / 2; x += 40) {
    text(x, x, 10);
  }

  for (let y = -height / 2; y < height / 2; y += 40) {
    text(y, 10, y);
  }
}

function drawPurpleHexagon(x, y, size) {
  push();
  translate(x, y);
  stroke(183, 72, 129); 
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    let px = cos(angle) * size;
    let py = sin(angle) * size;
    vertex(px, py);
  }
  endShape(CLOSE);
  pop();
}