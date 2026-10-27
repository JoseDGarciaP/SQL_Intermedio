import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, SquareTerminal, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { SECTIONS, img } from '../data/content.js';
import ThemeToggle from './ThemeToggle.jsx';

const NAV = [
  ...SECTIONS.map((s) => ({ to: `/${s.id}`, label: s.title, icon: s.icon })),
];

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Secciones">
      <Link to="/inicio" className="sidebar-brand">
        <img src={img('sql2.png')} alt="" width="32" height="32" />
        <span>SQL Intermedio</span>
      </Link>
      <nav>
        {NAV.map((n) => (
          <NavLink key={n.to} to={n.to} className="sidebar-link">
            <img src={n.icon} alt="" width="24" height="24" />
            {n.label}
          </NavLink>
        ))}
        <hr />
        <NavLink to="/editor" className="sidebar-link">
          <SquareTerminal size={22} aria-hidden="true" /> Editor SQL
        </NavLink>
        <NavLink to="/acerca" className="sidebar-link">
          <Info size={22} aria-hidden="true" /> Acerca de
        </NavLink>
      </nav>
    </aside>
  );
}

/** Estructura de cada pantalla: barra superior tipo app + contenido. */
export function Page({ title, back = '/inicio', children, wide = false }) {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title ? `${title} | SQL Intermedio` : 'SQL Intermedio';
  }, [title]);

  useEffect(() => {
    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="shell">
      <Sidebar />
      <div className="shell-main">
        <header className="topbar">
          {back ? (
            <button type="button" className="icon-btn" aria-label="Volver" onClick={() => navigate(back)}>
              <ArrowLeft size={22} />
            </button>
          ) : (
            <img className="topbar-logo" src={img('sql2.png')} alt="" width="30" height="30" />
          )}
          <h1 className="topbar-title">{title}</h1>
          <ThemeToggle />
          <Link to="/editor" className="icon-btn" aria-label="Abrir el editor SQL" title="Editor SQL">
            <SquareTerminal size={22} />
          </Link>
        </header>
        <main ref={mainRef} tabIndex={-1} className={`page ${wide ? 'page-wide' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

/** Tarjeta de lista (como los ítems de la app original). */
export function ListItem({ to, icon, visual, badge, title, desc, children }) {
  return (
    <li>
      <Link to={to} className="item">
        {visual && <span className="item-icon item-visual" aria-hidden="true">{visual}</span>}
        {icon && !visual && <span className="item-icon"><img src={icon} alt="" width="36" height="36" /></span>}
        {badge != null && <span className="item-badge">{badge}</span>}
        <span className="item-body">
          <span className="item-title">{title}</span>
          {desc && <span className="item-desc">{desc}</span>}
          {children}
        </span>
        <ChevronRight className="item-chev" size={20} aria-hidden="true" />
      </Link>
    </li>
  );
}

export function Section({ title, children, className = '' }) {
  return (
    <section className={`section ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  );
}

export function Note({ children }) {
  return (
    <aside className="note">
      <strong>Nota.</strong> {children}
    </aside>
  );
}

export function SchemaFigure({ schema }) {
  return (
    <figure className="schema">
      <div className="schema-scroll">
        <img src={schema.img} alt={schema.alt} />
      </div>
      {schema.caption && <figcaption>{schema.caption}</figcaption>}
    </figure>
  );
}

/** Navegación anterior / siguiente dentro de una sección. */
export function Pager({ prev, next }) {
  return (
    <nav className="pager" aria-label="Navegación entre temas">
      {prev ? (
        <Link to={prev.to} className="pager-link">
          <ChevronLeft size={18} aria-hidden="true" />
          <span><small>Anterior</small>{prev.label}</span>
        </Link>
      ) : <span />}
      {next ? (
        <Link to={next.to} className="pager-link pager-next">
          <span><small>Siguiente</small>{next.label}</span>
          <ChevronRight size={18} aria-hidden="true" />
        </Link>
      ) : <span />}
    </nav>
  );
}

export function GithubIcon({ size = 20 }) {
  return <img className="icon-github" src={img('github.png')} alt="" width={size} height={size} />;
}
