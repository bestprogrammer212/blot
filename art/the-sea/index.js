/*
@title: The sea
@author: bestprogrammer212
@snapshot: snapshot0
*/
var width = 125;
var height = 125;
setDocDimensions(width, height);

var lines = [];

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function addLine(pts) {
  if (pts && pts.length > 1) lines.push(pts);
}

function addQ(p0, p1, p2, steps) {
  var pts = [];
  for (var i = 0; i <= steps; i++) {
    var t = i / steps;
    var mt = 1 - t;
    pts.push([
      mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0],
      mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1]
    ]);
  }
  addLine(pts);
}

function addCircle(cx, cy, r, steps) {
  var pts = [];
  for (var i = 0; i <= steps; i++) {
    var a = (i / steps) * Math.PI * 2;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  addLine(pts);
}

function addArc(cx, cy, r, a0, a1, steps) {
  var pts = [];
  for (var i = 0; i <= steps; i++) {
    var a = a0 + (a1 - a0) * (i / steps);
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  addLine(pts);
}

function addThickBranch(p0, p1, p2, count, widthAmt, endScale, steps) {
  var dx = p2[0] - p0[0];
  var dy = p2[1] - p0[1];
  var len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) len = 1;
  var nx = -dy / len;
  var ny = dx / len;

  for (var i = 0; i < count; i++) {
    var u = count === 1 ? 0.5 : i / (count - 1);
    var o = -widthAmt + u * widthAmt * 2;
    addQ(
      [p0[0] + nx * o, p0[1] + ny * o],
      [p1[0] + nx * o * 0.8, p1[1] + ny * o * 0.8],
      [p2[0] + nx * o * endScale, p2[1] + ny * o * endScale],
      steps
    );
  }
}

function meadowY(x) {
  return 14 + Math.sin(x * 0.05) * 4 + Math.cos(x * 0.018) * 3;
}

function addLeafBlob(x, y, r) {
  addCircle(x, y, r, 22);
  addCircle(x - r * 0.12, y + r * 0.08, r * 0.62, 16);
}

function drawCloud(x, y, s) {
  addArc(x - s * 1.35, y, s * 0.82, 0.2, Math.PI - 0.2, 12);
  addArc(x - s * 0.45, y + s * 0.24, s * 1.08, 0.12, Math.PI - 0.12, 14);
  addArc(x + s * 0.42, y + s * 0.3, s * 0.92, 0.1, Math.PI - 0.1, 14);
  addArc(x + s * 1.15, y + s * 0.1, s * 0.7, 0.18, Math.PI - 0.18, 12);
  addLine([[x - s * 2, y], [x + s * 1.7, y]]);
}

var horizonY = 57;
addLine([[0, horizonY], [width, horizonY]]);

for (var i = 0; i < 16; i++) {
  var y = 55 - i * 1.6;
  var sea = [];
  var amp1 = 0.4 + i * 0.09;
  var amp2 = 0.16 + i * 0.03;
  var freq1 = 0.09 + i * 0.0025;
  var freq2 = 0.03 + i * 0.0012;
  var shift = y * 0.65;

  for (var x = 0; x <= width; x += 1.5) {
    var waveY =
      y +
      Math.sin(x * freq1 + shift) * amp1 +
      Math.sin(x * freq2 + y * 0.31) * amp2 +
      Math.cos(x * 0.017 + y * 0.24) * 0.18;
    sea.push([x, waveY]);
  }
  addLine(sea);
}

addQ([9, 44], [12, 46], [17, 44.2], 10);
addQ([21, 42.2], [24, 44.2], [29, 42.3], 10);
addQ([34, 45], [38, 47.3], [43, 45.1], 10);
addQ([48, 41.7], [52, 44], [58, 41.8], 10);
addQ([63, 43], [67, 45.2], [72, 43.1], 10);
addQ([79, 42.4], [83, 44.6], [88, 42.5], 10);
addQ([95, 44.2], [99, 46.3], [104, 44.1], 10);

var sunX = 22;
var sunY = 102;
addCircle(sunX, sunY, 10, 32);
addCircle(sunX, sunY, 7.4, 28);
addCircle(sunX, sunY, 5, 24);

for (var s = 0; s < 24; s++) {
  var a = (s / 24) * Math.PI * 2;
  var r1 = 12;
  var r2 = s % 3 === 0 ? 21 : (s % 2 === 0 ? 17 : 14);
  addLine([
    [sunX + Math.cos(a) * r1, sunY + Math.sin(a) * r1],
    [sunX + Math.cos(a) * r2, sunY + Math.sin(a) * r2]
  ]);
}

drawCloud(18, 91, 6.1);
drawCloud(46, 79, 5.4);
drawCloud(68, 96, 4.6);

var hill = [];
for (var hx = 0; hx <= width; hx += 1) {
  hill.push([hx, meadowY(hx)]);
}
addLine(hill);

var trunkX = 101;
var trunkBaseY = meadowY(trunkX);

addThickBranch(
  [trunkX, trunkBaseY],
  [100, 27],
  [101, 39],
  13,
  4.8,
  0.35,
  16
);

addQ([99, trunkBaseY + 0.2], [95, trunkBaseY + 1.1], [90, trunkBaseY + 0.2], 10);
addQ([103, trunkBaseY + 0.2], [108, trunkBaseY + 1.0], [113, trunkBaseY + 0.2], 10);

addThickBranch([101, 40], [94, 52], [84, 64], 6, 1.8, 0.35, 14);
addThickBranch([100, 42], [94, 60], [89, 75], 5, 1.3, 0.35, 14);
addThickBranch([102, 40], [109, 51], [118, 62], 6, 1.8, 0.35, 14);
addThickBranch([102, 42], [108, 60], [114, 77], 5, 1.3, 0.35, 14);
addThickBranch([101, 40], [101, 58], [102, 81], 5, 1.5, 0.35, 14);
addThickBranch([100, 43], [97, 64], [95, 85], 4, 1.0, 0.35, 12);
addThickBranch([102, 43], [105, 64], [107, 85], 4, 1.0, 0.35, 12);

addQ([92, 69], [88, 76], [84, 83], 10);
addQ([111, 69], [115, 76], [119, 83], 10);
addQ([98, 79], [95, 86], [92, 93], 10);
addQ([104, 79], [107, 86], [110, 93], 10);
addQ([87, 64], [82, 68], [78, 73], 10);
addQ([115, 64], [120, 68], [123, 73], 10);

addLeafBlob(101, 82, 12);
addLeafBlob(92, 80, 10);
addLeafBlob(111, 80, 10);
addLeafBlob(84, 72, 8.5);
addLeafBlob(118, 72, 8);
addLeafBlob(101, 72, 10.5);
addLeafBlob(92, 69, 8.5);
addLeafBlob(110, 69, 8.5);
addLeafBlob(87, 88, 7.5);
addLeafBlob(114, 88, 7.5);
addLeafBlob(100, 91, 8.5);
addLeafBlob(94, 89, 7);
addLeafBlob(107, 89, 7);
addLeafBlob(79, 79, 6);
addLeafBlob(120, 79, 6);
addLeafBlob(85, 79, 7);
addLeafBlob(116, 79, 7);
addLeafBlob(96, 76, 7);
addLeafBlob(106, 76, 7);
addLeafBlob(102, 64, 8);
addLeafBlob(94, 64, 7);
addLeafBlob(110, 64, 7);
addLeafBlob(88, 74, 6.5);
addLeafBlob(113, 74, 6.5);
addLeafBlob(98, 95, 6);
addLeafBlob(104, 95, 6);
addLeafBlob(91, 94, 6);
addLeafBlob(109, 94, 6);
addLeafBlob(97, 86, 6.5);
addLeafBlob(105, 86, 6.5);
addLeafBlob(89, 83, 6);
addLeafBlob(112, 83, 6);

for (var g = 0; g < 165; g++) {
  var gx = rand(0, width);
  var baseY = rand(0, 3);
  var topY = rand(meadowY(gx) * 0.45, meadowY(gx) + 7);
  var bend = rand(-6, 6);

  addQ(
    [gx, baseY],
    [gx + bend * 0.45, baseY + (topY - baseY) * 0.55],
    [gx + bend, topY],
    8
  );
}

for (var f = 0; f < 8; f++) {
  var fx = rand(7, width - 7);
  var stemBaseY = rand(0, 2.5);
  var headX = fx + rand(-5, 5);
  var headY = rand(meadowY(fx) + 7, meadowY(fx) + 17);

  addQ(
    [fx, stemBaseY],
    [fx + (headX - fx) * 0.5, stemBaseY + (headY - stemBaseY) * 0.55],
    [headX, headY],
    10
  );

  var petals = 5 + Math.floor(rand(0, 5));
  var pr = rand(3, 5.3);

  for (var p = 0; p < petals; p++) {
    var pa = (p / petals) * Math.PI * 2;
    addLine([
      [headX, headY],
      [headX + Math.cos(pa - 0.4) * pr * 0.5, headY + Math.sin(pa - 0.4) * pr * 0.5],
      [headX + Math.cos(pa) * pr, headY + Math.sin(pa) * pr],
      [headX + Math.cos(pa + 0.4) * pr * 0.5, headY + Math.sin(pa + 0.4) * pr * 0.5],
      [headX, headY]
    ]);
  }

  addCircle(headX, headY, 1.4, 12);
}

drawLines(lines);