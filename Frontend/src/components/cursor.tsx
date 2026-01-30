import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <img
      src="/dc1.png"
      alt="cursor"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 32,
        height: 32,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 99999,
  
        filter: "drop-shadow(0 0 4px rgba(139, 26, 26, 0.6))"
      }}
    />
  );
}
