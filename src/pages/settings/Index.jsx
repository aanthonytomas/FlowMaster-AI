import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Checkbox } from '../../components/ui/Checkbox';
import Icon from '../../components/AppIcon';

const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  // Load settings from localStorage or use defaults
  const loadSettings = () => {
    const saved = localStorage.getItem('appSettings');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      // Account settings
      name: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))?.name : 'Anthony Tomas',
      email: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user'))?.email : 'aanthonytomas.2@gmail.com',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      
      // Notification settings
      emailNotifications: true,
      workflowSuccess: true,
      workflowFailure: true,
      weeklyReport: true,
      desktopNotifications: false,
      soundEnabled: true,
      
      // Appearance settings
      theme: 'system',
      compactMode: false,
      showAnimations: true,
      
      // Workflow preferences
      autoSaveInterval: '30',
      defaultTimeout: '300',
      maxRetries: '3',
      logLevel: 'info',
      
      // API & Integration settings
      apiRateLimit: '100',
      webhookTimeout: '30',
      cacheExpiration: '3600',
      
      // Security settings
      sessionTimeout: '60',
      twoFactorEnabled: false,
      loginNotifications: true,
      apiKeyRotation: '90'
    };
  };

  const [settings, setSettings] = useState(loadSettings());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    // Update session user data if account settings changed
    if (settings?.name || settings?.email) {
      const currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
      sessionStorage.setItem('user', JSON.stringify({
        ...currentUser,
        name: settings?.name,
        email: settings?.email
      }));
    }

    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      localStorage.removeItem('appSettings');
      setSettings(loadSettings());
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 3000);
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: 'User' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'appearance', label: 'Appearance', icon: 'Palette' },
    { id: 'workflow', label: 'Workflow', icon: 'Settings' },
    { id: 'api', label: 'API & Integration', icon: 'Code' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'advanced', label: 'Advanced', icon: 'Wrench' }
  ];

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <Input
              value={settings?.name}
              onChange={(e) => handleSettingChange('name', e?.target?.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <Input
              type="email"
              value={settings?.email}
              onChange={(e) => handleSettingChange('email', e?.target?.value)}
              placeholder="Enter your email"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Regional Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
            <Select
              value={settings?.timezone}
              onChange={(e) => handleSettingChange('timezone', e?.target?.value)}
              options={[
                { label: 'Eastern Time (ET)', value: 'America/New_York' },
                { label: 'Central Time (CT)', value: 'America/Chicago' },
                { label: 'Mountain Time (MT)', value: 'America/Denver' },
                { label: 'Pacific Time (PT)', value: 'America/Los_Angeles' },
                { label: 'UTC', value: 'UTC' }
              ]}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Date Format</label>
              <Select
                value={settings?.dateFormat}
                onChange={(e) => handleSettingChange('dateFormat', e?.target?.value)}
                options={[
                  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
                  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
                  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' }
                ]}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Time Format</label>
              <Select
                value={settings?.timeFormat}
                onChange={(e) => handleSettingChange('timeFormat', e?.target?.value)}
                options={[
                  { label: '12-hour (AM/PM)', value: '12h' },
                  { label: '24-hour', value: '24h' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Email Notifications</h3>
        <div className="space-y-3">
          <Checkbox
            checked={settings?.emailNotifications}
            onChange={(checked) => handleSettingChange('emailNotifications', checked)}
            label="Enable email notifications"
          />
          <Checkbox
            checked={settings?.workflowSuccess}
            onChange={(checked) => handleSettingChange('workflowSuccess', checked)}
            label="Workflow success notifications"
            disabled={!settings?.emailNotifications}
          />
          <Checkbox
            checked={settings?.workflowFailure}
            onChange={(checked) => handleSettingChange('workflowFailure', checked)}
            label="Workflow failure alerts"
            disabled={!settings?.emailNotifications}
          />
          <Checkbox
            checked={settings?.weeklyReport}
            onChange={(checked) => handleSettingChange('weeklyReport', checked)}
            label="Weekly performance reports"
            disabled={!settings?.emailNotifications}
          />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Desktop Notifications</h3>
        <div className="space-y-3">
          <Checkbox
            checked={settings?.desktopNotifications}
            onChange={(checked) => handleSettingChange('desktopNotifications', checked)}
            label="Enable desktop notifications"
          />
          <Checkbox
            checked={settings?.soundEnabled}
            onChange={(checked) => handleSettingChange('soundEnabled', checked)}
            label="Play notification sounds"
          />
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Theme Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Theme Mode</label>
            <Select
              value={settings?.theme}
              onChange={(e) => handleSettingChange('theme', e?.target?.value)}
              options={[
                { label: 'System Default', value: 'system' },
                { label: 'Light Mode', value: 'light' },
                { label: 'Dark Mode', value: 'dark' }
              ]}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Display Options</h3>
        <div className="space-y-3">
          <Checkbox
            checked={settings?.compactMode}
            onChange={(checked) => handleSettingChange('compactMode', checked)}
            label="Compact mode (reduce spacing)"
          />
          <Checkbox
            checked={settings?.showAnimations}
            onChange={(checked) => handleSettingChange('showAnimations', checked)}
            label="Enable animations and transitions"
          />
        </div>
      </div>
    </div>
  );

  const renderWorkflowSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Execution Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Auto-save Interval (seconds)
            </label>
            <Input
              type="number"
              value={settings?.autoSaveInterval}
              onChange={(e) => handleSettingChange('autoSaveInterval', e?.target?.value)}
              placeholder="30"
              min="10"
              max="300"
            />
            <p className="text-xs text-muted-foreground mt-1">
              How often to auto-save workflow changes (10-300 seconds)
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Default Timeout (seconds)
            </label>
            <Input
              type="number"
              value={settings?.defaultTimeout}
              onChange={(e) => handleSettingChange('defaultTimeout', e?.target?.value)}
              placeholder="300"
              min="30"
              max="3600"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Maximum execution time for workflow steps
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Maximum Retries
            </label>
            <Input
              type="number"
              value={settings?.maxRetries}
              onChange={(e) => handleSettingChange('maxRetries', e?.target?.value)}
              placeholder="3"
              min="0"
              max="10"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Number of retry attempts for failed steps
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Logging</h3>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Log Level</label>
          <Select
            value={settings?.logLevel}
            onChange={(e) => handleSettingChange('logLevel', e?.target?.value)}
            options={[
              { label: 'Error Only', value: 'error' },
              { label: 'Warning', value: 'warning' },
              { label: 'Info', value: 'info' },
              { label: 'Debug', value: 'debug' },
              { label: 'Verbose', value: 'verbose' }
            ]}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Amount of detail in execution logs
          </p>
        </div>
      </div>
    </div>
  );

  const renderAPISettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rate Limit (requests/minute)
            </label>
            <Input
              type="number"
              value={settings?.apiRateLimit}
              onChange={(e) => handleSettingChange('apiRateLimit', e?.target?.value)}
              placeholder="100"
              min="10"
              max="1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Webhook Timeout (seconds)
            </label>
            <Input
              type="number"
              value={settings?.webhookTimeout}
              onChange={(e) => handleSettingChange('webhookTimeout', e?.target?.value)}
              placeholder="30"
              min="5"
              max="300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cache Expiration (seconds)
            </label>
            <Input
              type="number"
              value={settings?.cacheExpiration}
              onChange={(e) => handleSettingChange('cacheExpiration', e?.target?.value)}
              placeholder="3600"
              min="60"
              max="86400"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Authentication</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Session Timeout (minutes)
            </label>
            <Input
              type="number"
              value={settings?.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e?.target?.value)}
              placeholder="60"
              min="15"
              max="480"
            />
          </div>
          <Checkbox
            checked={settings?.twoFactorEnabled}
            onChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
            label="Enable two-factor authentication"
          />
          <Checkbox
            checked={settings?.loginNotifications}
            onChange={(checked) => handleSettingChange('loginNotifications', checked)}
            label="Notify me of new login attempts"
          />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">API Security</h3>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            API Key Rotation (days)
          </label>
          <Input
            type="number"
            value={settings?.apiKeyRotation}
            onChange={(e) => handleSettingChange('apiKeyRotation', e?.target?.value)}
            placeholder="90"
            min="30"
            max="365"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Automatically rotate API keys after this period
          </p>
        </div>
      </div>
    </div>
  );

  const renderAdvancedSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
        <div className="space-y-3">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            fullWidth
            onClick={() => {
              const dataStr = JSON.stringify(settings, null, 2);
              const dataBlob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'settings-backup.json';
              link?.click();
            }}
          >
            Export Settings
          </Button>
          <Button
            variant="outline"
            iconName="Upload"
            iconPosition="left"
            fullWidth
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'application/json';
              input.onchange = (e) => {
                const file = e?.target?.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const imported = JSON.parse(event?.target?.result);
                      setSettings(imported);
                      handleSave();
                    } catch (error) {
                      alert('Invalid settings file');
                    }
                  };
                  reader?.readAsText(file);
                }
              };
              input?.click();
            }}
          >
            Import Settings
          </Button>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Reset Options</h3>
        <Button
          variant="destructive"
          iconName="RotateCcw"
          iconPosition="left"
          fullWidth
          onClick={handleReset}
        >
          Reset All Settings
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          This will restore all settings to their default values
        </p>
      </div>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Settings - AI Task Automation Agent</title>
        <meta name="description" content="Configure your workflow automation preferences and account settings" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account and application preferences</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  {isMobile ? (
                    <div className="p-2">
                      <Select
                        value={activeTab}
                        onChange={(e) => setActiveTab(e?.target?.value)}
                        options={tabs?.map(tab => ({ label: tab?.label, value: tab?.id }))}
                      />
                    </div>
                  ) : (
                    <nav className="p-2">
                      {tabs?.map((tab) => (
                        <button
                          key={tab?.id}
                          onClick={() => setActiveTab(tab?.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            activeTab === tab?.id
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                          }`}
                        >
                          <Icon name={tab?.icon} size={18} />
                          <span>{tab?.label}</span>
                        </button>
                      ))}
                    </nav>
                  )}
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:col-span-3">
                <div className="bg-card border border-border rounded-lg p-6">
                  {activeTab === 'account' && renderAccountSettings()}
                  {activeTab === 'notifications' && renderNotificationSettings()}
                  {activeTab === 'appearance' && renderAppearanceSettings()}
                  {activeTab === 'workflow' && renderWorkflowSettings()}
                  {activeTab === 'api' && renderAPISettings()}
                  {activeTab === 'security' && renderSecuritySettings()}
                  {activeTab === 'advanced' && renderAdvancedSettings()}

                  <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                    <Button
                      variant="default"
                      onClick={handleSave}
                      fullWidth={isMobile}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSettings(loadSettings())}
                      fullWidth={isMobile}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Save Notification */}
        {showSaveNotification && (
          <div className="fixed bottom-6 right-6 bg-success text-success-foreground px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in z-50">
            <Icon name="CheckCircle" size={20} />
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Settings;