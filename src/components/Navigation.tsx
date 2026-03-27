import React from 'react';

export type Route = 'home' | 'chords' | 'scales' | 'lessons';

interface NavTab {
  id: Route;
  label: string;
  icon: React.ReactNode;
}

interface NavigationProps {
  activeRoute: string;
  onNavigate: (route: Route) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const HomeIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
      fill={active ? 'var(--accent-blue)' : 'none'}
      stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const ChordsIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Guitar body shape */}
    <ellipse
      cx="12"
      cy="15"
      rx="5"
      ry="5.5"
      fill={active ? 'var(--accent-blue-dim)' : 'none'}
      stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'}
      strokeWidth="1.8"
    />
    {/* Neck */}
    <rect
      x="11"
      y="3"
      width="2"
      height="7"
      rx="1"
      fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'}
    />
    {/* Fret lines */}
    <line x1="10.5" y1="5.5" x2="13.5" y2="5.5" stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="10.5" y1="7.5" x2="13.5" y2="7.5" stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} strokeWidth="1.5" strokeLinecap="round" />
    {/* Sound hole */}
    <circle cx="12" cy="15" r="1.5" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
  </svg>
);

const ScalesIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fretboard grid */}
    <rect x="4" y="5" width="16" height="14" rx="2"
      fill="none"
      stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'}
      strokeWidth="1.8"
    />
    {/* Fret lines */}
    <line x1="9" y1="5" x2="9" y2="19" stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} strokeWidth="1.2" />
    <line x1="14" y1="5" x2="14" y2="19" stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} strokeWidth="1.2" />
    {/* Scale dots */}
    <circle cx="6.5" cy="9" r="2" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    <circle cx="11.5" cy="12" r="2" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    <circle cx="16.5" cy="15" r="2" fill={active ? 'var(--accent-gold)' : 'var(--text-muted)'} />
  </svg>
);

const LessonsIcon: React.FC<{ active: boolean }> = ({ active }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Book */}
    <path
      d="M4 4C4 3.45 4.45 3 5 3H19C19.55 3 20 3.45 20 4V18C20 18.55 19.55 19 19 19H5C4.45 19 4 18.55 4 18V4Z"
      fill={active ? 'var(--accent-blue-dim)' : 'none'}
      stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'}
      strokeWidth="1.8"
    />
    {/* Music note on book */}
    <path
      d="M10 14V9.5L15 8.5V13"
      stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="10" cy="14" r="1.2" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    <circle cx="15" cy="13" r="1.2" fill={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} />
    {/* Page line at bottom */}
    <line x1="4" y1="19" x2="20" y2="19" stroke={active ? 'var(--accent-blue)' : 'var(--text-secondary)'} strokeWidth="2" strokeLinecap="round" />
    <line x1="7" y1="21" x2="17" y2="21" stroke={active ? 'rgba(74,144,217,0.5)' : 'rgba(160,160,184,0.4)'} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TABS: NavTab[] = [
  { id: 'home', label: 'Home', icon: null },
  { id: 'chords', label: 'Chords', icon: null },
  { id: 'scales', label: 'Scales', icon: null },
  { id: 'lessons', label: 'Lessons', icon: null },
];

const ThemeToggle: React.FC<{ theme: 'dark' | 'light'; onToggle: () => void }> = ({ theme, onToggle }) => (
  <button
    onClick={onToggle}
    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    style={{
      position: 'absolute',
      top: '-44px',
      right: '12px',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'var(--bg-card)',
      border: '1px solid var(--border-subtle)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      WebkitTapHighlightColor: 'transparent',
      boxShadow: 'var(--shadow-card)',
      transition: 'all 150ms ease',
    }}
  >
    {theme === 'dark' ? (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="5" fill="var(--accent-gold)" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
          <line
            key={angle}
            x1={12 + 7.5 * Math.cos(angle * Math.PI / 180)}
            y1={12 + 7.5 * Math.sin(angle * Math.PI / 180)}
            x2={12 + 9.5 * Math.cos(angle * Math.PI / 180)}
            y2={12 + 9.5 * Math.sin(angle * Math.PI / 180)}
            stroke="var(--accent-gold)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        ))}
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          fill="var(--accent-blue)"
          stroke="var(--accent-blue)"
          strokeWidth="1.5"
        />
      </svg>
    )}
  </button>
);

const Navigation: React.FC<NavigationProps> = ({ activeRoute, onNavigate, theme, onToggleTheme }) => {
  const isActive = (id: Route) => activeRoute === id || (id === 'lessons' && activeRoute.startsWith('lesson'));

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '480px',
        height: 'calc(var(--nav-height) + env(safe-area-inset-bottom, 0px))',
        background: 'var(--nav-bg)',
        borderTop: '1px solid var(--nav-border)',
        display: 'flex',
        alignItems: 'stretch',
        zIndex: 100,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      {TABS.map(({ id, label }) => {
        const active = isActive(id);
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 4px',
              paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
              WebkitTapHighlightColor: 'transparent',
              transition: 'all 150ms ease',
              position: 'relative',
            }}
          >
            {/* Active indicator bar */}
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '2px',
                background: 'var(--accent-blue)',
                borderRadius: '0 0 2px 2px',
                opacity: active ? 1 : 0,
                transform: active ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'all 200ms ease',
              }}
            />
            {/* Icon */}
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {id === 'home' && <HomeIcon active={active} />}
              {id === 'chords' && <ChordsIcon active={active} />}
              {id === 'scales' && <ScalesIcon active={active} />}
              {id === 'lessons' && <LessonsIcon active={active} />}
            </span>
            {/* Label */}
            <span
              style={{
                fontSize: '10px',
                fontWeight: active ? 700 : 500,
                color: active ? 'var(--accent-blue)' : 'var(--text-secondary)',
                letterSpacing: '0.3px',
                transition: 'color 150ms ease',
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
