interface EquipmentTooltipProps {
  equipment: EquipmentsApiTypes.Equipment;
}

export const EquipmentTooltip = ({ equipment }: EquipmentTooltipProps) => {
  const renderStat = (label: string, value?: string) => {
    if (!value) return null;
    return (
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">{label}:</span>
        <span className="text-white">{value}</span>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <img
          src={equipment.imageUrl}
          alt={equipment.name}
          className="w-6 h-6 object-contain"
        />
        <h3 className="text-white font-semibold">{equipment.name}</h3>
      </div>

      {equipment.rarity && (
        <div className="text-sm mb-2">
          <span
            className={`text-${equipment.rarity === "legendary" ? "yellow" : equipment.rarity === "rare" ? "purple" : equipment.rarity === "magic" ? "blue" : "gray"}-400`}
          >
            {equipment.rarity.charAt(0).toUpperCase() +
              equipment.rarity.slice(1)}
          </span>
        </div>
      )}

      <div className="space-y-1">
        {renderStat("Damage", equipment.damage)}
        {renderStat("Attack Speed", equipment.attackSpeed)}
        {renderStat("Range", equipment.range)}
        {renderStat("Defense", equipment.defense)}
        {renderStat("Armor", equipment.armor)}
        {renderStat("Weight", equipment.weight)}
        {renderStat("Size", equipment.size)}
      </div>

      {equipment.attributes && (
        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="text-sm text-gray-300">{equipment.attributes}</div>
        </div>
      )}

      {(equipment.dropBy || equipment.buyFrom || equipment.sellTo) && (
        <div className="mt-2 pt-2 border-t border-gray-700">
          {equipment.dropBy && renderStat("Drops from", equipment.dropBy)}
          {equipment.buyFrom && renderStat("Buy from", equipment.buyFrom)}
          {equipment.sellTo && renderStat("Sell to", equipment.sellTo)}
        </div>
      )}
    </div>
  );
};
