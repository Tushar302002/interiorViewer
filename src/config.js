// src/config.js

// Main model
export const modelUrl = "/models/home1_compressed2.glb";

// Meshes that are "focusable"
export const focusableMeshesList = ["F1149", "F1005"];

// Interactive meshes with colors & replacements
export const interactiveMeshesList = [
  {
    id: "chair",
    meshName: "Carlo-003",
    displayName: "Chair",
    colors: ["#8B4513", "#D2691E", "#A0522D", "#000000"], // brown shades + black
    replacementModels: [],
    textures : [
      "/textures/texture5.jpg",
      "/textures/texture4.jfif",
      "/textures/texture6.jfif",
    ],
  },
  {
    id: "blanket",
    meshName: "2023051321530058",
    displayName: "Blanket",
    colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"], // red, green, blue, yellow
    replacementModels: [],
    textures : [
      "/textures/texture6.jfif",
    ],
  },
  {
    id: "drawer-left",
    meshName: "46546143",
    displayName: "Drawer Left",
    colors: ["#FFFFFF", "#C0C0C0", "#808080"], // white & greys
    replacementModels: [
      { label: "Drawer v1", url: "/models/drawer1.glb" },
    ],
    textures : [
      "/textures/texture5.jpg",
      "/textures/texture6.jfif",
    ],
  },
  {
    id: "takiya-left",
    meshName: "1466029831",
    displayName: "Takiya Left",
    colors: ["#FFD700", "#000000", "#00FF00"],
    replacementModels: [],
    textures : [
      "/textures/texture4.jfif",
      "/textures/texture6.jfif",
    ],
  },
  {
    id: "takiya-right",
    meshName: "2023051321530059",
    displayName: "Takiya Right",
    colors: ["#000000", "#8B0000"],
    replacementModels: [],
    textures : [
    ],
  },
  {
    id: "drawer-right",
    meshName: "46546145",
    displayName: "Drawer Right",
    colors: ["#FF0000", "#00FF00", "#0000FF", "#FFFF00"], // red, green, blue, yellow
    replacementModels: [
      { label: "Drawer v1", url: "/models/drawer1.glb" },
    ],
    textures : [
    ],
  },
  {
    id: "clock",
    meshName: "2023051321530104",
    displayName: "Clock",
    colors: ["#FFD700", "#000000", "#8B0000"], // gold, black, dark red
    replacementModels: [],
    textures : [
      "/textures/texture5.jpg",
    ],
  },
];
