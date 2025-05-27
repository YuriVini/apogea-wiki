import { 
  Zap, 
  Target, 
  Sparkles, 
  Ghost, 
  Smile 
} from 'lucide-react';

interface SkillIconProps {
  name: string;
  color: string;
  className?: string;
}

export const SkillIcon = ({ name, color, className = '' }: SkillIconProps) => {
  const getIcon = () => {
    switch (name) {
      case 'Penetrating Shot':
        return <Zap size={18} />;
      case 'Trickshot':
        return <Target size={18} />;
      case 'Preparation':
        return <Sparkles size={18} />;
      case 'Shadow Clone':
        return <Ghost size={18} />;
      case 'Shadow Clown':
        return <Smile size={18} />;
      default:
        return <Zap size={18} />;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'red':
        return 'bg-red-900 border-red-500 text-red-300';
      case 'blue':
        return 'bg-blue-900 border-blue-500 text-blue-300';
      case 'green':
        return 'bg-green-900 border-green-500 text-green-300';
      case 'purple':
        return 'bg-purple-900 border-purple-500 text-purple-300';
      case 'yellow':
        return 'bg-yellow-900 border-yellow-500 text-yellow-300';
      default:
        return 'bg-gray-900 border-gray-500 text-gray-300';
    }
  };

  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border ${getColorClasses()} ${className}`}>
      {getIcon()}
    </span>
  );
};