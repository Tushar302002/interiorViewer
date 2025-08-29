import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export default function CursorFollowingMesh({ focusableMeshes }) {
    const { camera, mouse } = useThree();
    const raycaster = new THREE.Raycaster();
    const cursorRef = useRef();
  
    useFrame(() => {
      if (!focusableMeshes.current.length || !cursorRef.current) return;
  
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(focusableMeshes.current, true);
  
      if (intersects.length > 0) {
        cursorRef.current.position.copy(intersects[0].point);
        cursorRef.current.visible = true;
      } else {
        cursorRef.current.visible = false;
      }
    });
  
    return (
      <mesh ref={cursorRef} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[0.08, 0.1, 32]} />
        <meshBasicMaterial color="yellow" transparent opacity={0.8} />
      </mesh>
    );
  }