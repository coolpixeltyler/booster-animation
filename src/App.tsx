import React, { useState } from "react";
import Envelope from "./components/Envelope";
import Cards from "./components/Cards";

const App: React.FC = () => {
  const [showCards, setShowCards] = useState(false); // Determines if cards are displayed
  const [progress, setProgress] = useState(0); // Progress bar value
  const [collectedCards, setCollectedCards] = useState(0); // Number of collected cards
  const [cardsFullyShown, setCardsFullyShown] = useState(false); // Track if all cards are fully shown

  if (cardsFullyShown)
  {
    console.log("Cards are fully Shown!");
  }

  if (collectedCards)
  {
    console.log("Cards are collected!");
  }
  
  const handleOpenEnvelope = () => {
    // Show cards when the envelope is clicked
    setShowCards(true);
  };

  const handleCardThrow = (index: number) => {
    console.log(`Card ${index} was thrown.`); // Example usage of `index`
  
    setCollectedCards((prevCollected) => {
      const newCount = prevCollected + 1;
      const newProgress = (newCount / 3) * 100; // Update progress based on the number of collected cards
      setProgress(newProgress);
  
      if (newCount === 3) {
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
    setCardsFullyShown(false); // Reset fully shown state
  };

  const handleCardsFullyShown = () => {
    // Set state when all cards are fully shown
    setCardsFullyShown(true);
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
            width: "20%", // Adjusted width for left sidebar
            backgroundColor: "#101521", // Sidebar background color
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Match spacing
            padding: "10px",
            borderRight: "1px solid #252637", // Add border for separation
          }}
        >
          {/* Top Menu Icon */}
          <div
            style={{
              width: "100%",
              height: "30px",
              backgroundColor: "#252637",
              borderRadius: "4px",
              marginBottom: "20px",
            }}
          />

          {/* Placeholder Boxes */}
          <div
            style={{
              flexGrow: 1,
              backgroundColor: "#181a26",
              borderRadius: "5px",
              margin: "10px 0",
            }}
          />

          {/* Bottom Placeholder */}
          <div
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: "#252637",
              borderRadius: "5px",
              alignSelf: "center",
            }}
          />
        </div>

        {/* Main Content */}
        <div
          style={{
            flexGrow: 1,
            width: "100vw",
            backgroundColor: "#20232e", // Background color for main content
            position: "relative",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderLeft: "1px solid #252637", // Add border for separation
          }}
        >
          {/* Progress Bar */}
          <div
            id="collection-bar"
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              backgroundColor: "#252637",
              padding: "5px 15px",
              borderRadius: "20px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
              zIndex: 100,
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
            <Envelope onOpen={handleOpenEnvelope} />
          ) : (
            <Cards onThrow={handleCardThrow} onCompleteAll={handleCardsFullyShown} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
