import { SkillIcon } from "./skill-icon";
import { useEquipments } from "../services/equipments";
import { useBuilder } from "../context/builder";
import { useState } from "react";
import { EquipmentTooltip } from "./equipment-tooltip";

interface SkillSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  slotType: EquipmentsApiTypes.CategoryType;
  type: EquipmentsApiTypes.SlotType;
  category: EquipmentsApiTypes.CategoryType[];
}

export const SkillSelector = ({
  isOpen,
  onClose,
  type,
  slotType,
  category,
}: SkillSelectorProps) => {
  const { data: equipments = [], isLoading } = useEquipments();
  const { build, setBuild } = useBuilder();
  const [hoveredEquipment, setHoveredEquipment] =
    useState<EquipmentsApiTypes.Equipment | null>(null);

  if (!isOpen) return null;

  const compatibleEquipment = equipments?.filter((item) => {
    if (type === "all") {
      return ["weapon", "accessory", "backpack"].includes(
        item.type as EquipmentsApiTypes.CategoryType,
      );
    }
    if (type === "backpack") {
      return item.type === "backpack" || item.category === "backpack";
    }
    return (
      item.type === type &&
      category?.includes(item.category as EquipmentsApiTypes.CategoryType)
    );
  });

  const categoryLabel =
    category.length === 1
      ? category[0].charAt(0).toUpperCase() + category[0].slice(1)
      : "Equipment";

  const handleSelectEquipment = (equipment: EquipmentsApiTypes.Equipment) => {
    setBuild({
      ...build,
      equipment: {
        ...build?.equipment,
        [slotType]: equipment,
      },
    });
    onClose();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-200">
            Select {slotType.charAt(0).toUpperCase() + slotType.slice(1)} -{" "}
            {categoryLabel}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
        {compatibleEquipment?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {compatibleEquipment?.map((equipment) => (
              <div key={equipment?.name} className="relative">
                <button
                  onClick={() => handleSelectEquipment(equipment)}
                  onMouseEnter={() => setHoveredEquipment(equipment)}
                  onMouseLeave={() => setHoveredEquipment(null)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors w-full"
                >
                  <SkillIcon equipment={equipment} />
                  <span className="text-gray-200">{equipment?.name}</span>
                </button>
                {hoveredEquipment?.id === equipment.id && (
                  <div className="absolute left-full ml-2 top-0 z-10">
                    <EquipmentTooltip equipment={equipment} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">
            Nenhum item compatível encontrado.
          </p>
        )}
      </div>
    </div>
  );
};
