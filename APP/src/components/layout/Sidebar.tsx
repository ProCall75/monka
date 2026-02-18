import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Activity,
    BookOpen,

    ChevronLeft,
    ChevronRight,
    Stethoscope,
    Heart,
    X,
    Menu,
    Users,
    Shield,
    FileQuestion,
    LayoutDashboard,
} from 'lucide-react'
import { useSidebar } from './SidebarContext'

const navItems = [
    {
        path: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        description: 'Vue d\'ensemble DB',
    },
    {
        path: '/simulator',
        label: 'Simulateur',
        icon: Activity,
        description: 'Moteur clinique interactif',
    },
    {
        path: '/personas',
        label: 'Personas',
        icon: Users,
        description: 'Profils aidants simulés',
    },
    {
        path: '/vulnerabilities',
        label: 'Vulnérabilités',
        icon: Shield,
        description: '5 dimensions cliniques',
    },
    {
        path: '/questions',
        label: 'Questions',
        icon: FileQuestion,
        description: '150 questions détaillées',
    },
    {
        path: '/docs',
        label: 'Documentation',
        icon: BookOpen,
        description: 'Templates & Livrables',
    },

]

export default function Sidebar() {
    const { open, setOpen, collapsed, setCollapsed } = useSidebar()
    const location = useLocation()

    // Auto-close on route change (always overlay)
    useEffect(() => {
        setOpen(false)
    }, [location.pathname])

    return (
        <>
            {/* Floating reopen button — visible when sidebar is closed */}
            <AnimatePresence>
                {!open && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setOpen(true)}
                        className="fixed left-4 top-4 z-50 w-12 h-12 rounded-2xl glass-dark
                       flex items-center justify-center text-white/70 hover:text-white
                       transition-colors cursor-pointer"
                        style={{
                            boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        <Menu className="w-5 h-5" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Sidebar overlay — click outside closes */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="glass-dark fixed left-4 top-4 bottom-4 z-50 flex flex-col overflow-hidden"
                        style={{
                            width: collapsed ? 72 : 260,
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            boxShadow: '0 24px 64px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)',
                            transition: 'width 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
                        }}
                    >
                        {/* Logo + Close */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                            <div className="w-10 h-10 rounded-xl gradient-monka flex items-center justify-center flex-shrink-0">
                                <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </div>
                            {!collapsed && (
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-white font-bold text-lg tracking-tight">Monka</h1>
                                    <p className="text-white/40 text-xs">Clinical Engine</p>
                                </div>
                            )}
                            {!collapsed && (
                                <button
                                    onClick={() => setOpen(false)}
                                    className="w-7 h-7 rounded-lg flex items-center justify-center
                               text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                                    title="Fermer la sidebar"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-3 py-4 space-y-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname.startsWith(item.path)
                                const Icon = item.icon

                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className="block relative"
                                    >
                                        <div
                                            className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer
                        transition-colors duration-200
                        ${isActive
                                                    ? 'bg-white/10 text-white'
                                                    : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                                                }
                      `}
                                        >
                                            <div
                                                className={`
                          w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                          ${isActive ? 'bg-monka-primary/20' : 'bg-white/5'}
                        `}
                                            >
                                                <Icon
                                                    className={`w-[18px] h-[18px] ${isActive ? 'text-monka-primary' : 'text-white/50'}`}
                                                    strokeWidth={isActive ? 2.5 : 2}
                                                />
                                            </div>
                                            {!collapsed && (
                                                <div className="overflow-hidden">
                                                    <span className="text-sm font-medium block">{item.label}</span>
                                                    <span className="text-[11px] text-white/30 block leading-tight">
                                                        {item.description}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeIndicator"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-monka-primary rounded-r-full"
                                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </NavLink>
                                )
                            })}
                        </nav>

                        {/* Version + Collapse */}
                        <div className="px-3 py-3 border-t border-white/5">
                            {!collapsed && (
                                <div className="flex items-center gap-2 px-3 py-2 mb-2">
                                    <Stethoscope className="w-3.5 h-3.5 text-monka-primary/60" />
                                    <span className="text-[11px] text-white/30">KERNEL v4 • 150 questions • Supabase live</span>
                                </div>
                            )}

                            <button
                                onClick={() => setCollapsed(!collapsed)}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg
                           text-white/40 hover:text-white/60 hover:bg-white/5 transition-colors"
                            >
                                {collapsed ? (
                                    <ChevronRight className="w-4 h-4" />
                                ) : (
                                    <>
                                        <ChevronLeft className="w-4 h-4" />
                                        <span className="text-xs">Réduire</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    )
}
