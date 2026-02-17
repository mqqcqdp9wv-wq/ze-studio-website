import React from "react";

interface LogoProps {
    className?: string;
}

// Toyota — three overlapping ellipses
export const ToyotaLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 120 80" fill="currentColor">
        <ellipse cx="60" cy="40" rx="55" ry="35" fill="none" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="60" cy="40" rx="35" ry="22" fill="none" stroke="currentColor" strokeWidth="3" />
        <ellipse cx="60" cy="40" rx="12" ry="35" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
);

// BMW — divided circle
export const BMWLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 80 80" fill="currentColor">
        <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="40" y1="10" x2="40" y2="70" stroke="currentColor" strokeWidth="2" />
        <line x1="10" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="8" textAnchor="middle" fontSize="7" fill="currentColor" fontWeight="bold">BMW</text>
    </svg>
);

// Mercedes — three-pointed star
export const MercedesLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 80 80" fill="currentColor">
        <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="40" y1="40" x2="40" y2="6" stroke="currentColor" strokeWidth="3" />
        <line x1="40" y1="40" x2="10.5" y2="57" stroke="currentColor" strokeWidth="3" />
        <line x1="40" y1="40" x2="69.5" y2="57" stroke="currentColor" strokeWidth="3" />
    </svg>
);

// Audi — four rings
export const AudiLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 160 50" fill="none" stroke="currentColor" strokeWidth="3">
        <circle cx="30" cy="25" r="20" />
        <circle cx="65" cy="25" r="20" />
        <circle cx="100" cy="25" r="20" />
        <circle cx="135" cy="25" r="20" />
    </svg>
);

// Volkswagen — VW in circle
export const VolkswagenLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 80 80" fill="currentColor">
        <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="3" />
        <text x="40" y="50" textAnchor="middle" fontSize="32" fontWeight="bold" fill="currentColor">VW</text>
    </svg>
);

// Hyundai — tilted H
export const HyundaiLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 90 80" fill="currentColor">
        <ellipse cx="45" cy="40" rx="42" ry="35" fill="none" stroke="currentColor" strokeWidth="3" />
        <text x="45" y="52" textAnchor="middle" fontSize="36" fontWeight="bold" fontStyle="italic" fill="currentColor">H</text>
    </svg>
);

// Kia — stylized text
export const KiaLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 100 50" fill="currentColor">
        <text x="50" y="38" textAnchor="middle" fontSize="36" fontWeight="bold" letterSpacing="4" fill="currentColor" fontFamily="sans-serif">KIA</text>
    </svg>
);

// Mazda — winged M
export const MazdaLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 80 80" fill="currentColor">
        <circle cx="40" cy="40" r="37" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M20 55 L40 25 L60 55" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
        <path d="M28 45 Q40 32 52 45" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
);

// Nissan — bar in circle
export const NissanLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 100 80" fill="currentColor">
        <circle cx="50" cy="40" r="35" fill="none" stroke="currentColor" strokeWidth="3" />
        <rect x="12" y="32" width="76" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <text x="50" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">NISSAN</text>
    </svg>
);

// Honda — H in rectangle
export const HondaLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 70 80" fill="currentColor">
        <rect x="5" y="5" width="60" height="70" rx="4" fill="none" stroke="currentColor" strokeWidth="3" />
        <text x="35" y="55" textAnchor="middle" fontSize="42" fontWeight="bold" fill="currentColor">H</text>
    </svg>
);

// Lexus — L in oval
export const LexusLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 80 80" fill="currentColor">
        <ellipse cx="40" cy="40" rx="37" ry="35" fill="none" stroke="currentColor" strokeWidth="3" />
        <text x="40" y="54" textAnchor="middle" fontSize="40" fontWeight="300" fontStyle="italic" fill="currentColor">L</text>
    </svg>
);

// Porsche — text
export const PorscheLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 140 50" fill="currentColor">
        <text x="70" y="36" textAnchor="middle" fontSize="28" fontWeight="bold" letterSpacing="6" fill="currentColor" fontFamily="serif">PORSCHE</text>
    </svg>
);

// Haval — text
export const HavalLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 120 50" fill="currentColor">
        <text x="60" y="36" textAnchor="middle" fontSize="30" fontWeight="bold" letterSpacing="5" fill="currentColor" fontFamily="sans-serif">HAVAL</text>
    </svg>
);

// Geely — shield-like
export const GeelyLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 120 50" fill="currentColor">
        <text x="60" y="36" textAnchor="middle" fontSize="28" fontWeight="600" letterSpacing="6" fill="currentColor" fontFamily="sans-serif">GEELY</text>
    </svg>
);

// Chery — text
export const CheryLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 120 50" fill="currentColor">
        <text x="60" y="36" textAnchor="middle" fontSize="28" fontWeight="600" letterSpacing="5" fill="currentColor" fontFamily="sans-serif">CHERY</text>
    </svg>
);

// Škoda — text
export const SkodaLogo = ({ className }: LogoProps) => (
    <svg className={className} viewBox="0 0 120 50" fill="currentColor">
        <text x="60" y="36" textAnchor="middle" fontSize="28" fontWeight="bold" letterSpacing="6" fill="currentColor" fontFamily="sans-serif">ŠKODA</text>
    </svg>
);
