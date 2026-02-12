"use client";

import { useState } from "react";

type Event = "Beach" | "Dinner" | "Work" | "Wedding" | null;
type Tool = "color" | "stamp";

interface ClothingPart {
  id: string;
  color: string;
  stamps: { icon: string; x: number; y: number; id: string }[];
}

const COLORS = ["#FF00FF", "#00FFFF", "#FFFF00", "#FF69B4", "#7FFF00"];
const STAMPS = ["❤️", "⭐", "🌸"];

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<number>(0);
  const [selectedTool, setSelectedTool] = useState<Tool>("color");
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [selectedStamp, setSelectedStamp] = useState<string>(STAMPS[0]);
  const [clothingParts, setClothingParts] = useState<Record<string, ClothingPart>>({});

  const events: Event[] = ["Beach", "Dinner", "Work", "Wedding"];

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
      setClothingParts((prev) => ({
        ...prev,
        [partId]: {
          ...prev[partId],
          id: partId,
          color: selectedColor,
          stamps: prev[partId]?.stamps || [],
        },
      }));
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
    alert("🖨️ Printing your fabulous design! ✨");
  };

  const handleReset = () => {
    setSelectedEvent(null);
    setSelectedOutfit(0);
    setClothingParts({});
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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-teal-400 p-4">
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
                      onClick={() => setSelectedColor(color)}
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
      {/* Hair - Long flowing blonde hair */}
      <div className="absolute top-[3%] left-1/2 -translate-x-1/2 w-32 h-40 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-t-full border-4 border-yellow-500" 
           style={{ clipPath: "ellipse(50% 60% at 50% 40%)" }} />
      <div className="absolute top-[15%] left-[20%] w-16 h-32 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full border-2 border-yellow-500" 
           style={{ transform: "rotate(-10deg)" }} />
      <div className="absolute top-[15%] right-[20%] w-16 h-32 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-full border-2 border-yellow-500" 
           style={{ transform: "rotate(10deg)" }} />
      
      {/* Head - Oval face shape */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-24 h-28 bg-gradient-to-b from-pink-100 to-pink-200 rounded-full border-4 border-pink-300" 
           style={{ borderRadius: "50% 50% 45% 45%" }} />
      
      {/* Eyes */}
      <div className="absolute top-[12%] left-[40%] w-3 h-4 bg-blue-600 rounded-full border-2 border-blue-800" />
      <div className="absolute top-[12%] right-[40%] w-3 h-4 bg-blue-600 rounded-full border-2 border-blue-800" />
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
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-10 h-8 bg-gradient-to-b from-pink-200 to-pink-100 border-2 border-pink-300" />
      
      {/* Body - Hourglass figure */}
      <div className="absolute top-[26%] left-1/2 -translate-x-1/2 w-20 h-28 bg-gradient-to-b from-pink-100 to-pink-200 border-4 border-pink-300" 
           style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 40%, 85% 100%, 15% 100%, 0% 40%)" }} />
      
      {/* Arms - More natural positioning */}
      <div className="absolute top-[28%] left-[18%] w-14 h-5 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full border-2 border-pink-300 -rotate-12" />
      <div className="absolute top-[28%] right-[18%] w-14 h-5 bg-gradient-to-l from-pink-100 to-pink-200 rounded-full border-2 border-pink-300 rotate-12" />
      
      {/* Hands */}
      <div className="absolute top-[30%] left-[12%] w-4 h-5 bg-pink-100 rounded-full border-2 border-pink-300" />
      <div className="absolute top-[30%] right-[12%] w-4 h-5 bg-pink-100 rounded-full border-2 border-pink-300" />
      
      {/* Legs - Positioned lower */}
      <div className="absolute bottom-[8%] left-[36%] w-7 h-36 bg-gradient-to-b from-pink-100 to-pink-200 rounded-lg border-2 border-pink-300" />
      <div className="absolute bottom-[8%] right-[36%] w-7 h-36 bg-gradient-to-b from-pink-100 to-pink-200 rounded-lg border-2 border-pink-300" />
      
      {/* Feet */}
      <div className="absolute bottom-[6%] left-[34%] w-8 h-4 bg-pink-300 rounded-full border-2 border-pink-400" 
           style={{ borderRadius: "50% 50% 40% 40%" }} />
      <div className="absolute bottom-[6%] right-[34%] w-8 h-4 bg-pink-300 rounded-full border-2 border-pink-400" 
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
