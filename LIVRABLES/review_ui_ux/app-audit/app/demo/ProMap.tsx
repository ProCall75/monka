'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Professional } from '../data/pro-finder-data';
import 'leaflet/dist/leaflet.css';

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════ */
const CATEGORY_COLORS: Record<string, string> = {
    sante: '#1A6B5A',
    social: '#6366F1',
    administratif: '#3B82F6',
    domicile: '#EA580C',
};

const CATEGORY_LABELS: Record<string, string> = {
    sante: 'Santé',
    social: 'Social',
    administratif: 'Admin.',
    domicile: 'Domicile',
};

const CATEGORY_EMOJIS: Record<string, string> = {
    sante: '🩺',
    social: '🤝',
    administratif: '🏛️',
    domicile: '🏠',
};

/* ═══════════════════════════════════════════════════════
   MARKER ICON FACTORY — Smaller (32px), cleaner 
═══════════════════════════════════════════════════════ */
function createMarkerIcon(category: string, isSelected: boolean = false) {
    const color = CATEGORY_COLORS[category] || '#1A6B5A';
    const size = isSelected ? 42 : 32;
    const emoji = CATEGORY_EMOJIS[category] || '📍';
    const fontSize = isSelected ? 18 : 14;
    const shadow = isSelected
        ? `0 0 0 4px ${color}33, 0 6px 20px ${color}55, 0 2px 6px rgba(0,0,0,0.2)`
        : `0 3px 8px ${color}33, 0 1px 3px rgba(0,0,0,0.12)`;
    const border = isSelected ? '3px solid white' : '2.5px solid white';
    const zIdx = isSelected ? 'z-index:1000;' : '';
    const scaleAnim = isSelected ? 'animation:markerBounce 0.3s cubic-bezier(0.34,1.56,0.64,1);' : '';

    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="position:relative;width:${size}px;height:${size}px;${zIdx}${scaleAnim}">
                <div style="
                    width:${size}px;height:${size}px;
                    background:${color};
                    border-radius:50%;
                    display:flex;align-items:center;justify-content:center;
                    box-shadow:${shadow};
                    border:${border};
                    font-size:${fontSize}px;
                    cursor:pointer;
                    transition:all 0.2s cubic-bezier(0.34,1.56,0.64,1);
                ">
                    ${emoji}
                </div>
                ${isSelected ? `<div style="
                    position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);
                    width:0;height:0;
                    border-left:5px solid transparent;border-right:5px solid transparent;
                    border-top:6px solid ${color};
                    filter:drop-shadow(0 2px 2px rgba(0,0,0,0.15));
                "></div>` : ''}
            </div>
        `,
        iconSize: [size, isSelected ? size + 6 : size],
        iconAnchor: [size / 2, isSelected ? size + 6 : size / 2],
    });
}

/* ═══════════════════════════════════════════════════════
   USER LOCATION — Subtle blue dot
═══════════════════════════════════════════════════════ */
const userLocationIcon = L.divIcon({
    className: 'custom-marker',
    html: `
        <div style="position:relative;width:16px;height:16px;">
            <div style="
                position:absolute;inset:-10px;
                background:rgba(26,107,90,0.08);
                border-radius:50%;
                animation:pulseRing 2.5s ease-out infinite;
            "></div>
            <div style="
                position:absolute;inset:-4px;
                background:rgba(26,107,90,0.15);
                border-radius:50%;
            "></div>
            <div style="
                width:16px;height:16px;
                background:#1A6B5A;
                border-radius:50%;
                border:3px solid white;
                box-shadow:0 1px 6px rgba(0,0,0,0.2);
            "></div>
        </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
});

/* ═══════════════════════════════════════════════════════
   FIT BOUNDS HELPER
═══════════════════════════════════════════════════════ */
function FitBounds({ professionals }: { professionals: Professional[] }) {
    const map = useMap();
    useEffect(() => {
        if (professionals.length > 0) {
            const localPros = professionals.filter(p => parseFloat(p.distance) < 10);
            const prosToShow = localPros.length > 0 ? localPros : professionals.slice(0, 5);
            const bounds = L.latLngBounds(prosToShow.map(p => [p.lat, p.lng]));
            bounds.extend([48.9900, 2.3220]);
            map.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
        }
    }, [professionals, map]);
    return null;
}

