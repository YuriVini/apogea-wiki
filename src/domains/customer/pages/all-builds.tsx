import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { useState, useEffect, useMemo } from "react";
import { ApiNoAuth } from "../../../@api/axios";
import { Link } from "react-router";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useDeleteBuild } from "../../../services/builds";
import { useNavigate } from "react-router";
import { useAuth } from "../../../context/auth";

export const AllBuilds = () => {
  const [builds, setBuilds] = useState<BuildsApiTypes.BuildData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const { mutate: deleteBuild } = useDeleteBuild();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  const fetchBuilds = async () => {
    try {
      const response = await ApiNoAuth.get("/builds");
      setBuilds(response.data);
    } catch {
      toast.error("Erro ao carregar builds.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBuild = async (buildId: string) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir esta build? Esta ação não pode ser desfeita.",
      )
    ) {
      deleteBuild(buildId!, {
        onSuccess: () => {
          setBuilds(builds.filter((build) => build.id !== buildId));
          toast.success("Build excluída com sucesso!");
          navigate("/builds");
        },
        onError: () => {
          toast.error("Erro ao excluir build. Tente novamente.");
        },
      });
    }
  };

  useEffect(() => {
    fetchBuilds();
  }, []);

  const filteredBuilds = useMemo(
    () =>
      selectedClass === "all"
        ? builds
        : builds.filter((build) => build.characterClass === selectedClass),
    [builds, selectedClass],
  );

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white text-center mb-4 animate-fade-in-down">
              Todas as Builds
            </h1>
            <p className="text-gray-300 text-center">
              Explore nossa coleção completa de builds para melhorar sua
              experiência no jogo
            </p>
          </div>

          {!loading && builds.length > 0 && (
            <div className="mb-6">
              <label
                htmlFor="classFilter"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Filtrar por Classe:
              </label>
              <select
                id="classFilter"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-md text-white py-2 px-3 w-full max-w-xs"
              >
                <option value="all">Todas as Classes</option>
                <option value="Squire">Squire</option>
                <option value="Knight">Knight</option>
                <option value="Mage">Mage</option>
                <option value="Rogue">Rogue</option>
              </select>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-white text-xl">Carregando builds...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBuilds.map((build) => (
                <div
                  key={build.id}
                  className="bg-gray-800/30 rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700/30 hover:shadow-xl relative group"
                >
                  {(isAdmin || user?.id === build?.userId) && (
                    <button
                      onClick={() => handleDeleteBuild(build.id)}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg hover:shadow-red-500/30"
                      title="Excluir build"
                    >
                      <Trash2 />
                    </button>
                  )}

                  <Link to={`/builds/${build.id}`} className="block">
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 pr-12">
                      {build.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {build.overview}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                      <span>{build.characterClass}</span>
                      <span className="text-blue-400 hover:text-blue-300 transition-colors">
                        Ver build →
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Criado por: {build?.author || "Usuário Desconhecido"}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredBuilds.length === 0 && (
            <div className="text-center py-3">
              <p className="text-gray-300 mb-4">
                Nenhuma build encontrada para a classe selecionada.
              </p>
              <Link
                to="/builds/create"
                className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                Criar Primeira Build
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
