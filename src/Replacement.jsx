import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// export default function Replacement({ mesh, url }) {
//   const { scene } = useGLTF(url); const cloned = scene.clone(); // Copy position, rotation, and scale from original mesh 
//   useEffect(() => {
//      if (mesh) { 
//       // cloned.position.copy(mesh.position); 
//     } 
//   }, [mesh, cloned]); 

//   return(
//  <primitive object={cloned} />
//   ) 

// }

export default function Replacement({ mesh, url }) {
    const { scene } = useGLTF(url);
    const group = useRef();
  
    useEffect(() => {
      if (!mesh || !group.current) return;
  
      // Clone the replacement model
      const replacement = scene.clone(true);
  
      // Reset transforms so it’s not invisible
      replacement.position.set(0, 0, 0);
      replacement.rotation.set(0, 0, 0);
      replacement.scale.set(1, 1, 1);
  
      // Put it inside a container
      const container = new THREE.Group();
      container.add(replacement);
  
      // Place container at the mesh’s world position
      mesh.updateWorldMatrix(true, false);
      const worldPos = new THREE.Vector3();
      mesh.getWorldPosition(worldPos);
  
      container.position.copy(worldPos);
  
      // Add container
      group.current.clear();
      group.current.add(container);
  
    }, [mesh, scene]);
  
    return <group ref={group} />;
  }