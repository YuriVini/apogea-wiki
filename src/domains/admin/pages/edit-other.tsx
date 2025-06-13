import { useParams, Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { useOtherById, useUpdateOther } from "../../../services/other";
import type { Other } from "../../../services/other/other.d";
import { toast } from "react-toastify";

export const EditOther = () => {
  const { id } = useParams<{ id: string }>();
  console.log("id from params:", id);
  const { data: item, isLoading } = useOtherById(id || "");
  const { mutateAsync: updateOther } = useUpdateOther();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Other, "id">>({
    name: "",
    type: "drop_creatures",
    imageUrl: "",
    weight: "",
    dropBy: "",
    sellTo: "",
    description: "",
    hp: "",
    exp: "",
    abilities: "",
    loot: "",
    location: "",
    npcLocation: "",
    author: "",
    notes: "",
    text: "",
    satiateTime: "",
    buffs: "",
    requirements: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Se o backend retorna o item aninhado em item.item, use isso
    let backendItem = item;
    if (item && typeof item === "object" && "item" in item) {
      backendItem = (item as { item: Other }).item;
    }
    console.log("item from backend:", backendItem);
    if (backendItem) {
      setFormData({
        name: (backendItem as Other).name || "",
        type: (backendItem as Other).type || "drop_creatures",
        imageUrl: (backendItem as Other).imageUrl || "",
        weight: (backendItem as Other).weight || "",
        dropBy: (backendItem as Other).dropBy || "",
        sellTo: (backendItem as Other).sellTo || "",
        description: (backendItem as Other).description || "",
        hp: (backendItem as Other).hp || "",
        exp: (backendItem as Other).exp || "",
        abilities: (backendItem as Other).abilities || "",
        loot: (backendItem as Other).loot || "",
        location: (backendItem as Other).location || "",
        npcLocation: (backendItem as Other).npcLocation || "",
        author: (backendItem as Other).author || "",
        notes: (backendItem as Other).notes || "",
        text: (backendItem as Other).text || "",
        satiateTime: (backendItem as Other).satiateTime || "",
        buffs: (backendItem as Other).buffs || "",
        requirements: (backendItem as Other).requirements || "",
      });
    }
  }, [item]);

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

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center text-white text-2xl">
            Item não encontrado
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditOrSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (isEditing) {
      let backendItem = item;
      if (item && typeof item === "object" && "item" in item) {
        backendItem = (item as { item: Other }).item;
      }
      const id = (backendItem as Other)?.id;
      const payload: Partial<Other> = { ...formData, id };
      if (formData.type === "npc") {
        payload.npcLocation = formData.location;
        delete payload.location;
      } else {
        payload.npcLocation = "";
      }
      try {
        await updateOther(payload as Other);
        toast.success("Item atualizado com sucesso!");
        setIsEditing(false);
        navigate("/");
      } catch {
        toast.error("Erro ao atualizar item");
      }
    } else {
      setIsEditing(true);
    }
  };

  const typeFields: Record<
    string,
    { key: keyof Omit<Other, "id">; label: string; type?: string }[]
  > = {
    monster: [
      { key: "name", label: "Nome" },
      { key: "imageUrl", label: "URL da Imagem" },
      { key: "type", label: "Tipo" },
      { key: "hp", label: "HP" },
      { key: "exp", label: "Experiência" },
      { key: "abilities", label: "Habilidades" },
      { key: "loot", label: "Loot" },
    ],
    drop_creatures: [
      { key: "imageUrl", label: "URL da Imagem" },
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo" },
      { key: "weight", label: "Peso" },
      { key: "dropBy", label: "Drop Por" },
      { key: "sellTo", label: "Preço de Venda" },
    ],
    book: [
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo" },
      { key: "location", label: "Localização" },
      { key: "author", label: "Autor" },
      { key: "notes", label: "Notas" },
      { key: "text", label: "Texto", type: "textarea" },
    ],
    food: [
      { key: "imageUrl", label: "URL da Imagem" },
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo" },
      { key: "weight", label: "Peso" },
      { key: "dropBy", label: "Drop Por" },
      { key: "satiateTime", label: "Tempo de Saciamento" },
      { key: "buffs", label: "Buffs" },
    ],
    recipes: [
      { key: "imageUrl", label: "URL da Imagem" },
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo" },
      { key: "satiateTime", label: "Tempo de Saciamento" },
      { key: "buffs", label: "Buffs" },
      { key: "weight", label: "Peso" },
      { key: "requirements", label: "Requisitos" },
      { key: "dropBy", label: "Drop Por" },
    ],
    npc: [
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo" },
      { key: "location", label: "Localização" },
      { key: "sellTo", label: "Vender Para" },
    ],
    itens_quest: [
      { key: "imageUrl", label: "URL da Imagem" },
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo" },
      { key: "weight", label: "Peso" },
      { key: "description", label: "Descrição" },
    ],
  };

  const otherTypes = [
    "drop_creatures",
    "itens_quest",
    "monster",
    "book",
    "food",
    "recipes",
    "npc",
  ];
  const selectedType = formData.type;
  const fields = typeFields[selectedType] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-4xl font-bold text-white mr-4">
            Editar Diverso: {formData.name}
          </h1>
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt={formData.name}
              className="w-12 h-12 object-contain"
            />
          )}
        </div>
        <form
          onSubmit={handleEditOrSave}
          className="bg-gray-800/70 rounded-lg p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ key, label, type }) => (
              <div
                key={key}
                className={type === "textarea" ? "col-span-2" : ""}
              >
                <label className="block text-gray-300 mb-2 font-semibold">
                  {label}
                </label>
                {key === "type" ? (
                  <select
                    name={key}
                    value={formData[key] as string}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                  >
                    <option value="">Selecione o tipo</option>
                    {otherTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                ) : type === "textarea" ? (
                  <textarea
                    name={key}
                    value={formData[key] as string}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                    rows={3}
                  />
                ) : (
                  <input
                    type="text"
                    name={key}
                    value={formData[key] as string}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-end gap-4">
            <Link
              to="/other"
              className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-semibold"
            >
              Cancelar
            </Link>
            <button
              type="button"
              onClick={handleEditOrSave}
              className={`px-6 py-3 rounded-md font-semibold transition-colors duration-200 ${
                isEditing
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isEditing ? "Salvar" : "Editar"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
