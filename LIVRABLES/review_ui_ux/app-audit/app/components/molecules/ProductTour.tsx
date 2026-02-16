"use client";

import React, { useEffect, useCallback } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

interface ProductTourProps {
    onComplete: () => void;
}

export const ProductTour = ({ onComplete }: ProductTourProps) => {
    const startTour = useCallback(() => {
        const driverObj = driver({
            showProgress: true,
            animate: true,
            smoothScroll: true,
            allowClose: true,
            overlayColor: 'rgba(26, 26, 46, 0.65)',
            stagePadding: 8,
            stageRadius: 16,
            popoverClass: 'monka-tour-popover',
            nextBtnText: 'Suivant →',
            prevBtnText: '← Précédent',
            doneBtnText: "C'est parti !",
            progressText: '{{current}} / {{total}}',
            onDestroyStarted: () => {
                driverObj.destroy();
                onComplete();
            },
            steps: [
                {
                    element: '[data-tour="dashboard-header"]',
                    popover: {
                        title: 'Bienvenue sur votre tableau de bord',
                        description: 'C\'est ici que tout commence. En un coup d\'œil, vous voyez où en est votre accompagnement et quoi faire ensuite.',
                        side: 'bottom',
                        align: 'center',
                    },
                },
                {
                    element: '[data-tour="next-action"]',
                    popover: {
                        title: 'Votre prochaine action',
                        description: 'On vous suggère toujours la prochaine étape la plus importante. Un pas à la fois, à votre rythme.',
                        side: 'bottom',
                        align: 'center',
                    },
                },
                {
                    element: '[data-tour-tab="calendar"]',
                    popover: {
                        title: 'Votre agenda partagé',
                        description: 'Coordonnez les rendez-vous et les gardes avec votre cercle d\'aidants. Tout le monde voit qui fait quoi.',
                        side: 'top',
                        align: 'center',
                    },
                },
                {
                    element: '[data-tour-tab="community"]',
                    popover: {
                        title: 'Trouvez de l\'aide près de chez vous',
                        description: 'Des professionnels de santé, des assistantes sociales, des accueils de jour — tous localisés autour de vous.',
                        side: 'top',
                        align: 'center',
                    },
                },
                {
                    element: '[data-tour-tab="resources"]',
                    popover: {
                        title: 'Des ressources pour vous',
                        description: 'Articles, guides pratiques et conseils adaptés à votre situation. Tout est là, quand vous en avez besoin.',
                        side: 'top',
                        align: 'center',
                    },
                },
                {
                    element: '[data-tour-tab="home"]',
                    popover: {
                        title: 'C\'est parti !',
                        description: 'Vous êtes prêt·e à commencer. On est là pour vous accompagner, chaque jour.',
                        side: 'top',
                        align: 'center',
                    },
                },
            ],
        });

        // Small delay so the DOM is ready
        setTimeout(() => driverObj.drive(), 400);
    }, [onComplete]);

    useEffect(() => {
        startTour();
    }, [startTour]);

    return (
        <style>{`
            .monka-tour-popover {
                font-family: 'Outfit', 'Inter', sans-serif !important;
            }
            .monka-tour-popover .driver-popover-title {
                font-size: 16px !important;
                font-weight: 700 !important;
                color: #1A1A2E !important;
                font-family: 'Outfit', sans-serif !important;
            }
            .monka-tour-popover .driver-popover-description {
                font-size: 13px !important;
                color: #4A4A5A !important;
                line-height: 1.6 !important;
            }
            .monka-tour-popover .driver-popover-progress-text {
                font-size: 11px !important;
                color: #8E8E93 !important;
            }
            .monka-tour-popover .driver-popover-next-btn,
            .monka-tour-popover .driver-popover-done-btn {
                background: linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%) !important;
                color: white !important;
                border: none !important;
                border-radius: 10px !important;
                padding: 8px 18px !important;
                font-size: 13px !important;
                font-weight: 600 !important;
                box-shadow: 0 4px 12px rgba(44,140,153,0.25) !important;
                text-shadow: none !important;
            }
            .monka-tour-popover .driver-popover-prev-btn {
                background: #F3F4F6 !important;
                color: #374151 !important;
                border: 1px solid #E5E7EB !important;
                border-radius: 10px !important;
                padding: 8px 18px !important;
                font-size: 13px !important;
                font-weight: 600 !important;
                text-shadow: none !important;
            }
            .monka-tour-popover .driver-popover-close-btn {
                color: #8E8E93 !important;
            }
            .driver-popover {
                border-radius: 20px !important;
                box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important;
                border: 1px solid rgba(229,229,234,0.5) !important;
            }
            .driver-popover-arrow {
                border: 1px solid rgba(229,229,234,0.3) !important;
            }
        `}</style>
    );
};
