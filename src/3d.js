import * as THREE from "three"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

let starGroup;
const canvasWidth = 56;
const canvasHeight = 56;
let canvas, scene, camera, renderer;


const addLight = (x, y, z, i, s) => {
    const light = new THREE.DirectionalLight(0xffffff, i);
    light.position.set(x, y, z);
    s.add(light);
};


const init = () => {
    if(canvas) return;
    canvas = window.document.querySelector("#canvas");
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, canvasWidth/canvasHeight);
    renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("white", 0)
    camera.position.z = 3.8;

    scene.add(new THREE.AmbientLight(0xffffff));
    // addLight(0, 4, 3, 2, scene);
    addLight(0, 4, 2, 1, scene);
    addLight(0, -4, 2, 2, scene);

    addLight(4, 0, 2, 1, scene);
    addLight(-4, 0, 2, 2, scene);


    const loader = new GLTFLoader();
    loader.load("./star.glb", (glb) => {
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