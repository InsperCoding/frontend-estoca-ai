'use client';

import { useState, FormEvent } from 'react';
import axios from 'axios';

export default function FormCasas() {
    const [nome, setNome] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [complemento, setComplemento] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:8080/<endpoint casas>', {
            /*FALTA ADICIONAR O USUARIO RESPONSAVEL DA CASA */
            nome,
            cidade,
            bairro,
            rua,
            complemento,
          });
          alert('Casa adicionada com sucesso!');
        } catch (error: any) {
          console.error('Falha ao adicionar casa:', error.response?.data || error.message);
          alert(error.response?.data || 'Falha ao adiconar casa');
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-4">
            {/* Nome */}
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Nome da casa
            </label>
            <input
                id="nome"
                type="text"
                placeholder="Casa da vó ana"
                value={nome}
                onChange={(e) => {setNome(e.target.value)}}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-azul1 focus:border-azul1 text-sm"
                required
            />
            </div>
        
            {/* Cidade */}
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Cidade
            </label>
            <input
                id="cidade"
                type="text"
                placeholder="São Paulo - SP"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-azul1 focus:border-azul1 text-sm"
                required
            />
            </div>

            {/* Bairro */}
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Bairro
            </label>
            <input
                id="bairro"
                type="text"
                placeholder="Vila Olímpia"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-azul1 focus:border-azul1 text-sm"
                required
            />
            </div>

            {/* Rua */}
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Rua
            </label>
            <input
                id="rua"
                type="text"
                placeholder="Rua Quatá 300"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-azul1 focus:border-azul1 text-sm"
                required
            />
            </div>

            {/* Complemento */}
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Complemento
            </label>
            <input
                id="complemento"
                type="text"
                placeholder="apto 220"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-azul1 focus:border-azul1 text-sm"
                required
            />
            </div>
                
            <button
            type="submit"
            className="w-full bg-azul1 text-white font-semibold py-2 px-4 rounded-lg hover:bg-azul2 focus:outline-none focus:ring-2 focus:ring-azul2">
            Adicionar
            </button>

        </form>
    );
}
  