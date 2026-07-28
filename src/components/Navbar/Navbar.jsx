import { useLocation } from 'react-router-dom';
import Icon from '../Shared/Icon';
import useCurtainNavigation from '../../hooks/useCurtainNavigation.jsx';
const links = [['/', 'I. Opening'], ['/about', 'II. Prologue'], ['/journey', 'III. Journey'], ['/experience', 'IV. Repertoire'], ['/skills', 'V. Craft'], ['/social', 'VI. Backstage'], ['/contact', 'VII. Finale']];
export default function Navbar() {
  const { pathname } = useLocation(); const { goTo } = useCurtainNavigation();
  const link = (to, className = '') => ({ href: to, className, onClick: e => { e.preventDefault(); goTo(to); } });
  return <header className="grand-nav page-nav" id="main-nav"><a {...link('/', 'brand-monogram')}><Icon name="masks" />DARSHI PATEL</a><nav aria-label="Main navigation"><ul className="act-links">{links.map(([to, text]) => <li key={to}><a {...link(to, pathname === to ? 'active' : '')}>{text}</a></li>)}</ul></nav></header>;
}