/* ═══════════════════════════════════════════════════════
   FLY TO SELECTED
═══════════════════════════════════════════════════════ */
function FlyToSelected({ selectedPro }: { selectedPro: Professional | null }) {
    const map = useMap();
    useEffect(() => {
        if (selectedPro) {
            map.flyTo([selectedPro.lat, selectedPro.lng], 15, { duration: 0.6 });
        }
    }, [selectedPro, map]);
    return null;
}

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════ */
const mapStyles = `
    .custom-marker { background: none !important; border: none !important; }
    .leaflet-container { font-family: 'Outfit', sans-serif !important; }
    .leaflet-control-zoom { display: none !important; }
    .leaflet-control-attribution { display: none !important; }
    @keyframes pulseRing { 
        0% { opacity: 1; transform: scale(1); } 
        100% { opacity: 0; transform: scale(3); } 
    }
    @keyframes markerBounce { 
        0% { transform: scale(0.6); } 
        100% { transform: scale(1); } 
    }
    @keyframes slideUp {
        0% { opacity: 0; transform: translateY(12px); }
        100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`;

/* ═══════════════════════════════════════════════════════
   PRO MAP COMPONENT
═══════════════════════════════════════════════════════ */
interface ProMapProps {
    professionals: Professional[];
    selectedPro: Professional | null;
    onSelectPro: (pro: Professional | null) => void;
}

