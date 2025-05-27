import { SkillSlot } from './skill-slot';
import { EQUIPMENT_DATABASE } from './equipment';


export const SkillsGrid = () => {
  const initialEquipment = {
    preparation: EQUIPMENT_DATABASE.find(e => e.name === 'Preparation'),
    penetratingShot: EQUIPMENT_DATABASE.find(e => e.name === 'Penetrating Shot'),
    shadowClone: EQUIPMENT_DATABASE.find(e => e.name === 'Shadow Clone'),
  };

  return (
    <div className="relative">
      <div className="border-2 border-gray-700 rounded-lg bg-gray-900/50 p-3 relative">
        <div className="absolute top-5 right-8 text-4xl text-gray-400 font-medieval">
          Rogue
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
          <div className="space-y-4">
            <SkillSlot type="backpack" rarity="legendary" color="purple" initialEquipment={initialEquipment.preparation} />
            <SkillSlot type="weapon" rarity="rare" color="blue" initialEquipment={initialEquipment.penetratingShot} />
            <SkillSlot type="accessory" rarity="magic" color="green" initialEquipment={initialEquipment.shadowClone} />
            <SkillSlot type="boots" rarity="common" color="gray" />
            <SkillSlot type="gloves" rarity="common" color="gray" />
          </div>

          <div className="space-y-4">
            <SkillSlot type="helmet" rarity="magic" color="green" />
            <SkillSlot type="chest" rarity="rare" color="blue" />
            <SkillSlot type="pants" rarity="magic" color="green" />
            <SkillSlot type="weapon" rarity="rare" color="blue" />
            <SkillSlot type="accessory" rarity="legendary" color="purple" />
          </div>

          <div className="space-y-4">
            <SkillSlot type="weapon" rarity="rare" color="blue" />
            <SkillSlot type="backpack" rarity="legendary" color="purple" />
            <SkillSlot type="accessory" rarity="magic" color="green" />
            <SkillSlot type="boots" rarity="common" color="gray" filled={false} />
            <div className="flex justify-end space-x-2">
              <SkillSlot type="gloves" rarity="rare" color="blue" size="small" />
              <SkillSlot type="helmet" rarity="legendary" color="purple" size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
