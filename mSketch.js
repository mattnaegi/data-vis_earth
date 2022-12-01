var cameraX = 0,
  cameraY = 0,
  cameraZ = 800;
let pointsOfInterest;
let radius = 300;
let rotation = 1;
let rotationStep = 0;
const pointOfInterestSize = 5;

const SPHERE1 = 10;
const SPHERE2 = 11;
const BUTTON1 = 12;
const BUTTON2 = 13;

function preload() {
  earthTexture = loadImage("images/earth-texture-night.jpg");
  cloudTexture = loadImage("images/cloud-texture.png");
  Roboto = loadFont("roboto.ttf");
}

function setup() {
  mCreateCanvas(window.innerWidth, window.innerHeight, WEBGL);
  pg = createGraphics(400, 400);
  noStroke();
}

function draw() {
  mBackground(0);
  mResetMatrix();

  mCamera(cameraX, cameraY, cameraZ);

  rotateY(rotationStep);

  drawEarth(radius);
}

function drawEarth(earthRadius) {
  rotateY(rotation);
  rotation += rotationStep;

  //drawAxes();
  mPush();
  noStroke();
  mTexture(earthTexture);
  mSphere(SPHERE2, earthRadius, 50, 50);
  mPop();
}

function rotateEarth(deltaX) {
  rotationStep = deltaX / 40;
  console.log(rotationStep);
}

function stopRotatingEarth() {
  rotationStep = 0;
  console.log(rotationStep);
}

function drawAxes() {
  const len = radius + 100;
  push();
  stroke("white");
  strokeWeight(5);
  fill("white");
  text("(0/0/0)", 0, 0);

  stroke("red");
  line(0, 0, 0, len, 0, 0); // X axis
  text("x", len + 10, 0);

  stroke("green");
  line(0, 0, 0, 0, len, 0);
  text("y", 0, len + 10);

  stroke("yellow");
  line(0, 0, 0, 0, 0, len);
  pop();

  push();
  rotateX(radians(90));
  translate(0, len);
  rotateX(radians(-90));
  text("z", 10, 0);
  pop();
}

function pointOnSphere({ r, theta, phi }) {
  const x = r * cos(phi) * sin(theta);
  const z = r * sin(theta) * sin(phi);
  const y = -(r * cos(theta)); // because y axis is pointing down we need the negative value to match it with theta
  return createVector(x, y, z);
}

function create3DButton(posIndex, ID) {
  pg.textSize(50);
  pg.textureMode(NORMAL);
  pg.noFill();
  pg.strokeWeight(2);
  pg.text("BUTTON", 50, 80);
  pg.strokeWeight(10);
  pg.rect(0, 0, 350, 120);

  const point = pointsOfInterest[posIndex];
  const vector = pointOnSphere({
    r: radius,
    theta: point.theta,
    phi: point.phi,
  });

  mPush();
  mTranslate(vector.x + 50, vector.y + 30, vector.z);
  mTexture(pg);
  mPlane(ID, 100, 100);
  mPop();

  if (objectAtMouse() == ID && mouseIsPressed) {
    pg.stroke(255, 0, 0);
  } else {
    pg.stroke(255, 255, 255);
  }
}