import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CardsProps {
  onThrow: (index: number) => void;
  onCompleteAll: () => void; // Callback when all cards are fully shown
}

const Cards: React.FC<CardsProps> = ({ onThrow, onCompleteAll }) => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Prevent duplicate animations
    if (cardsRef.current.length === 0) return;

    // Animate cards appearing one by one
    const timeline = gsap.timeline({
      onComplete: () => {
        if (onCompleteAll) {
          onCompleteAll(); // Trigger callback when all cards are fully shown
        }
      },
    });

    cardsRef.current.forEach((card, index) => {
      timeline.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.5, // Start smaller
          y: 100, // Start from inside the green card
        },
        {
          opacity: 1,
          scale: 1, // Grow to full size
          y: 0, // Move to its final position
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.3, // Staggered appearance
        }
      );
    });
  }, [onCompleteAll]);

  const handleCardClick = (index: number) => {
    const card = cardsRef.current[index];
    const collectionBar = document.getElementById("collection-bar");

    if (card && collectionBar) {
      const cardRect = card.getBoundingClientRect();
      const barRect = collectionBar.getBoundingClientRect();

      const dx = barRect.left - cardRect.left; // Horizontal distance to collection bar
      const dy = barRect.top - cardRect.top; // Vertical distance to collection bar

      // Animate the card moving to the collection bar
      gsap.to(card, {
        x: dx,
        y: dy,
        scale: 0.5, // Shrink size
        opacity: 0, // Fade out
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => onThrow(index), // Callback when animation finishes
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "50px",
      }}
    >
      {["#e91e63", "#ff9800", "#ffeb3b"].map((color, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) cardsRef.current[index] = el; // Ensure refs are correctly set
          }}
          onClick={() => handleCardClick(index)}
          style={{
            width: "120px",
            height: "160px",
            backgroundColor: color,
            opacity: 0, // Start hidden for animation
            transform: "translateY(50px)", // For staggered animation
            cursor: "pointer",
            borderRadius: "8px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            position: "relative",
          }}
        >
          {/* New Badge */}
          <div
            style={{
              position: "absolute",
              top: "-10px",
              left: "10px",
              backgroundColor: "#f44336",
              color: "white",
              padding: "3px 8px",
              borderRadius: "12px",
              fontSize: "10px",
              fontWeight: "bold",
            }}
          >
            New
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#000000",
              width: "100%",
              textAlign: "left",
              paddingBottom: "5px",
            }}
          >
            Name
          </div>

          {/* Semi-transparent rectangle */}
          <div
            style={{
              width: "90%",
              height: "60px", // Adjust height as per design
              backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent block
              borderRadius: "5px",
              marginTop: "5px", // Add some spacing below "Name"
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
