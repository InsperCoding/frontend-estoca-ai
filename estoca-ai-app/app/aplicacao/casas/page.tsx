"use client";

import withAuth from '../../components/withAuth';
import { useRouter } from 'next/navigation';

function Casas() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bem-vindo às Casas!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          Logout
        </button>
      </header>
      
      
    </div>
  );
}

export default withAuth(Casas);