import { useParams, useNavigate } from "react-router";
import { Footer } from "../../../components/footer";
import { useEffect, useMemo, useState } from "react";
import { Api, ApiNoAuth } from "../../../@api/axios";
import { Header } from "../../../components/header";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUpload } from "../../../hooks/uploads";
import { useAuth } from "../../../context/auth";

interface StepImageFile {
  file: File;
  preview: string;
}

export const Guide = () => {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { uploadFileToS3 } = useUpload();
  const { user, isAdmin } = useAuth();

  const [guide, setGuide] = useState<GuidesApiTypes.Guide>(
    {} as GuidesApiTypes.Guide
  );
  const canEdit = useMemo(
    () => isAdmin || user?.id === guide?.userId,
    [isAdmin, user, guide]
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [pendingImages, setPendingImages] = useState<
    Record<number, StepImageFile>
  >({});

  const fetchGuideById = async () => {
    try {
      const response = await ApiNoAuth.get(`/guides/${guideId}`);
      setGuide(response.data);
    } catch {
      toast.error("Erro ao buscar guia.");
    }
  };

  const handleEditGuide = () => {
    setIsEditing(true);
  };

  const handleImageSelect = (index: number, file: File) => {
    const preview = URL.createObjectURL(file);
    setPendingImages((prev) => ({
      ...prev,
      [index]: { file, preview },
    }));
  };

  const handleSaveGuide = async () => {
    try {
      const newSteps = [...guide.steps];
      for (const [index, imageData] of Object.entries(pendingImages)) {
        const stepIndex = parseInt(index);
        const fileName = await uploadFileToS3(imageData.file, "guides");
        newSteps[stepIndex] = { ...newSteps[stepIndex], image_url: fileName };
      }

      const updatedGuide = { ...guide, steps: newSteps };

      const response = await Api.put(`/guides/${guideId}`, updatedGuide);
      setGuide(response.data);
      setPendingImages({});
      toast.success("Guia salvo com sucesso!");
    } catch {
      toast.error("Erro ao salvar guia.");
    } finally {
      setIsEditing(false);
      setEditingStep(null);
    }
  };

  const handleDeleteGuide = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este guia? Esta ação não pode ser desfeita."
    );

    if (confirmDelete) {
      try {
        await Api.delete(`/guides/${guideId}`);
        toast.success("Guia excluído com sucesso!");
        navigate("/guides");
      } catch {
        toast.error("Erro ao excluir guia.");
      }
    }
  };

  const handleEditStep = (index: number) => {
    setEditingStep(index);
  };

  const handleFinishStepEditing = (index: number) => {
    if (pendingImages[index]) {
      const newSteps = [...guide.steps];
      newSteps[index] = {
        ...newSteps[index],
        image_url: pendingImages[index].preview,
      };
      setGuide({ ...guide, steps: newSteps });
    }
    setEditingStep(null);
  };

  const handleUpdateStep = (
    index: number,
    updatedStep: GuidesApiTypes.GuideStep
  ) => {
    const newSteps = [...guide.steps];
    newSteps[index] = updatedStep;
    setGuide({ ...guide, steps: newSteps });
  };

  const handleUpdateGuide = (
    field: keyof GuidesApiTypes.Guide,
    value: string
  ) => {
    setGuide({ ...guide, [field]: value });
  };

  const handleUpdateItems = (index: number, items: string[]) => {
    const newSteps = [...guide.steps];
    newSteps[index] = { ...newSteps[index], item: items };
    setGuide({ ...guide, steps: newSteps });
  };

  const handleRemoveItem = (stepIndex: number, itemIndex: number) => {
    const newSteps = [...guide.steps];
    const newItems = [...(newSteps[stepIndex].item || [])];
    newItems.splice(itemIndex, 1);
    newSteps[stepIndex] = { ...newSteps[stepIndex], item: newItems };
    setGuide({ ...guide, steps: newSteps });
  };

  const handleAddStep = () => {
    const newStep: GuidesApiTypes.GuideStep = {
      title: "Novo Passo",
      description: "Descrição do novo passo",
    };
    setGuide({ ...guide, steps: [...guide.steps, newStep] });
    setEditingStep(guide.steps.length);
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = [...guide.steps];
    newSteps.splice(index, 1);
    setGuide({ ...guide, steps: newSteps });
    if (editingStep === index) {
      setEditingStep(null);
    } else if (editingStep !== null && editingStep > index) {
      setEditingStep(editingStep - 1);
    }
  };

  const handleToggleStepProperty = (
    index: number,
    property: keyof GuidesApiTypes.GuideStep
  ) => {
    const step = guide.steps[index];
    const newSteps = [...guide.steps];

    if (step[property] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [property]: _, ...stepWithoutProperty } = step;
      newSteps[index] = stepWithoutProperty as GuidesApiTypes.GuideStep;
    } else {
      let defaultValue: string | string[] = "";
      if (property === "item") {
        defaultValue = [];
      }
      newSteps[index] = { ...step, [property]: defaultValue };
    }

    setGuide({ ...guide, steps: newSteps });
  };

  useEffect(() => {
    return () => {
      Object.values(pendingImages).forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [pendingImages]);

  useEffect(() => {
    fetchGuideById();
  }, []);

  return (
    <div>
      <Header />

      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          {isEditing ? (
            <input
              type="text"
              value={guide.title}
              onChange={(e) => handleUpdateGuide("title", e.target.value)}
              className="text-4xl font-bold bg-gray-800/30 text-white rounded px-2 py-1 w-full"
            />
          ) : (
            <h1 className="text-4xl font-bold text-white animate-fade-in-down">
              {guide.title}
            </h1>
          )}
          {canEdit && (
            <div className="flex gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg 
              transition-all duration-300 flex items-center gap-2
              shadow-md hover:shadow-lg hover:shadow-blue-500/30
              transform hover:scale-103 hover:-translate-y-0.5 active:translate-y-0
              font-medium text-xs
              border border-blue-400/30 hover:border-blue-300/40
              backdrop-blur-sm bg-opacity-90
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              group"
                onClick={isEditing ? handleSaveGuide : handleEditGuide}
              >
                <span className="text-base group-hover:rotate-12 transition-transform duration-300">
                  {isEditing ? "💾" : "✏️"}
                </span>
                {isEditing ? "Salvar Alterações" : "Editar"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg 
                transition-all duration-300 flex items-center gap-2
                shadow-md hover:shadow-lg hover:shadow-red-500/30
                transform hover:scale-103 hover:-translate-y-0.5 active:translate-y-0
                font-medium text-xs
                border border-red-400/30 hover:border-red-300/40
                backdrop-blur-sm bg-opacity-90
                focus:outline-none focus:ring-2 focus:ring-red-500/50
                group"
                onClick={handleDeleteGuide}
              >
                <Trash2 className="text-base group-hover:rotate-12 transition-transform duration-300" />
                Excluir Guia
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <textarea
            value={guide.description}
            onChange={(e) => handleUpdateGuide("description", e.target.value)}
            className="text-gray-300 mb-12 w-full bg-gray-800/30 rounded p-2"
            rows={3}
          />
        ) : (
          <p className="text-gray-300 mb-12 animate-fade-in-up">
            {guide.description}
          </p>
        )}

        <div className="space-y-12">
          {guide?.steps?.map((step, index) => (
            <div
              key={index}
              className="bg-gray-800/30 rounded-lg p-6 transform hover:scale-[1.02] transition-all duration-300 hover:bg-gray-700/30 shadow-lg hover:shadow-xl"
            >
              {editingStep === index ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) =>
                      handleUpdateStep(index, {
                        ...step,
                        title: e.target.value,
                      })
                    }
                    className="text-2xl font-bold bg-gray-700/30 text-white rounded px-2 py-1 w-full"
                  />
                  <textarea
                    value={step.description}
                    onChange={(e) =>
                      handleUpdateStep(index, {
                        ...step,
                        description: e.target.value,
                      })
                    }
                    className="text-gray-300 w-full bg-gray-700/30 rounded p-2"
                    rows={3}
                  />

                  <div className="border-t border-gray-600 pt-4">
                    <h4 className="text-white font-bold mb-3">
                      Propriedades do Passo:
                    </h4>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <button
                        onClick={() => handleToggleStepProperty(index, "hint")}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          step.hint !== undefined
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        💡 Dica {step.hint !== undefined ? "✓" : ""}
                      </button>
                      <button
                        onClick={() => handleToggleStepProperty(index, "item")}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          step.item !== undefined
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        🎒 Itens {step.item !== undefined ? "✓" : ""}
                      </button>
                      <button
                        onClick={() => handleToggleStepProperty(index, "note")}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          step.note !== undefined
                            ? "bg-yellow-500 text-white shadow-md"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        📝 Nota {step.note !== undefined ? "✓" : ""}
                      </button>
                      <button
                        onClick={() =>
                          handleToggleStepProperty(index, "benefit")
                        }
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          step.benefit !== undefined
                            ? "bg-green-400 text-white shadow-md"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        ✨ Benefício {step.benefit !== undefined ? "✓" : ""}
                      </button>
                      <button
                        onClick={() =>
                          handleToggleStepProperty(index, "advice")
                        }
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          step.advice !== undefined
                            ? "bg-purple-500 text-white shadow-md"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        🔮 Recomendação {step.advice !== undefined ? "✓" : ""}
                      </button>
                      <button
                        onClick={() =>
                          handleToggleStepProperty(index, "image_url")
                        }
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          step.image_url !== undefined
                            ? "bg-indigo-500 text-white shadow-md"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        🖼️ Imagem {step.image_url !== undefined ? "✓" : ""}
                      </button>
                    </div>
                  </div>

                  {step.hint !== undefined && (
                    <div className="bg-blue-900/20 p-3 rounded">
                      <label className="block text-blue-300 font-medium mb-1">
                        💡 Dica:
                      </label>
                      <input
                        type="text"
                        value={step.hint}
                        onChange={(e) =>
                          handleUpdateStep(index, {
                            ...step,
                            hint: e.target.value,
                          })
                        }
                        className="text-blue-200 w-full bg-blue-900/30 rounded p-2"
                        placeholder="Digite a dica aqui..."
                      />
                    </div>
                  )}

                  {step.item !== undefined && (
                    <div className="bg-green-900/20 p-3 rounded">
                      <label className="block text-green-300 font-medium mb-2">
                        🎒 Itens:
                      </label>
                      {step?.item?.map((item, i) => (
                        <div key={i} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const newItems = [...step.item!];
                              newItems[i] = e.target.value;
                              handleUpdateItems(index, newItems);
                            }}
                            className="text-gray-300 flex-1 bg-gray-700/30 rounded p-2"
                            placeholder="Nome do item..."
                          />
                          <button
                            onClick={() => handleRemoveItem(index, i)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 rounded transition-colors"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() =>
                          handleUpdateItems(index, [...(step.item || []), ""])
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mt-2 transition-colors"
                      >
                        + Adicionar Item
                      </button>
                    </div>
                  )}

                  {step.note !== undefined && (
                    <div className="bg-yellow-900/20 p-3 rounded">
                      <label className="block text-yellow-300 font-medium mb-1">
                        📝 Nota:
                      </label>
                      <input
                        type="text"
                        value={step.note}
                        onChange={(e) =>
                          handleUpdateStep(index, {
                            ...step,
                            note: e.target.value,
                          })
                        }
                        className="text-yellow-200 w-full bg-yellow-900/30 rounded p-2"
                        placeholder="Digite a nota aqui..."
                      />
                    </div>
                  )}

                  {step.benefit !== undefined && (
                    <div className="bg-green-900/20 p-3 rounded">
                      <label className="block text-green-300 font-medium mb-1">
                        ✨ Benefício:
                      </label>
                      <input
                        type="text"
                        value={step.benefit}
                        onChange={(e) =>
                          handleUpdateStep(index, {
                            ...step,
                            benefit: e.target.value,
                          })
                        }
                        className="text-green-200 w-full bg-green-900/30 rounded p-2"
                        placeholder="Digite o benefício aqui..."
                      />
                    </div>
                  )}

                  {step.advice !== undefined && (
                    <div className="bg-purple-900/20 p-3 rounded">
                      <label className="block text-purple-300 font-medium mb-1">
                        🔮 Recomendação:
                      </label>
                      <input
                        type="text"
                        value={step.advice}
                        onChange={(e) =>
                          handleUpdateStep(index, {
                            ...step,
                            advice: e.target.value,
                          })
                        }
                        className="text-purple-200 w-full bg-purple-900/30 rounded p-2"
                        placeholder="Digite a recomendação aqui..."
                      />
                    </div>
                  )}

                  {step.image_url !== undefined && (
                    <div className="bg-indigo-900/20 p-3 rounded">
                      <label className="block text-indigo-300 font-medium mb-1">
                        🖼️ Imagem:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageSelect(index, file);
                          }
                        }}
                        className="text-indigo-200 w-full bg-indigo-900/30 rounded p-2"
                      />
                      {(pendingImages[index]?.preview || step.image_url) && (
                        <div className="mt-2">
                          <img
                            src={
                              pendingImages[index]?.preview || step.image_url
                            }
                            alt={step.title}
                            className="max-h-40 rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t border-gray-600">
                    <button
                      onClick={() => handleFinishStepEditing(index)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      ✅ Concluir Edição
                    </button>
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded
                      transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-red-500/30
                      transform hover:scale-105 active:scale-95
                      font-medium
                      border border-red-400/30 hover:border-red-300/40
                      backdrop-blur-sm bg-opacity-90
                      focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    >
                      🗑️ Excluir Passo
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <span className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">
                      {index + 1}
                    </span>
                    {step.title}
                    {isEditing && (
                      <div className="ml-auto flex gap-2">
                        <button
                          onClick={() => handleEditStep(index)}
                          className="text-blue-400 hover:text-blue-300 flex items-center"
                        >
                          <span className="mr-1">Editar</span>
                          <span>✏️</span>
                        </button>
                        <button
                          onClick={() => handleRemoveStep(index)}
                          className="text-red-400 hover:text-red-300 flex items-center"
                        >
                          <span className="mr-1">Excluir</span>
                          <span>🗑️</span>
                        </button>
                      </div>
                    )}
                  </h2>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {step.hint && (
                    <div className="bg-blue-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300">
                      <p className="text-blue-200 flex items-center">
                        <span className="font-bold mr-2">Dica:</span>{" "}
                        {step.hint}
                      </p>
                    </div>
                  )}

                  {step.item && (
                    <div className="bg-gray-700/30 rounded p-4 mb-4 hover:bg-gray-600/30 transition-colors duration-300">
                      <p className="font-bold text-white mb-2">🎒 Itens:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {step?.item?.map((item, i) => (
                          <li
                            key={i}
                            className="hover:text-white transition-colors duration-200"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {step.note && (
                    <div className="bg-yellow-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300">
                      <p className="text-yellow-200 flex items-center">
                        <span className="font-bold mr-2">📝 Nota:</span>{" "}
                        {step.note}
                      </p>
                    </div>
                  )}

                  {step.benefit && (
                    <div className="bg-green-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300">
                      <p className="text-green-200 flex items-center">
                        <span className="font-bold mr-2">✨ Benefício:</span>{" "}
                        {step.benefit}
                      </p>
                    </div>
                  )}

                  {step.advice && (
                    <div className="bg-purple-900/30 rounded p-4 mb-4 transform hover:translate-x-2 transition-transform duration-300">
                      <p className="text-purple-200 flex items-center">
                        <span className="font-bold mr-2">Recomendação:</span>{" "}
                        {step.advice}
                      </p>
                    </div>
                  )}

                  {step.image_url && (
                    <div className="mt-4 overflow-hidden rounded-lg">
                      <img
                        src={step.image_url}
                        alt={step.title}
                        className="w-full hover:scale-105 transition-transform duration-500 rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleAddStep}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full
              transition-all duration-300 shadow-lg hover:shadow-xl
              transform hover:scale-105 hover:-translate-y-1 active:translate-y-0
              focus:outline-none focus:ring-2 focus:ring-green-500/50
              text-xl font-bold"
            >
              + Adicionar Novo Passo
            </button>
          </div>
        )}

        {isEditing ? (
          <textarea
            value={guide.footer_text}
            onChange={(e) => handleUpdateGuide("footer_text", e.target.value)}
            className="text-center mt-12 text-gray-400 italic w-full bg-gray-800/30 rounded p-2"
            rows={2}
          />
        ) : (
          <div className="text-center mt-12 text-gray-400 italic">
            {guide.footer_text}
          </div>
        )}
      </div>

      <Footer />

      <button
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full 
        transition-all duration-300 shadow-lg hover:shadow-xl
        transform hover:scale-110 hover:-translate-y-1 active:translate-y-0
        focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        onClick={isEditing ? handleSaveGuide : handleEditGuide}
      >
        <span className="text-2xl">{isEditing ? "💾" : "✏️"}</span>
      </button>
    </div>
  );
};
