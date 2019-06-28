const [width, height] = [64, 64];
let classifier;

function preload() {
  classifier = ml5.imageClassifier('MobileNet');
}

function rx() { return width * Math.random(); }
function ry() { return height * Math.random(); }
function rgb() { return [Math.random()*255,Math.random()*255,Math.random()*255]; }

async function setup() {
  createCanvas(width, height);
  var trials = [];
  for (var i = 0; i < 3; i++) {
    trials.push(await trial());
  }
  alert(JSON.stringify(trials, null, 2));
}

async function trial(next) {
  console.log('trial');
  console.log('  drawing...');
  _.range(0, 150).map(i => {
    fill.apply(null, rgb());
    triangle(rx(), ry(), rx(), ry(), rx(), ry());
    fill.apply(null, rgb());
    ellipse(rx(), ry(), rx(), ry());
  });
  
  console.log("  predicting...");
  return new Promise((resolve, reject) => {
    const el = document.querySelector('canvas');
    classifier.predict(el, function(err, results) {
      const data = document.querySelector('canvas').toDataURL();
      const pack = {err, results, data};
      createDiv(JSON.stringify(pack, null, 2));
      return resolve(pack);
    });
  });
}
