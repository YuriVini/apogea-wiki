import { Footer } from "../../../components/footer";
import { useState, useEffect } from "react";
import { Header } from "../../../components/header";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useUpload } from "../../../hooks/uploads";
import { useEquipments } from "../../../services/equipments";
import { ItemSelector } from "../../../components/item-selector";
import { useCreateGuide } from "../../../services/guides";

interface StepImageFile {
  file: File;
  preview: string;
}

export const CreateGuide = () => {
  const navigate = useNavigate();
  const { uploadFileToS3 } = useUpload();
  const { data: equipments = [] } = useEquipments();
  const [guide, setGuide] = useState<GuidesApiTypes.Guide>({
    title: "",
    description: "",
    steps: [{ title: "", description: "" }],
    footer_text: "",
  } as GuidesApiTypes.Guide);
  const [pendingImages, setPendingImages] = useState<
    Record<number, StepImageFile>
  >({});
  const [searchTerm, setSearchTerm] = useState("");

  const { mutate: createGuide } = useCreateGuide();

  const handleUpdateGuide = (
    field: keyof GuidesApiTypes.Guide,
    value: string,
  ) => {
    setGuide((prevGuide) => ({ ...prevGuide, [field]: value }));
  };

  const handleUpdateStep = (
    index: number,
    updatedStep: GuidesApiTypes.GuideStep,
  ) => {
    const newSteps = [...guide.steps];
    newSteps[index] = updatedStep;
    setGuide({ ...guide, steps: newSteps });
  };

  const handleAddStep = () => {
    setGuide({
      ...guide,
      steps: [...guide.steps, { title: "", description: "" }],
    });
  };

  const handleRemoveStep = (index: number) => {
    const newSteps = guide.steps.filter((_, i) => i !== index);
    setGuide({ ...guide, steps: newSteps });
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

    if (property === "image_url" && pendingImages[index]) {
      URL.revokeObjectURL(pendingImages[index].preview);
      const newPendingImages = { ...pendingImages };
      delete newPendingImages[index];
      setPendingImages(newPendingImages);
    }

    setGuide({ ...guide, steps: newSteps });
  };

  const handleUpdateItems = (
    stepIndex: number,
    items: OtherApiTypes.Other[],
  ) => {
    const newSteps = [...guide.steps];
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      items: items,
    };
    setGuide({ ...guide, steps: newSteps });
  };

  const handleImageSelect = (index: number, file: File) => {
    const preview = URL.createObjectURL(file);
    setPendingImages((prev) => ({
      ...prev,
      [index]: { file, preview },
    }));
  };

  const handleCreateGuide = async () => {
    if (!guide.title.trim() || !guide.description.trim()) {
      toast.error("Por favor, preencha o título e a descrição do guia.");
      return;
    }

    if (
      guide.steps.some((step) => !step.title.trim() || !step.description.trim())
    ) {
      toast.error(
        "Por favor, preencha o título e a descrição de todos os passos.",
      );
      return;
    }

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
          items: step.items?.map((item) => item.id),
          equipments: step.equipments?.map((equipment) => equipment.id),
          hint: Array.isArray(step.hint) ? step.hint[0] : step.hint,
          note: Array.isArray(step.note) ? step.note[0] : step.note,
          benefit: Array.isArray(step.benefit) ? step.benefit[0] : step.benefit,
          advice: Array.isArray(step.advice) ? step.advice[0] : step.advice,
        })),
      };

      createGuide(updatedGuide, {
        onSuccess: (response) => {
          toast.success("Guia criado com sucesso!");
          navigate(`/guides/${response.id}`);
        },
        onError: () => {
          toast.error("Erro ao criar guia.");
        },
      });
    } catch {
      toast.error("Erro ao criar guia.");
    }
  };

  useEffect(() => {
    return () => {
      Object.values(pendingImages).forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [pendingImages]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />

      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white animate-fade-in-down">
            Criar Novo Guia
          </h1>
        </div>

        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Título do Guia:
          </label>
          <input
            type="text"
            value={guide.title}
            onChange={(e) => handleUpdateGuide("title", e.target.value)}
            className="text-2xl sm:text-4xl font-bold bg-gray-800/30 text-white rounded px-4 py-2 w-full"
            placeholder="Digite o título do guia..."
          />
        </div>

        <div className="mb-8 sm:mb-12">
          <label className="block text-white font-medium mb-2">
            Descrição:
          </label>
          <textarea
            value={guide.description}
            onChange={(e) => handleUpdateGuide("description", e.target.value)}
            className="text-gray-300 w-full bg-gray-800/30 rounded p-4"
            rows={3}
            placeholder="Digite a descrição do guia..."
          />
        </div>

        <div className="space-y-8 sm:space-y-12">
          {guide?.steps?.map((step, index) => (
            <div
              key={index}
              className="bg-gray-800/30 rounded-lg p-4 sm:p-6 transform hover:scale-[1.02] transition-all duration-300 hover:bg-gray-700/30 shadow-lg hover:shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <h3 className="text-xl font-semibold text-white mb-2 sm:mb-0">
                    Passo {index + 1}
                  </h3>
                  {guide.steps.length > 1 && (
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                    >
                      🗑️ Remover Passo
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  value={step.title}
                  onChange={(e) =>
                    handleUpdateStep(index, { ...step, title: e.target.value })
                  }
                  className="text-xl font-semibold bg-gray-800/30 text-white rounded px-3 py-2 w-full"
                  placeholder="Título do passo..."
                />

                <textarea
                  value={step.description}
                  onChange={(e) =>
                    handleUpdateStep(index, {
                      ...step,
                      description: e.target.value,
                    })
                  }
                  className="text-gray-300 w-full bg-gray-800/30 rounded p-3"
                  rows={3}
                  placeholder="Descrição do passo..."
                />

                <div className="flex flex-wrap gap-2">
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
                    onClick={() => handleToggleStepProperty(index, "items")}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.items !== undefined
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    🎒 Itens {step.items !== undefined ? "✓" : ""}
                  </button>
                  <button
                    onClick={() =>
                      handleToggleStepProperty(index, "equipments")
                    }
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.equipments !== undefined
                        ? "bg-indigo-500 text-white shadow-md"
                        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    ⚔️ Equipamentos {step.equipments !== undefined ? "✓" : ""}
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
                    onClick={() => handleToggleStepProperty(index, "benefit")}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.benefit !== undefined
                        ? "bg-green-400 text-white shadow-md"
                        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    ✨ Benefício {step.benefit !== undefined ? "✓" : ""}
                  </button>
                  <button
                    onClick={() => handleToggleStepProperty(index, "advice")}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.advice !== undefined
                        ? "bg-purple-500 text-white shadow-md"
                        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    🔮 Recomendação {step.advice !== undefined ? "✓" : ""}
                  </button>
                  <button
                    onClick={() => handleToggleStepProperty(index, "image_url")}
                    className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                      step.image_url !== undefined
                        ? "bg-indigo-500 text-white shadow-md"
                        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    🖼️ Imagem {step.image_url !== undefined ? "✓" : ""}
                  </button>
                </div>

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
                                newHints.length === 1 ? newHints[0] : newHints,
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
                          hint: newHints.length === 1 ? newHints[0] : newHints,
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
                      onItemsChange={(items) => handleUpdateItems(index, items)}
                    />
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
                                newNotes.length === 1 ? newNotes[0] : newNotes,
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
                          note: newNotes.length === 1 ? newNotes[0] : newNotes,
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
                        {(Array.isArray(step.advice) ? step.advice.length : 1) >
                          1 && (
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
                          src={pendingImages[index]?.preview || step.image_url}
                          alt={step.title}
                          className="max-h-40 rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                )}

                {step.equipments !== undefined && (
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
                      <div className="relative">
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
                                // Filter out equipment that's already in the list
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
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleAddStep}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg 
            transition-all duration-300 flex items-center gap-2
            shadow-md hover:shadow-lg hover:shadow-blue-500/30
            transform hover:scale-105 hover:-translate-y-0.5 active:translate-y-0
            font-medium
            border border-blue-400/30 hover:border-blue-300/40
            backdrop-blur-sm bg-opacity-90
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
            group w-full sm:w-auto"
          >
            <span className="text-lg group-hover:rotate-12 transition-transform duration-300">
              ➕
            </span>
            Adicionar Novo Passo
          </button>
        </div>

        <div className="mt-8">
          <label className="block text-white font-medium mb-2">
            Texto do Rodapé:
          </label>
          <textarea
            value={guide.footer_text}
            onChange={(e) => handleUpdateGuide("footer_text", e.target.value)}
            className="text-gray-300 w-full bg-gray-800/30 rounded p-4"
            rows={3}
            placeholder="Digite o texto do rodapé do guia..."
          />
        </div>
      </div>

      <button
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-full 
        transition-all duration-300 flex items-center gap-2
        shadow-lg hover:shadow-xl hover:shadow-green-500/30
        transform hover:scale-110 hover:-translate-y-1 active:translate-y-0
        font-medium text-sm
        border border-green-400/30 hover:border-green-300/40
        backdrop-blur-sm bg-opacity-90
        focus:outline-none focus:ring-2 focus:ring-green-500/50
        group z-50"
        onClick={handleCreateGuide}
      >
        <span className="text-lg group-hover:rotate-12 transition-transform duration-300">
          💾
        </span>
        Criar Guia
      </button>

      <Footer />
    </div>
  );
};
