"use client";

import { useState, useEffect } from "react";
import { MapPin, NavArrowDown } from "iconoir-react";

interface Casa {
  id: number;
  nome: string;
}

export default function SelecaoCasas() {
  const [casas, setCasas] = useState<Casa[]>([]);
  const [casaSelecionada, setCasaSelecionada] = useState<string>("");

  // 1) Busca a lista de casas disponíveis
  useEffect(() => {
    // Substitua pela sua URL real que retorna a lista de casas
    fetch("https://api.exemplo.com/casas")
      .then((response) => response.json())
      .then((data: Casa[]) => {
        setCasas(data);
      })
      .catch((error) => console.error("Erro ao buscar casas:", error));
  }, []);

  // 2) Busca qual é a casa selecionada do usuário no backend, se existir
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

  // 3) Quando o usuário mudar a casa selecionada no <select>, atualiza no backend
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selecionada = event.target.value;
    // setCasaSelecionada(selecionada); apenas para teste no front, a casa muda automaticamente quando a requuisicao for bem sucedida
    fetch("https://api.exemplo.com/casa-selecionada", {
      method: "PUT", // ou POST/PATCH, dependendo de como seu backend espera
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ casaId: selecionada ? Number(selecionada) : null }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar a casa selecionada no backend");
        }
        return response.json();
      })
      .then((updatedData) => {
        // Se necessário, use o retorno do backend para setar o estado:
        // setCasaSelecionada(String(updatedData.casaId));
        setCasaSelecionada(selecionada);
        console.log("Casa selecionada atualizada no backend com sucesso!");
      })
      .catch((error) =>
        console.error("Erro ao atualizar casa selecionada:", error)
      );
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <MapPin className="text-xs text-azul1" />
      <select
        name="casas"
        id="casa-selecionada"
        value={casaSelecionada}
        onChange={handleChange}
        className="appearance-none border-none text-cinza1 text-sm bg-white p-2 rounded-md focus:outline-none focus:ring-0 focus:border-none"
      >
        {/* Opção caso o usuário ainda não tenha selecionado nenhuma casa */}
        <option value="">-------------</option>

        {/* Renderiza as opções vindas da API */}
        {casas.map((casa) => (
          <option key={casa.id} value={casa.id}>
            {casa.nome}
          </option>
        ))}
        {/* Placeholdaer para teste, remove-los quando conectar a aplicação ao back */}
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
      </select>
      <NavArrowDown className="text-base text-cinza1" />
    </div>
  );
}
