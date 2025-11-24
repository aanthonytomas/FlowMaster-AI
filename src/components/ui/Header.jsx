import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeExecutions, setActiveExecutions] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // WebSocket connection for real-time execution updates
    // Only connect if backend is available
    let ws = null;
    
    try {
      ws = new WebSocket('ws://localhost:8080/executions');
      
      ws.onopen = () => {
        console.log('WebSocket connected');
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event?.data);
          setActiveExecutions(data?.activeCount || 0);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      ws.onerror = (error) => {
        // Silently handle WebSocket errors (backend may not be running)
        console.log('WebSocket not available - using mock data');
      };
      
      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };
    } catch (error) {
      // Backend not available, use mock data
      console.log('Backend not available - running in frontend-only mode');
    }

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { label: 'Workflows', path: '/workflow-builder', icon: 'GitBranch' },
    { label: 'Monitor', path: '/execution-monitor', icon: 'Activity' },
    { label: 'History', path: '/run-history', icon: 'History' },
  ];

  const isActive = (path) => {
    if (path === '/workflow-builder') {
      return location?.pathname === path || location?.pathname === '/step-configuration';
    }
    return location?.pathname === path;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-[1000]">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-primary/20">
                <Icon name="Zap" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-semibold text-foreground">AI Task Agent</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {activeExecutions > 0 && (
              <button
                onClick={() => navigate('/execution-monitor')}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-md text-sm font-medium hover:bg-accent/20 transition-all duration-150"
              >
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-subtle" />
                <span>{activeExecutions} Active</span>
              </button>
            )}

            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-all duration-150"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={18} color="var(--color-primary)" />
                </div>
                <span className="hidden lg:block text-sm font-medium text-foreground">
                  {user?.name || 'User'}
                </span>
                <Icon name="ChevronDown" size={16} className="hidden lg:block" />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[1005]"
                    onClick={toggleProfileMenu}
                  />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-[1010]">
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user?.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{user?.email || 'user@example.com'}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          toggleProfileMenu();
                          navigate('/settings');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-all duration-150"
                      >
                        <Icon name="Settings" size={16} />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md transition-all duration-150"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-all duration-150"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1015] lg:hidden"
            onClick={toggleMobileMenu}
          />
          <div className="fixed top-16 left-0 right-0 bottom-0 bg-card border-t border-border z-[1020] lg:hidden overflow-y-auto animate-slide-in">
            <nav className="p-4 space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={toggleMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-150 ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              {activeExecutions > 0 && (
                <div className="pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      navigate('/execution-monitor');
                      toggleMobileMenu();
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 bg-accent/10 text-accent rounded-lg text-base font-medium"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse-subtle" />
                      <span>Active Executions</span>
                    </div>
                    <span className="text-lg font-semibold">{activeExecutions}</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;