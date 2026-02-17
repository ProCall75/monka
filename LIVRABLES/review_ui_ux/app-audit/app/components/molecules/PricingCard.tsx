"use client";

import React from 'react';
import { Check } from '@phosphor-icons/react';

export interface PricingPlan {
    name: string;
    price: string;
    period: string;
    subtitle: string;
    features: string[];
    popular?: boolean;
    cta: string;
}

export const PricingCard = ({ plan }: { plan: PricingPlan }) => {
    const isPopular = plan.popular;

    return (
        <div
            className={`
                rounded-[24px] p-5 flex flex-col relative
                transition-all duration-200
                ${isPopular
                    ? 'bg-[#1A1A2E] text-white'
                    : 'bg-white'
                }
            `}
            style={{
                boxShadow: isPopular
                    ? '0 8px 24px rgba(26,26,46,0.18)'
                    : '0 2px 8px rgba(0,0,0,0.04)',
                fontFamily: "'Outfit', sans-serif",
            }}
        >
            {/* Popular pill */}
            {isPopular && (
                <span className="absolute -top-2.5 right-5 bg-[#2C8C99] text-white text-[9px] font-bold uppercase tracking-[0.08em] px-3 py-1 rounded-full">
                    Populaire
                </span>
            )}

            {/* Plan name */}
            <p className={`text-[11px] font-bold uppercase tracking-[0.1em] mb-3 ${isPopular ? 'text-[#8E9AAF]' : 'text-[#C8C3BC]'}`}>
                {plan.name}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-0.5 mb-1">
                <span className="text-[28px] font-extrabold leading-none">{plan.price}</span>
                <span className={`text-[12px] font-medium ${isPopular ? 'text-[#8E9AAF]' : 'text-[#C8C3BC]'}`}>/{plan.period}</span>
            </div>

            {/* Subtitle */}
            <p className={`text-[11px] leading-snug mb-4 ${isPopular ? 'text-[#8E9AAF]' : 'text-[#B8B3AB]'}`}>
                {plan.subtitle}
            </p>

            {/* Separator */}
            <div className={`h-px mb-4 ${isPopular ? 'bg-white/10' : 'bg-[#F0ECE6]'}`} />

            {/* Features */}
            <div className="space-y-2 flex-1">
                {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                        <Check
                            size={13}
                            weight="bold"
                            className="flex-shrink-0 mt-[2px]"
                            style={{ color: isPopular ? '#2C8C99' : '#C8C3BC' }}
                        />
                        <span className={`text-[11px] leading-snug ${isPopular ? 'text-white/80' : 'text-[#8A857E]'}`}>
                            {feature}
                        </span>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <button
                className={`
                    w-full mt-4 py-2.5 rounded-full text-[11px] font-bold tracking-wide
                    transition-all duration-200 active:scale-[0.97]
                    ${isPopular
                        ? 'bg-white text-[#1A1A2E]'
                        : 'bg-[#F3EAE3] text-[#2D2A26] hover:bg-[#EBE0D6]'
                    }
                `}
            >
                {plan.cta}
            </button>
        </div>
    );
};

/* ── Preset data for the 3 Monka plans ── */
export const MONKA_PLANS: PricingPlan[] = [
    {
        name: 'Découverte',
        price: '0€',
        period: 'mois',
        subtitle: 'Pour découvrir Monka en autonomie.',
        cta: 'Commencer gratuitement',
        features: [
            'Premiers conseils personnalisés',
            'Ressources éducatives',
            'Questionnaire d\'évaluation',
            'Suivi basique',
            'Rappels hebdomadaires',
        ],
    },
    {
        name: 'Essentiel',
        price: '6,99€',
        period: 'mois',
        subtitle: 'Un suivi intelligent qui s\'adapte à votre quotidien.',
        popular: true,
        cta: 'Essayer 7 jours',
        features: [
            'Questionnaire mensuel intelligent',
            'Suivi santé via IA décisionnelle',
            'Alertes personnalisées',
            'Recommandations adaptées',
            'Rappels ajustés à vos besoins',
        ],
    },
    {
        name: 'Sérénité',
        price: '59,99€',
        period: 'mois',
        subtitle: 'Accompagnement complet avec un·e professionnel·le dédié·e.',
        cta: 'Nous contacter',
        features: [
            'Tout le pack Essentiel',
            'Priorisation de vos actions',
            'Échange mensuel avec infirmier·e',
            'Orientation solutions locales',
            'Aide aux démarches',
        ],
    },
];

/* ── Pricing Section — renders all 3 cards in a row ── */
export const PricingSection = () => (
    <div className="grid grid-cols-3 gap-3 items-start" style={{ fontFamily: "'Outfit', sans-serif" }}>
        {MONKA_PLANS.map((plan, i) => (
            <PricingCard key={i} plan={plan} />
        ))}
    </div>
);
