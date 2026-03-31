// Setting up variables for threejs
var cam, scene, renderer;
var FOV = 90;

var WINDOW = [750,500];
var container = document.getElementById('threejsDIV');

// Defining an object for maping our data to colors
var map = {};
map['v'] = new THREE.Color(0xffeb84); // Vanilla
map['c'] = new THREE.Color(0x3a1b03); // Chocolate
map['s'] = new THREE.Color(0xf42727); // Strawberry
map['p'] = new THREE.Color(0x27f448); // Pistachio
map['b'] = new THREE.Color(0x2763f4); // Blueberry

// Our set of data
var set = ['v','s','c','p','b'];
// Create meshes from our set and use map to color the materials
var dataMeshes = create_meshes(set,map);

// Click counter for enter presses
var clickN = 0;

// Data that we will cycle through with enter presses
var animationData = [
	[[1,['v']],[new THREE.Vector3(2,1,10), new THREE.Vector3(1,0,0)]],
	[[1,['v','c']],[new THREE.Vector3(2,1,10), new THREE.Vector3(2,0,0)]],
	[[1,['v','c','s']],[new THREE.Vector3(2,1,10), new THREE.Vector3(3,0,0)]],
	[[1,['v','c','s','p']],[new THREE.Vector3(2,1,10), new THREE.Vector3(3,0,0)]],
	[[1,['v','c','s','p','b']],[new THREE.Vector3(2,1,10), new THREE.Vector3(3,0,0)]],
	[[2,['v']],[new THREE.Vector3(6,6,10), new THREE.Vector3(6,6,0)]],
	[[2,['v','c']],[new THREE.Vector3(6,6,10), new THREE.Vector3(6,6,0)]],
	[[2,['v','c','s']],[new THREE.Vector3(6,6,10), new THREE.Vector3(6,6,0)]],
	[[2,['v','c','s','p']],[new THREE.Vector3(6,6,10), new THREE.Vector3(6,6,0)]],
	[[2,['v','c','s','p','b']],[new THREE.Vector3(6,6,10), new THREE.Vector3(6,6,0)]],
	[[3,['v']],[new THREE.Vector3(20,20,20), new THREE.Vector3(10,0,10)]],
	[[3,['v','c']],[new THREE.Vector3(20,20,20), new THREE.Vector3(10,0,10)]],
	[[3,['v','c','s']],[new THREE.Vector3(20,20,20), new THREE.Vector3(10,0,10)]],
	[[3,['v','c','s','p']],[new THREE.Vector3(20,20,20), new THREE.Vector3(10,0,10)]],
	[[3,['v','c','s','p','b']],[new THREE.Vector3(20,20,20), new THREE.Vector3(15,0,10)]]
];

init();

function init(){
	// Enter = next data
	$(window).bind('keypress', function(e){if(e.keyCode == 13){nextExample()}});

	// Setting up renderer, scene and cam
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(WINDOW[0],WINDOW[1]);
	container.appendChild( renderer.domElement );
	scene = new THREE.Scene();
	cam = new THREE.PerspectiveCamera(FOV,
									  WINDOW[0]/WINDOW[1],
									  1,
									  1000);
	cam.position = animationData[clickN][1][0];
	cam.lookAt(animationData[clickN][1][1]);

	// Controls
	controls = new THREE.OrbitControls(cam, renderer.domElement);

	// Let there be light
	var light = new THREE.DirectionalLight( 0x404040, 10 );
	light.position = new THREE.Vector3(5,5,5);
	scene.add(light);
	// And there was light

	// Let there be sky!
	var skybox = new THREE.Mesh(new THREE.CubeGeometry(1000,1000,1000,1,1,1), new THREE.MeshBasicMaterial({color:0x528B8B}));
	skybox.material.side = 1;
	scene.add(skybox);

	// First data that we will visualize:
	var mahData=allPermutations(1,['v']);
	// Draw x,y,z lines for easier orientation
	origin(0,0,0);

	animate();
}


function animate(){
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene,cam);
}

function origin(x,y,z){
//	x:R y:G z:B
	var line = [];
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(x,y,z));
	var geometryX = geometry.clone();
	geometryX.vertices.push( new THREE.Vector3(x+100,y,z));
	var geometryY = geometry.clone();
	geometryY.vertices.push( new THREE.Vector3(x,y+100,z));
	var geometryZ = geometry.clone();
	geometryZ.vertices.push( new THREE.Vector3(x,y,z+100));

	line[0] = new THREE.Line(geometryX, new THREE.LineBasicMaterial({color:0xff0000}));
	line[1] = new THREE.Line(geometryY, new THREE.LineBasicMaterial({color:0x00ff00}));
	line[2] = new THREE.Line(geometryZ, new THREE.LineBasicMaterial({color:0x0000ff}));

	scene.add(line[0]);
	scene.add(line[1]);
	scene.add(line[2]);
}

function nextExample(){

	clearData();

	var n = animationData[clickN][0][0];
	var set = animationData[clickN][0][1];

	cam.position = animationData[clickN][1][0];
	cam.lookAt(animationData[clickN][1][1]);

	allPermutations(n,set);

	if ( clickN < animationData.length-1 ){ clickN += 1; }
	else{ clickN = 0; }

}

function clearData(){

	for(var element = 0; element < scene.children.length; element++){
		if (scene.children[element].name === "data"){
			
			scene.remove(scene.children[element]);
			// When we remove a child number of children gets smaller...duh
			element -= 1;
		}
	}
}
