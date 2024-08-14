import {useLayoutEffect, useRef, useState} from "react";
import {gsap} from "gsap"
import {camera, init, renderer, scene, starGroup} from "./3d.js";

const App = () => {
    const [isAnimation, setIsAnimation] = useState(false);
    const [starCount, setStarCount] = useState(32);
    const addOneRef = useRef(null);
    const canvasRef = useRef(null);
    const rotateTimeIdRef = useRef(0);

    const isAnimationTimeIdRef = useRef(0);

    const handleClick = () => {

        clearTimeout(isAnimationTimeIdRef.current);
        setIsAnimation(true);
        isAnimationTimeIdRef.current = setTimeout(() => {
            setIsAnimation(false);
        }, 1000)

        setStarCount(s => s+1);

        const transformObj = {
            degree: Math.PI,
            canvasOpacity: 1.3,
            addOneOpacity: 1,
        }

        gsap.to(transformObj, {
            degree: 2.3*Math.PI,
            canvasOpacity: 0,
            duration: 0.5,
            onUpdate: () => {
                if(canvasRef.current) {
                    canvasRef.current.style.transform = `translateX(${Math.cos(transformObj.degree)*57+85-28}px) translateY(${-Math.sin(transformObj.degree)*57}px)`;
                    canvasRef.current.style.opacity = transformObj.canvasOpacity*15/3;
                }
            }
        })
        gsap.set(transformObj, {
            degree: Math.PI,
            canvasOpacity: 1.3,
            delay: 1.3,
            onUpdate: () => {
                if(canvasRef.current) {
                    canvasRef.current.style.transform = `translateX(${Math.cos(transformObj.degree)*57+85-28}px) translateY(${-Math.sin(transformObj.degree)*57}px)`
                    canvasRef.current.style.opacity = 1
                }
            }
        })

        gsap.to(transformObj, {
            addOneOpacity: 0,
            onUpdate: () => {
                if(addOneRef.current) {
                    addOneRef.current.style.transform = `translateY(${-Math.sin(transformObj.degree)*57}px)`
                }
            }
        })

    }

    const handleMouseOver = () => {
        clearInterval(rotateTimeIdRef.current);
        if(starGroup) {
            rotateTimeIdRef.current = setInterval(() => {
                starGroup.rotation.y += 0.08;
                renderer.render(scene, camera);
            }, 16)
        }
    }

    const handleMouseOut = () => {
        clearInterval(rotateTimeIdRef.current);
        if(starGroup) {
            starGroup.rotation.y = starGroup.rotation.y%Math.PI;
            gsap.to(starGroup.rotation, {
                y: Math.PI,
                duration: Math.abs(Math.PI-starGroup.rotation.y)/4.8,
                onUpdate: () => {
                    renderer.render(scene, camera);
                }
            })
        }
    }

    useLayoutEffect(() => {
        init();
    }, [])

    return (
        <div className="w-screen h-screen flex items-center justify-center select-none">
            <div className="relative text-white text-xl font-semibold w-[170px]"
                 onMouseOver={handleMouseOver}
                 onMouseOut={handleMouseOut}
            >
                <button type="button" className="relative w-full h-14 bg-[#1f2024] rounded-[24px] flex flex-row items-center justify-end duration-300 active:scale-75
                shadow-[0px_0px_16px_#00000058]"
                        onClick={handleClick}
                >
                    <div className="duration-300 px-4 flex items-center justify-center">
                        <p className="">Star</p>
                        <p className={`duration-300 ${isAnimation?"max-w-24 opacity-100":"max-w-0 opacity-0"}`}>red</p>
                    </div>
                    <div className="w-[2px] bg-[#ffffff2a] self-stretch"></div>
                    <p className={`pl-4 pr-5 duration-300 ${isAnimation?"text-neutral-100":"text-neutral-400"}`}>{starCount}</p>
                </button>
                <p className="absolute right-0 top-0 text-[#0000004a] px-5 text-xl -translate-y-[calc(100%-12px)] opacity-0" ref={addOneRef} >+1</p>
                <canvas id="canvas" ref={canvasRef} className="absolute pointer-events-none size-[56px] top-0 left-0"></canvas>
            </div>
        </div>
    )
}

export default App;