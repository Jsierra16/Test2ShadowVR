import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.xr.enabled = true;
this.renderer.xr.setReferenceSpaceType('local');
document.body.appendChild( VRButton.createButton(this.renderer ) );
document.body.appendChild( renderer.domElement );




const cubeTexture = new THREE.CubeTextureLoader()
  .setPath("/")
  .load([
    "px.png",
    "nx.png",
    "py.png",
    "ny.png",
    "pz.png",
    "nz.png",
  ]);
scene.background = cubeTexture;
camera.position.z = 5;
const light = new THREE.PointLight( 0xffffff, 5, 100 );



light.position.set( 80, 100, 50 );
scene.add( light );
var textureNormal = new THREE.TextureLoader().load("Fox_Normal.png")
const textureT = new THREE.TextureLoader().load("Fox_BaseColor.png");
const materialT = new THREE.MeshBasicMaterial({ color: 0xffffff, map:textureT,normalMap :textureNormal });
scene.background = cubeTexture;
camera.position.z = 6;
const light2 = new THREE.PointLight( 0xffffff, 5, 100 );
light2.position.set( 20, 50, 50 );
scene.add( light2 );

const loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'shadow-the-hedgehog/Shadow the Hedgehog.obj',
	// called when resource is loaded
	function ( object ) {
		object.scale.x=0.0005
		object.scale.y=0.0005
		object.scale.z=0.0005
		object.position.y=-3
		object.rotation.y= 1.5;
		object.traverse( function ( child ) {

			if ( child.isMesh ) child.material.map = textureT;

		} );
		scene.add( object );

	},
	
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

function animate() {
	requestAnimationFrame( animate );



	renderer.render( scene, camera );
}

animate();
const controls = new OrbitControls(camera, renderer.domElement);
        
controls.enableZoom = true;
controls.minDistance = 1;
controls.maxDistance = 200;
controls.screenSpacePanning = true;
controls.enableDamping = false;
controls.dampingFactor = 1;

function render() {
   requestAnimationFrame(render);
   renderer.render(scene, camera);
}
render();