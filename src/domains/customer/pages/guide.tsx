import { useParams, useNavigate } from "react-router";
import { Footer } from "../../../components/footer";
import { useEffect, useMemo, useState } from "react";
import { Api, ApiNoAuth } from "../../../@api/axios";
import { Header } from "../../../components/header";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useUpload } from "../../../hooks/uploads";
import { useAuth } from "../../../context/auth";
import { useEquipments } from "../../../services/equipments";
import { ItemSelector } from "../../../components/item-selector";
import { useUpdateGuide } from "../../../services/guides";

interface StepImageFile {
  file: File;
  preview: string;
}

export const Guide = () => {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { uploadFileToS3 } = useUpload();
  const { user, isAdmin } = useAuth();
  const { data: equipments = [] } = useEquipments();

  const [guide, setGuide] = useState<GuidesApiTypes.Guide>(
    {} as GuidesApiTypes.Guide,
  );
  const canEdit = useMemo(
    () => isAdmin || user?.id === guide?.userId,
    [isAdmin, user, guide],
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [pendingImages, setPendingImages] = useState<
    Record<number, StepImageFile>
  >({});
  const [searchTerm, setSearchTerm] = useState("");

  const { mutate: updateGuide } = useUpdateGuide();

  const fetchGuideById = async () => {
    try {
      const response = await ApiNoAuth.get(`/guides/${guideId}`);
      setGuide(response.data?.guide);
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

      const updatedGuide = {
        ...guide,
        steps: newSteps.map((step) => ({
          ...step,
          equipments: step.equipments?.map((equipment) => equipment.id),
          items: step.items?.map((item) => item.id),
          hint: Array.isArray(step.hint) ? step.hint[0] : step.hint,
          note: Array.isArray(step.note) ? step.note[0] : step.note,
          benefit: Array.isArray(step.benefit) ? step.benefit[0] : step.benefit,
          advice: Array.isArray(step.advice) ? step.advice[0] : step.advice,
        })),
      };

      updateGuide(updatedGuide, {
        onSuccess: (response) => {
          toast.success("Guia salvo com sucesso!");
          setGuide(response);
          setPendingImages({});
          setIsEditing(false);
          setEditingStep(null);
        },
        onError: () => {
          setPendingImages({});
          toast.error("Erro ao salvar guia.");
        },
      });
    } catch {
      toast.error("Erro ao salvar guia.");
    }
  };

  const handleDeleteGuide = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este guia? Esta ação não pode ser desfeita.",
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
    updatedStep: GuidesApiTypes.GuideStep,
  ) => {
    const newSteps = [...guide.steps];
    newSteps[index] = updatedStep;
    setGuide({ ...guide, steps: newSteps });
  };

  const handleUpdateGuide = (
    field: keyof GuidesApiTypes.Guide,
    value: string,
  ) => {
    setGuide({ ...guide, [field]: value });
  };

  const handleUpdateItems = (index: number, items: OtherApiTypes.Other[]) => {
    const newSteps = [...guide.steps];
    newSteps[index] = { ...newSteps[index], items: items };
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
    property: keyof GuidesApiTypes.GuideStep,
  ) => {
    const step = guide.steps[index];
    const newSteps = [...guide.steps];

    if (step[property] !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [property]: _, ...stepWithoutProperty } = step;
      newSteps[index] = stepWithoutProperty as GuidesApiTypes.GuideStep;
    } else {
      let defaultValue: string | string[] = "";
      if (property === "items" || property === "equipments") {
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

      <div className="min-h-screen max-w-4xl mx-auto p-8">
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
                        onClick={() => {
                          if (!step.items) {
                            handleUpdateItems(index, []);
                          } else {
                            handleToggleStepProperty(index, "items");
                          }
                        }}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          step.items !== undefined
                            ? "bg-green-500 text-white shadow-md"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        🎒 Itens {step.items !== undefined ? "✓" : ""}
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
                      <button
                        onClick={() => {
                          if (!step.equipments) {
                            handleUpdateStep(index, {
                              ...step,
                              equipments: [],
                            });
                          } else {
                            handleToggleStepProperty(index, "equipments");
                          }
                        }}
                        className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                          step?.equipments !== undefined
                            ? "bg-indigo-500 text-white shadow-md"
                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                        }`}
                      >
                        ⚔️ Equipamentos{" "}
                        {step?.equipments !== undefined ? "✓" : ""}
                      </button>
                    </div>
                  </div>

                  {step?.equipments !== undefined && (
                    <div className="bg-indigo-900/20 p-3 rounded mt-4">
                      <label className="block text-indigo-300 font-medium mb-1">
                        ⚔️ Equipamentos:
                      </label>
                      <div className="space-y-2">
                        {step?.equipments?.map((equipmentId, i) => {
                          const equipment = equipments.find(
                            (eq) =>
                              eq.id ===
                              (typeof equipmentId === "string"
                                ? equipmentId
                                : equipmentId.id),
                          );
                          return equipment ? (
                            <div
                              key={i}
                              className="flex items-center gap-2 bg-indigo-800/30 p-2 rounded"
                            >
                              <img
                                src={equipment?.imageUrl}
                                alt={equipment?.name}
                                className="w-8 h-8 rounded"
                              />
                              <span className="text-indigo-200">
                                {equipment?.name}
                              </span>
                              <button
                                onClick={() => {
                                  const newEquipmentIds = [
                                    ...(step?.equipments || []),
                                  ];
                                  newEquipmentIds.splice(i, 1);
                                  handleUpdateStep(index, {
                                    ...step,
                                    equipments: newEquipmentIds,
                                  });
                                }}
                                className="ml-auto text-red-400 hover:text-red-300"
                              >
                                🗑️
                              </button>
                            </div>
                          ) : null;
                        })}
                        <div className="relative mt-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Buscar equipamento..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="flex-1 bg-indigo-900/30 text-indigo-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                              onClick={() => {
                                const newStep = { ...step };
                                if (!newStep?.equipments) {
                                  newStep.equipments = [];
                                }
                                handleUpdateStep(index, newStep);
                              }}
                              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
                            >
                              <span>+</span>
                              <span>Adicionar</span>
                            </button>
                          </div>
                          {searchTerm && (
                            <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {equipments
                                .filter((equipment) =>
                                  equipment.name
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase()),
                                )
                                .filter((equipment) => {
                                  const equipmentIds =
                                    step?.equipments?.map((eq) =>
                                      typeof eq === "string" ? eq : eq.id,
                                    ) || [];
                                  return !equipmentIds.includes(equipment.id);
                                })
                                .map((equipment) => (
                                  <button
                                    key={equipment.id}
                                    onClick={() => {
                                      handleUpdateStep(index, {
                                        ...step,
                                        equipments: [
                                          ...(step?.equipments || []),
                                          equipment,
                                        ],
                                      });
                                      setSearchTerm("");
                                    }}
                                    className="w-full flex items-center gap-2 p-2 hover:bg-indigo-900/30 text-left"
                                  >
                                    <img
                                      src={equipment.imageUrl}
                                      alt={equipment.name}
                                      className="w-8 h-8 rounded"
                                    />
                                    <span className="text-indigo-200">
                                      {equipment.name}
                                    </span>
                                  </button>
                                ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step.hint !== undefined && (
                    <div className="bg-blue-900/20 p-3 rounded">
                      <label className="block text-blue-300 font-medium mb-1">
                        💡 Dica:
                      </label>
                      {(Array.isArray(step.hint)
                        ? step.hint
                        : [step.hint || ""]
                      ).map((hintValue, hintIdx) => (
                        <div
                          key={hintIdx}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input
                            type="text"
                            value={hintValue}
                            onChange={(e) => {
                              const newHints = Array.isArray(step.hint)
                                ? [...step.hint]
                                : [step.hint || ""];
                              newHints[hintIdx] = e.target.value;
                              handleUpdateStep(index, {
                                ...step,
                                hint:
                                  newHints.length === 1
                                    ? newHints[0]
                                    : newHints,
                              });
                            }}
                            className="text-blue-200 w-full bg-blue-900/30 rounded p-2"
                            placeholder="Digite a dica aqui..."
                          />
                          {(Array.isArray(step.hint) ? step.hint.length : 1) >
                            1 && (
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-300 px-2"
                              onClick={() => {
                                const newHints = (
                                  Array.isArray(step.hint)
                                    ? [...step.hint]
                                    : [step.hint || ""]
                                ).filter((_, i) => i !== hintIdx);
                                handleUpdateStep(index, {
                                  ...step,
                                  hint:
                                    newHints.length === 1
                                      ? newHints[0]
                                      : newHints,
                                });
                              }}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-1 px-2 py-1 bg-blue-700 text-white rounded hover:bg-blue-600 text-xs"
                        onClick={() => {
                          const newHints = Array.isArray(step.hint)
                            ? [...step.hint, ""]
                            : [step.hint || "", ""];
                          handleUpdateStep(index, {
                            ...step,
                            hint:
                              newHints.length === 1 ? newHints[0] : newHints,
                          });
                        }}
                      >
                        + Adicionar Dica
                      </button>
                    </div>
                  )}

                  {step.items !== undefined && (
                    <div className="bg-green-900/20 p-3 rounded">
                      <label className="block text-green-300 font-medium mb-2">
                        🎒 Itens:
                      </label>
                      <ItemSelector
                        selectedItems={step.items as OtherApiTypes.Other[]}
                        onItemsChange={(items) =>
                          handleUpdateItems(index, items)
                        }
                      />
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {step.items &&
                          (step.items as OtherApiTypes.Other[]).map(
                            (item, i) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-2 bg-green-800/30 p-2 rounded"
                              >
                                {item.imageUrl && (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-8 h-8 rounded"
                                  />
                                )}
                                <span className="text-green-200">
                                  {item.name}
                                </span>
                                <button
                                  onClick={() => {
                                    const newItems = [
                                      ...(step.items as OtherApiTypes.Other[]),
                                    ];
                                    newItems.splice(i, 1);
                                    handleUpdateItems(index, newItems);
                                  }}
                                  className="ml-auto text-red-400 hover:text-red-300"
                                >
                                  🗑️
                                </button>
                              </div>
                            ),
                          )}
                      </div>
                    </div>
                  )}

                  {step.note !== undefined && (
                    <div className="bg-yellow-900/20 p-3 rounded">
                      <label className="block text-yellow-300 font-medium mb-1">
                        📝 Nota:
                      </label>
                      {(Array.isArray(step.note)
                        ? step.note
                        : [step.note || ""]
                      ).map((noteValue, noteIdx) => (
                        <div
                          key={noteIdx}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input
                            type="text"
                            value={noteValue}
                            onChange={(e) => {
                              const newNotes = Array.isArray(step.note)
                                ? [...step.note]
                                : [step.note || ""];
                              newNotes[noteIdx] = e.target.value;
                              handleUpdateStep(index, {
                                ...step,
                                note:
                                  newNotes.length === 1
                                    ? newNotes[0]
                                    : newNotes,
                              });
                            }}
                            className="text-yellow-200 w-full bg-yellow-900/30 rounded p-2"
                            placeholder="Digite a nota aqui..."
                          />
                          {(Array.isArray(step.note) ? step.note.length : 1) >
                            1 && (
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-300 px-2"
                              onClick={() => {
                                const newNotes = (
                                  Array.isArray(step.note)
                                    ? [...step.note]
                                    : [step.note || ""]
                                ).filter((_, i) => i !== noteIdx);
                                handleUpdateStep(index, {
                                  ...step,
                                  note:
                                    newNotes.length === 1
                                      ? newNotes[0]
                                      : newNotes,
                                });
                              }}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-1 px-2 py-1 bg-yellow-700 text-white rounded hover:bg-yellow-600 text-xs"
                        onClick={() => {
                          const newNotes = Array.isArray(step.note)
                            ? [...step.note, ""]
                            : [step.note || "", ""];
                          handleUpdateStep(index, {
                            ...step,
                            note:
                              newNotes.length === 1 ? newNotes[0] : newNotes,
                          });
                        }}
                      >
                        + Adicionar Nota
                      </button>
                    </div>
                  )}

                  {step.benefit !== undefined && (
                    <div className="bg-green-900/20 p-3 rounded">
                      <label className="block text-green-300 font-medium mb-1">
                        ✨ Benefício:
                      </label>
                      {(Array.isArray(step.benefit)
                        ? step.benefit
                        : [step.benefit || ""]
                      ).map((benefitValue, benefitIdx) => (
                        <div
                          key={benefitIdx}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input
                            type="text"
                            value={benefitValue}
                            onChange={(e) => {
                              const newBenefits = Array.isArray(step.benefit)
                                ? [...step.benefit]
                                : [step.benefit || ""];
                              newBenefits[benefitIdx] = e.target.value;
                              handleUpdateStep(index, {
                                ...step,
                                benefit:
                                  newBenefits.length === 1
                                    ? newBenefits[0]
                                    : newBenefits,
                              });
                            }}
                            className="text-green-200 w-full bg-green-900/30 rounded p-2"
                            placeholder="Digite o benefício aqui..."
                          />
                          {(Array.isArray(step.benefit)
                            ? step.benefit.length
                            : 1) > 1 && (
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-300 px-2"
                              onClick={() => {
                                const newBenefits = (
                                  Array.isArray(step.benefit)
                                    ? [...step.benefit]
                                    : [step.benefit || ""]
                                ).filter((_, i) => i !== benefitIdx);
                                handleUpdateStep(index, {
                                  ...step,
                                  benefit:
                                    newBenefits.length === 1
                                      ? newBenefits[0]
                                      : newBenefits,
                                });
                              }}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-1 px-2 py-1 bg-green-700 text-white rounded hover:bg-green-600 text-xs"
                        onClick={() => {
                          const newBenefits = Array.isArray(step.benefit)
                            ? [...step.benefit, ""]
                            : [step.benefit || "", ""];
                          handleUpdateStep(index, {
                            ...step,
                            benefit:
                              newBenefits.length === 1
                                ? newBenefits[0]
                                : newBenefits,
                          });
                        }}
                      >
                        + Adicionar Benefício
                      </button>
                    </div>
                  )}

                  {step.advice !== undefined && (
                    <div className="bg-purple-900/20 p-3 rounded">
                      <label className="block text-purple-300 font-medium mb-1">
                        🔮 Recomendação:
                      </label>
                      {(Array.isArray(step.advice)
                        ? step.advice
                        : [step.advice || ""]
                      ).map((adviceValue, adviceIdx) => (
                        <div
                          key={adviceIdx}
                          className="flex items-center gap-2 mb-2"
                        >
                          <input
                            type="text"
                            value={adviceValue}
                            onChange={(e) => {
                              const newAdvices = Array.isArray(step.advice)
                                ? [...step.advice]
                                : [step.advice || ""];
                              newAdvices[adviceIdx] = e.target.value;
                              handleUpdateStep(index, {
                                ...step,
                                advice:
                                  newAdvices.length === 1
                                    ? newAdvices[0]
                                    : newAdvices,
                              });
                            }}
                            className="text-purple-200 w-full bg-purple-900/30 rounded p-2"
                            placeholder="Digite a recomendação aqui..."
                          />
                          {(Array.isArray(step.advice)
                            ? step.advice.length
                            : 1) > 1 && (
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-300 px-2"
                              onClick={() => {
                                const newAdvices = (
                                  Array.isArray(step.advice)
                                    ? [...step.advice]
                                    : [step.advice || ""]
                                ).filter((_, i) => i !== adviceIdx);
                                handleUpdateStep(index, {
                                  ...step,
                                  advice:
                                    newAdvices.length === 1
                                      ? newAdvices[0]
                                      : newAdvices,
                                });
                              }}
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        className="mt-1 px-2 py-1 bg-purple-700 text-white rounded hover:bg-purple-600 text-xs"
                        onClick={() => {
                          const newAdvices = Array.isArray(step.advice)
                            ? [...step.advice, ""]
                            : [step.advice || "", ""];
                          handleUpdateStep(index, {
                            ...step,
                            advice:
                              newAdvices.length === 1
                                ? newAdvices[0]
                                : newAdvices,
                          });
                        }}
                      >
                        + Adicionar Recomendação
                      </button>
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

                  {step.items && step.items.length > 0 && (
                    <div className="bg-gray-700/30 rounded p-4 mb-4 hover:bg-gray-600/30 transition-colors duration-300">
                      <p className="font-bold text-white mb-2">🎒 Itens:</p>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 flex flex-wrap gap-2">
                        {step?.items?.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 bg-gray-700/30 hover:bg-gray-600/30 p-2 px-4 rounded transition-colors"
                          >
                            <img
                              src={item?.imageUrl}
                              alt={item?.name}
                              className="w-8 h-8 rounded-full"
                            />
                            {item?.name}
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

                  {step.equipments && step.equipments.length > 0 && (
                    <div className="mt-4 bg-indigo-900/30 rounded p-4">
                      <p className="font-bold text-white mb-2">
                        ⚔️ Equipamentos:
                      </p>
                      <div className=" md:grid-cols-3 gap-3 flex flex-wrap">
                        {step.equipments.map((equipmentId) => {
                          const equipment = equipments.find(
                            (eq) =>
                              eq.id ===
                              (typeof equipmentId === "string"
                                ? equipmentId
                                : equipmentId.id),
                          );
                          return equipment ? (
                            <div
                              key={equipment.id}
                              className="flex items-center gap-2 bg-indigo-800/30 p-2 px-4 rounded hover:bg-indigo-700/30 transition-colors"
                            >
                              <img
                                src={equipment.imageUrl}
                                alt={equipment.name}
                                className="w-8 h-8 rounded"
                              />
                              <span className="text-indigo-200">
                                {equipment.name}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
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

      {canEdit && (
        <button
          className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full 
        transition-all duration-300 shadow-lg hover:shadow-xl
        transform hover:scale-110 hover:-translate-y-1 active:translate-y-0
        focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          onClick={isEditing ? handleSaveGuide : handleEditGuide}
        >
          <span className="text-2xl">{isEditing ? "💾" : "✏️"}</span>
        </button>
      )}
    </div>
  );
};
