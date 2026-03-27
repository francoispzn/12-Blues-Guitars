import React, { useState, useEffect, useMemo } from 'react';
import './index.css';

import Navigation, { type Route } from './components/Navigation';
import HomePage from './pages/HomePage';
import ChordsPage from './pages/ChordsPage';
import ScalesPage from './pages/ScalesPage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';

import type { LessonModule, Chord, Scale } from './data/types';
import { ALL_CHORDS } from './data/chords';
import { ALL_SCALES } from './data/scales';
import { ALL_MODULES } from './data/lessons';

const _chordMap: Record<string, Chord> = ALL_CHORDS ?? {};
const _scaleMap: Record<string, Scale> = ALL_SCALES ?? {};
const _lessons: LessonModule[] = ALL_MODULES ?? [];

// ─── Hash-based routing ──────────────────────────────────────────────────────
// Routes:
//   #home         → HomePage
//   #chords       → ChordsPage
//   #scales       → ScalesPage
//   #lessons      → LessonsPage
//   #lesson/:id   → LessonDetailPage

const parseHash = (hash: string): { route: string; param: string | null } => {
  const h = hash.replace(/^#\/?/, '');
  if (h.startsWith('lesson/')) {
    return { route: 'lesson', param: h.slice('lesson/'.length) };
  }
  if (['home', 'chords', 'scales', 'lessons'].includes(h)) {
    return { route: h, param: null };
  }
  return { route: 'home', param: null };
};

const serializeHash = (route: string, param?: string | null): string => {
  if (param) return `#${route}/${param}`;
  return `#${route}`;
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    console.error('React ErrorBoundary caught:', error);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color: '#e74c3c', padding: 20 }}>
          <h2>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>
            {this.state.error.message}
            {'\n'}
            {this.state.error.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

type Theme = 'dark' | 'light';

const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme | null;
    return saved || getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for OS-level theme changes (e.g. iOS dark mode toggle)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const [routeState, setRouteState] = useState<{ route: string; param: string | null }>(() => {
    return parseHash(window.location.hash || '#home');
  });

  // Sync with browser hash changes (e.g. back button)
  useEffect(() => {
    const handleHashChange = () => {
      setRouteState(parseHash(window.location.hash));
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (target: string) => {
    // target: 'home' | 'chords' | 'scales' | 'lessons' | 'lesson/some-id'
    let route = target;
    let param: string | null = null;
    if (target.startsWith('lesson/')) {
      route = 'lesson';
      param = target.slice('lesson/'.length);
    }
    window.location.hash = serializeHash(route, param);
    setRouteState({ route, param });
    window.scrollTo({ top: 0, behavior: 'instant' } as ScrollToOptions);
  };

  const handleNavTabChange = (tab: Route) => {
    navigate(tab);
  };

  // Which tab in the bottom nav is highlighted
  const activeNavRoute = useMemo<Route>(() => {
    const { route } = routeState;
    if (route === 'lesson') return 'lessons';
    return (route as Route) ?? 'home';
  }, [routeState]);

  // Stable refs to data
  const lessons = useMemo(() => _lessons, []);
  const chordMap = useMemo(() => _chordMap, []);
  const scaleMap = useMemo(() => _scaleMap, []);

  const renderPage = () => {
    const { route, param } = routeState;

    switch (route) {
      case 'home':
        return <HomePage onNavigate={navigate} />;

      case 'chords':
        return <ChordsPage />;

      case 'scales':
        return <ScalesPage />;

      case 'lessons':
        return (
          <LessonsPage
            lessons={lessons}
            onSelectLesson={(id) => navigate(`lesson/${id}`)}
          />
        );

      case 'lesson': {
        if (!param) {
          navigate('lessons');
          return null;
        }
        const lesson = lessons.find(l => l.id === param);
        if (!lesson) {
          return (
            <div className="page" style={{ textAlign: 'center', paddingTop: '60px' }}>
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>😕</div>
              <h2 style={{ fontSize: '18px', marginBottom: '8px' }}>Lesson not found</h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                The lesson "{param}" doesn't exist.
              </p>
              <button className="btn btn-primary" onClick={() => navigate('lessons')}>
                Back to Lessons
              </button>
            </div>
          );
        }
        return (
          <LessonDetailPage
            lesson={lesson}
            chordMap={chordMap}
            scaleMap={scaleMap}
            onBack={() => navigate('lessons')}
          />
        );
      }

      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="app-shell">
        <main
          className="app-content"
          key={`${routeState.route}-${routeState.param ?? ''}`}
        >
          {renderPage()}
        </main>

        <Navigation
          activeRoute={activeNavRoute}
          onNavigate={handleNavTabChange}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      </div>
    </ErrorBoundary>
  );
};

export default App;
