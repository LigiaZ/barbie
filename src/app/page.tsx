"use client";

import { useState, useEffect } from "react";

type Event = "Beach" | "Dinner" | "Work" | "Wedding" | null;
type Tool = "color" | "stamp";

interface ClothingPart {
  id: string;
  color: string;
  stamps: { icon: string; x: number; y: number; id: string }[];
}

const COLORS = ["#FF00FF", "#00FFFF", "#FFFF00", "#FF69B4", "#7FFF00", "#FF1493", "#9370DB", "#FFD700", "#FF4500"];
const STAMPS = ["❤️", "⭐", "🌸", "🦋", "💎", "🌈", "✨", "🎀", "🌺", "💫"];

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<number>(0);
  const [selectedTool, setSelectedTool] = useState<Tool>("color");
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [selectedStamp, setSelectedStamp] = useState<string>(STAMPS[0]);
  const [clothingParts, setClothingParts] = useState<Record<string, ClothingPart>>({});
  const [glitterParticles, setGlitterParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [sassyMessage, setSassyMessage] = useState<string | null>(null);

  const events: Event[] = ["Beach", "Dinner", "Work", "Wedding"];
  
  const sassyMessages = [
    "That's horrible! 💅",
    "That's the opposite of fashion! 😱",
    "Terrible design! 🙈",
    "Did you even try? 😬",
    "My eyes! MY EYES! 👀",
    "Fashion emergency! 🚨",
    "This is a disaster! 💔",
    "What were you thinking?! 🤦‍♀️",
    "I can't be seen in this! 😤",
    "This hurts to look at! 🫣"
  ];

  const outfits: Record<string, string[]> = {
    Beach: ["Swimsuit", "Beach Dress", "Surf Outfit"],
    Dinner: ["Cocktail Dress", "Evening Gown", "Chic Pantsuit"],
    Work: ["Business Suit", "Pencil Skirt Set", "Blazer Combo"],
    Wedding: ["Wedding Gown", "Bridesmaid Dress", "Elegant Dress"],
  };

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setSelectedOutfit(0);
    setClothingParts({});
  };

  const handlePartClick = (partId: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool === "color") {
      // Apply the selected color
      setClothingParts((prev) => ({
        ...prev,
        [partId]: {
          ...prev[partId],
          id: partId,
          color: selectedColor,
          stamps: prev[partId]?.stamps || [],
        },
      }));
      
      // Randomly pick a DIFFERENT color (not the one currently selected)
      const otherColors = COLORS.filter(c => c !== selectedColor);
      const randomColor = otherColors[Math.floor(Math.random() * otherColors.length)];
      setSelectedColor(randomColor);
    } else if (selectedTool === "stamp") {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setClothingParts((prev) => ({
        ...prev,
        [partId]: {
          ...prev[partId],
          id: partId,
          color: prev[partId]?.color || "#FFFFFF",
          stamps: [
            ...(prev[partId]?.stamps || []),
            { icon: selectedStamp, x, y, id: Date.now().toString() },
          ],
        },
      }));
    }
  };

  const handleSave = () => {
    // Pick a random sassy message
    const randomMessage = sassyMessages[Math.floor(Math.random() * sassyMessages.length)];
    setSassyMessage(randomMessage);
    
    // Hide message after 3 seconds
    setTimeout(() => {
      setSassyMessage(null);
    }, 3000);
  };

  const handleReset = () => {
    setSelectedEvent(null);
    setSelectedOutfit(0);
    setClothingParts({});
  };

  // Glitter mouse trail effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const newParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    
    setGlitterParticles((prev) => [...prev, newParticle]);
    
    // Remove particle after animation
    setTimeout(() => {
      setGlitterParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);
  };

  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-teal-400 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4 retro-text-shadow">
            ✨ BARBIE ✨
          </h1>
          <h2 className="text-4xl font-bold text-yellow-300 mb-8 retro-text-shadow">
            Fashion Designer
          </h2>
          <p className="text-2xl text-white mb-12 font-bold">Choose Your Event!</p>
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            {events.map((event) => (
              <button
                key={event}
                onClick={() => handleEventSelect(event)}
                className="retro-button text-2xl font-black py-8 px-6 transform hover:scale-105 transition-transform"
              >
                {event === "Beach" && "🏖️"}
                {event === "Dinner" && "🍽️"}
                {event === "Work" && "💼"}
                {event === "Wedding" && "💒"}
                <br />
                {event}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentOutfits = outfits[selectedEvent] || [];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-teal-400 p-4"
      onMouseMove={handleMouseMove}
    >
      {/* Glitter particles */}
      {glitterParticles.map((particle) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none animate-glitter"
          style={{
            left: particle.x,
            top: particle.y,
            width: "8px",
            height: "8px",
            backgroundColor: particle.color,
            borderRadius: "50%",
            boxShadow: `0 0 10px ${particle.color}`,
            animation: "glitter 1s ease-out forwards",
          }}
        />
      ))}
      
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-black text-white retro-text-shadow">
            ✨ BARBIE Fashion Designer ✨
          </h1>
          <p className="text-xl text-yellow-300 font-bold mt-2">
            {selectedEvent} Event - {currentOutfits[selectedOutfit]}
          </p>
        </header>

        <div className="flex gap-4">
          {/* Left Toolbar */}
          <div className="w-64 space-y-4">
            {/* Outfit Selection */}
            <div className="retro-panel p-4">
              <h3 className="text-lg font-black text-purple-900 mb-3">OUTFITS</h3>
              <div className="space-y-2">
                {currentOutfits.map((outfit, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedOutfit(idx);
                      setClothingParts({});
                    }}
                    className={`w-full retro-button-small text-sm font-bold py-2 ${
                      selectedOutfit === idx ? "ring-4 ring-yellow-300" : ""
                    }`}
                  >
                    {outfit}
                  </button>
                ))}
              </div>
            </div>

            {/* Tool Selection */}
            <div className="retro-panel p-4">
              <h3 className="text-lg font-black text-purple-900 mb-3">TOOLS</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedTool("color")}
                  className={`w-full retro-button-small text-sm font-bold py-2 ${
                    selectedTool === "color" ? "ring-4 ring-yellow-300" : ""
                  }`}
                >
                  🎨 Color
                </button>
                <button
                  onClick={() => setSelectedTool("stamp")}
                  className={`w-full retro-button-small text-sm font-bold py-2 ${
                    selectedTool === "stamp" ? "ring-4 ring-yellow-300" : ""
                  }`}
                >
                  ✨ Stamp
                </button>
              </div>
            </div>

            {/* Color Palette */}
            {selectedTool === "color" && (
              <div className="retro-panel p-4">
                <h3 className="text-lg font-black text-purple-900 mb-3">COLORS</h3>
                <div className="grid grid-cols-3 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        // Pick a random color that's NOT the one clicked
                        const otherColors = COLORS.filter(c => c !== color);
                        const randomColor = otherColors[Math.floor(Math.random() * otherColors.length)];
                        setSelectedColor(randomColor);
                      }}
                      className={`w-full h-12 rounded-lg border-4 border-black transform hover:scale-110 transition-transform ${
                        selectedColor === color ? "ring-4 ring-yellow-300" : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Stamp Selection */}
            {selectedTool === "stamp" && (
              <div className="retro-panel p-4">
                <h3 className="text-lg font-black text-purple-900 mb-3">STAMPS</h3>
                <div className="grid grid-cols-3 gap-2">
                  {STAMPS.map((stamp) => (
                    <button
                      key={stamp}
                      onClick={() => setSelectedStamp(stamp)}
                      className={`w-full h-12 retro-button-small text-2xl ${
                        selectedStamp === stamp ? "ring-4 ring-yellow-300" : ""
                      }`}
                    >
                      {stamp}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleSave}
                className="w-full retro-button text-sm font-bold py-3"
              >
                🖨️ SAVE & PRINT
              </button>
              <button
                onClick={handleReset}
                className="w-full retro-button-small text-sm font-bold py-2"
              >
                🔙 NEW EVENT
              </button>
            </div>
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 retro-panel p-8 flex items-center justify-center">
            <div className="relative">
              {/* Sassy Speech Bubble */}
              {sassyMessage && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full mb-4 z-50 animate-bounce">
                  <div className="relative bg-white border-4 border-black rounded-3xl px-6 py-4 shadow-lg">
                    <p className="text-xl font-black text-pink-600 whitespace-nowrap">
                      {sassyMessage}
                    </p>
                    {/* Speech bubble tail */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[20px] border-t-black"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-[16px]">
                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-white"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Barbie Character with Outfit */}
              <OutfitDisplay
                event={selectedEvent}
                outfitIndex={selectedOutfit}
                clothingParts={clothingParts}
                onPartClick={handlePartClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OutfitDisplay({
  event,
  outfitIndex,
  clothingParts,
  onPartClick,
}: {
  event: Event;
  outfitIndex: number;
  clothingParts: Record<string, ClothingPart>;
  onPartClick: (partId: string, e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  // Different Barbie styles based on event
  const getBarbieStyle = () => {
    switch (event) {
      case "Beach":
        return {
          hairColor: "from-yellow-300 to-yellow-400",
          hairBorder: "border-yellow-500",
          skinColor: "from-amber-100 to-amber-200", // Tanned skin
          skinBorder: "border-amber-300",
          eyeColor: "bg-green-600 border-green-800", // Green eyes
        };
      case "Dinner":
        return {
          hairColor: "from-red-700 to-red-800",
          hairBorder: "border-red-900",
          skinColor: "from-pink-100 to-pink-200",
          skinBorder: "border-pink-300",
          eyeColor: "bg-blue-600 border-blue-800", // Blue eyes
        };
      case "Work":
        return {
          hairColor: "from-amber-800 to-amber-900",
          hairBorder: "border-amber-950",
          skinColor: "from-yellow-100 to-yellow-200",
          skinBorder: "border-yellow-300",
          eyeColor: "bg-amber-700 border-amber-900", // Brown eyes
        };
      case "Wedding":
        return {
          hairColor: "from-pink-200 to-pink-300",
          hairBorder: "border-pink-400",
          skinColor: "from-rose-100 to-rose-200",
          skinBorder: "border-rose-300",
          eyeColor: "bg-purple-600 border-purple-800", // Purple eyes
        };
      default:
        return {
          hairColor: "from-yellow-300 to-yellow-400",
          hairBorder: "border-yellow-500",
          skinColor: "from-pink-100 to-pink-200",
          skinBorder: "border-pink-300",
          eyeColor: "bg-blue-600 border-blue-800",
        };
    }
  };

  const barbieStyle = getBarbieStyle();
  const getOutfitParts = () => {
    const key = `${event}-${outfitIndex}`;
    
    if (event === "Beach") {
      if (outfitIndex === 0) {
        return (
          <>
            <ClothingPart
              id="swimsuit-top"
              label="Top"
              style={{ top: "28%", left: "32%", width: "36%", height: "14%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="swimsuit-bottom"
              label="Bottom"
              style={{ top: "43%", left: "35%", width: "30%", height: "12%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
          </>
        );
      } else if (outfitIndex === 1) {
        return (
          <ClothingPart
            id="beach-dress"
            label="Dress"
            style={{ top: "28%", left: "27%", width: "46%", height: "42%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else {
        return (
          <>
            <ClothingPart
              id="surf-top"
              label="Rashguard"
              style={{ top: "28%", left: "29%", width: "42%", height: "20%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="surf-shorts"
              label="Shorts"
              style={{ top: "49%", left: "33%", width: "34%", height: "16%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
          </>
        );
      }
    } else if (event === "Dinner") {
      if (outfitIndex === 0) {
        return (
          <ClothingPart
            id="cocktail-dress"
            label="Cocktail Dress"
            style={{ top: "28%", left: "29%", width: "42%", height: "38%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else if (outfitIndex === 1) {
        return (
          <ClothingPart
            id="evening-gown"
            label="Evening Gown"
            style={{ top: "28%", left: "27%", width: "46%", height: "54%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else {
        return (
          <>
            <ClothingPart
              id="pantsuit-top"
              label="Blazer"
              style={{ top: "28%", left: "29%", width: "42%", height: "24%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="pantsuit-pants"
              label="Pants"
              style={{ top: "53%", left: "33%", width: "34%", height: "36%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
          </>
        );
      }
    } else if (event === "Work") {
      if (outfitIndex === 0) {
        return (
          <>
            <ClothingPart
              id="suit-jacket"
              label="Jacket"
              style={{ top: "28%", left: "29%", width: "42%", height: "24%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="suit-skirt"
              label="Skirt"
              style={{ top: "53%", left: "34%", width: "32%", height: "20%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
          </>
        );
      } else if (outfitIndex === 1) {
        return (
          <>
            <ClothingPart
              id="pencil-top"
              label="Blouse"
              style={{ top: "28%", left: "31%", width: "38%", height: "20%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="pencil-skirt"
              label="Pencil Skirt"
              style={{ top: "49%", left: "34%", width: "32%", height: "26%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
          </>
        );
      } else {
        return (
          <>
            <ClothingPart
              id="blazer"
              label="Blazer"
              style={{ top: "28%", left: "29%", width: "42%", height: "24%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="work-pants"
              label="Trousers"
              style={{ top: "53%", left: "33%", width: "34%", height: "36%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
          </>
        );
      }
    } else if (event === "Wedding") {
      if (outfitIndex === 0) {
        return (
          <ClothingPart
            id="wedding-gown"
            label="Wedding Gown"
            style={{ top: "28%", left: "25%", width: "50%", height: "56%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else if (outfitIndex === 1) {
        return (
          <ClothingPart
            id="bridesmaid-dress"
            label="Bridesmaid Dress"
            style={{ top: "28%", left: "27%", width: "46%", height: "48%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else {
        return (
          <ClothingPart
            id="elegant-dress"
            label="Elegant Dress"
            style={{ top: "28%", left: "29%", width: "42%", height: "45%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      }
    }
  };

  return (
    <div className="relative w-96 h-[600px] bg-white/20 rounded-3xl border-8 border-white/40 backdrop-blur-sm overflow-hidden">
      {/* Hair - Voluminous styled hair with event-specific color */}
      {/* Main hair volume - top */}
      <div className={`absolute top-[2%] left-1/2 -translate-x-1/2 w-36 h-24 bg-gradient-to-b ${barbieStyle.hairColor} rounded-t-full border-4 ${barbieStyle.hairBorder}`}
           style={{ clipPath: "ellipse(50% 70% at 50% 30%)", zIndex: 1 }} />
      
      {/* Hair sides - flowing */}
      <div className={`absolute top-[8%] left-[16%] w-20 h-40 bg-gradient-to-b ${barbieStyle.hairColor} rounded-full border-3 ${barbieStyle.hairBorder}`}
           style={{ transform: "rotate(-15deg)", clipPath: "ellipse(45% 60% at 50% 40%)", zIndex: 0 }} />
      <div className={`absolute top-[8%] right-[16%] w-20 h-40 bg-gradient-to-b ${barbieStyle.hairColor} rounded-full border-3 ${barbieStyle.hairBorder}`}
           style={{ transform: "rotate(15deg)", clipPath: "ellipse(45% 60% at 50% 40%)", zIndex: 0 }} />
      
      {/* Hair back layer */}
      <div className={`absolute top-[10%] left-1/2 -translate-x-1/2 w-28 h-48 bg-gradient-to-b ${barbieStyle.hairColor} rounded-full border-2 ${barbieStyle.hairBorder}`}
           style={{ clipPath: "ellipse(50% 65% at 50% 35%)", zIndex: -1 }} />
      
      {/* Head - Doll-like oval face with event-specific skin tone */}
      <div className={`absolute top-[6%] left-1/2 -translate-x-1/2 w-28 h-32 bg-gradient-to-b ${barbieStyle.skinColor} border-4 ${barbieStyle.skinBorder}`}
           style={{ borderRadius: "50% 50% 48% 48%", zIndex: 2 }} />
      
      {/* Eyes - Larger, more doll-like with event-specific color */}
      <div className={`absolute top-[12%] left-[38%] w-4 h-5 rounded-full border-2 ${barbieStyle.eyeColor}`} style={{ zIndex: 3 }} />
      <div className={`absolute top-[12%] right-[38%] w-4 h-5 rounded-full border-2 ${barbieStyle.eyeColor}`} style={{ zIndex: 3 }} />
      
      {/* Eye highlights - sparkle effect */}
      <div className="absolute top-[12%] left-[39%] w-2 h-2.5 bg-white rounded-full" style={{ zIndex: 4 }} />
      <div className="absolute top-[12%] right-[39%] w-2 h-2.5 bg-white rounded-full" style={{ zIndex: 4 }} />
      <div className="absolute top-[13.5%] left-[38.5%] w-1 h-1 bg-white rounded-full opacity-70" style={{ zIndex: 4 }} />
      <div className="absolute top-[13.5%] right-[38.5%] w-1 h-1 bg-white rounded-full opacity-70" style={{ zIndex: 4 }} />
      
      {/* Eyelashes - more dramatic */}
      <div className="absolute top-[11%] left-[37%] w-5 h-1.5 border-t-3 border-black rounded-full"
           style={{ borderTopWidth: "3px", zIndex: 4 }} />
      <div className="absolute top-[11%] right-[37%] w-5 h-1.5 border-t-3 border-black rounded-full"
           style={{ borderTopWidth: "3px", zIndex: 4 }} />
      
      {/* Eyebrows */}
      <div className="absolute top-[10%] left-[37%] w-5 h-1 bg-black rounded-full opacity-60"
           style={{ transform: "rotate(-5deg)", zIndex: 3 }} />
      <div className="absolute top-[10%] right-[37%] w-5 h-1 bg-black rounded-full opacity-60"
           style={{ transform: "rotate(5deg)", zIndex: 3 }} />
      
      {/* Nose - delicate */}
      <div className="absolute top-[14.5%] left-1/2 -translate-x-1/2 w-1.5 h-3 bg-pink-300/50 rounded-full" style={{ zIndex: 3 }} />
      <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-2 h-1.5 bg-pink-300 rounded-full" style={{ zIndex: 3 }} />
      
      {/* Lips - fuller, more defined */}
      <div className="absolute top-[18.5%] left-1/2 -translate-x-1/2 w-10 h-3 bg-pink-400 rounded-full border-2 border-pink-600"
           style={{ clipPath: "ellipse(50% 60% at 50% 40%)", zIndex: 3 }} />
      <div className="absolute top-[19%] left-1/2 -translate-x-1/2 w-9 h-2 bg-pink-500 rounded-full"
           style={{ clipPath: "ellipse(50% 50% at 50% 60%)", zIndex: 3 }} />
      
      {/* Smile line */}
      <div className="absolute top-[19.5%] left-1/2 -translate-x-1/2 w-6 h-1 border-b-2 border-pink-700/30 rounded-full" style={{ zIndex: 3 }} />
      
      {/* Neck - slender, doll-like */}
      <div className={`absolute top-[18%] left-1/2 -translate-x-1/2 w-9 h-10 bg-gradient-to-b ${barbieStyle.skinColor} border-2 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "polygon(30% 0%, 70% 0%, 80% 100%, 20% 100%)", zIndex: 1 }} />
      
      {/* Shoulders - defined structure */}
      <div className={`absolute top-[26%] left-1/2 -translate-x-1/2 w-32 h-6 bg-gradient-to-b ${barbieStyle.skinColor} border-3 ${barbieStyle.skinBorder} rounded-t-3xl`}
           style={{ clipPath: "polygon(0% 50%, 15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%)", zIndex: 0 }} />
      
      {/* Upper Body - Barbie proportions (narrow waist, defined bust) */}
      <div className={`absolute top-[28%] left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-b ${barbieStyle.skinColor} border-3 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "polygon(15% 0%, 85% 0%, 95% 50%, 85% 100%, 15% 100%, 5% 50%)", borderRadius: "20px 20px 10px 10px" }} />
      
      {/* Waist - very narrow (classic Barbie) */}
      <div className={`absolute top-[42%] left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b ${barbieStyle.skinColor} border-2 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "polygon(25% 0%, 75% 0%, 70% 100%, 30% 100%)" }} />
      
      {/* Hips - defined */}
      <div className={`absolute top-[48%] left-1/2 -translate-x-1/2 w-22 h-10 bg-gradient-to-b ${barbieStyle.skinColor} border-3 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "polygon(20% 0%, 80% 0%, 90% 100%, 10% 100%)", borderRadius: "10px" }} />
      
      {/* Arms - slender, positioned naturally */}
      {/* Upper arms */}
      <div className={`absolute top-[29%] left-[14%] w-16 h-4 bg-gradient-to-r ${barbieStyle.skinColor} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ transform: "rotate(-20deg)" }} />
      <div className={`absolute top-[29%] right-[14%] w-16 h-4 bg-gradient-to-l ${barbieStyle.skinColor} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ transform: "rotate(20deg)" }} />
      
      {/* Forearms */}
      <div className={`absolute top-[32%] left-[8%] w-14 h-3.5 bg-gradient-to-r ${barbieStyle.skinColor} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ transform: "rotate(-35deg)" }} />
      <div className={`absolute top-[32%] right-[8%] w-14 h-3.5 bg-gradient-to-l ${barbieStyle.skinColor} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ transform: "rotate(35deg)" }} />
      
      {/* Hands - delicate */}
      <div className={`absolute top-[36%] left-[6%] w-5 h-6 ${barbieStyle.skinColor.split(' ')[0]} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "ellipse(50% 60% at 50% 40%)" }} />
      <div className={`absolute top-[36%] right-[6%] w-5 h-6 ${barbieStyle.skinColor.split(' ')[0]} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "ellipse(50% 60% at 50% 40%)" }} />
      
      {/* Legs - Long and slender (classic Barbie proportions) */}
      {/* Thighs */}
      <div className={`absolute top-[56%] left-[38%] w-8 h-24 bg-gradient-to-b ${barbieStyle.skinColor} rounded-lg border-2 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)" }} />
      <div className={`absolute top-[56%] right-[38%] w-8 h-24 bg-gradient-to-b ${barbieStyle.skinColor} rounded-lg border-2 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "polygon(20% 0%, 80% 0%, 70% 100%, 30% 100%)" }} />
      
      {/* Calves */}
      <div className={`absolute bottom-[8%] left-[39%] w-6 h-20 bg-gradient-to-b ${barbieStyle.skinColor} rounded-lg border-2 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "polygon(30% 0%, 70% 0%, 60% 100%, 40% 100%)" }} />
      <div className={`absolute bottom-[8%] right-[39%] w-6 h-20 bg-gradient-to-b ${barbieStyle.skinColor} rounded-lg border-2 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "polygon(30% 0%, 70% 0%, 60% 100%, 40% 100%)" }} />
      
      {/* Feet - pointed (high heel position) */}
      <div className={`absolute bottom-[6%] left-[37%] w-9 h-5 ${barbieStyle.skinBorder.replace('border-', 'bg-')} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ borderRadius: "60% 40% 30% 70%", transform: "rotate(-10deg)" }} />
      <div className={`absolute bottom-[6%] right-[37%] w-9 h-5 ${barbieStyle.skinBorder.replace('border-', 'bg-')} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ borderRadius: "40% 60% 70% 30%", transform: "rotate(10deg)" }} />
      
      {/* Outfit Parts */}
      {getOutfitParts()}
    </div>
  );
}

function ClothingPart({
  id,
  label,
  style,
  clothingParts,
  onPartClick,
}: {
  id: string;
  label: string;
  style: React.CSSProperties;
  clothingParts: Record<string, ClothingPart>;
  onPartClick: (partId: string, e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const part = clothingParts[id];
  const color = part?.color || "#FFFFFF";
  const stamps = part?.stamps || [];

  // Determine clothing shape based on ID
  const getClothingStyle = () => {
    const baseStyle = { ...style, backgroundColor: color };
    
    // Wedding Gown - Full ball gown shape
    if (id === "wedding-gown") {
      return {
        ...baseStyle,
        clipPath: "polygon(20% 0%, 80% 0%, 85% 20%, 95% 50%, 100% 100%, 0% 100%, 5% 50%, 15% 20%)",
        borderRadius: "25px 25px 50px 50px",
      };
    }
    
    // Evening Gown - Elegant flowing shape
    if (id === "evening-gown") {
      return {
        ...baseStyle,
        clipPath: "polygon(22% 0%, 78% 0%, 82% 30%, 90% 70%, 95% 100%, 5% 100%, 10% 70%, 18% 30%)",
        borderRadius: "20px 20px 45px 45px",
      };
    }
    
    // Dresses - A-line shape with fitted bodice
    if (id.includes("dress")) {
      return {
        ...baseStyle,
        clipPath: "polygon(25% 0%, 75% 0%, 78% 15%, 88% 50%, 95% 100%, 5% 100%, 12% 50%, 22% 15%)",
        borderRadius: "20px 20px 40px 40px",
      };
    }
    
    // Tops/Blazers - Fitted at shoulders, tapered to waist
    if (id.includes("top") || id.includes("blazer") || id.includes("jacket") || id.includes("blouse")) {
      return {
        ...baseStyle,
        clipPath: "polygon(10% 0%, 90% 0%, 95% 15%, 92% 50%, 85% 100%, 15% 100%, 8% 50%, 5% 15%)",
        borderRadius: "15px 15px 8px 8px",
      };
    }
    
    // Pencil Skirt - Fitted, straight shape
    if (id === "pencil-skirt") {
      return {
        ...baseStyle,
        clipPath: "polygon(28% 0%, 72% 0%, 70% 100%, 30% 100%)",
        borderRadius: "8px 8px 15px 15px",
      };
    }
    
    // Skirts - Flared A-line
    if (id.includes("skirt")) {
      return {
        ...baseStyle,
        clipPath: "polygon(28% 0%, 72% 0%, 85% 100%, 15% 100%)",
        borderRadius: "8px 8px 25px 25px",
      };
    }
    
    // Pants - Tailored with defined legs
    if (id.includes("pants") || id.includes("work-pants")) {
      return {
        ...baseStyle,
        clipPath: "polygon(18% 0%, 42% 0%, 43% 100%, 38% 100%, 38% 50%, 62% 50%, 62% 100%, 57% 100%, 57% 0%, 82% 0%, 82% 100%, 75% 100%, 75% 50%, 25% 50%, 25% 100%, 18% 100%)",
        borderRadius: "8px",
      };
    }
    
    // Shorts - Fitted with leg separation
    if (id.includes("shorts")) {
      return {
        ...baseStyle,
        clipPath: "polygon(22% 0%, 45% 0%, 46% 100%, 42% 100%, 42% 50%, 58% 50%, 58% 100%, 54% 100%, 54% 0%, 78% 0%, 78% 100%, 72% 100%, 72% 50%, 28% 50%, 28% 100%, 22% 100%)",
        borderRadius: "8px 8px 18px 18px",
      };
    }
    
    // Swimsuit bottom - Brief style
    if (id.includes("bottom")) {
      return {
        ...baseStyle,
        clipPath: "polygon(25% 10%, 75% 10%, 78% 50%, 75% 90%, 25% 90%, 22% 50%)",
        borderRadius: "20px",
      };
    }
    
    // Swimsuit top - Bikini style
    if (id.includes("swimsuit-top")) {
      return {
        ...baseStyle,
        clipPath: "polygon(15% 25%, 85% 25%, 80% 75%, 75% 100%, 25% 100%, 20% 75%)",
        borderRadius: "25px 25px 12px 12px",
      };
    }
    
    return baseStyle;
  };

  return (
    <div
      className="absolute cursor-pointer border-4 border-purple-900 hover:ring-4 hover:ring-yellow-300 transition-all shadow-lg"
      style={getClothingStyle()}
      onClick={(e) => onPartClick(id, e)}
      title={`Click to customize ${label}`}
    >
      {stamps.map((stamp) => (
        <div
          key={stamp.id}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${stamp.x}%`,
            top: `${stamp.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {stamp.icon}
        </div>
      ))}
    </div>
  );
}
