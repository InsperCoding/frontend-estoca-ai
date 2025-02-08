"use client";

import React, { useState, useEffect } from 'react';
import { HomeSimpleDoor, Closet, ListSelect, User } from 'iconoir-react';
import Add from './add';
import Item from './item';
import clsx from 'clsx';
import Background from './background';
import ItemAdicionar from '../botaoadicionar/itemAdicionar';
import { Swiper, SwiperSlide } from "swiper/react";

interface Produto {
  id: number;
  nome: string;
  imagem?: string;
}

export default function Footer() {
  const [showPopout, setShowPopout] = useState(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token") || "";
      const response = await fetch("http://localhost:8080/produtos", {
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data: Produto[] = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setShowPopout(true);
    fetchProdutos();
  };

  const closePopout = () => {
    setShowPopout(false);
  };

  return (
    <div>
      <Background />
      <footer className="w-full flex flex-row items-center justify-center bg-white fixed bottom-0 pl-8 pr-8 pb-7 pt-4">
        <div className="w-dvw flex flex-row items-center justify-between">
          <Item href="/aplicacao/casas" label="Casas" Icon={HomeSimpleDoor} />
          <Item href="/aplicacao/despensa" label="Despensa" Icon={Closet} />
          <div onClick={handleAddClick} style={{ cursor: 'pointer' }}>
            <Add />
          </div>
          <div></div>
          <Item href="/aplicacao/lista" label="Lista" Icon={ListSelect} />
          <Item href="/aplicacao/perfil" label="Perfil" Icon={User} />
        </div>
      </footer>

      <div className="formAdd">
        <div
          className={clsx(
            "popout-overlay fixed inset-0 z-50 flex items-end justify-center bg-black transition-opacity duration-300 ease-in-out",
            showPopout ? "opacity-100 bg-opacity-50" : "opacity-0 pointer-events-none bg-opacity-0"
          )}
        >
          <div
            className={clsx(
              "popout bg-white p-6 w-full max-w-none transform transition-transform duration-500 ease-in-out",
              showPopout ? "translate-y-0 h-[80%]" : "translate-y-full h-80%]"
            )}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Adicionar Produto</h2>
              <button onClick={closePopout} className="text-gray-600 hover:text-gray-800 text-2xl">
                &times;
              </button>
            </div>
            {loading ? (
              <p>Carregando produtos...</p>
            ) : (
              <ul>
                {produtos.map((produto) => (
                  <li key={produto.id} className="border-b py-2">
                    <span>{produto.nome}</span>
                  </li>
                ))}
              </ul>  
            )}
            
            <ul>
              <li key={1}>
                <ItemAdicionar
                  Id={1}
                  Img={'/diversas.webp'}
                  Unidade={'kg'}
                  Qntd={6}
                  />
              </li>
              <li key={1}>
                <ItemAdicionar
                  Id={1}
                  Img={'/diversas.webp'}
                  Unidade={'kg'}
                  Qntd={6}
                  />
              </li>
              <li key={1}>
                <ItemAdicionar
                  Id={1}
                  Img={'/diversas.webp'}
                  Unidade={'kg'}
                  Qntd={6}
                  />
              </li>
              <li key={1}>
                <ItemAdicionar
                  Id={1}
                  Img={'/diversas.webp'}
                  Unidade={'kg'}
                  Qntd={6}
                  />
              </li>
              <li key={1}>
                <ItemAdicionar
                  Id={1}
                  Img={'/diversas.webp'}
                  Unidade={'kg'}
                  Qntd={6}
                  />
              </li>
              <li key={1}>
                <ItemAdicionar
                  Id={1}
                  Img={'/diversas.webp'}
                  Unidade={'kg'}
                  Qntd={6}
                  />
              </li>
              <li key={1}>
                <ItemAdicionar
                  Id={1}
                  Img={'/diversas.webp'}
                  Unidade={'kg'}
                  Qntd={6}
                  />
              </li>
              <li key={1}>
                <ItemAdicionar
                  Id={1}
                  Img={'/diversas.webp'}
                  Unidade={'kg'}
                  Qntd={6}
                  />
              </li>
            </ul>
            
          </div>
        </div>
      </div>
    </div>
  );
}