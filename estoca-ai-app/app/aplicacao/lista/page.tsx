'use client';

import { useEffect, useState } from "react";
import { Filter } from "iconoir-react";
import axios from "axios";

interface Produto {
  id: string;
  nome: string;
  descricao: string;
  quantidade: number;
  unidadeMedida: string;
  checked: boolean;
}

export default function Page() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmarPressed, setIsConfirmarPressed] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [tempQuantidade, setTempQuantidade] = useState<number | null>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filteredCategoria, setFilteredCategoria] = useState<string | null>(null);

  useEffect(() => {
    const fetchListaProdutos = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) return;

      try {
        // Get current user's lista by passing the user's id.
        const listaResponse = await axios.get(
          `http://localhost:8080/listas/usuario/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const lista = listaResponse.data;
        if (lista) {
          const listaId = lista.id;
          // Fetch the products in the lista.
          const produtosResponse = await axios.get(
            `http://localhost:8080/listas/${listaId}/produtos`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          setProdutos(
            produtosResponse.data.map((produto: Produto) => ({
              ...produto,
              checked: false,
            }))
          );
        } else {
          setProdutos([]);
        }
      } catch (error) {
        console.error("Error fetching lista produtos:", error);
      }
    };

    fetchListaProdutos();
  }, []);

  const handleCreateLista = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      // Payload for creating a new lista. Adjust it as required.
      const payload = { produtosIds: [], produtosQuantidades: [] };
      const response = await axios.post("http://localhost:8080/listas", payload, {
        headers: { Authorization: token },
      });
      alert("Lista criada com sucesso!");
      // Optionally, refresh the page or update your state.
    } catch (error) {
      console.error("Error creating lista:", error);
    }
  };

  const handleEditProduto = (produto: Produto) => {
    setSelectedProduto(produto);
    setTempQuantidade(produto.quantidade);
    setIsEditModalOpen(true);
  };

  const handleSaveQuantidade = () => {
    if (selectedProduto !== null && tempQuantidade !== null) {
      setProdutos((prev) =>
        prev.map((produto) =>
          produto.id === selectedProduto.id
            ? { ...produto, quantidade: tempQuantidade }
            : produto
        )
      );
    }
    setIsEditModalOpen(false);
  };

  const handleExcluirProduto = (produto: Produto) => {
    setSelectedProduto(produto);
    setIsConfirmModalOpen(true);
  };

  const confirmExcluirProduto = () => {
    if (selectedProduto) {
      setProdutos((prev) =>
        prev.map((p) =>
          p.id === selectedProduto.id
            ? { ...p, quantidade: 0, checked: false }
            : p
        )
      );
    }
    setIsConfirmModalOpen(false);
    setSelectedProduto(null);
  };

  const cancelExcluirProduto = () => {
    setIsConfirmModalOpen(false);
    setSelectedProduto(null);
  };

  const incrementQuantidade = () => {
    if (tempQuantidade !== null) {
      setTempQuantidade(tempQuantidade + 1);
    }
  };

  const decrementQuantidade = () => {
    if (tempQuantidade !== null && tempQuantidade > 0) {
      setTempQuantidade(tempQuantidade - 1);
    }
  };

  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
    if (isFilterActive) {
      setFilteredCategoria(null);
    }
  };

  const filterByCategoria = (categoria: string) => {
    setFilteredCategoria(categoria);
  };

  const displayedProdutos = filteredCategoria
    ? produtos.filter((produto) => produto.descricao === filteredCategoria)
    : produtos;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section with Filter and Create Lista Button */}
      <div className="flex items-center justify-between p-8 bg-white">
        <h2 className="text-3xl font-bold text-cinza1">Lista</h2>
        <div className="flex space-x-4">
          <button
            onClick={toggleFilter}
            className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors duration-300 ${
              isFilterActive ? "bg-azul1 text-white" : "bg-white text-gray-800 border"
            }`}
          >
            <Filter
              onClick={toggleFilter}
              className={`text-base ${isFilterActive ? "text-white" : "text-gray-800"}`}
            />
          </button>
          <button
            onClick={handleCreateLista}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
          >
            Criar Lista
          </button>
        </div>
      </div>

      {/* Filter Bar with Transition Effects */}
      <div
        className={`flex space-x-2 overflow-x-auto p-4 bg-white sm:flex-wrap sm:overflow-visible sm:justify-start gap-2 md:justify-center 
          transition-all duration-300 ease-in-out transform 
          ${isFilterActive ? "opacity-100 translate-y-0 max-h-40" : "opacity-0 -translate-y-5 max-h-0 overflow-hidden"}`}
      >
        <button
          onClick={() => filterByCategoria("Hortifruti")}
          className={`px-2 py-1 rounded-md border text-sm ${
            filteredCategoria === "Hortifruti"
              ? "border-azul1 text-azul1"
              : "border-black text-black bg-white"
          }`}
          aria-pressed={filteredCategoria === "Hortifruti"}
        >
          Hortifruti
        </button>
        <button
          onClick={() => filterByCategoria("Padaria")}
          className={`px-2 py-1 rounded-md border text-sm ${
            filteredCategoria === "Padaria"
              ? "border-azul1 text-azul1"
              : "border-black text-black bg-white"
          }`}
          aria-pressed={filteredCategoria === "Padaria"}
        >
          Padaria
        </button>
        <button
          onClick={() => filterByCategoria("Acougue")}
          className={`px-2 py-1 rounded-md border text-sm ${
            filteredCategoria === "Acougue"
              ? "border-azul1 text-azul1"
              : "border-black text-black bg-white"
          }`}
          aria-pressed={filteredCategoria === "Acougue"}
        >
          Acougue
        </button>
        <button
          onClick={() => filterByCategoria("Peixaria")}
          className={`px-2 py-1 rounded-md border text-sm ${
            filteredCategoria === "Peixaria"
              ? "border-azul1 text-azul1"
              : "border-black text-black bg-white"
          }`}
          aria-pressed={filteredCategoria === "Peixaria"}
        >
          Peixaria
        </button>
        <button
          onClick={() => setFilteredCategoria(null)}
          className="px-2 py-1 rounded-md bg-red-500 text-white border border-gray-800"
          aria-pressed={false}
        >
          Limpar
        </button>
      </div>

      {/* Produtos List */}
      <div className="flex-1 p-8">
        <ul className="space-y-4">
          {displayedProdutos.length === 0 ? (
            <p>Sem produtos para exibir.</p>
          ) : (
            displayedProdutos.map((produto) => (
              <li
                key={produto.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center space-x-4">
                  {/* Customized Select Button */}
                  <button
                    onClick={() =>
                      setProdutos((prev) =>
                        prev.map((p) =>
                          p.id === produto.id ? { ...p, checked: !p.checked } : p
                        )
                      )
                    }
                    className={`w-5 h-5 rounded-md border-2 border-azul1 transition-colors duration-300 ${
                      produto.checked ? "bg-azul1" : "bg-white"
                    }`}
                    aria-label={produto.checked ? "Deselect item" : "Select item"}
                  ></button>
                  <p className="text-lg font-medium">{produto.nome}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <p>
                    {produto.quantidade} {produto.unidadeMedida}
                  </p>
                  <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => handleEditProduto(produto)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-600 hover:text-black"
                    onClick={() => handleExcluirProduto(produto)}
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Confirmar Compra Button */}
      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => setIsConfirmarPressed(true)}
          className="bg-white border border-azul1 text-azul1 px-6 py-3 rounded-md font-medium hover:bg-azul1 hover:text-white transition-colors duration-300"
        >
          Confirmar Compra
        </button>
      </div>

      {/* Pop up Confirmar Compra */}
      {isConfirmarPressed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Confirmar Compra</h3>
            <p>Tem certeza que deseja confirmar a compra?</p>
            <div className="flex flex-col items-center space-y-4 mt-4">
              <button
                onClick={() => {
                  setProdutos((prev) =>
                    prev.map((produto) => ({ ...produto, checked: false }))
                  );
                  setIsConfirmarPressed(false);
                }}
                className="px-4 py-2 bg-white text-azul1 border border-azul1 rounded-md hover:bg-azul1 hover:text-white transition-colors duration-300"
              >
                Sim, e adciona-los a despensa
              </button>
              <button
                onClick={() => {
                  setProdutos((prev) =>
                    prev.map((produto) => ({ ...produto, checked: false }))
                  );
                  setIsConfirmarPressed(false);
                }}
                className="px-4 py-2 bg-white text-azul1 border border-azul1 rounded-md hover:bg-azul1 hover:text-white transition-colors duration-300"
              >
                Sim, e não adciona-los a despensa
              </button>
              <button
                onClick={() => setIsConfirmarPressed(false)}
                className="px-4 py-2 bg-white text-red-500 border border-red-500 rounded-md hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedProduto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">{selectedProduto.nome}</h3>
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={decrementQuantidade}
                className="px-4 py-2 border rounded-md"
              >
                -
              </button>
              <input
                type="number"
                className="text-center border rounded-md w-16"
                value={tempQuantidade ?? ""}
                onChange={(e) => setTempQuantidade(Number(e.target.value))}
              />
              <button
                onClick={incrementQuantidade}
                className="px-4 py-2 border rounded-md"
              >
                +
              </button>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-white text-azul1 border border-azul1 rounded-md hover:bg-azul1 hover:text-white transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveQuantidade}
                className="px-4 py-2 bg-azul1 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Alterar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Exclude Modal */}
      {isConfirmModalOpen && selectedProduto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-xl font-semibold mb-4">Confirmar Exclusão</h3>
            <p>Tem certeza que deseja excluir "{selectedProduto.nome}"?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={cancelExcluirProduto}
                className="px-4 py-2 bg-white text-azul1 border border-azul1 rounded-md hover:bg-azul1 hover:text-white transition-colors duration-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmExcluirProduto}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}