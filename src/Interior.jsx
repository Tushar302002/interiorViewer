import { Center, useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function Interior({ url, focusableMeshes, interactiveMeshes, setActiveModels,focusableMeshesList,interactiveMeshesList,onLoaded }) {
    const gltf = useGLTF(url);
  
    useEffect(() => {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          if (focusableMeshesList.some((name) => child.name.includes(name))) {
            focusableMeshes.current.push(child);
          }
  
          interactiveMeshesList.forEach((item) => {
            if (child.name.includes(item.meshName)) {
              interactiveMeshes.current.push({
                mesh: child,
                displayName: item.displayName,
                id: item.id,
                colors: item.colors, // 🔹 keep the defined palette
                replacementModels: item.replacementModels || [],
                textures:item.textures
              });
              // 🔹 Set default model for this mesh (only once)
              setActiveModels(prev => {
                if (prev[item.id]) return prev; // don’t overwrite
                return { ...prev, [item.id]: "default" };
              });
            }
          });
        }
      });
    }, [gltf, focusableMeshes, interactiveMeshes]);

    useEffect(() => {
        if (gltf && onLoaded) {
          onLoaded();
        }
      }, [gltf, onLoaded]);
  
    return <Center><primitive object={gltf.scene} dispose={null} /></Center>;
  }