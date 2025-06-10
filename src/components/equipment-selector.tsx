import { useState, useEffect, useRef } from "react";
import { Equipment } from "../services/equipments/equipments.d";

interface EquipmentSelectorProps {
  equipments: Equipment[];
  onSelect: (equipmentId: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const EquipmentSelector = ({
  equipments,
  onSelect,
  onClose,
  isOpen,
}: EquipmentSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredEquipments = equipments.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        Math.min(prev + 1, filteredEquipments.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filteredEquipments[selectedIndex]) {
      e.preventDefault();
      onSelect(filteredEquipments[selectedIndex].id);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-gray-800 rounded-lg p-4 w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar equipamento..."
            className="flex-1 bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          {filteredEquipments.length === 0 ? (
            <div className="text-gray-400 text-center py-4">
              Nenhum equipamento encontrado
            </div>
          ) : (
            <div className="space-y-1">
              {filteredEquipments.map((equipment, index) => (
                <button
                  key={equipment.id}
                  onClick={() => onSelect(equipment.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded transition-colors ${
                    index === selectedIndex
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <img
                    src={equipment.imageUrl}
                    alt={equipment.name}
                    className="w-8 h-8 rounded"
                  />
                  <span>{equipment.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
