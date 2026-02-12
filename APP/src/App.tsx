import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import SimulatorPage from './pages/SimulatorPage'
import DocsPage from './pages/DocsPage'
import RoadmapPage from './pages/RoadmapPage'
import PersonasPage from './pages/PersonasPage'
import VulnerabilitiesPage from './pages/VulnerabilitiesPage'
import QuestionsPage from './pages/QuestionsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/simulator" replace />} />
          <Route path="simulator" element={<SimulatorPage />} />
          <Route path="personas" element={<PersonasPage />} />
          <Route path="vulnerabilities" element={<VulnerabilitiesPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
