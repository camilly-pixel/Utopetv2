import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import VeterinarioPage from './pages/VeterinarioPage';
import TutorPage from './pages/TutorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/veterinario" replace />} />
        <Route path="/veterinario" element={<VeterinarioPage />} />
        <Route path="/tutor" element={<TutorPage />} />
        <Route path="*" element={<Navigate to="/veterinario" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
