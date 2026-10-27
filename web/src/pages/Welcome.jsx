import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Venn from '../components/Venn.jsx';
import { APP, JOINS, img } from '../data/content.js';

const CYCLE = JOINS.items.map((j) => ({ id: j.id, title: j.title }));

/** Pantalla de entrada (equivale a la pantalla "Entrar" de la app). */
export default function Welcome() {
  const [i, setI] = useState(0);

  useEffect(() => {
    document.title = 'SQL Intermedio';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const t = setInterval(() => setI((k) => (k + 1) % CYCLE.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="welcome">
      <div className="welcome-inner">
        <img className="welcome-logo" src={img('sql2.png')} alt="" width="56" height="56" />
        <h1 className="welcome-title">SQL<br />Intermedio</h1>
        <p className="welcome-tag">{APP.tagline}</p>

        <div className="welcome-venn" aria-hidden="true">
          <Venn type={CYCLE[i].id} size="lg" />
          <span className="welcome-venn-label" key={CYCLE[i].id}>{CYCLE[i].title}</span>
        </div>

        <Link to="/inicio" className="btn btn-primary btn-lg">
          Entrar <ChevronRight size={20} />
        </Link>

        <p className="welcome-foot">
          Universidad Francisco de Paula Santander Ocaña<br />Grupo de Investigación en Pensamiento Computacional (GIPCO)
          <br />Versión web {APP.version}
        </p>
      </div>
    </main>
  );
}
