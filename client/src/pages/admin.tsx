import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, MessageSquare, FileText, CreditCard, TrendingUp, Search, Download, Filter, Eye } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  
  // Status update function
  const updateStatus = async (type: string, id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/${type === 'chat' ? 'chatbot-conversations' : `${type}-applications`}/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${localStorage.getItem('adminAuth') || btoa('admin:fundtek2025')}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        // Refetch data to update the UI
        window.location.reload();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      alert('Error updating status: ' + error);
    }
  };
  
  const { data: dashboardData, isLoading, error } = useQuery({
    queryKey: ['/api/admin/dashboard'],
    enabled: isAuthenticated,
    retry: false
  });

  // Fetch detailed data for each section
  const { data: loanApplications } = useQuery({
    queryKey: ['/api/admin/loan-applications'],
    enabled: isAuthenticated && activeTab === 'loans',
    retry: false
  });

  const { data: jotformSubmissions } = useQuery({
    queryKey: ['/api/admin/jotform-submissions'],
    enabled: isAuthenticated && activeTab === 'jotforms',
    retry: false
  });

  const { data: chatConversations } = useQuery({
    queryKey: ['/api/admin/chatbot-conversations'],
    enabled: isAuthenticated && activeTab === 'chats',
    retry: false
  });

  const { data: contactSubmissions } = useQuery({
    queryKey: ['/api/admin/contact-submissions'],
    enabled: isAuthenticated && activeTab === 'contacts',
    retry: false
  });

  const { data: auditLogs } = useQuery({
    queryKey: ['/api/admin/audit-logs'],
    enabled: isAuthenticated && activeTab === 'audit',
    retry: false
  });

  const exportData = (data: any[], filename: string) => {
    const csv = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'converted': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'fundtek2025') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', btoa(`${username}:${password}`));
    } else {
      alert('Invalid credentials');
    }
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('adminAuth');
    if (storedAuth) {
      try {
        const decoded = atob(storedAuth);
        const [username, password] = decoded.split(':');
        if (username === 'admin' && password === 'fundtek2025') {
          setIsAuthenticated(true);
        }
      } catch (e) {
        localStorage.removeItem('adminAuth');
      }
    }
  }, []);

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading dashboard data</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Retry
          </Button>
        </div>
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
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">FundTek Capital Group Management Portal</p>
          </div>
          <div className="flex gap-4">
            <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.reload()}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                localStorage.removeItem('adminAuth');
                setIsAuthenticated(false);
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Advanced Tabs Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Loan Applications
            </TabsTrigger>
            <TabsTrigger value="jotforms" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Jotform Data
            </TabsTrigger>
            <TabsTrigger value="chats" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat Conversations
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Contact Submissions
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Audit Logs
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5" style={{ color: '#85abe4' }} />
                    Loan Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold" style={{ color: '#85abe4' }}>
                    {stats.totalLoanApplications}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    +{stats.conversionMetrics.applicationsThisMonth} this month
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-600" />
                    Jotform Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">
                    {stats.totalJotformSubmissions}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    +{stats.conversionMetrics.jotformsThisMonth} this month
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                    Chat Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">
                    {stats.totalChatbotConversations}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    +{stats.conversionMetrics.chatsThisMonth} this month
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    Contact Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {stats.totalContactSubmissions}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    +{stats.conversionMetrics.contactsThisMonth} this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
          </TabsContent>

          {/* Chat Conversations Tab */}
          <TabsContent value="chats" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Chat Conversations</h3>
                <p className="text-gray-600">Manage chat widget interactions and leads</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => chatConversations && exportData(chatConversations, 'chat-conversations')}
                  disabled={!chatConversations?.length}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Product Interest</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chatConversations?.filter(chat => 
                      !searchTerm || 
                      chat.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      chat.product?.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((chat) => (
                      <TableRow key={chat.id}>
                        <TableCell className="font-medium">{chat.leadId || `CHAT-${chat.id}`}</TableCell>
                        <TableCell>{chat.firstName || 'Anonymous'}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{chat.phoneNumber}</div>
                            <div className="text-gray-500">{chat.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{chat.product || 'General'}</TableCell>
                        <TableCell>{chat.revenue || 'Not specified'}</TableCell>
                        <TableCell>{formatDate(chat.createdAt)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(chat.status || 'new')}>
                            {chat.status || 'New'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => alert(`Chat Conversation Details\n\nLead ID: ${chat.leadId || `CHAT-${chat.id}`}\nName: ${chat.firstName || 'Anonymous'}\nPhone: ${chat.phoneNumber}\nEmail: ${chat.email}\nProduct Interest: ${chat.product}\nRevenue Range: ${chat.revenue}\nUser Type: ${chat.userType}\nTimeline: ${chat.timeline}\nSession ID: ${chat.sessionId}\nCreated: ${formatDate(chat.createdAt)}\nStatus: ${chat.status || 'New'}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Select value={chat.status || 'new'} onValueChange={(value) => updateStatus('chat', chat.id, value)}>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="converted">Converted</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!chatConversations || chatConversations.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          No chat conversations found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jotform Submissions Tab */}
          <TabsContent value="jotforms" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Jotform Submissions</h3>
                <p className="text-gray-600">External form submissions and applications</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => jotformSubmissions && exportData(jotformSubmissions, 'jotform-submissions')}
                  disabled={!jotformSubmissions?.length}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Submission ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Form Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jotformSubmissions?.filter(jotform => 
                      !searchTerm || 
                      jotform.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      jotform.email?.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((jotform) => (
                      <TableRow key={jotform.id}>
                        <TableCell className="font-medium">JF-{jotform.id}</TableCell>
                        <TableCell>{jotform.firstName} {jotform.lastName}</TableCell>
                        <TableCell>{jotform.email}</TableCell>
                        <TableCell>{jotform.formTitle || 'Application Form'}</TableCell>
                        <TableCell>{formatDate(jotform.createdAt)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(jotform.status || 'new')}>
                            {jotform.status || 'New'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => alert(`Jotform Submission Details\n\nSubmission ID: JF-${jotform.id}\nName: ${jotform.firstName} ${jotform.lastName}\nEmail: ${jotform.email}\nPhone: ${jotform.phoneNumber || 'Not provided'}\nForm Title: ${jotform.formTitle || 'Application Form'}\nBusiness Name: ${jotform.businessName || 'Not provided'}\nSubmitted: ${formatDate(jotform.createdAt)}\nStatus: ${jotform.status || 'New'}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Select value={jotform.status || 'new'} onValueChange={(value) => updateStatus('jotform', jotform.id, value)}>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="converted">Converted</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!jotformSubmissions || jotformSubmissions.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No Jotform submissions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Loan Applications Tab */}
          <TabsContent value="loans" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Loan Applications</h3>
                <p className="text-gray-600">Direct loan application submissions</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => loanApplications && exportData(loanApplications, 'loan-applications')}
                  disabled={!loanApplications?.length}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Application ID</TableHead>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Business</TableHead>
                      <TableHead>Loan Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanApplications?.filter(loan => 
                      !searchTerm || 
                      loan.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      loan.businessName?.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((loan) => (
                      <TableRow key={loan.id}>
                        <TableCell className="font-medium">APP-{loan.id}</TableCell>
                        <TableCell>{loan.firstName} {loan.lastName}</TableCell>
                        <TableCell>{loan.businessName || 'N/A'}</TableCell>
                        <TableCell>${loan.loanAmount?.toLocaleString() || 'N/A'}</TableCell>
                        <TableCell>{formatDate(loan.createdAt)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(loan.status || 'pending')}>
                            {loan.status || 'Pending'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => alert(`Loan Application Details\n\nApplication ID: APP-${loan.id}\nApplicant: ${loan.firstName} ${loan.lastName}\nBusiness: ${loan.businessName || 'Not provided'}\nLoan Amount: $${loan.loanAmount?.toLocaleString() || 'Not specified'}\nEmail: ${loan.email}\nPhone: ${loan.phoneNumber || 'Not provided'}\nSubmitted: ${formatDate(loan.createdAt)}\nStatus: ${loan.status || 'Pending'}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Select value={loan.status || 'pending'} onValueChange={(value) => updateStatus('loan', loan.id, value)}>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewed">Reviewed</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="funded">Funded</SelectItem>
                                <SelectItem value="declined">Declined</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!loanApplications || loanApplications.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No loan applications found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Submissions Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Contact Submissions</h3>
                <p className="text-gray-600">General contact form submissions and inquiries</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => contactSubmissions && exportData(contactSubmissions, 'contact-submissions')}
                  disabled={!contactSubmissions?.length}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contact ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contactSubmissions?.filter(contact => 
                      !searchTerm || 
                      contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">CON-{contact.id}</TableCell>
                        <TableCell>{contact.firstName} {contact.lastName}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell className="max-w-xs truncate">{contact.message || 'No message'}</TableCell>
                        <TableCell>{formatDate(contact.createdAt)}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contact.status || 'new')}>
                            {contact.status || 'New'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => alert(`Contact Submission Details\n\nContact ID: CON-${contact.id}\nName: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}\nPhone: ${contact.phoneNumber || 'Not provided'}\nMessage: ${contact.message || 'No message provided'}\nSubmitted: ${formatDate(contact.createdAt)}\nStatus: ${contact.status || 'New'}`)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Select value={contact.status || 'new'} onValueChange={(value) => updateStatus('contact', contact.id, value)}>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="converted">Converted</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!contactSubmissions || contactSubmissions.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No contact submissions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Audit Logs</h3>
                <p className="text-gray-600">Track all system activities and user actions</p>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Search audit logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => auditLogs && exportData(auditLogs, 'audit-logs')}
                  disabled={!auditLogs?.length}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Resource</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs?.filter(log => 
                      !searchTerm || 
                      log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      log.resource?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      log.ipAddress?.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-sm">{formatDate(log.createdAt)}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>{log.resource}</TableCell>
                        <TableCell>{log.userId ? `User ${log.userId}` : 'Anonymous'}</TableCell>
                        <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                        <TableCell>
                          <Badge className={log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {log.success ? 'Success' : 'Failed'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              const details = [
                                `Audit Log ID: ${log.id}`,
                                `Action: ${log.action}`,
                                `Resource: ${log.resource}`,
                                `Resource ID: ${log.resourceId || 'N/A'}`,
                                `User ID: ${log.userId || 'Anonymous'}`,
                                `IP Address: ${log.ipAddress}`,
                                `User Agent: ${log.userAgent || 'N/A'}`,
                                `Session ID: ${log.sessionId || 'N/A'}`,
                                `Success: ${log.success ? 'Yes' : 'No'}`,
                                `Error Message: ${log.errorMessage || 'N/A'}`,
                                `Timestamp: ${formatDate(log.createdAt)}`,
                                log.oldValues ? `Old Values: ${log.oldValues}` : '',
                                log.newValues ? `New Values: ${log.newValues}` : ''
                              ].filter(Boolean).join('\n');
                              alert(details);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!auditLogs || auditLogs.length === 0) && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No audit logs found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" style={{ backgroundColor: '#85abe4' }}>
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}