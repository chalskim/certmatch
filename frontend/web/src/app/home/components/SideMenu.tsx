'use client';

export default function SideMenu() {
  // Menu items data
  const menuItems = [
    {
      id: 'main',
      title: '메인 메뉴 리스트',
      items: [
        { id: 'home', icon: 'fas fa-home', label: '홈', href: '/home' },
        { id: 'company-register', icon: 'fas fa-building', label: '업체등록', href: '#' },
        { id: 'job-register', icon: 'fas fa-briefcase', label: '구인등록', href: '#' },
        { id: 'education-register', icon: 'fas fa-graduation-cap', label: '교육등록', href: '#' },
      ],
    },
    {
      id: 'expert',
      title: '전문가 관련 메뉴',
      items: [
        { id: 'register', icon: 'fas fa-user-plus', label: '전문가 등록', href: '#' },
        { id: 'support', icon: 'fas fa-clipboard-list', label: '심사 지원/결과', href: '#' },
        { id: 'schedule', icon: 'fas fa-calendar-alt', label: '일정관리', href: '#' },
        { id: 'cases', icon: 'fas fa-trophy', label: '성공사례', href: '#' },
      ]
    },
    {
      id: 'settings',
      title: '설정 및 기타 메뉴',
      items: [
        { id: 'settings', icon: 'fas fa-cog', label: '설정', href: '#' },
        { id: 'help', icon: 'fas fa-question-circle', label: '도움말', href: '#' },
        { id: 'profile', icon: 'fas fa-user-circle', label: '내정보', href: '#' },
        { id: 'logout', icon: 'fas fa-sign-out-alt', label: '로그아웃', href: '#' },
      ]
    }
  ];
  return (
    <div className="side-menu">
      <div className="side-menu-header">
        <div className="user-avatar">
          <i className="fas fa-user text-2xl"></i>
        </div>
        <div className="user-info">
          <h3>홍길동</h3>
          <p>㈜테크솔루션</p>
        </div>
      </div>
      <div className="side-menu-content">
        {menuItems.map((section) => (
          <div key={section.id}>
            {section.items.map((item) => (
              <a 
                key={item.id} 
                href={item.href} 
                className="menu-item"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle menu item click
                  console.log(`Clicked on ${item.label}`);
                }}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </a>
            ))}
            {section.id !== 'settings' && <div className="menu-divider"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}