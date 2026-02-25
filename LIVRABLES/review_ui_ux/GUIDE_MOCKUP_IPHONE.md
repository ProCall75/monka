# 📱 Wrapper sa démo dans un mockup iPhone 15 Pro — Pure CSS

Zero dépendance. ~50 lignes de CSS.

---

## Le composant

```tsx
// components/IPhoneMockup.tsx

export function IPhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div className="iphone-frame">
      <div className="dynamic-island" />
      <div className="iphone-screen">{children}</div>
      <div className="home-indicator" />
    </div>
  );
}
```

## Le CSS

```css
/* styles/iphone-mockup.css */

.iphone-frame {
  position: relative;
  width: 393px;              /* iPhone 15 Pro viewport */
  height: 852px;
  border-radius: 55px;
  background: #1a1a1a;
  padding: 12px;
  box-shadow:
    0 0 0 2px #333,
    0 0 0 4px #8a8a8a,          /* Reflet titane */
    0 30px 60px -10px rgba(0,0,0,0.4),
    0 18px 36px -18px rgba(0,0,0,0.3);
}

.iphone-screen {
  width: 100%;
  height: 100%;
  border-radius: 45px;
  overflow: hidden;
  overflow-y: auto;
  background: #fff;
  scrollbar-width: none;
}
.iphone-screen::-webkit-scrollbar { display: none; }

.dynamic-island {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 126px;
  height: 37px;
  background: #000;
  border-radius: 20px;
  z-index: 50;
}

.home-indicator {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 134px;
  height: 5px;
  background: #fff;
  border-radius: 100px;
  opacity: 0.3;
  z-index: 50;
}

/* ── Responsive ── */
@media (max-height: 900px) {
  .iphone-frame { transform: scale(0.85); transform-origin: top center; }
}
@media (max-height: 750px) {
  .iphone-frame { transform: scale(0.7); transform-origin: top center; }
}
@media (max-width: 500px) {
  .iphone-frame {
    width: 100%; height: 100vh;
    border-radius: 0; padding: 0;
    box-shadow: none; background: none;
  }
  .iphone-screen { border-radius: 0; }
  .dynamic-island, .home-indicator { display: none; }
}
```

## Usage

```tsx
import { IPhoneMockup } from '@/components/IPhoneMockup';
import DemoApp from '@/demo/page';

export default function PresentationPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5' }}>
      <IPhoneMockup>
        <DemoApp />
      </IPhoneMockup>
    </div>
  );
}
```

## Comportement responsive

| Écran | Résultat |
|-------|----------|
| **Desktop** | Mockup iPhone centré avec ombre |
| **Tablette** | Scale 0.85 automatique |
| **Mobile** | Cadre supprimé, contenu plein écran |
