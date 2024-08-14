import * as THREE from "three"
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"
import {GUI} from "lil-gui"
import {gsap} from "gsap"
import {star} from "./3d.js";

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

const scene = new THREE.Scene();
// const camera = new THREE.OrthographicCamera(-canvasWidth, canvasWidth, canvasHeight, -canvasHeight);
const camera = new THREE.PerspectiveCamera(75, canvasWidth/canvasHeight);
const renderer = new THREE.WebGLRenderer();
window.document.body.appendChild(renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasWidth, canvasHeight);
camera.position.z = 25;
// renderer.setClearColor("white", 0)

const ambientLight = new THREE.AmbientLight("white", 3);
scene.add(ambientLight);

let starGroup;

const loader = new GLTFLoader();
loader.load("/src/assets/star.glb", (glb) => {
    const length = 5;
    starGroup = glb.scene;
    starGroup.position.x = -length;
    scene.add(starGroup);

    const gui = new GUI();
    gui.add(starGroup.position, "x").min(-50).max(50).step(0.01);
    gui.add(starGroup.position, "y").min(-50).max(50).step(0.01);
    gui.add(starGroup.position, "z").min(-50).max(50).step(0.01);

    let transformObj = {
        degree: Math.PI,
        opacity: 2.2,
    };


    const handleClick = () => {
        let tl = gsap.timeline();
        tl.to(transformObj, {
            degree: 2.2*Math.PI,
            opacity: 0,
            duration: 1,
            onUpdate: () => {
                starGroup.position.set(
                    Math.cos(transformObj.degree)*length,
                    Math.sin(transformObj.degree)*length,
                    0
                );
                starGroup.traverse(child => {
                    if(child.isMesh) {
                        child.material.transparent = true;
                        child.material.opacity = transformObj.opacity;
                    }
                })
            }
        })
        tl.set(transformObj, {
            degree: Math.PI,
            opacity: 2.3,
            onUpdate: () => {
                starGroup.position.set(
                    Math.cos(transformObj.degree)*length,
                    Math.sin(transformObj.degree)*length,
                    0
                );
                starGroup.traverse(child => {
                    if(child.isMesh) {
                        child.material.transparent = true;
                        child.material.opacity = transformObj.opacity;
                    }
                })
            }
        })
    }

    window.addEventListener("click", handleClick);
    // tl.to(transformObj, {
    //     degree: 2.5*Math.PI,
    //     opacity: 0,
    //     duration: 0.5,
    //     onUpdate: () => {
    //         starGroup.position.set(
    //             Math.cos(transformObj.degree)*length,
    //             Math.sin(transformObj.degree)*length,
    //             0
    //         );
    //         starGroup.traverse(child => {
    //             if(child.isMesh) {
    //                 child.material.transparent = true;
    //                 child.material.opacity = transformObj.opacity;
    //             }
    //         })
    //     }
    // }, "+=0")

}, undefined, (error) => {
    console.log(error);
})

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

const update = () => {
    renderer.render(scene, camera);
    orbitControls.update();
    if(starGroup) {
        starGroup.rotation.y += 0.1;
    }
    window.requestAnimationFrame(update);
}
update();