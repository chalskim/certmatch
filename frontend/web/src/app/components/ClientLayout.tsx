'use client';

import { useState, useEffect } from 'react';

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set client-side flag to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Close side menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sideMenu = document.querySelector('.side-menu');
      const headerIcon = document.querySelector('.header-icon');
      
      if (isSideMenuOpen && 
          sideMenu && 
          !sideMenu.contains(event.target as Node) && 
          headerIcon && 
          !headerIcon.contains(event.target as Node)) {
        setIsSideMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSideMenuOpen]);

  return (
    <div className="flex flex-row flex-nowrap min-h-screen">
      {/* Header */}
      <header className="app-header">
        <div className="container mx-auto flex flex-nowrap justify-between items-center px-4 py-3">
          <div className="flex items-center flex-shrink-0">
            <button 
              className="header-icon"
              onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div className="flex items-center flex-shrink-0">
            <h1 className="app-title whitespace-nowrap">CertMatch</h1>
          </div>
          <div className="header-icons flex items-center space-x-4 flex-shrink-0">
            <div className="header-icon relative">
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </div>
            <div className="header-icon">
              <i className="fas fa-user-circle"></i>
            </div>
          </div>
        </div>
      </header>
      
      {/* Side Menu Overlay */}
      {isClient && isSideMenuOpen && (
        <div 
          className="overlay active"
          onClick={() => setIsSideMenuOpen(false)}
        ></div>
      )}
      
      {/* Side Menu */}
      <div className={`side-menu ${isClient && isSideMenuOpen ? 'active' : ''}`}>
        <div className="side-menu-header">
          <div className="user-avatar">
            <i className="fas fa-user text-2xl"></i>
          </div>
          <div className="user-info">
            <h3 className="font-bold">홍길동</h3>
            <p className="text-sm">㈜테크솔루션</p>
          </div>
        </div>
        <div className="side-menu-content">
          <nav>
            <a href="/home" className="menu-item">
              <i className="fas fa-home"></i>
              <span>홈</span>
            </a>
            <div className="menu-divider"></div>
            <a href="#" className="menu-item">
              <i className="fas fa-building"></i>
              <span>입찰 등록</span>
            </a>
            <a href="#" className="menu-item">
              <i className="fas fa-briefcase"></i>
              <span>구인 등록</span>
            </a>
            <a href="#" className="menu-item">
              <i className="fas fa-graduation-cap"></i>
              <span>교육 등록</span>
            </a>
            <a href="#" className="menu-item">
              <i className="fas fa-user-plus"></i>
              <span>전문가 등록</span>
            </a>
            
            <div className="menu-divider"></div>

            <a href="#" className="menu-item">
              <i className="fas fa-gavel"></i>
              <span>입찰 참여/결과</span>
            </a>            
            <a href="#" className="menu-item">
              <i className="fas fa-clipboard-list"></i>
              <span>심사 지원/결과</span>
            </a>
            <a href="#" className="menu-item">
              <i className="fas fa-calendar-alt"></i>
              <span>일정관리</span>
            </a>
            <a href="#" className="menu-item">
              <i className="fas fa-trophy"></i>
              <span>성공사례</span>
            </a>
            
            <div className="menu-divider"></div>
            
            <a href="#" className="menu-item">
              <i className="fas fa-cog"></i>
              <span>설정</span>
            </a>
            <a href="#" className="menu-item">
              <i className="fas fa-question-circle"></i>
              <span>도움말</span>
            </a>
            <a href="#" className="menu-item">
              <i className="fas fa-user-circle"></i>
              <span>내정보</span>
            </a>
            <a href="#" className="menu-item">
              <i className="fas fa-sign-out-alt"></i>
              <span>로그아웃</span>
            </a>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <a href="#" className="nav-item active">
          <i className="fas fa-home"></i>
          <span>홈</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-user-plus"></i>
          <span>전문가 등록</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-clipboard-check"></i>
          <span>심사 지원</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-calendar-alt"></i>
          <span>일정관리</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-trophy"></i>
          <span>성공사례</span>
        </a>
      </nav>
    </div>
  );
}