import React, { useState } from "react";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";

const experienceTable = [
  { level: 1, xp: 0 },
  { level: 2, xp: 75 },
  { level: 3, xp: 400 },
  { level: 4, xp: 1_125 },
  { level: 5, xp: 2_375 },
  { level: 6, xp: 4_375 },
  { level: 7, xp: 7_125 },
  { level: 8, xp: 11_025 },
  { level: 9, xp: 16_000 },
  { level: 10, xp: 22_275 },
  { level: 11, xp: 30_000 },
  { level: 12, xp: 39_325 },
  { level: 13, xp: 50_400 },
  { level: 14, xp: 63_375 },
  { level: 15, xp: 78_400 },
  { level: 16, xp: 95_625 },
  { level: 17, xp: 115_200 },
  { level: 18, xp: 137_275 },
  { level: 19, xp: 162_000 },
  { level: 20, xp: 189_525 },
  { level: 21, xp: 220_000 },
  { level: 22, xp: 253_575 },
  { level: 23, xp: 290_400 },
  { level: 24, xp: 330_625 },
  { level: 25, xp: 374_400 },
  { level: 26, xp: 421_875 },
  { level: 27, xp: 473_200 },
  { level: 28, xp: 528_525 },
  { level: 29, xp: 588_000 },
  { level: 30, xp: 651_775 },
  { level: 31, xp: 720_000 },
  { level: 32, xp: 792_825 },
  { level: 33, xp: 870_400 },
  { level: 34, xp: 952_875 },
  { level: 35, xp: 1_040_400 },
  { level: 36, xp: 1_133_125 },
  { level: 37, xp: 1_231_200 },
  { level: 38, xp: 1_334_775 },
  { level: 39, xp: 1_444_000 },
  { level: 40, xp: 1_559_025 },
  { level: 41, xp: 1_680_000 },
  { level: 42, xp: 1_807_075 },
  { level: 43, xp: 1_940_400 },
  { level: 44, xp: 2_080_125 },
  { level: 45, xp: 2_226_400 },
  { level: 46, xp: 2_379_375 },
  { level: 47, xp: 2_539_200 },
  { level: 48, xp: 2_706_025 },
  { level: 49, xp: 2_880_000 },
  { level: 50, xp: 3_061_275 },
  { level: 51, xp: 3_250_000 },
  { level: 52, xp: 3_446_325 },
  { level: 53, xp: 3_650_400 },
  { level: 54, xp: 3_862_375 },
  { level: 55, xp: 4_082_400 },
  { level: 56, xp: 4_310_625 },
  { level: 57, xp: 4_547_200 },
  { level: 58, xp: 4_792_275 },
  { level: 59, xp: 5_046_000 },
  { level: 60, xp: 5_308_525 },
  { level: 61, xp: 5_580_000 },
  { level: 62, xp: 5_860_575 },
  { level: 63, xp: 6_150_400 },
  { level: 64, xp: 6_449_625 },
  { level: 65, xp: 6_758_400 },
  { level: 66, xp: 7_076_875 },
  { level: 67, xp: 7_405_200 },
  { level: 68, xp: 7_743_525 },
  { level: 69, xp: 8_092_000 },
  { level: 70, xp: 8_450_775 },
  { level: 71, xp: 8_820_000 },
  { level: 72, xp: 9_199_825 },
  { level: 73, xp: 9_590_400 },
  { level: 74, xp: 9_991_875 },
  { level: 75, xp: 10_404_400 },
  { level: 76, xp: 10_828_125 },
  { level: 77, xp: 11_263_200 },
  { level: 78, xp: 11_709_775 },
  { level: 79, xp: 12_168_000 },
  { level: 80, xp: 12_638_025 },
  { level: 81, xp: 13_120_000 },
  { level: 82, xp: 13_614_075 },
  { level: 83, xp: 14_120_400 },
  { level: 84, xp: 14_639_125 },
  { level: 85, xp: 15_170_400 },
  { level: 86, xp: 15_714_375 },
  { level: 87, xp: 16_271_200 },
  { level: 88, xp: 16_841_025 },
  { level: 89, xp: 17_424_000 },
  { level: 90, xp: 18_020_275 },
  { level: 91, xp: 18_630_000 },
  { level: 92, xp: 19_253_325 },
  { level: 93, xp: 19_890_400 },
  { level: 94, xp: 20_541_375 },
  { level: 95, xp: 21_206_400 },
  { level: 96, xp: 21_885_625 },
  { level: 97, xp: 22_579_200 },
  { level: 98, xp: 23_287_275 },
  { level: 99, xp: 24_010_000 },
  { level: 100, xp: 24_747_525 },
];

