import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import SEOHead from '@/components/seo-head';

interface DashboardStats {
  totalLoanApplications: number;
  totalContactSubmissions: number;
  totalJotformSubmissions: number;
  totalChatbotConversations: number;
  recentApplications: any[];
  recentContacts: any[];
  recentJotforms: any[];
  recentChats: any[];
  conversionMetrics: {
    applicationsThisMonth: number;
    contactsThisMonth: number;
    jotformsThisMonth: number;
    chatsThisMonth: number;
  };
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['/api/admin/dashboard'],
    enabled: isAuthenticated,
    retry: false
  });

  useEffect(() => {
    // Check if already authenticated by making a test request
    fetch('/api/admin/dashboard', {
      headers: {
        'Authorization': `Basic ${btoa('admin:fundtek2025')}`
      }
    })
    .then(response => {
      if (response.ok) {
        setIsAuthenticated(true);
      }
    })
    .catch(() => {
      // Not authenticated
    });
  }, []);

  const handleLogin = (username: string, password: string) => {
    const credentials = btoa(`${username}:${password}`);
    
    fetch('/api/admin/dashboard', {
      headers: {
        'Authorization': `Basic ${credentials}`
      }
    })
    .then(response => {
      if (response.ok) {
        setIsAuthenticated(true);
        // Store credentials for subsequent requests
        localStorage.setItem('adminAuth', credentials);
      } else {
        alert('Invalid credentials');
      }
    })
    .catch(() => {
      alert('Login failed');
    });
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#85abe4' }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600">Failed to load dashboard data</div>
      </div>
    );
  }

  const stats = dashboardData as DashboardStats;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Admin Dashboard - FundTek Capital Group"
        description="Administrative dashboard for FundTek Capital Group"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">FundTek Capital Group Management Portal</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Loan Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: '#85abe4' }}>
                {stats.totalLoanApplications}
              </div>
              <div className="text-sm text-gray-600">
                {stats.conversionMetrics.applicationsThisMonth} this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Jotform Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: '#85abe4' }}>
                {stats.totalJotformSubmissions}
              </div>
              <div className="text-sm text-gray-600">
                {stats.conversionMetrics.jotformsThisMonth} this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Chat Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: '#85abe4' }}>
                {stats.totalChatbotConversations}
              </div>
              <div className="text-sm text-gray-600">
                {stats.conversionMetrics.chatsThisMonth} this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Contact Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" style={{ color: '#85abe4' }}>
                {stats.totalContactSubmissions}
              </div>
              <div className="text-sm text-gray-600">
                {stats.conversionMetrics.contactsThisMonth} this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Jotform Submissions</CardTitle>
              <CardDescription>Latest form submissions from website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentJotforms?.length ? stats.recentJotforms.map((jotform, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">{jotform.firstName} {jotform.lastName}</div>
                      <div className="text-sm text-gray-600">{jotform.email}</div>
                      <div className="text-xs text-gray-500">{jotform.formTitle || 'Form Submission'}</div>
                    </div>
                    <Badge variant="outline" style={{ backgroundColor: '#85abe4', color: 'white' }}>
                      {jotform.status || 'New'}
                    </Badge>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-4">No Jotform submissions yet</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Chat Conversations</CardTitle>
              <CardDescription>Latest chat widget interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentChats?.length ? stats.recentChats.map((chat, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{chat.firstName || 'Anonymous User'}</div>
                        <div className="text-sm text-gray-600">{chat.phoneNumber}</div>
                        <div className="text-xs text-gray-500">{chat.product || 'General Inquiry'}</div>
                      </div>
                      <Badge variant="outline" style={{ backgroundColor: '#10b981', color: 'white' }}>
                        {chat.status || 'Active'}
                      </Badge>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-4">No chat conversations yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traditional Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Loan Applications</CardTitle>
              <CardDescription>Latest business funding requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentApplications?.length ? stats.recentApplications.map((app, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">${app.loanAmount?.toLocaleString() || 'N/A'}</div>
                      <div className="text-sm text-gray-600">{app.firstName} {app.lastName}</div>
                      <div className="text-xs text-gray-500">{app.businessName || 'Business'}</div>
                    </div>
                    <Badge variant="outline">
                      {app.status || 'Pending'}
                    </Badge>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-4">No loan applications yet</div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Contact Submissions</CardTitle>
              <CardDescription>Latest inquiries and leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentContacts?.length ? stats.recentContacts.map((contact, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{contact.firstName} {contact.lastName}</div>
                    <div className="text-sm text-gray-600">{contact.email}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {contact.message?.substring(0, 80) || 'No message'}...
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-4">No contact submissions yet</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Administrative tools and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <button 
                  className="p-4 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => window.open('/api/admin/loan-applications', '_blank')}
                >
                  <div className="font-medium text-blue-900">View All Applications</div>
                  <div className="text-sm text-blue-600">Manage loan applications</div>
                </button>
                
                <button 
                  className="p-4 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  style={{ backgroundColor: '#85abe4', color: 'white' }}
                  onClick={() => window.open('/api/admin/jotform-submissions', '_blank')}
                >
                  <div className="font-medium">View Jotform Data</div>
                  <div className="text-sm opacity-90">Track form submissions</div>
                </button>
                
                <button 
                  className="p-4 text-left bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                  style={{ backgroundColor: '#10b981', color: 'white' }}
                  onClick={() => window.open('/api/admin/chatbot-conversations', '_blank')}
                >
                  <div className="font-medium">View Chat Data</div>
                  <div className="text-sm opacity-90">Monitor conversations</div>
                </button>
                
                <button 
                  className="p-4 text-left bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                  onClick={() => window.open('/api/admin/contact-submissions', '_blank')}
                >
                  <div className="font-medium text-orange-900">View All Contacts</div>
                  <div className="text-sm text-orange-600">Manage contact submissions</div>
                </button>
                
                <button 
                  className="p-4 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  onClick={() => window.open('/api/admin/performance', '_blank')}
                >
                  <div className="font-medium text-purple-900">Performance Data</div>
                  <div className="text-sm text-purple-600">Analytics and metrics</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onLogin }: { onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <SEOHead 
        title="Admin Login - FundTek Capital Group"
        description="Administrative login for FundTek Capital Group"
      />
      
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Access FundTek Capital Group admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white rounded-md hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#85abe4' }}
            >
              Login
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}