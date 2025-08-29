import React from 'react'

function UI({ replacements, selected, activeModels, activeColor, restoreDefault, replaceWithModel, changeColor, changeTexture,activeTexture }) {
    return (
        selected && (
            <div style={{
                position: "absolute",
                top: 20,
                left: 20,
                background: "rgba(0,0,0,0.6)",
                padding: "12px",
                borderRadius: "8px",
                color: "white"
            }}>
                <div style={{ marginBottom: "8px" }}>Selected: {selected.displayName}</div>


                {/* Replacement models if available */}
                {selected.replacementModels?.length > 0 && (
                    <div style={{ marginBottom: "8px" }}>
                        <div>Models:</div>
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button
                                onClick={() => restoreDefault(selected.id, selected)}
                                style={{
                                    background: "#555",
                                    color: "white",
                                    padding: "6px 10px",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    border:
                                        activeModels[selected.id] === "default"
                                            ? "3px solid yellow"   // highlight when active
                                            : "1px solid #444",
                                    marginBottom: "8px"
                                }}
                            >
                                Default
                            </button>
                            {selected.replacementModels.map((m) => (
                                <button
                                    key={m.url}
                                    onClick={() => replaceWithModel(selected.id, m.url)}
                                    style={{
                                        background: "#555",
                                        color: "white",
                                        padding: "6px 10px",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                        border:
                                            activeModels[selected.id] === m.url
                                                ? "3px solid yellow"
                                                : "1px solid #444",
                                        marginBottom: "8px"
                                    }}
                                >
                                    {m.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Color choices */}
                {/* {!replacements[selected.id] && (
                    <div style={{ display: "flex", gap: "8px" }}>
                        {selected.colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => changeColor(c)}
                                style={{
                                    background: c,
                                    width: 30,
                                    height: 30,
                                    border:
                                        activeColor?.toLowerCase() === c.toLowerCase()
                                            ? "3px solid white"
                                            : "1px solid #444",
                                    cursor: "pointer",
                                }}
                            />

                        ))}
                    </div>
                )} */}

                {/* Texture choices */}
                {!replacements[selected.id] && (
                    <div style={{ display: "flex", gap: "8px" }}>
                        {selected.textures.map((t) => (
                            <button
                                key={t}
                                onClick={() => changeTexture(t)}
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundImage: `url(${t})`,
                                    backgroundSize: "cover",
                                    border: activeTexture?.endsWith(t) ? "3px solid white" : "1px solid #444",
                                    cursor: "pointer",
                                }}
                            />
                        ))}
                    </div>
                )}


            </div>
        )
    )
}

export default UI