function chunkArray(arr: { level: number; xp: number }[], size: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export const TableExperience = () => {
  // Divide a tabela em 5 colunas (como na imagem)
  const columns = chunkArray(experienceTable, 20);

  // Novo: estado para o nível selecionado
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const selectedInfo = experienceTable.find((e) => e.level === selectedLevel);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-4 px-1">
        <div className="w-full max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-md border border-gray-800 p-4 md:p-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-yellow-300 mb-1 text-center">
            Experiência por Nível
          </h1>
          <p className="text-gray-400 text-center mb-4 max-w-2xl mx-auto text-sm md:text-base font-light">
            Em Apogea, o sistema de níveis é ilimitado e continua escalando
            infinitamente. Porém, existe um limite suave (soft cap) próximo ao
            nível 100. Para ajudar novos jogadores, há um bônus de experiência
            especial para personagens abaixo do nível 26.
          </p>

          <div className="flex flex-col sm:flex-row mb-6">
            <div className="flex flex-1 items-center justify-end gap-2">
              <label
                htmlFor="level-select"
                className="text-gray-200 font-medium"
              >
                Escolha seu nível:
              </label>
              <input
                id="level-select"
                type="number"
                min={1}
                max={100}
                value={selectedLevel}
                onChange={(e) =>
                  setSelectedLevel(
                    Math.max(1, Math.min(100, Number(e.target.value))),
                  )
                }
                className="w-24 text-center bg-gray-800 text-yellow-200 rounded px-2 py-1 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            {selectedInfo && (
              <div className="flex-1 bg-gray-800/80 rounded px-4 py-2 flex flex-col sm:flex-row gap-2 items-center text-base font-mono">
                <span className="text-yellow-300">
                  Level: <span className="font-bold">{selectedInfo.level}</span>
                </span>
                <span className="text-orange-200">
                  XP:{" "}
                  <span className="font-bold">
                    {selectedInfo.xp.toLocaleString()}
                  </span>
                </span>
              </div>
            )}
          </div>

          <div
            className="overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-800 hover:scrollbar-thumb-yellow-300"
            style={{
              scrollbarColor: "#facc15 #1f2937",
              scrollbarWidth: "thin",
            }}
          >
            <table className="w-full border-separate border-spacing-x-4 text-xs md:text-sm rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-gray-200">
                  {columns.map((_, i) => (
                    <React.Fragment key={i}>
                      <th className="text-yellow-300 text-center py-2 font-medium">
                        Level
                      </th>
                      <th className="text-orange-200 text-center py-2 font-medium">
                        XP
                      </th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 20 }).map((_, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={
                      (rowIdx + 1) % 10 === 0
                        ? "bg-gray-800/60 font-semibold"
                        : "hover:bg-gray-800/40 transition-colors"
                    }
                  >
                    {columns.map((col, colIdx) => {
                      const item = col[rowIdx];
                      return item ? (
                        <React.Fragment key={colIdx}>
                          <td className="text-center font-mono text-yellow-100 px-1 py-1 md:py-2 text-base md:text-lg tracking-tight">
                            {item.level}
                          </td>
                          <td className="text-center font-mono text-gray-100 px-1 py-1 md:py-2 text-base md:text-lg">
                            {item.xp.toLocaleString()}
                          </td>
                        </React.Fragment>
                      ) : (
                        <React.Fragment key={colIdx}>
                          <td></td>
                          <td></td>
                        </React.Fragment>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
