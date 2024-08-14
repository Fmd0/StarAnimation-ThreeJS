import * as THREE from "three"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

let starGroup;
const canvasWidth = 56;
const canvasHeight = 56;
let canvas, scene, camera, renderer;

const init = () => {
    if(canvas) return;
    canvas = window.document.querySelector("#canvas");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvasWidth/canvasHeight);
    renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("white", 0)
    camera.position.z = 3.8;

    const ambientLight = new THREE.AmbientLight("white", 4);
    scene.add(ambientLight);

    const loader = new GLTFLoader();
    loader.load("/src/assets/star.glb", (glb) => {
        starGroup = glb.scene;
        scene.add(starGroup);
        renderer.render(scene, camera);
    }, undefined, (error) => {
        console.log(error);
    })

    // const orbitControls = new OrbitControls(camera, renderer.domElement);

    // const update = () => {
    //     renderer.render(scene, camera);
    //     if(starGroup) {
    //         starGroup.rotation.y += 0.02;
    //     }
    //     window.requestAnimationFrame(update);
    // }
    // update();
}

export {
    init,
    starGroup,
    renderer,
    scene,
    camera
}