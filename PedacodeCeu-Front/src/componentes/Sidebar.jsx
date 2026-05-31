import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { listarCategorias } from '../services/api';
import './Sidebar.css';

function Sidebar() {
  const { usuario, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    buscar();
  }, []);

  async function buscar() {
    try {
      const res = await listarCategorias(1, 100);
      setCategorias(res.dados);
    } catch {}
  }

  function handleCategoria(categoriaId) {
    navigate(`/?categoria=${categoriaId}`);
  }

  return (
    <aside className="sidebar">
      <h2 className="sidebar-titulo">Categorias</h2>
      <ul className="sidebar-lista">
        <li className="sidebar-item">
          <NavLink to="/" end> Início</NavLink>
        </li>

        {categorias.length > 0 && (
          <>
            <li className="sidebar-separador" />
            {categorias.map((cat) => (
              <li key={cat.id} className="sidebar-item">
                <button
                  className="sidebar-btn"
                  onClick={() => handleCategoria(cat.id)}
                >
                   {cat.nome}
                </button>
              </li>
            ))}
          </>
        )}

        {usuario && (
          <>
            <li className="sidebar-separador" />
            <li className="sidebar-item">
              <NavLink to="/pedidos">📦 Meus Pedidos</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/perfil">👤 Meu Perfil</NavLink>
            </li>
          </>
        )}

        {isAdmin && (
          <>
            <li className="sidebar-separador" />
            <p className="sidebar-secao">Administração</p>
            <li className="sidebar-item">
              <NavLink to="/admin/produtos">📋 Produtos</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/categorias">📂 Categorias</NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/admin/usuarios">👥 Usuários</NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;