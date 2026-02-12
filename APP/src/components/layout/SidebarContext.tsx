import { createContext, useContext, useState, type ReactNode } from 'react'

interface SidebarState {
    open: boolean
    collapsed: boolean
    setOpen: (v: boolean) => void
    setCollapsed: (v: boolean) => void
}

const SidebarContext = createContext<SidebarState>({
    open: false,
    collapsed: false,
    setOpen: () => { },
    setCollapsed: () => { },
})

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    return (
        <SidebarContext.Provider value={{ open, collapsed, setOpen, setCollapsed }}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    return useContext(SidebarContext)
}
