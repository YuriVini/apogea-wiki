import { useState } from "react";
import { SkillSelector } from "./skill-selector";
import { useBuilder } from "../context/builder";
import { EquipmentTooltip } from "./equipment-tooltip";

interface SkillSlotProps {
  type: EquipmentsApiTypes.SlotType;
  size?: "normal" | "small";
  equipment?: EquipmentsApiTypes.Equipment;
  category?: EquipmentsApiTypes.CategoryType;
  slot?: EquipmentsApiTypes.CategoryType;
}

export const SkillSlot = ({
  type = "weapon",
  category = "chest",
  size = "normal",
  equipment,
  slot,
}: SkillSlotProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { isEditing } = useBuilder();

  const sizeClasses = size === "small" ? "w-8 h-8" : "w-16 h-16";

  const slotLabel = category
    ? category === "weapon-staff-bow-dagger-shield-glove"
      ? category?.split("-")?.join(" ")
      : `${category.charAt(0).toUpperCase() + category.slice(1)} Slot`
    : "Equipment Slot";

  const categoryToSort =
    category === "weapon-staff-bow-dagger-shield-glove"
      ? (category?.split("-") as EquipmentsApiTypes.CategoryType[])
      : [category];

  const imageUrl = equipment?.imageUrl;

  const handlePressSlot = () => {
    if (isEditing) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={handlePressSlot}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`
            ${sizeClasses} 
            rounded-lg 
            border-2 
            flex 
            items-center 
            justify-center 
            transition-all 
            duration-200 
            hover:brightness-125
            cursor-pointer
            relative
            group
          `}
        >
          <div>
            <img src={imageUrl} alt={equipment?.name} className="h-10 w-10" />
          </div>
          <div className="absolute -top-8 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-xs text-gray-300 px-2 py-1 rounded whitespace-nowrap">
            {slotLabel}
          </div>
        </button>
        {showTooltip && equipment && (
          <div className="absolute left-full ml-2 top-0 z-10">
            <EquipmentTooltip equipment={equipment} />
          </div>
        )}
      </div>

      <SkillSelector
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        slotType={slot || category}
        type={type}
        category={categoryToSort}
      />
    </>
  );
};
