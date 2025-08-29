import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Environment } from "@react-three/drei";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { TextureLoader } from "three";


import UI from "./UI";
import Loader from "./Loader";
import Interior from "./Interior";
import CursorFollowingMesh from "./CursorFollowingMesh";
import ModelEventHandler from "./ModelEventHandler";
import Replacement from "./Replacement";
import Lightning from "./Lightning";
import { modelUrl, focusableMeshesList, interactiveMeshesList } from "./config";


export default function App() {
  const textureLoader = new TextureLoader();
  const focusableMeshes = useRef([]);
  const interactiveMeshes = useRef([]);
  const [isInteriorRoomLoaded, setIsInteriorRoomLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hovered, setHovered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [activeColor, setActiveColor] = useState(null);
  const [activeTexture, setActiveTexture] = useState(null);
  const [replacements, setReplacements] = useState({});
  const [activeModels, setActiveModels] = useState({});
  const [lightSettings, setLightSettings] = useState({
    ambient: 0.6,
    directional: 0.8,
    pointIntensity: 0.5,
    pointPosition: [0, 1.5, 0], // center of room, 1.5m high
  });

  const replaceWithModel = (meshId, modelUrl) => {
    const meshObj = interactiveMeshes.current.find((m) => m.id === meshId);
    if (meshObj) meshObj.mesh.visible = false;
    setReplacements((prev) => ({ ...prev, [meshId]: modelUrl }));
    setActiveModels((prev) => ({ ...prev, [meshId]: modelUrl })); // track replacement
  };

  const restoreDefault = (meshId, meshObj) => {
    meshObj.mesh.visible = true;
    setReplacements((prev) => {
      const copy = { ...prev };
      delete copy[meshId];
      return copy;
    });
    setActiveModels((prev) => ({ ...prev, [meshId]: "default" })); // track default
  };

  const changeColor = (color) => {
    if (selected) {
      // Ensure the mesh has its own material instance
      if (!selected.mesh.userData.hasOwnMaterial) {
        selected.mesh.material = selected.mesh.material.clone();
        selected.mesh.userData.hasOwnMaterial = true;
      }

      // Now safe to update without affecting others
      selected.mesh.material.color.set(color);
      setActiveColor(color.toLowerCase());
    }
  };

  const changeTexture = (textureUrl) => {
    if (selected) {
      if (!selected.mesh.userData.hasOwnMaterial) {
        selected.mesh.material = selected.mesh.material.clone();
        selected.mesh.userData.hasOwnMaterial = true;
      }

      const texture = textureLoader.load(textureUrl);
      selected.mesh.material.map = texture;
      selected.mesh.material.needsUpdate = true;
      setActiveTexture(textureUrl);
    }
  };

  const handleStart = () => {
    const overlay = document.querySelector(".overlay");
    if (overlay) {
      overlay.classList.add("hidden"); // trigger fade
      overlay.addEventListener("transitionend", () => {
        setShowIntro(false); // remove after fade ends
      }, { once: true });
    }
  };

  const outlineSelection = [
    ...(hovered.length ? hovered.map((h) => h.mesh) : []),
    ...(selected ? [selected.mesh] : []),
  ];


  useEffect(() => {
    if (selected) {
      setActiveColor("#" + selected.mesh.material.color.getHexString().toLowerCase());
      if (selected.mesh.material.map) {
        const src = selected.mesh.material.map.image?.src || null;
        setActiveTexture(src);
      } else {
        setActiveTexture(null); // no texture on this mesh
      }
    }
  }, [selected]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "black" }}>
      <Canvas shadows camera={{ position: [0, -0.8, 2], fov: 75 }}>

        <ambientLight intensity={lightSettings.ambient} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={lightSettings.directional}
        />

        {/* "Lamp" or ceiling light inside the room */}
        <pointLight
          position={lightSettings.pointPosition}
          intensity={lightSettings.pointIntensity}
          distance={10}
          decay={2}
        />

        <Suspense fallback={
          <Html center>
            <Loader />
          </Html>
        }
        >
          <Interior url={modelUrl} focusableMeshes={focusableMeshes} interactiveMeshes={interactiveMeshes} setActiveModels={setActiveModels} focusableMeshesList={focusableMeshesList} interactiveMeshesList={interactiveMeshesList} onLoaded={() => setIsInteriorRoomLoaded(true)} />
          <Environment preset="city" />
        </Suspense>

        {Object.entries(replacements).map(([meshId, url]) => {
          const meshObj = interactiveMeshes.current.find((m) => m.id === meshId);
          if (!meshObj) return null;
          return (
            <Suspense key={meshId} fallback={null}>
              <Replacement mesh={meshObj.mesh} url={url} />
            </Suspense>
          );
        })}

        <ModelEventHandler
          focusableMeshes={focusableMeshes}
          interactiveMeshes={interactiveMeshes}
          setHovered={setHovered}
          setSelected={setSelected}
        />

        <CursorFollowingMesh focusableMeshes={focusableMeshes} />

        <EffectComposer multisampling={8} autoClear={false}>
          <Outline selection={outlineSelection} visibleEdgeColor="yellow" edgeStrength={5} blur />
        </EffectComposer>
      </Canvas>

      {/* 🔹 UI */}
      <UI replacements={replacements} selected={selected} activeModels={activeModels} activeColor={activeColor} restoreDefault={restoreDefault} replaceWithModel={replaceWithModel} changeColor={changeColor} changeTexture={changeTexture} activeTexture={activeTexture} />

      <Lightning lightSettings={lightSettings} setLightSettings={setLightSettings} isInteriorRoomLoaded={isInteriorRoomLoaded} />

      {showIntro && isInteriorRoomLoaded && (
        <div className="overlay">
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            Welcome to My 3D Room Project
          </h1>
          <p style={{ fontSize: "1.2rem", marginBottom: "2rem", maxWidth: "600px" }}>
            Explore and interact with the room. Customize furniture with colors,
            textures, and models.
          </p>
          <button
            onClick={handleStart}
            className="explore-btn"
            style={{
              padding: "12px 24px",
              fontSize: "1.2rem",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Start Exploring
          </button>
        </div>
      )}

    </div>
  );
}