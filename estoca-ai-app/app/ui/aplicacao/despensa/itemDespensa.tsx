'use client';
import Image from 'next/image';
import { Plus, Minus } from 'iconoir-react';
import React, { useState } from 'react';

export default function ItemDespensa({
  Id,
  Img,
  Unidade,
  Qntd,
}: {
  Id: number;
  Img: string;
  Unidade: string;
  Qntd: number;
}) {
  
  const [quantidade, setQuantidade] = useState(Qntd);

  const atualizarQuantidade = async (novaQuantidade: number) => {
    try {
      // NAO SE ESQUECER DE MUDAR ESSA ENDPOINT PARA O LINK DA API
      const response = await fetch(`/api/itens/${Id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantidade: novaQuantidade }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar a quantidade');
      }
    } catch (error) {
      console.error('Erro na atualização da quantidade:', error);
      alert('Não foi possível atualizar a quantidade. Tente novamente.');
    }
  };

  const incrementar = () => {
    const novaQuantidade = quantidade + 1;
    setQuantidade(novaQuantidade); 
    atualizarQuantidade(novaQuantidade); 
  };

  const decrementar = () => {
    if (quantidade > 0) {
      const novaQuantidade = quantidade - 1;
      setQuantidade(novaQuantidade); 
      atualizarQuantidade(novaQuantidade);
    }
  };


  return (
    <div className="flex flex-row mt-2 pb-2 mb-2 border-b border-solid border-gray-500 items-center justify-between">
      <div className="flex flex-row gap-2 items-center">
        <div className="relative w-16 h-16 rounded-md overflow-hidden">
          <Image
            src={Img || '/diversas.webp'} 
            layout="fill"
            objectFit="cover"
            alt="Imagem do item"
          />
        </div>

        <div className="flex flex-col justify-between h-16">
          <span className="text-base text-cinza1 font-semibold">
            {Id ? `Item ${Id}` : 'Nome do item'} 
          </span>
          <span className="text-base text-cinza3">
            {Unidade || '(X)'} 
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-4 h-min items-center">
        <button onClick={decrementar} disabled={quantidade <= 0}>
          <Minus />
        </button>
        <span className="text-2xl font-bold">
          {Qntd !== undefined ? Qntd : '0'} 
        </span>
        <button onClick={incrementar}>
          <Plus />
        </button>
      </div>
    </div>
  );
}
