import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { useCreateOther } from "../../../services/other";
import type { Other } from "../../../services/other/other.d";
import { toast } from "react-toastify";

export const CreateOther = () => {
  const navigate = useNavigate();
  const { mutateAsync: createOther } = useCreateOther();
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
    author: "",
    notes: "",
    text: "",
    satiateTime: "",
    buffs: "",
    requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sempre envie npcLocation
    const payload: Partial<Other> = { ...formData };

    if (formData.type === "npc") {
      payload.npcLocation = formData.location;
      delete payload.location;
    } else {
      payload.npcLocation = "";
    }

    try {
      const result = await createOther(payload as Omit<Other, "id">);
      toast.success("Item criado com sucesso!");
      navigate(`/other/${result.id}`);
    } catch {
      toast.error("Erro ao criar item");
    }
  };

  const handleChange = (
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

  // Campos por tipo, de acordo com as colunas das tabelas do OtherTable
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

  // Determina os campos a exibir de acordo com o type selecionado
  const selectedType = formData.type;
  const fields = typeFields[selectedType] || [];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Criar Novo Item
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div
                key={field.key}
                className={field.type === "textarea" ? "col-span-2" : ""}
              >
                <label className="block text-gray-300 mb-2">
                  {field.label}
                </label>
                {field.key === "type" ? (
                  <select
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    required
                  >
                    <option value="drop_creatures">Drop Creatures</option>
                    <option value="itens_quest">Itens Quest</option>
                    <option value="monster">Monster</option>
                    <option value="book">Book</option>
                    <option value="food">Food</option>
                    <option value="recipes">Recipes</option>
                    <option value="npc">NPC</option>
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    rows={4}
                  />
                ) : (
                  <input
                    type="text"
                    name={field.key}
                    value={formData[field.key]}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 rounded text-white"
                    required={field.key === "name"}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Criar Item
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};
