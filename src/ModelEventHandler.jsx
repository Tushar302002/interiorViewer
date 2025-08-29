import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { OrbitControls } from "@react-three/drei";

export default function ModelEventHandler({ focusableMeshes, interactiveMeshes, setHovered, setSelected }) {
    const { camera, gl } = useThree();
    const controls = useRef();
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
  
    // double-click to zoom on floors
    useEffect(() => {
      function onDoubleClick(event) {
        const rect = gl.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(focusableMeshes.current, true);
  
        if (intersects.length > 0) {
          const point = intersects[0].point;
  
          const newPos = point.clone().add(new THREE.Vector3(0, 2, 1));
          gsap.to(camera.position, {
            duration: 1.2,
            x: newPos.x,
            y: newPos.y,
            z: newPos.z,
            onUpdate: () => camera.updateProjectionMatrix(),
          });
  
          gsap.to(controls.current.target, {
            duration: 1.2,
            x: point.x,
            y: point.y,
            z: point.z,
          });
  
          setSelected(null); // deselect mesh if floor is clicked
        }
      }
  
      gl.domElement.addEventListener("dblclick", onDoubleClick);
      return () => gl.domElement.removeEventListener("dblclick", onDoubleClick);
    }, [camera, gl, focusableMeshes, setSelected]);
  
    // single click on interactive mesh → select
    useEffect(() => {
      function onClick(event) {
        const rect = gl.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
        raycaster.setFromCamera(mouse, camera);
        const meshesOnly = interactiveMeshes.current.map((obj) => obj.mesh);
        const intersects = raycaster.intersectObjects(meshesOnly, true);
  
        if (intersects.length > 0) {
          const mesh = intersects[0].object;
          const matched = interactiveMeshes.current.find((obj) => obj.mesh === mesh);
          setSelected(matched);
  
          // focus camera
          const point = intersects[0].point;
          const newPos = point.clone().add(new THREE.Vector3(0, 1.5, 2));
          gsap.to(camera.position, {
            duration: 1.2,
            x: newPos.x,
            y: newPos.y,
            z: newPos.z,
            onUpdate: () => camera.updateProjectionMatrix(),
          });
  
          gsap.to(controls.current.target, {
            duration: 1.2,
            x: point.x,
            y: point.y,
            z: point.z,
          });
        }
      }
  
      gl.domElement.addEventListener("click", onClick);
      return () => gl.domElement.removeEventListener("click", onClick);
    }, [camera, gl, interactiveMeshes, setSelected]);
  
    // hover detection
    useFrame(({ mouse }) => {
      raycaster.setFromCamera(mouse, camera);
      const meshesOnly = interactiveMeshes.current.map((obj) => obj.mesh);
      const intersects = raycaster.intersectObjects(meshesOnly, true);
  
      if (intersects.length > 0) {
        const mesh = intersects[0].object;
        const matched = interactiveMeshes.current.find((obj) => obj.mesh === mesh);
        setHovered(matched ? [matched] : []);
      } else {
        setHovered([]);
      }
    });
  
    return (
      <OrbitControls ref={controls} makeDefault maxPolarAngle={Math.PI / 2} enableZoom={false} />
    );
  }