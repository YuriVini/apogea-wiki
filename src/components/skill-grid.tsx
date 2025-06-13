import { SkillSlot } from "./skill-slot";

interface SkillsGridProps {
  buildGrid: BuildsApiTypes.BuildEquipmentData;
}

export const SkillsGrid = ({ buildGrid }: SkillsGridProps) => {
  return (
    <div className="relative">
      <div className="rounded-lg bg-gray-900/50 p-3 relative">
        <div className="flex justify-center gap-6">
          <div className="space-y-4 self-center">
            <SkillSlot
              type="armor"
              category="ring"
              equipment={buildGrid?.ring}
            />
            <SkillSlot
              type="weapon"
              equipment={buildGrid?.leftHand}
              category="sword-staff-bow-dagger-shield-glove"
              slot="leftHand"
            />
            <SkillSlot
              type="armor"
              category="necklace"
              equipment={buildGrid?.necklace}
            />
          </div>

          <div className="space-y-4 self-center">
            <SkillSlot
              type="armor"
              category="helmet"
              equipment={buildGrid?.helmet}
            />
            <SkillSlot
              type="armor"
              category="chest"
              equipment={buildGrid?.chest}
            />
            <SkillSlot
              type="armor"
              category="legs"
              equipment={buildGrid?.legs}
            />
            <SkillSlot
              type="armor"
              category="boots"
              equipment={buildGrid?.boots}
            />
          </div>

          <div className="space-y-4 self-center">
            <SkillSlot
              type="accessory"
              slot="backpack"
              category="backpack"
              equipment={buildGrid?.backpack}
            />
            <SkillSlot
              type="weapon"
              equipment={buildGrid?.rightHand}
              category="sword-staff-bow-dagger-shield-glove"
              slot="rightHand"
            />
            <SkillSlot
              type="all"
              category="all"
              slot="accessory"
              equipment={buildGrid?.accessory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
