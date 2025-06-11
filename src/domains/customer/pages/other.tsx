import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import { useParams, Link } from "react-router";
import { OtherTable } from "../../../components/other-table";
import { useState } from "react";
import { useOther, useDeleteOther } from "../../../services/other";
import { useAuth } from "../../../context/auth";
import { toast } from "react-toastify";

export const Other = () => {
  const { otherCategory } = useParams<{ otherCategory: string }>();
  const { data: otherItems, isLoading, refetch } = useOther();
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const { mutate: deleteOther } = useDeleteOther();

  if (isLoading) return <div>Loading...</div>;

  const filteredItems =
    otherItems?.items
      .filter(
        (item) =>
          item.type === otherCategory &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .sort((a, b) => a.name.localeCompare(b.name)) || [];

  const handleDeleteOther = (itemId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      deleteOther(itemId, {
        onSuccess: () => {
          refetch();
          toast.success("Item excluído com sucesso!");
        },
        onError: () => {
          toast.error("Erro ao excluir o item");
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-white text-center flex-1 animate-fade-in-down">
              Diversos
            </h1>
          </div>
          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            Conteúdo adicional e recursos diversos do Apogea.
          </p>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Buscar por nome..."
            className="p-2 rounded-lg bg-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isAdmin && (
            <Link
              to="/admin/other/create-other"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Criar Novo Item
            </Link>
          )}
        </div>
        <OtherTable
          title="Diversos"
          items={filteredItems}
          onDelete={handleDeleteOther}
        />
      </main>
      <Footer />
    </div>
  );
};
