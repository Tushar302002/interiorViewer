import React from 'react'

function Loader() {
  return (
    <div
    style={{
      color: "white",      // black text
      fontSize: "2.5rem",  // bigger size
      fontWeight: "bold",
      background: "black", // ensures black screen
      width: "100vw",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    Loading...
  </div>
  )
}

export default Loader