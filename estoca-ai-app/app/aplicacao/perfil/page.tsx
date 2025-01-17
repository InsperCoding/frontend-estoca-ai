"use client";

import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa"; // Adicionando o ícone de saída

export default function Profile() {
  const router = useRouter();

  const handleEditAccount = () => {
    alert("Redirecionando para alterar dados da conta...");
    router.push("/edit-account");
  };

  const handleEditHouses = () => {
    alert("Redirecionando para editar casas...");
    router.push("/edit-houses");
  };

  const handleLogout = () => {
    alert("Você foi desconectado.");
    router.push("/login");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      {/* Título */}
      <h1 style={{ fontSize: "32px", color: "#4E4E4E", fontFamily: "Roboto, sans-serif", fontWeight: "700", paddingTop: "20px", marginBottom: "40px" }}>Minha conta</h1>

      {/* Avatar e Nome */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <img
          src="https://via.placeholder.com/80" // Substitua pelo URL correto do avatar
          alt="Avatar"
          style={{ borderRadius: "50%", width: "64px", height: "64px", marginRight: "15px" }}
        />
        <div style={{ fontSize: "32px", color: "#4E4E4E", fontFamily: "Roboto, sans-serif", fontWeight: "600" }}>Jaca FGV</div>
      </div>

      {/* Botões */}
      <div style={{ borderTop: "1px solid #AEAEAE" }}>
        <button
          onClick={handleEditAccount}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "10px 10px 10px 0px",
            border: "none",
            borderBottom: "1px solid #AEAEAE",
            background: "none",
            color: "#4E4E4E",
            fontFamily: "Roboto, sans-serif",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Alterar dados da conta
        </button>
        <button
          onClick={handleEditHouses}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "10px 10px 10px 0px",
            border: "none",
            borderBottom: "1px solid #AEAEAE",
            background: "none",
            color: "#4E4E4E",
            fontFamily: "Roboto, sans-serif",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Editar casas
        </button>
        <button
          onClick={handleLogout}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // Alinha o texto e o ícone na mesma linha
            width: "100%",
            textAlign: "left",
            padding: "10px 10px 10px 0px",
            border: "none",
            background: "none",
            color: "#4E4E4E",
            fontFamily: "Roboto, sans-serif",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          <img
            src="/icones/log-out.png" // Caminho correto para acessar o ícone
            alt="Sair"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          Sair
        </button>
      </div>
    </div>
  );
}
