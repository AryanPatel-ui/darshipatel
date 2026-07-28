import { createContext, useCallback, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CurtainNavigationContext = createContext(null);

export function CurtainNavigationProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState(null);
  const goTo = useCallback((to) => {
    if (to === location.pathname || phase) return;
    setPhase('preparing');
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setPhase('closing');
        window.setTimeout(() => {
          navigate(to);
          window.scrollTo(0, 0);
          setPhase('opening');
          window.setTimeout(() => setPhase(null), 1300);
        }, 1000);
      });
    });
  }, [location.pathname, navigate, phase]);
  return <CurtainNavigationContext.Provider value={{ goTo, phase }}>{children}</CurtainNavigationContext.Provider>;
}

export default function useCurtainNavigation() {
  const context = useContext(CurtainNavigationContext);
  if (!context) throw new Error('useCurtainNavigation must be used within CurtainNavigationProvider');
  return context;
}
