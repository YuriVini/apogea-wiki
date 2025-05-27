import { Zap, Target, Sparkles, Ghost, Shield, Hand, Bot as Boot, Crown } from 'lucide-react';
import { useState } from 'react';
import { SkillSelector } from './skill-selector';
import { SlotType, Equipment } from './equipment';

interface SkillSlotProps {
  type: SlotType;
  rarity: 'common' | 'magic' | 'rare' | 'legendary';
  color: 'gray' | 'green' | 'blue' | 'purple' | 'red' | 'yellow';
  filled?: boolean;
  size?: 'normal' | 'small';
  initialEquipment?: Equipment;
}

export const SkillSlot = ({ 
  type = 'weapon',
  rarity, 
  color, 
  filled = true, 
  size = 'normal',
  initialEquipment
}: SkillSlotProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(initialEquipment || null);

  const getIcon = () => {
    if (!selectedEquipment) return null;
    
    switch (selectedEquipment.icon) {
      case 'Zap': return <Zap size={size === 'small' ? 16 : 24} />;
      case 'Target': return <Target size={size === 'small' ? 16 : 24} />;
      case 'Sparkles': return <Sparkles size={size === 'small' ? 16 : 24} />;
      case 'Ghost': return <Ghost size={size === 'small' ? 16 : 24} />;
      case 'Shield': return <Shield size={size === 'small' ? 16 : 24} />;
      case 'Hand': return <Hand size={size === 'small' ? 16 : 24} />;
      case 'Boot': return <Boot size={size === 'small' ? 16 : 24} />;
      case 'Crown': return <Crown size={size === 'small' ? 16 : 24} />;
      default: return null;
    }
  };

  const getBorderColor = () => {
    const currentColor = selectedEquipment?.color || color;
    switch (currentColor) {
      case 'gray': return 'border-gray-500';
      case 'green': return 'border-green-500';
      case 'blue': return 'border-blue-500';
      case 'purple': return 'border-purple-500';
      case 'red': return 'border-red-500';
      case 'yellow': return 'border-yellow-500';
      default: return 'border-gray-500';
    }
  };

  const getBackgroundColor = () => {
    if (!filled && !selectedEquipment) return 'bg-transparent';
    
    const currentColor = selectedEquipment?.color || color;
    switch (currentColor) {
      case 'gray': return 'bg-gray-800';
      case 'green': return 'bg-green-900/60';
      case 'blue': return 'bg-blue-900/60';
      case 'purple': return 'bg-purple-900/60';
      case 'red': return 'bg-red-900/60';
      case 'yellow': return 'bg-yellow-900/60';
      default: return 'bg-gray-800';
    }
  };

  const getTextColor = () => {
    const currentColor = selectedEquipment?.color || color;
    switch (currentColor) {
      case 'gray': return 'text-gray-300';
      case 'green': return 'text-green-300';
      case 'blue': return 'text-blue-300';
      case 'purple': return 'text-purple-300';
      case 'red': return 'text-red-300';
      case 'yellow': return 'text-yellow-300';
      default: return 'text-gray-300';
    }
  };

  const getShadowEffect = () => {
    if (!filled && !selectedEquipment) return '';
    
    const currentRarity = selectedEquipment?.rarity || rarity;
    switch (currentRarity) {
      case 'legendary': return 'shadow-lg shadow-purple-500/30';
      case 'rare': return 'shadow-md shadow-blue-500/20';
      case 'magic': return 'shadow-sm shadow-green-500/10';
      default: return '';
    }
  };

  const sizeClasses = size === 'small' ? 'w-8 h-8' : 'w-16 h-16';

  const slotLabel = type ? `${type.charAt(0).toUpperCase() + type.slice(1)} Slot` : 'Equipment Slot';

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className={`
          ${sizeClasses} 
          rounded-lg 
          border-2 
          ${getBorderColor()} 
          ${getBackgroundColor()} 
          ${getShadowEffect()}
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
        <div className={getTextColor()}>
          {getIcon()}
        </div>
        <div className="absolute -top-8 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-xs text-gray-300 px-2 py-1 rounded whitespace-nowrap">
          {slotLabel}
        </div>
      </button>

      <SkillSelector
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={setSelectedEquipment}
        slotType={type}
      />
    </>
  );
};