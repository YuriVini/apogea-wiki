import { SkillIcon } from './skill-icon';
import { Equipment, SlotType, EQUIPMENT_DATABASE } from './equipment';

interface SkillSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (equipment: Equipment) => void;
  slotType: SlotType;
}

export const SkillSelector = ({ isOpen, onClose, onSelect, slotType }: SkillSelectorProps) => {
  if (!isOpen) return null;

  const compatibleEquipment = EQUIPMENT_DATABASE.filter(item => item.type === slotType);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-200">
            Select {slotType.charAt(0).toUpperCase() + slotType.slice(1)}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
        {compatibleEquipment.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {compatibleEquipment.map((equipment) => (
              <button
                key={equipment.name}
                onClick={() => {
                  onSelect(equipment);
                  onClose();
                }}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <SkillIcon name={equipment.name} color={equipment.color} />
                <span className="text-gray-200">{equipment.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">
            No compatible items found for this slot type.
          </p>
        )}
      </div>
    </div>
  );
};