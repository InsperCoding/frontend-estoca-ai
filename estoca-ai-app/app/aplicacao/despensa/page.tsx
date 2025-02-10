'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import HeaderDepensa from "@/app/ui/header/headerDespensa";
import ItemDespensa from "@/app/ui/aplicacao/despensa/itemDespensa";

interface Produto {
  Id: string;
  Img: string;
  Nome: string;
  Qntd: number;
  CasaId: string;
}

export default function Page() {
  const [itens, setItens] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [casaSelecionada, setCasaSelecionada] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Buscar casa selecionada pelo usuário
  useEffect(() => {
    const fetchCasaSelecionada = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Usuário não autenticado.");
          return;
        }

        setError(null); // Resetar erro antes da requisição

        const response = await axios.get("http://localhost:8080/users/details", {
          headers: { Authorization: `${token}` },
        });

        setCasaSelecionada(response.data.casaEscolhida || null);
      } catch (err) {
        console.error("Erro ao buscar casa selecionada:", err);
        setError("Falha ao carregar a casa selecionada.");
      }
    };

    fetchCasaSelecionada();
  }, []);

  // Buscar itens da despensa da casa selecionada
  useEffect(() => {
    const fetchItens = async () => {
      if (!casaSelecionada) return;

      try {
        setLoading(true);
        setError(null); // Resetar erro antes da requisição

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Usuário não autenticado.");
          setLoading(false);
          return;
        }

        // Buscar a despensa da casa para obter os IDs e quantidades dos produtos
        const despensaResponse = await axios.get(`http://localhost:8080/casas/${casaSelecionada}/despensa`, {
          headers: { Authorization: `${token}` },
        });

        const { produtosIds, produtosQuantidades } = despensaResponse.data;
        if (!produtosIds || produtosIds.length === 0) {
          setItens([]);
          setLoading(false);
          return;
        }

        // Buscar os detalhes dos produtos com base nos IDs
        const produtosResponse = await axios.post("http://localhost:8080/produtos/getByIds", {
          ids: produtosIds
        }, {
          headers: { Authorization: `${token}` },
        });

        const produtosDetalhes = produtosResponse.data; // Lista de produtos com imagem e nome

        // Combinar os produtos com suas respectivas quantidades
        const produtosFormatados = produtosDetalhes.map((produto: any, index: number) => ({
          Id: produto._id,
          Img: produto.imagemb64,
          Nome: produto.nome,
          Qntd: produtosQuantidades[index] || 0, // Garantindo que a quantidade corresponda
          CasaId: casaSelecionada, // Passando CasaId para o ItemDespensa
        }));

        setItens(produtosFormatados);
      } catch (err) {
        console.error("Erro ao buscar itens da despensa:", err);
        setError("Falha ao carregar os itens da despensa.");
      } finally {
        setLoading(false);
      }
    };

    fetchItens();
  }, [casaSelecionada]);

  return (
    <div>
      <HeaderDepensa />
      <ul className="ml-8 mr-8">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <p>Carregando itens...</p>
        ) : itens.length > 0 ? (
          itens.map((item) => (
            <li key={item.Id}>
              <ItemDespensa 
                Id={item.Id} 
                Img={item.Img} 
                Nome={item.Nome} 
                Qntd={item.Qntd} 
                CasaId={item.CasaId} // Agora o item sabe de qual casa ele pertence
              />
            </li>
          ))
        ) : (
          <p>Despensa vazia :(</p>
        )}
      </ul>
    </div>
  );
}
