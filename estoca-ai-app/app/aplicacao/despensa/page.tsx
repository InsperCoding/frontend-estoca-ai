'use client';

import { useEffect, useState } from "react";
import HeaderDepensa from "@/app/ui/header/headerDespensa";
import ItemDespensa from "@/app/ui/aplicacao/despensa/itemDespensa";

interface Item {
  Id: number;
  Img: string;
  Unidade: string;
  Qntd: number;
}

export default function Page() {
  const [itens, setItens] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [casaSelecionada, setCasaSelecionada] = useState<string>("");
  
  useEffect(() => {
    // Substitua pela sua URL real que retorna a casa selecionada do usuário
    fetch("https://api.exemplo.com/casa-selecionada")
      .then((response) => response.json())
      .then((data: { casaId?: number }) => {
        // Se data.casaId existir, usa o valor. Caso contrário, deixa vazio
        if (data && data.casaId) {
          setCasaSelecionada(String(data.casaId));
        } else {
          setCasaSelecionada("");
        }
      })
      .catch((error) =>
        console.error("Erro ao buscar casa selecionada:", error)
      );
  }, []);

  const fetchItens = async () => {
    if (casaSelecionada !== '' ) {
      try {
        // NAO SE ESQUECER DE MUDAR ESSA ENDPOINT PARA O LINK DA API
        const response = await fetch("/api/itens/" + casaSelecionada); 
        if (!response.ok) {
          throw new Error("Erro ao buscar itens da API");
        }
        const data: Item[] = await response.json();
        setItens(data);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchItens();
  }, []);


    return (
      <div>
        <HeaderDepensa></HeaderDepensa>
        <ul className="ml-8 mr-8">
          {casaSelecionada === '' ? (<p>Selecione uma casa</p>) : loading ? (
            <p>Carregando itens...</p>
          ) : itens.length > 0 ? (
            itens.map((item) => (
              <li key={item.Id}>
                <ItemDespensa
                  Id={item.Id}
                  Img={item.Img}
                  Unidade={item.Unidade}
                  Qntd={item.Qntd}
                />
              </li>
            ))
          ) : (
            <p>Despensa vazia :(</p>
          )}

          {/* Esses itens foram colocados aqui apenas para visualizar, quando o app tiver funcional tirar eles e deixar apenas a logica de cima */}
          <li key={1}>
            <ItemDespensa
              Id={1}
              Img={'/diversas.webp'}
              Unidade={'kg'}
              Qntd={6}
            />
          </li>
          <li key={1}>
            <ItemDespensa
              Id={1}
              Img={'/diversas.webp'}
              Unidade={'kg'}
              Qntd={6}
            />
          </li>

          <li key={1}>
            <ItemDespensa
              Id={1}
              Img={'/diversas.webp'}
              Unidade={'kg'}
              Qntd={6}
            />
          </li>

          <li key={1}>
            <ItemDespensa
              Id={1}
              Img={'/diversas.webp'}
              Unidade={'kg'}
              Qntd={6}
            />
          </li>

          <li key={1}>
            <ItemDespensa
              Id={1}
              Img={'/diversas.webp'}
              Unidade={'kg'}
              Qntd={6}
            />
          </li>


        
          <li><div className="h-16 w-16"></div></li>
        </ul>
      </div>
    );
  }
  