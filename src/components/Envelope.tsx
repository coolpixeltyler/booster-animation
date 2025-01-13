import React, { useRef } from "react";
import { gsap } from "gsap";

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const envelopeRef = useRef<HTMLDivElement | null>(null);
  const topPartRef = useRef<HTMLDivElement | null>(null);
  const bottomPartRef = useRef<HTMLDivElement | null>(null);

  const handleOpen = () => {
    if (topPartRef.current && bottomPartRef.current) {
      // Animate the top part moving to the bottom-right smoothly
      gsap.to(topPartRef.current, {
        x: "30vw", // Move to the right
        y: "30vh", // Move downward
        duration: 1.5, // Smooth animation duration
        ease: "power2.inOut", // Rounded smooth motion
        rotation: 160, // Add slight rotation for realism
      });

      // Animate the remaining green card moving downward to reveal only half
      gsap.to(bottomPartRef.current, {
        y: "55vh", // Move downward
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          onOpen(); // Trigger the appearance of the cards at the same time
        },
      });
    }
  };

  return (
    <div
      ref={envelopeRef}
      onClick={handleOpen}
      style={{
        width: "200px",
        height: "350px",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Top ridged part */}
      <div
        ref={topPartRef}
        style={{
          width: "100%",
          height: "50px", // Height remains as provided
          backgroundColor: "#3d566e",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          position: "absolute",
          top: 0,
        }}
      >
        <div
          style={{
            width: "90%",
            height: "100%",
            backgroundImage:
              "repeating-linear-gradient(90deg, #2c3e50 0px, #2c3e50 5px, #3d566e 5px, #3d566e 10px)",
          }}
        />
      </div>

      {/* Green card body */}
      <div
        ref={bottomPartRef}
        style={{
          width: "100%",
          border: "2px",
          borderColor: "white",
          height: "calc(100% - 50px)", // Adjusted to fit under the new top part
          backgroundColor: "#2ecc71",
          borderRadius: "5px",
          boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          top: "50px", // Adjusted position to account for the taller top part
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "80%",
            backgroundColor: "#27ae60",
            borderRadius: "5px",
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default Envelope;
