import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Welcome from './pages/Welcome.jsx';
import Home from './pages/Home.jsx';
import { JoinsList, JoinDetail } from './pages/Joins.jsx';
import { AgregadosList, AgregadoDetail } from './pages/Agregados.jsx';
import Subconsultas from './pages/Subconsultas.jsx';
import { EjerciciosList, EjercicioDetail } from './pages/Ejercicios.jsx';
import Editor from './pages/Editor.jsx';
import Acerca from './pages/Acerca.jsx';

// Reinicia el estado de la pantalla al cambiar de tema (p. ej. ocultar la solución otra vez).
function Keyed({ C, param }) {
  const p = useParams();
  return <C key={p[param]} />;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/joins" element={<JoinsList />} />
        <Route path="/joins/:id" element={<Keyed C={JoinDetail} param="id" />} />
        <Route path="/agregados" element={<AgregadosList />} />
        <Route path="/agregados/:id" element={<Keyed C={AgregadoDetail} param="id" />} />
        <Route path="/subconsultas" element={<Subconsultas />} />
        <Route path="/ejercicios" element={<EjerciciosList />} />
        <Route path="/ejercicios/:n" element={<Keyed C={EjercicioDetail} param="n" />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
