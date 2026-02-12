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
              style={{ top: "25%", left: "35%", width: "30%", height: "15%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="swimsuit-bottom"
              label="Bottom"
              style={{ top: "42%", left: "37%", width: "26%", height: "12%" }}
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
            style={{ top: "25%", left: "30%", width: "40%", height: "45%" }}
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
              style={{ top: "25%", left: "32%", width: "36%", height: "20%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="surf-shorts"
              label="Shorts"
              style={{ top: "47%", left: "35%", width: "30%", height: "18%" }}
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
            style={{ top: "25%", left: "32%", width: "36%", height: "40%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else if (outfitIndex === 1) {
        return (
          <ClothingPart
            id="evening-gown"
            label="Evening Gown"
            style={{ top: "25%", left: "30%", width: "40%", height: "50%" }}
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
              style={{ top: "25%", left: "32%", width: "36%", height: "25%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="pantsuit-pants"
              label="Pants"
              style={{ top: "52%", left: "35%", width: "30%", height: "25%" }}
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
              style={{ top: "25%", left: "32%", width: "36%", height: "25%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="suit-skirt"
              label="Skirt"
              style={{ top: "52%", left: "37%", width: "26%", height: "18%" }}
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
              style={{ top: "25%", left: "35%", width: "30%", height: "20%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="pencil-skirt"
              label="Pencil Skirt"
              style={{ top: "47%", left: "37%", width: "26%", height: "25%" }}
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
              style={{ top: "25%", left: "32%", width: "36%", height: "25%" }}
              clothingParts={clothingParts}
              onPartClick={onPartClick}
            />
            <ClothingPart
              id="work-pants"
              label="Trousers"
              style={{ top: "52%", left: "35%", width: "30%", height: "25%" }}
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
            style={{ top: "25%", left: "28%", width: "44%", height: "55%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else if (outfitIndex === 1) {
        return (
          <ClothingPart
            id="bridesmaid-dress"
            label="Bridesmaid Dress"
            style={{ top: "25%", left: "30%", width: "40%", height: "48%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      } else {
        return (
          <ClothingPart
            id="elegant-dress"
            label="Elegant Dress"
            style={{ top: "25%", left: "32%", width: "36%", height: "45%" }}
            clothingParts={clothingParts}
            onPartClick={onPartClick}
          />
        );
      }
    }
  };

  return (
    <div className="relative w-96 h-[600px] bg-white/20 rounded-3xl border-8 border-white/40 backdrop-blur-sm">
      {/* Barbie Head */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-20 h-24 bg-pink-200 rounded-full border-4 border-pink-300" />
      
      {/* Hair */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-24 h-20 bg-yellow-400 rounded-t-full border-4 border-yellow-500" />
      
      {/* Body */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-16 h-24 bg-pink-200 rounded-lg border-4 border-pink-300" />
      
      {/* Arms */}
      <div className="absolute top-[25%] left-[28%] w-12 h-4 bg-pink-200 rounded-full border-2 border-pink-300 -rotate-45" />
      <div className="absolute top-[25%] right-[28%] w-12 h-4 bg-pink-200 rounded-full border-2 border-pink-300 rotate-45" />
      
      {/* Legs */}
      <div className="absolute bottom-[15%] left-[38%] w-6 h-32 bg-pink-200 rounded-lg border-2 border-pink-300" />
      <div className="absolute bottom-[15%] right-[38%] w-6 h-32 bg-pink-200 rounded-lg border-2 border-pink-300" />
      
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

  return (
    <div
      className="absolute cursor-pointer border-4 border-purple-900 rounded-lg hover:ring-4 hover:ring-yellow-300 transition-all"
      style={{ ...style, backgroundColor: color }}
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
