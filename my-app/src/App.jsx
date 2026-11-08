import { Routes, Route } from 'react-router-dom';
import ServiceListPage from './pages/ServiceListPage';
import ServiceDetailsPage from './pages/ServiceDetailsPage';

export default function App() {
  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={<ServiceListPage />} />
        <Route path="/:id/details" element={<ServiceDetailsPage />} />
      </Routes>
    </div>
  );
}
