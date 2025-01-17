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


 // NAO SE ESQUECER DE MUDAR ESSA ENDPOINT PARA O LINK DA API
  const fetchItens = async () => {
    try {
      const response = await fetch("/api/itens"); 
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
  };

  useEffect(() => {
    fetchItens();
  }, []);

    return (
      <div>
        <HeaderDepensa></HeaderDepensa>
        <ul className="ml-8 mr-8">
          {loading ? (
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
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>
          <li><ItemDespensa/></li>

        
          <li><div className="h-16 w-16"></div></li>
        </ul>
      </div>
    );
  }
  