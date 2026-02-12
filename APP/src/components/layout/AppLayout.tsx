import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { SidebarProvider } from './SidebarContext'

function LayoutInner() {
    return (
        <div className="min-h-screen bg-monka-bg">
            <Sidebar />
            <main className="p-6 pl-20 transition-all duration-300">
                <Outlet />
            </main>
        </div>
    )
}

export default function AppLayout() {
    return (
        <SidebarProvider>
            <LayoutInner />
        </SidebarProvider>
    )
}
