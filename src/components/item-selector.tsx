import { useState } from "react";
import { useOther } from "../services/other";

interface ItemSelectorProps {
  selectedItems: OtherApiTypes.Other[];
  onItemsChange: (items: OtherApiTypes.Other[]) => void;
  className?: string;
}

export const ItemSelector = ({
  selectedItems,
  onItemsChange,
  className = "",
}: ItemSelectorProps) => {
  const { data: items = { items: [] } } = useOther();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="relative">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-green-900/30 text-green-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        {searchTerm && (
          <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {items.items
              .filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .filter((item) => !selectedItems?.some((i) => i.id === item.id))
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemsChange([...selectedItems, item]);
                    setSearchTerm("");
                  }}
                  className="w-full flex items-center gap-2 p-2 hover:bg-green-900/30 text-left"
                >
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-8 h-8 rounded"
                    />
                  )}
                  <span className="text-green-200">{item.name}</span>
                </button>
              ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {selectedItems.map((selectedItem, i) => {
          const item = items.items.find((item) => item.id === selectedItem.id);
          return item ? (
            <div
              key={i}
              className="flex items-center gap-2 bg-green-800/30 p-2 rounded"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-8 h-8 rounded"
                />
              )}
              <span className="text-green-200">{item.name}</span>
              <button
                onClick={() => {
                  const newItems = [...selectedItems];
                  newItems.splice(i, 1);
                  onItemsChange(newItems);
                }}
                className="ml-auto text-red-400 hover:text-red-300"
              >
                🗑️
              </button>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};
