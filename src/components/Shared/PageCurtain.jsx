export default function PageCurtain({ phase }) {
  if (!phase) return null;
  return <div id="page-curtain" className={`page-curtain ${phase}`} aria-hidden="true"><div className="velvet-curtain left" /><div className="velvet-curtain right" /></div>;
}
