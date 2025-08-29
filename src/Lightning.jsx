import React from 'react'

function Lightning({lightSettings,setLightSettings,isInteriorRoomLoaded}) {
    return (
        isInteriorRoomLoaded && <div style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "rgba(0,0,0,0.6)",
            padding: "12px",
            borderRadius: "8px",
            color: "white"
        }}>
            <h3 style={{fontSize:"12px"}}>Adjust Lights</h3>
            <label>
                <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.1"
                    value={lightSettings.ambient}
                    onChange={(e) =>
                        setLightSettings({ ...lightSettings, ambient: parseFloat(e.target.value) })
                    }
                />
            </label>
        </div>

    )
}

export default Lightning