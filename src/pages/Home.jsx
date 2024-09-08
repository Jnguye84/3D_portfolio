// import { Canvas } from "@react-three/fiber";
// import { Suspense, useEffect, useRef, useState } from "react";

// import sakura from "../assets/sakura.mp3";
// import { HomeInfo, Loader } from "../components";
// import { soundoff, soundon } from "../assets/icons";
// import { Bird, Island, Plane, Sky, Barbie} from "../models";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Home = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(6, 4, -6);
    camera.lookAt(new THREE.Vector3(3, 3, -3));

    const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
    groundGeometry.rotateX(-Math.PI / 2);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.castShadow = false;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Ambient light to soften shadows
    scene.add(ambientLight);

    let barbieBox;

    const loader = new GLTFLoader().setPath('/');
    loader.load('scene.gltf', (gltf) => {
      console.log('Loading model');
      barbieBox = gltf.scene;

      barbieBox.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.DoubleSide;
        }
      });

      barbieBox.position.set(1, 1, -1);
      scene.add(barbieBox);
    }, (xhr) => {
      console.log(`Loading ${xhr.loaded / xhr.total * 100}%`);
    }, (error) => {
      console.error(error);
    });

    mountRef.current.appendChild(renderer.domElement);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let mouseX = 0, mouseY = 0;
    let previousMouseX = 0, previousMouseY = 0;
    let isMouseDown = false;

    const onMouseDown = (event) => {
      isMouseDown = true;
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onMouseMove = (event) => {
      if (isMouseDown) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        const deltaX = mouseX - previousMouseX;
        const deltaY = mouseY - previousMouseY;

        if (barbieBox) {
          barbieBox.rotation.y += deltaX * 0.01;
          barbieBox.rotation.x += deltaY * 0.01;
        }

        previousMouseX = mouseX;
        previousMouseY = mouseY;
      }
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      if (barbieBox) {
        barbieBox.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);

      if (mountRef.current) {
        while (mountRef.current.firstChild) {
          mountRef.current.removeChild(mountRef.current.firstChild);
        }
      }
    };
  }, []);
  return (
    <section className='w-full h-screen relative'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center' ref={mountRef}></div>
    </section>
  );
};

export default Home;
