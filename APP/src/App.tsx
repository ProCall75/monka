import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'

// Lazy-loaded pages for bundle splitting
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const SimulatorPage = lazy(() => import('./pages/SimulatorPage'))
const PersonasPage = lazy(() => import('./pages/PersonasPage'))
const VulnerabilitiesPage = lazy(() => import('./pages/VulnerabilitiesPage'))
const MicroParcoursPage = lazy(() => import('./pages/MicroParcoursPage'))
const DocsPage = lazy(() => import('./pages/DocsPage'))

function PageLoader() {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-monka-primary/30 border-t-monka-primary rounded-full animate-spin" />
        </div>
    )
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Suspense fallback={<PageLoader />}><DashboardPage /></Suspense>} />
                    <Route path="simulator" element={<Suspense fallback={<PageLoader />}><SimulatorPage /></Suspense>} />
                    <Route path="personas" element={<Suspense fallback={<PageLoader />}><PersonasPage /></Suspense>} />
                    <Route path="vulnerabilities" element={<Suspense fallback={<PageLoader />}><VulnerabilitiesPage /></Suspense>} />
                    <Route path="micro-parcours" element={<Suspense fallback={<PageLoader />}><MicroParcoursPage /></Suspense>} />
                    <Route path="docs" element={<Suspense fallback={<PageLoader />}><DocsPage /></Suspense>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
