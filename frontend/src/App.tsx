import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { JobsPage } from './pages/JobsPage';
import './index.css';

// BrowserRouter gives us access to the URL in any child component.
// We redirect / → /jobs so the app always lands on the jobs page.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="*" element={<Navigate to="/jobs" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