export default function ProMap({ professionals, selectedPro, onSelectPro }: ProMapProps) {
    const [mapReady, setMapReady] = useState(false);
    const center: [number, number] = [48.9900, 2.3220];

    useEffect(() => { setMapReady(true); }, []);

    // Helper to get icon for each marker — selected state awareness
    const getIcon = useCallback((pro: Professional) => {
        const isSelected = selectedPro?.id === pro.id;
        return createMarkerIcon(pro.category, isSelected);
    }, [selectedPro]);

    if (!mapReady) {
        return (
            <div className="w-full rounded-[20px] bg-gradient-to-b from-[#E8F4F8] to-[#D6EDF0] flex items-center justify-center" style={{ height: 340 }}>
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-2 border-[#1A6B5A] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[12px] text-[#8E8E93] font-medium">Chargement de la carte…</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            <style>{mapStyles}</style>

            {/* ─── Map Container — taller for impact ─── */}
            <div
                className="w-full rounded-[20px] overflow-hidden shadow-lg shadow-black/8"
                style={{ height: 340, position: 'relative' }}
            >
                {/* Top gradient overlay — fade content into the map */}
                <div className="absolute inset-x-0 top-0 h-8 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, rgba(232,244,248,0.5), transparent)' }} />

                {/* Bottom gradient overlay — depth effect */}
                <div className="absolute inset-x-0 bottom-0 h-12 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(232,244,248,0.4), transparent)' }} />

                <MapContainer
                    center={center}
                    zoom={14}
                    style={{ width: '100%', height: '100%' }}
                    zoomControl={false}
                    attributionControl={false}
                    scrollWheelZoom={false}
                    dragging={true}
                >
                    {/* CartoDB Voyager — premium, colorful, modern */}
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    <FitBounds professionals={professionals} />
                    <FlyToSelected selectedPro={selectedPro} />

                    {/* User location */}
                    <Marker position={center} icon={userLocationIcon} />

                    {/* Professional markers */}
                    {professionals.map(pro => (
                        <Marker
                            key={pro.id}
                            position={[pro.lat, pro.lng]}
                            icon={getIcon(pro)}
                            zIndexOffset={selectedPro?.id === pro.id ? 1000 : 0}
                            eventHandlers={{
                                click: () => onSelectPro(selectedPro?.id === pro.id ? null : pro),
                            }}
                        />
                    ))}
                </MapContainer>

                {/* ─── Legend overlay on map (bottom-left) ─── */}
                <div className="absolute bottom-3 left-3 z-20 flex gap-2 flex-wrap">
                    {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                        <div key={cat} className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-md"
                            style={{ background: 'rgba(255,255,255,0.85)' }}>
                            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                            <span className="text-[9px] text-[#1A1A2E] font-semibold">{CATEGORY_LABELS[cat]}</span>
                        </div>
                    ))}
                </div>

                {/* ─── "Vous êtes ici" pill overlay (top-right) ─── */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md"
                    style={{ background: 'rgba(255,255,255,0.9)' }}>
                    <div className="w-2 h-2 rounded-full bg-[#1A6B5A]" />
                    <span className="text-[10px] text-[#1A1A2E] font-semibold">Montmorency</span>
                </div>
            </div>

            {/* ═══ SELECTED PRO — Premium detail card ═══ */}
            {selectedPro && (
                <div
                    className="relative mt-3 bg-white rounded-[20px] overflow-hidden border border-[#E5E5EA]"
                    style={{
                        animation: 'slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                        boxShadow: '0 8px 32px rgba(26,107,90,0.08), 0 2px 8px rgba(0,0,0,0.04)',
                    }}
                >
                    {/* Color accent bar */}
                    <div className="h-1 w-full" style={{ background: CATEGORY_COLORS[selectedPro.category] || '#1A6B5A' }} />

                    <div className="p-4">
                        {/* Close button */}
                        <button
                            onClick={() => onSelectPro(null)}
                            className="absolute top-4 right-3 w-7 h-7 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#8E8E93] hover:bg-[#E5E5EA] active:scale-90 transition-all text-[12px] font-bold"
                        >
                            ✕
                        </button>

                        {/* Smart recommendation banner — shows the app thinks for you */}
                        {selectedPro.isPartner && (
                            <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-gradient-to-r from-[#D6EDF0] to-[#E8F4F8] rounded-[10px]">
                                <span className="text-[13px]">🤖</span>
                                <span className="text-[11px] text-[#1A6B5A] font-semibold">Monka recommande ce professionnel pour votre situation</span>
                            </div>
                        )}

                        <div className="flex gap-3">
                            {/* Avatar */}
                            <div className="relative flex-shrink-0">
                                <img
                                    src={selectedPro.avatar}
                                    alt={selectedPro.name}
                                    className="w-12 h-12 rounded-full"
                                    style={{ border: `2.5px solid ${CATEGORY_COLORS[selectedPro.category]}22` }}
                                />
                                {selectedPro.isPartner && (
                                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-[#1A6B5A] rounded-full flex items-center justify-center border-2 border-white text-[8px] text-white font-bold">
                                        ✓
                                    </div>
                                )}
                            </div>

                            {/* Name + metadata */}
                            <div className="flex-1 min-w-0 pr-6">
                                <h4 className="text-[15px] font-bold text-[#1A1A2E] leading-tight truncate">{selectedPro.name}</h4>
                                <p className="text-[12px] text-[#6B7280] mt-0.5">{selectedPro.specialty}</p>
                                <div className="flex items-center gap-2.5 mt-1.5">
                                    <span className="flex items-center gap-1 text-[11px] text-[#8E8E93]">
                                        <svg width="10" height="12" viewBox="0 0 10 12" fill="none"><path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 7 5 7s5-3.25 5-7c0-2.76-2.24-5-5-5zm0 6.5C4.17 6.5 3.5 5.83 3.5 5S4.17 3.5 5 3.5 6.5 4.17 6.5 5 5.83 6.5 5 6.5z" fill="#8E8E93" /></svg>
                                        {selectedPro.distance}
                                    </span>
                                    {selectedPro.rating && (
                                        <span className="flex items-center gap-0.5 text-[11px] text-[#8E8E93]">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="#F59E0B"><path d="M5 0l1.12 3.45h3.63l-2.94 2.13 1.12 3.45L5 6.9 2.07 9.03l1.12-3.45L.25 3.45h3.63L5 0z" /></svg>
                                            {selectedPro.rating}
                                        </span>
                                    )}
                                    {selectedPro.hours && (
                                        <span className="text-[10px] text-[#1A6B5A] font-medium px-1.5 py-0.5 bg-[#D6EDF0] rounded">Ouvert</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Compact info row */}
                        <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#8E8E93]">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect width="10" height="10" rx="2" fill="#F3F4F6" /><path d="M2 3h6M2 5h4M2 7h5" stroke="#8E8E93" strokeWidth="0.8" /></svg>
                            <span className="truncate">{selectedPro.address}, {selectedPro.city}</span>
                            <span className="text-[#C8CCD0]">·</span>
                            <span className="flex-shrink-0">{selectedPro.hours?.split('·')[0]?.trim()}</span>
                        </div>

                        {/* Note */}
                        {selectedPro.note && (
                            <p className="mt-2 text-[11px] text-[#1A6B5A] font-medium italic">💡 {selectedPro.note}</p>
                        )}

                        {/* Action buttons — premium CTAs */}
                        <div className="flex gap-2.5 mt-4">
                            <a
                                href={`tel:${selectedPro.phone.replace(/\s/g, '')}`}
                                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[14px] font-semibold text-[13px] text-white transition-all active:scale-[0.97]"
                                style={{
                                    background: `linear-gradient(135deg, ${CATEGORY_COLORS[selectedPro.category]}, ${CATEGORY_COLORS[selectedPro.category]}CC)`,
                                    boxShadow: `0 4px 14px ${CATEGORY_COLORS[selectedPro.category]}33`,
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
                                Appeler
                            </a>
                            <a
                                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPro.lat},${selectedPro.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F3F4F6] rounded-[14px] font-semibold text-[13px] text-[#1A1A2E] hover:bg-[#E5E5EA] active:scale-[0.97] transition-all"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1A1A2E"><path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" /></svg>
                                Itinéraire
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
