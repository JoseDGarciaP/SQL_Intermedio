import { lazy, Suspense } from 'react';
import SqlCode from './SqlCode.jsx';

const SqlEditor = lazy(() => import('./SqlEditor.jsx'));

/** Carga el editor (CodeMirror) solo cuando se necesita. */
export default function LazySqlEditor(props) {
  return (
    <Suspense fallback={<SqlCode sql={props.value} />}>
      <SqlEditor {...props} />
    </Suspense>
  );
}
