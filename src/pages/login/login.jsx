import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleGitHubLogin = () => {
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const mockUser = {
        id: 'user_12345',
        name: 'Anthony Tomas',
        email: 'aanthonytomas.2@gmail.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        githubUsername: 'aanthonytomas',
        createdAt: new Date()?.toISOString()
      };

      sessionStorage.setItem('user', JSON.stringify(mockUser));
      setShowSuccess(true);

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 2000);
  };

  const handleDemoLogin = () => {
    setError('Please use GitHub OAuth for secure authentication');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={32} color="var(--color-primary)" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">
                Sign in to access your AI automation workflows
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <Icon name="AlertCircle" size={20} color="var(--color-destructive)" className="flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-destructive">{error}</p>
              </div>
            </div>
          )}

          {showSuccess && (
            <div className="flex items-start gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
              <Icon name="CheckCircle2" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-success">Authentication successful! Redirecting...</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Button
              variant="default"
              fullWidth
              onClick={handleGitHubLogin}
              loading={isLoading}
              disabled={isLoading || showSuccess}
              iconName="Github"
              iconPosition="left"
              iconSize={20}
              className="bg-[#24292e] hover:bg-[#1a1e22] text-white border-0"
            >
              {isLoading ? 'Authenticating...' : 'Sign in with GitHub'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card text-muted-foreground">OR</span>
              </div>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={handleDemoLogin}
              disabled={isLoading || showSuccess}
            >
              Continue as Demo User
            </Button>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Icon name="Shield" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-foreground">Secure Authentication</p>
                <p className="text-xs text-muted-foreground">
                  We use GitHub OAuth for secure authentication. We only request access to your basic profile information.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Icon name="Lock" size={14} />
                <span>SSL Encrypted Connection</span>
              </div>
              
              <div className="flex items-center justify-center gap-4 text-xs">
                <button className="text-primary hover:underline">Privacy Policy</button>
                <span className="text-muted-foreground">•</span>
                <button className="text-primary hover:underline">Terms of Service</button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Icon name="Info" size={14} />
              <span>New to AI Task Agent? Sign up is automatic with GitHub</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 shadow-xl">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="text-sm font-medium text-foreground">Connecting to GitHub...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;