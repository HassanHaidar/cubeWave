
let slider1;
let slider2;
let slider3;
let alpha = 0;
let n1 = 1;
let n2 = 1;
let n3 = 1;
let m1 = 1;
let m2 = 1;
let scale;
let a = 1;
let b = 1;
let resol = 50;
let v;
let points = [];

function setup() {
	createCanvas(500, 500, WEBGL);

	slider1 = createSlider(0, 10, 0.1, 0.01);
	slider2 = createSlider(0, 10, 0.1, 0.01);
	slider3 = createSlider(0, 10, 0.1, 0.01);

}


function sf(angle){
	let part1 = pow(abs(cos(m1*angle/4)/a), n2);
	let part2 = pow(abs(sin(m2*angle/4)/b), n3);
	let r = pow((part1 + part2), -1 / n1);
	return r;
}

function draw() {
	background(150);

	fill(255, 0, 0);

	rotateX(alpha);
	rotateY(alpha);
	rotateZ(alpha);
	let scale = 100;
	n1 = slider1.value();
	m1 = slider2.value();
	m2 = slider3.value();
	for (var i  = 0; i <= resol;  i++ ){
		points[i] = [];
		let phi = map(i, 0, resol, -PI, PI);
		let r1 = sf(phi);
		for (var j  = 0; j <= resol;  j++ ){
			let theta = map(j, 0, resol, -PI/2, PI/2);
			let r2 = sf(theta);
			let x = scale*r1*cos(phi)*r2*cos(theta);
			let y = scale*r1*sin(phi)*r2*cos(theta);
			let z = scale * r2 * sin(theta);
			points[i][j] = createVector(x,y,z);
		}
	}
	for (var i  = 0; i < resol;  i++ ){
	 beginShape(TRIANGLE_STRIP);
		for (var j  = 0; j <= resol;  j++ ){
			stroke(255);
		  //fill(255, 0,0);
			let c1 = points[i][j];
			vertex(c1.x, c1.y, c1.z);
			let c2 = points[i + 1][j];
			vertex(c2.x, c2.y, c2.z);
		}
		endShape();
 }
	alpha += 0.01;
}
