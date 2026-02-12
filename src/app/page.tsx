"use client";

import { useState, useEffect } from "react";

type Event = "Beach" | "Dinner" | "Work" | "Wedding" | null;
type Tool = "color" | "stamp";

interface ClothingPart {
  id: string;
  color: string;
  stamps: { icon: string; x: number; y: number; id: string }[];
}

const COLORS = ["#FF00FF", "#00FFFF", "#FFFF00", "#FF69B4", "#7FFF00"];
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
              style={{ top: "27%", left: "33%", width: "34%", height: "12%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="swimsuit-bottom"
              label="Bottom"
              style={{ top: "40%", left: "36%", width: "28%", height: "10%" }}
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
            style={{ top: "27%", left: "28%", width: "44%", height: "38%" }}
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
              style={{ top: "27%", left: "30%", width: "40%", height: "18%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="surf-shorts"
              label="Shorts"
              style={{ top: "46%", left: "34%", width: "32%", height: "14%" }}
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
            style={{ top: "27%", left: "30%", width: "40%", height: "35%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else if (outfitIndex === 1) {
        return (
          <ClothingPart
            id="evening-gown"
            label="Evening Gown"
            style={{ top: "27%", left: "28%", width: "44%", height: "48%" }}
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
              style={{ top: "27%", left: "30%", width: "40%", height: "22%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="pantsuit-pants"
              label="Pants"
              style={{ top: "50%", left: "34%", width: "32%", height: "32%" }}
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
              style={{ top: "27%", left: "30%", width: "40%", height: "22%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="suit-skirt"
              label="Skirt"
              style={{ top: "50%", left: "35%", width: "30%", height: "18%" }}
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
              style={{ top: "27%", left: "32%", width: "36%", height: "18%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="pencil-skirt"
              label="Pencil Skirt"
              style={{ top: "46%", left: "35%", width: "30%", height: "24%" }}
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
              style={{ top: "27%", left: "30%", width: "40%", height: "22%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="work-pants"
              label="Trousers"
              style={{ top: "50%", left: "34%", width: "32%", height: "32%" }}
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
            style={{ top: "27%", left: "26%", width: "48%", height: "52%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else if (outfitIndex === 1) {
        return (
          <ClothingPart
            id="bridesmaid-dress"
            label="Bridesmaid Dress"
            style={{ top: "27%", left: "28%", width: "44%", height: "45%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else {
        return (
          <ClothingPart
            id="elegant-dress"
            label="Elegant Dress"
            style={{ top: "27%", left: "30%", width: "40%", height: "42%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      }
    }
  };

  return (
    <div className="relative w-96 h-[600px] bg-white/20 rounded-3xl border-8 border-white/40 backdrop-blur-sm overflow-hidden">
      {/* Hair - Long flowing hair with event-specific color */}
      <div className={`absolute top-[3%] left-1/2 -translate-x-1/2 w-32 h-40 bg-gradient-to-b ${barbieStyle.hairColor} rounded-t-full border-4 ${barbieStyle.hairBorder}`}
           style={{ clipPath: "ellipse(50% 60% at 50% 40%)" }} />
      <div className={`absolute top-[15%] left-[20%] w-16 h-32 bg-gradient-to-b ${barbieStyle.hairColor} rounded-full border-2 ${barbieStyle.hairBorder}`}
           style={{ transform: "rotate(-10deg)" }} />
      <div className={`absolute top-[15%] right-[20%] w-16 h-32 bg-gradient-to-b ${barbieStyle.hairColor} rounded-full border-2 ${barbieStyle.hairBorder}`}
           style={{ transform: "rotate(10deg)" }} />
      
      {/* Head - Oval face shape with event-specific skin tone */}
      <div className={`absolute top-[8%] left-1/2 -translate-x-1/2 w-24 h-28 bg-gradient-to-b ${barbieStyle.skinColor} rounded-full border-4 ${barbieStyle.skinBorder}`}
           style={{ borderRadius: "50% 50% 45% 45%" }} />
      
      {/* Eyes with event-specific color */}
      <div className={`absolute top-[12%] left-[40%] w-3 h-4 rounded-full border-2 ${barbieStyle.eyeColor}`} />
      <div className={`absolute top-[12%] right-[40%] w-3 h-4 rounded-full border-2 ${barbieStyle.eyeColor}`} />
      <div className="absolute top-[11.5%] left-[40.5%] w-1.5 h-2 bg-white rounded-full" />
      <div className="absolute top-[11.5%] right-[40.5%] w-1.5 h-2 bg-white rounded-full" />
      
      {/* Eyelashes */}
      <div className="absolute top-[11%] left-[39%] w-4 h-1 border-t-2 border-black rounded-full" />
      <div className="absolute top-[11%] right-[39%] w-4 h-1 border-t-2 border-black rounded-full" />
      
      {/* Nose */}
      <div className="absolute top-[14%] left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-300 rounded-full" />
      
      {/* Smile */}
      <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-8 h-3 border-b-3 border-pink-600 rounded-full" 
           style={{ borderBottomWidth: "3px" }} />
      
      {/* Neck */}
      <div className={`absolute top-[20%] left-1/2 -translate-x-1/2 w-10 h-8 bg-gradient-to-b ${barbieStyle.skinColor} border-2 ${barbieStyle.skinBorder}`} />
      
      {/* Body - Hourglass figure */}
      <div className={`absolute top-[26%] left-1/2 -translate-x-1/2 w-20 h-28 bg-gradient-to-b ${barbieStyle.skinColor} border-4 ${barbieStyle.skinBorder}`}
           style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 40%, 85% 100%, 15% 100%, 0% 40%)" }} />
      
      {/* Arms - More natural positioning */}
      <div className={`absolute top-[28%] left-[18%] w-14 h-5 bg-gradient-to-r ${barbieStyle.skinColor} rounded-full border-2 ${barbieStyle.skinBorder} -rotate-12`} />
      <div className={`absolute top-[28%] right-[18%] w-14 h-5 bg-gradient-to-l ${barbieStyle.skinColor} rounded-full border-2 ${barbieStyle.skinBorder} rotate-12`} />
      
      {/* Hands */}
      <div className={`absolute top-[30%] left-[12%] w-4 h-5 ${barbieStyle.skinColor.split(' ')[0]} rounded-full border-2 ${barbieStyle.skinBorder}`} />
      <div className={`absolute top-[30%] right-[12%] w-4 h-5 ${barbieStyle.skinColor.split(' ')[0]} rounded-full border-2 ${barbieStyle.skinBorder}`} />
      
      {/* Legs - Positioned lower */}
      <div className={`absolute bottom-[8%] left-[36%] w-7 h-36 bg-gradient-to-b ${barbieStyle.skinColor} rounded-lg border-2 ${barbieStyle.skinBorder}`} />
      <div className={`absolute bottom-[8%] right-[36%] w-7 h-36 bg-gradient-to-b ${barbieStyle.skinColor} rounded-lg border-2 ${barbieStyle.skinBorder}`} />
      
      {/* Feet */}
      <div className={`absolute bottom-[6%] left-[34%] w-8 h-4 ${barbieStyle.skinBorder.replace('border-', 'bg-')} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ borderRadius: "50% 50% 40% 40%" }} />
      <div className={`absolute bottom-[6%] right-[34%] w-8 h-4 ${barbieStyle.skinBorder.replace('border-', 'bg-')} rounded-full border-2 ${barbieStyle.skinBorder}`}
           style={{ borderRadius: "50% 50% 40% 40%" }} />
      
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
    
    // Dresses - A-line shape
    if (id.includes("dress") || id.includes("gown")) {
      return {
        ...baseStyle,
        clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
        borderRadius: "20px 20px 40px 40px",
      };
    }
    
    // Tops/Blazers - Fitted at waist
    if (id.includes("top") || id.includes("blazer") || id.includes("jacket") || id.includes("blouse")) {
      return {
        ...baseStyle,
        clipPath: "polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)",
        borderRadius: "15px 15px 10px 10px",
      };
    }
    
    // Skirts - Flared
    if (id.includes("skirt")) {
      return {
        ...baseStyle,
        clipPath: "polygon(30% 0%, 70% 0%, 90% 100%, 10% 100%)",
        borderRadius: "10px 10px 30px 30px",
      };
    }
    
    // Pants - Straight legs
    if (id.includes("pants") || id.includes("suit-pants")) {
      return {
        ...baseStyle,
        clipPath: "polygon(20% 0%, 45% 0%, 45% 100%, 35% 100%, 35% 50%, 65% 50%, 65% 100%, 55% 100%, 55% 0%, 80% 0%, 80% 100%, 70% 100%, 70% 50%, 30% 50%, 30% 100%, 20% 100%)",
        borderRadius: "10px",
      };
    }
    
    // Shorts
    if (id.includes("shorts") || id.includes("bottom")) {
      return {
        ...baseStyle,
        clipPath: "polygon(25% 0%, 48% 0%, 48% 100%, 40% 100%, 40% 50%, 60% 50%, 60% 100%, 52% 100%, 52% 0%, 75% 0%, 75% 100%, 65% 100%, 65% 50%, 35% 50%, 35% 100%, 25% 100%)",
        borderRadius: "10px 10px 20px 20px",
      };
    }
    
    // Swimsuit top
    if (id.includes("swimsuit-top")) {
      return {
        ...baseStyle,
        clipPath: "polygon(20% 20%, 80% 20%, 70% 100%, 30% 100%)",
        borderRadius: "30px 30px 15px 15px",
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
