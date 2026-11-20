import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigationType } from 'react-router-dom';
import VeterinarioPage from './pages/VeterinarioPage';
import TutorPage from './pages/TutorPage';
import RepresentantesPage from './pages/RepresentantesPage';

// The initial PageView fires from index.html; redirects (REPLACE) are skipped so "/" -> "/veterinario" isn't counted twice.
function PixelPageViews() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const lastPath = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname === lastPath.current) return;
    lastPath.current = location.pathname;
    if (navigationType !== 'REPLACE') window.fbq?.('track', 'PageView');
  }, [location.pathname, navigationType]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <PixelPageViews />
      <Routes>
        <Route path="/" element={<Navigate to="/veterinario" replace />} />
        <Route path="/veterinario" element={<VeterinarioPage />} />
        <Route path="/tutor" element={<TutorPage />} />
        <Route path="/representantes" element={<RepresentantesPage />} />
        <Route path="*" element={<Navigate to="/veterinario" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
