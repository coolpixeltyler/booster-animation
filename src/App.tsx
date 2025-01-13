import React, { useState } from "react";
import Envelope from "./components/Envelope";
import Cards from "./components/Cards";

const App: React.FC = () => {
  const [showCards, setShowCards] = useState(false); // Determines if cards are displayed
  const [progress, setProgress] = useState(0); // Progress bar value
  const [collectedCards, setCollectedCards] = useState(0); // Number of collected cards

  if(collectedCards)
  {
    console.log("123");
  }

  const handleOpenEnvelope = () => {
    // Show cards when the envelope is clicked
    setShowCards(true);
  };

  const handleCardThrow = (index: number) => {
    if(index)
    {
      console.log("123");
    }
    setCollectedCards((prevCollected) => {
      const newCount = prevCollected + 1;
      const newProgress = (newCount / 3) * 100; // Update progress based on the number of collected cards
      setProgress(newProgress);

      if (newCount === 3) {
        // If all cards are collected, reset after a delay
        setTimeout(() => {
          resetToFirstEnvironment();
        }, 1500); // Wait 1.5 seconds for animations to finish
      }

      return newCount;
    });
  };

  const resetToFirstEnvironment = () => {
    setShowCards(false); // Return to showing the envelope
    setProgress(0); // Reset progress bar
    setCollectedCards(0); // Reset collected card count
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#10121b", // Match background color
        color: "#ffffff",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
        }}
      >
        {/* Left Sidebar */}
        <div
          style={{
            width: "20%",
            backgroundColor: "#181a26",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          {/* Placeholder for left-side content */}
          <div
            style={{
              width: "80%",
              height: "50px",
              backgroundColor: "#252637",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          />
          <div
            style={{
              width: "80%",
              height: "150px",
              backgroundColor: "#252637",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            flexGrow: 1,
            width: '100vw',
            backgroundColor: "#20232e",
            position: "relative",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Progress Bar */}
          <div
            id="collection-bar"
            style={{
              position: "fixed", // Fix the collection bar in the right-top corner
              top: "10px",
              right: "10px",
              backgroundColor: "#252637",
              padding: "5px 10px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: 'column',
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              zIndex: 100, // Ensure it stays above other elements
            }}
          >
            <span style={{ marginRight: "8px" }}>
              Collection {progress.toFixed(2)}%
            </span>
            <div
              style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#3d566e",
                borderRadius: "2px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#2ecc71",
                  transition: "width 0.5s ease-out",
                }}
              />
            </div>
          </div>

          {/* Conditional rendering of envelope or cards */}
          {!showCards ? (
            <Envelope onOpen={handleOpenEnvelope} /> // Show envelope
          ) : (
            <Cards onThrow={handleCardThrow} /> // Show cards
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
