import {
  useEquipments,
  useUpdateEquipment,
} from "../../../services/equipments";
import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";

export const Edit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { name } = useParams<{ name: string }>();
  const { data: equipments } = useEquipments();
  const { mutate: updateEquipment } = useUpdateEquipment();
  const [equipment, setEquipment] =
    useState<EquipmentsApiTypes.Equipment | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        if (equipments && name) {
          const foundEquipment = equipments.find((eq) => eq.name === name);
          if (foundEquipment) {
            setEquipment(foundEquipment);
          }
        }
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fetchEquipment();
  }, [equipments, name]);

  const handleInputChange = (
    field: keyof EquipmentsApiTypes.Equipment,
    value: string | number,
  ) => {
    setEquipment((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  const handleSaveEditEquipment = () => {
    if (isEditing && equipment) {
      updateEquipment(
        {
          id: equipment.id,
          name: equipment.name,
          type: equipment.type,
          category: equipment.category,
          imageUrl: equipment.imageUrl,
          size: equipment.size,
          armor: equipment.armor,
          range: equipment.range,
          damage: equipment.damage,
          weight: equipment.weight,
          dropBy: equipment.dropBy,
          rarity: equipment.rarity,
          sellTo: equipment.sellTo,
          buyFrom: equipment.buyFrom,
          defense: equipment.defense,
          attributes: equipment.attributes,
          attackSpeed: equipment.attackSpeed,
        },
        {
          onSuccess: () => {
            setIsEditing(false);
          },
        },
      );
    } else {
      setIsEditing(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center text-white text-2xl animate-pulse">
            Carregando...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!equipment && !isLoading) {
    return (
      <div className="text-center text-red-400 mt-10">
        Equipamento não encontrado ou categoria inválida.
      </div>
    );
  }
  if (!equipment) {
    return null;
  }

  const rarities = ["common", "uncommon", "rare", "epic", "legendary"];

  // Mapeamento de campos por categoria
  const categoryFieldsMap: Record<string, string[]> = {
    sword: [
      "name",
      "damage",
      "attackSpeed",
      "range",
      "defense",
      "attributes",
      "size",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    dagger: [
      "name",
      "damage",
      "attackSpeed",
      "range",
      "defense",
      "attributes",
      "size",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    bow: [
      "name",
      "damage",
      "attackSpeed",
      "range",
      "defense",
      "attributes",
      "size",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    staff: [
      "name",
      "damage",
      "attackSpeed",
      "range",
      "defense",
      "attributes",
      "size",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    shield: [
      "name",
      "defense",
      "attributes",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    helmet: [
      "name",
      "armor",
      "attributes",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    chest: [
      "name",
      "armor",
      "attributes",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    legs: [
      "name",
      "armor",
      "attributes",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    boots: [
      "name",
      "armor",
      "attributes",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    glove: [
      "name",
      "armor",
      "attributes",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    necklace: ["name", "attributes", "weight", "dropBy", "buyFrom", "sellTo"],
    ring: ["name", "attributes", "weight", "dropBy", "buyFrom", "sellTo"],
    backpack: ["name", "attributes", "weight", "dropBy", "buyFrom", "sellTo"],
    book: ["name", "attributes", "weight", "dropBy", "buyFrom", "sellTo"],
    "class-abilities": [
      "name",
      "attributes",
      "weight",
      "dropBy",
      "buyFrom",
      "sellTo",
    ],
    all: ["name", "attributes", "weight", "dropBy", "buyFrom", "sellTo"],
  };

  // Determina os campos a exibir com base na categoria selecionada
  const fieldsToDisplay =
    categoryFieldsMap[equipment.category] ||
    Object.keys(equipment).filter((key) => key !== "id");

  const typeToCategories: Record<
    EquipmentsApiTypes.SlotType,
    EquipmentsApiTypes.CategoryType[]
  > = {
    weapon: ["sword", "dagger", "bow", "staff"],
    armor: ["glove", "shield", "helmet", "chest", "legs", "boots"],
    accessory: ["necklace", "ring"],
    spell: ["book"],
    ability: ["class-abilities"],
    backpack: ["backpack"],
    all: ["all"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center flex-1">
              {equipment.imageUrl && (
                <img
                  src={equipment.imageUrl}
                  alt={equipment.name}
                  className="w-16 h-16 object-contain rounded-lg mr-4 border border-gray-700 bg-gray-900"
                />
              )}
              {isEditing ? (
                <input
                  type="text"
                  value={equipment.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="text-4xl font-bold text-blue-400 bg-gray-800 border border-gray-600 rounded px-4 py-2 flex-1"
                />
              ) : (
                <h1 className="text-4xl font-bold text-blue-400 flex-1">
                  {equipment.name}
                </h1>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveEditEquipment}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  isEditing
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isEditing ? "Salvar" : "Editar"}
              </button>
              <Link
                to={`/`}
                className="px-6 py-2 rounded-lg font-semibold transition-colors bg-gray-600 hover:bg-gray-700 text-white"
              >
                Voltar
              </Link>
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">
                  type
                </label>
                <select
                  value={equipment.type}
                  onChange={(e) => {
                    const slotType = e.target
                      .value as EquipmentsApiTypes.SlotType;
                    const firstCategory = typeToCategories[
                      slotType
                    ][0] as EquipmentsApiTypes.CategoryType;
                    setEquipment(
                      (prev) =>
                        prev && {
                          ...prev,
                          type: slotType,
                          category: firstCategory,
                        },
                    );
                  }}
                  disabled={!isEditing}
                  className="w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                >
                  {Object.keys(typeToCategories).map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2 font-semibold">
                  category
                </label>
                <select
                  value={equipment.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  disabled={!isEditing}
                  className="w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                >
                  {typeToCategories[
                    equipment.type as EquipmentsApiTypes.SlotType
                  ].map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              {fieldsToDisplay
                .filter((key) => key !== "type" && key !== "category")
                .map((key) => {
                  const value =
                    equipment[key as keyof EquipmentsApiTypes.Equipment];
                  return (
                    <div key={key}>
                      <label className="block text-gray-300 mb-2 font-semibold">
                        {key}
                      </label>
                      {key === "rarity" ? (
                        <select
                          value={value as string}
                          onChange={(e) =>
                            handleInputChange(
                              key as keyof EquipmentsApiTypes.Equipment,
                              e.target.value,
                            )
                          }
                          disabled={!isEditing}
                          className="w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                        >
                          {rarities.map((rarity) => (
                            <option key={rarity} value={rarity}>
                              {rarity}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={value as string}
                          onChange={(e) =>
                            handleInputChange(
                              key as keyof EquipmentsApiTypes.Equipment,
                              e.target.value,
                            )
                          }
                          disabled={!isEditing}
                          className="w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                          placeholder={`Enter ${key}`}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
