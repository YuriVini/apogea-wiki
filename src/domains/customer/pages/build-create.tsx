import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { SkillsGrid } from "../../../components/skill-grid";
import { Trash2 } from "lucide-react";
import { useCreateBuild } from "../../../services/builds";
import { useBuilder } from "../../../context/builder";
import { useNavigate } from "react-router";
import { statLabels } from "../../../constants/caracter-class-database";
import { StatField } from "../../../components/stat-field";
import { useEffect } from "react";

export const BuildCreate = () => {
  const navigate = useNavigate();
  const { build: buildData, setBuild, setIsEditing } = useBuilder();
  const { mutate: createBuild } = useCreateBuild();

  useEffect(() => {
    setIsEditing(true);
  }, []);

  const handleInputChange = (
    field: keyof BuildsApiTypes.BuildData,
    value: string,
  ) => {
    setBuild((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatUpdate = (
    field: keyof BuildsApiTypes.BuildData["characterStats"],
    increment: boolean,
  ) => {
    setBuild((prev) => ({
      ...prev,
      characterStats: {
        ...prev.characterStats,
        [field]: increment
          ? (prev.characterStats[field] as number) + 1
          : Math.max(0, (prev.characterStats[field] as number) - 1),
      },
    }));
  };

  const handleArrayUpdate = (
    field: keyof Pick<BuildsApiTypes.BuildData, "equipment" | "strategy">,
    action: "add" | "delete" | "edit",
    index?: number,
    value?: string,
  ) => {
    setBuild((prev) => {
      const array = prev[field] as string[];
      switch (action) {
        case "add":
          return { ...prev, [field]: [...array, ""] };
        case "delete":
          return { ...prev, [field]: array.filter((_, i) => i !== index) };
        case "edit":
          return {
            ...prev,
            [field]: array.map((item, i) => (i === index ? value! : item)),
          };
        default:
          return prev;
      }
    });
  };

  const handleCreateBuild = () => {
    createBuild(
      {
        title: buildData?.title,
        overview: buildData?.overview,
        strategy: buildData?.strategy,
        characterClass: buildData?.characterClass,
        characterStats: buildData?.characterStats,
        equipment: {
          accessory: buildData?.equipment?.accessory?.id,
          backpack: buildData?.equipment?.backpack?.id,
          chest: buildData?.equipment?.chest?.id,
          helmet: buildData?.equipment?.helmet?.id,
          legs: buildData?.equipment?.legs?.id,
          boots: buildData?.equipment?.boots?.id,
          leftHand: buildData?.equipment?.leftHand?.id,
          rightHand: buildData?.equipment?.rightHand?.id,
          ring: buildData?.equipment?.ring?.id,
          necklace: buildData?.equipment?.necklace?.id,
        },
      },
      {
        onSuccess: (data) => {
          navigate(`/builds/${data.buildId}`);
          setIsEditing(false);
        },
      },
    );
  };

  if (!buildData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <input
              type="text"
              value={buildData?.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="text-4xl font-bold text-center text-blue-400 bg-gray-800 border border-gray-600 rounded px-4 py-2 w-full sm:w-auto sm:flex-1 sm:mr-4 mb-4 sm:mb-0"
            />
            <button
              onClick={handleCreateBuild}
              className="w-full sm:w-auto px-6 py-2 rounded-lg font-semibold transition-colors bg-green-600 hover:bg-green-700 text-white"
            >
              Criar Build
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
              Visão Geral
            </h2>
            <textarea
              value={buildData?.overview}
              onChange={(e) => handleInputChange("overview", e.target.value)}
              className="w-full text-gray-300 bg-gray-700 border border-gray-600 rounded px-4 py-2 leading-relaxed resize-vertical min-h-[100px]"
            />
          </div>

          <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">
              Pontos de Skill
            </h2>
            <div className="flex flex-col lg:flex-row justify-evenly bg-gray-900 rounded-lg p-4 border border-gray-600">
              <div className="w-full lg:w-1/4 space-y-2 mb-4 lg:mb-0">
                {Object?.entries(buildData?.characterStats)?.map(
                  ([field, value]) => {
                    if (!statLabels[field]) return null;
                    return (
                      <StatField
                        key={field}
                        value={value}
                        isEditing={true}
                        label={statLabels[field]}
                        onIncrement={() =>
                          handleStatUpdate(
                            field as keyof BuildsApiTypes.BuildData["characterStats"],
                            true,
                          )
                        }
                        onDecrement={() =>
                          handleStatUpdate(
                            field as keyof BuildsApiTypes.BuildData["characterStats"],
                            false,
                          )
                        }
                      />
                    );
                  },
                )}

                <div className="flex flex-1 justify-between items-center py-1">
                  <span className="text-white font-semibold">Your Class:</span>
                  <select
                    value={buildData?.characterClass}
                    onChange={(e) =>
                      handleInputChange("characterClass", e.target.value)
                    }
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-32 text-white"
                  >
                    {["Squire", "Knight", "Mage", "Rogue"].map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-1 justify-center">
                <SkillsGrid buildGrid={buildData?.equipment} />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-cyan-400">
                Estratégia de Combate
              </h3>
              <button
                onClick={() => handleArrayUpdate("strategy", "add")}
                className="text-green-400 hover:text-green-300 text-sm"
              >
                ➕
              </button>
            </div>
            <ul className="space-y-2 text-gray-300">
              {buildData?.strategy?.map((strategyItem, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between"
                >
                  <div className="flex items-start sm:items-center flex-1 mb-2 sm:mb-0">
                    <span className="text-cyan-400 mr-2 mt-1 sm:mt-0">💡</span>
                    <textarea
                      value={strategyItem}
                      onChange={(e) =>
                        handleArrayUpdate(
                          "strategy",
                          "edit",
                          index,
                          e.target.value,
                        )
                      }
                      className="bg-gray-700 border border-gray-600 rounded px-2 py-1 flex-1 resize-vertical min-h-[60px] w-full sm:w-auto"
                    />
                  </div>
                  <button
                    onClick={() =>
                      handleArrayUpdate("strategy", "delete", index)
                    }
                    className="ml-0 sm:ml-2 text-red-400 hover:text-red-300 text-sm"
                  >
                    <Trash2 />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
