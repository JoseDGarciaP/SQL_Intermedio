import { useId } from 'react';

// Qué zonas se iluminan en cada tipo de JOIN: [solo A, A∩B, solo B]
export const VENN_ZONES = {
  inner: [false, true, false],
  left: [true, true, false],
  'left-ex': [true, false, false],
  right: [false, true, true],
  'right-ex': [false, false, true],
  full: [true, true, true],
  'full-ex': [true, false, true],
};

/** Diagrama de Venn dibujado en vivo, con el cian de los diagramas de la app original. */
export default function Venn({ type = 'inner', size = 'md', labels = ['A', 'B'], sublabels }) {
  const uid = useId().replace(/:/g, '');
  const [onlyA, both, onlyB] = VENN_ZONES[type] || VENN_ZONES.inner;
  const ca = { cx: 78, cy: 70, r: 56 };
  const cb = { cx: 142, cy: 70, r: 56 };

  return (
    <svg className={`venn venn-${size}`} viewBox="0 0 220 140" role="img"
      aria-label={`Diagrama de Venn: ${[onlyA && 'solo A', both && 'A y B', onlyB && 'solo B'].filter(Boolean).join(', ') || 'ninguna zona'}`}>
      <defs>
        <clipPath id={`ca-${uid}`}><circle {...ca} /></clipPath>
        <mask id={`notb-${uid}`}>
          <rect width="220" height="140" fill="#fff" />
          <circle {...cb} fill="#000" />
        </mask>
        <mask id={`nota-${uid}`}>
          <rect width="220" height="140" fill="#fff" />
          <circle {...ca} fill="#000" />
        </mask>
      </defs>

      <circle {...ca} className={`venn-zone ${onlyA ? 'on' : ''}`} mask={`url(#notb-${uid})`} />
      <circle {...cb} className={`venn-zone ${onlyB ? 'on' : ''}`} mask={`url(#nota-${uid})`} />
      <circle {...cb} className={`venn-zone ${both ? 'on' : ''}`} clipPath={`url(#ca-${uid})`} />

      <circle {...ca} className="venn-ring" />
      <circle {...cb} className="venn-ring" />

      <text x="60" y="76" className={`venn-label ${onlyA ? 'on-zone' : ''}`}>{labels[0]}</text>
      <text x="160" y="76" className={`venn-label ${onlyB ? 'on-zone' : ''}`}>{labels[1]}</text>
      {sublabels && (
        <>
          <text x="60" y="94" className={`venn-sub ${onlyA ? 'on-zone' : ''}`}>{sublabels[0]}</text>
          <text x="160" y="94" className={`venn-sub ${onlyB ? 'on-zone' : ''}`}>{sublabels[1]}</text>
        </>
      )}
    </svg>
  );
}
