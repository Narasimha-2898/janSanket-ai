import React, { useState, useEffect } from 'react';
import { I18nProvider } from './i18n/I18nContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ReportPage } from './pages/ReportPage';
import { MapPage } from './pages/MapPage';
import { DashboardPage } from './pages/DashboardPage';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route matching
  const renderCurrentPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage navigate={navigate} />;
    }
    if (currentPath === '/report') {
      return <ReportPage navigate={navigate} />;
    }
    if (currentPath === '/map') {
      return <MapPage navigate={navigate} />;
    }
    if (currentPath === '/dashboard') {
      return <DashboardPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/issues/')) {
      const id = currentPath.replace('/issues/', '');
      return <IssueDetailPage id={id} navigate={navigate} />;
    }
    if (currentPath.startsWith('/reports/')) {
      const id = currentPath.replace('/reports/', '');
      return <IssueDetailPage id={id} navigate={navigate} />;
    }
    if (currentPath.startsWith('/report/') && currentPath !== '/report') {
      const id = currentPath.replace('/report/', '');
      return <IssueDetailPage id={id} navigate={navigate} />;
    }
    if (currentPath === '/queue') {
      return <HomePage navigate={navigate} />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }

    // Default fallback to HomePage
    return <HomePage navigate={navigate} />;
  };

  return (
    <I18nProvider>
      <AuthProvider>
        <NotificationProvider>
          <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
            <Navbar currentPath={currentPath} navigate={navigate} />
            <main className="flex-1">
              {renderCurrentPage()}
            </main>
            <Footer navigate={navigate} />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;
