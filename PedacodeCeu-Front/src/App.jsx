import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CarrinhoProvider } from './context/CarrinhoContext';
import Sidebar from './componentes/Sidebar';
import Header from './componentes/Headers';
import Footer from './componentes/Footer';
import RotaProtegida from './componentes/RotaProtegida';
import RotaAdmin from './componentes/RotaAdmin';

import Home from './pages/Home';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Produtos from './pages/Produtos';
import ProdutoForm from './pages/ProdutoForm';
import ProdutoDetalhe from './pages/ProdutoDetalhe';
import Categorias from './pages/Categorias';
import CategoriaForm from './pages/CategoriaForm';
import Pedidos from './pages/Pedidos';
import PedidoForm from './pages/PedidoForm';
import Carrinho from './pages/Carrinho';
import Sobre from './pages/Sobre';
import AdminUsuarios from './pages/AdminUsuarios';

function AppLayout() {
  return (
    <>
      <Header />

      <div className="layout-principal">
        <Sidebar />

        <main className="conteudo-da-pagina">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adm/login" element={<LoginAdmin />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/produtos/:id" element={<ProdutoDetalhe />} />
            <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
            <Route path="/pedidos" element={<RotaProtegida><Pedidos /></RotaProtegida>} />
            <Route path="/pedidos/novo" element={<RotaProtegida><PedidoForm /></RotaProtegida>} />
            <Route path="/pedidos/editar/:id" element={<RotaProtegida><PedidoForm /></RotaProtegida>} />
            <Route path="/admin/produtos" element={<RotaAdmin><Produtos /></RotaAdmin>} />
            <Route path="/admin/produtos/novo" element={<RotaAdmin><ProdutoForm /></RotaAdmin>} />
            <Route path="/admin/produtos/editar/:id" element={<RotaAdmin><ProdutoForm /></RotaAdmin>} />
            <Route path="/admin/categorias" element={<RotaAdmin><Categorias /></RotaAdmin>} />
            <Route path="/admin/categorias/nova" element={<RotaAdmin><CategoriaForm /></RotaAdmin>} />
            <Route path="/admin/categorias/editar/:id" element={<RotaAdmin><CategoriaForm /></RotaAdmin>} />
            <Route path="/admin/usuarios" element={<RotaAdmin><AdminUsuarios /></RotaAdmin>} />
          </Routes>
        </main>
      </div>

      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CarrinhoProvider>
        <AppLayout />
      </CarrinhoProvider>
    </AuthProvider>
  );
}

export default App;