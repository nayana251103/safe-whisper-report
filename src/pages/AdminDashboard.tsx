
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Users, FileText, TrendingUp, Plus, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const dashboardStats = {
    totalReports: 127,
    newReports: 8,
    inProgress: 15,
    closed: 104,
    departments: 9,
    investigators: 12
  };

  const recentReports = [
    { id: 'RPT-001', subject: 'Harassment complaint', department: 'HR', status: 'New', date: '2024-01-15' },
    { id: 'RPT-002', subject: 'Financial misconduct', department: 'Finance', status: 'In Progress', date: '2024-01-14' },
    { id: 'RPT-003', subject: 'Safety violation', department: 'Operations', status: 'Closed', date: '2024-01-13' },
  ];

  const departments = [
    { name: 'Human Resources', moderator: 'jane.doe@company.com', investigator: 'john.smith@company.com', reports: 25 },
    { name: 'Finance', moderator: 'mike.wilson@company.com', investigator: 'sarah.jones@company.com', reports: 18 },
    { name: 'IT Department', moderator: 'alex.brown@company.com', investigator: 'lisa.davis@company.com', reports: 12 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-10 w-10 text-whisper-primary" />
            <div>
              <h1 className="text-3xl font-bold text-whisper-dark">Admin Dashboard</h1>
              <p className="text-gray-600">Secure Whisper Management Portal</p>
            </div>
          </div>
          <Button className="whisper-button">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="whisper-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-whisper-primary" />
                <div>
                  <p className="text-2xl font-bold text-whisper-dark">{dashboardStats.totalReports}</p>
                  <p className="text-sm text-gray-600">Total Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="whisper-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{dashboardStats.newReports}</p>
                  <p className="text-sm text-gray-600">New Reports</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="whisper-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">{dashboardStats.inProgress}</p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="whisper-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-emerald-500" />
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{dashboardStats.investigators}</p>
                  <p className="text-sm text-gray-600">Active Staff</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="reports">Recent Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="whisper-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Report Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-semibold">23 Reports</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-semibold">19 Reports</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. Response Time</span>
                      <span className="font-semibold">2.3 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="whisper-card">
                <CardHeader>
                  <CardTitle>Department Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {departments.slice(0, 3).map((dept, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{dept.name}</span>
                        <span className="font-semibold">{dept.reports} reports</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-whisper-dark">Department Management</h2>
              <Button className="whisper-button">
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </div>

            <div className="grid gap-6">
              {departments.map((dept, index) => (
                <Card key={index} className="whisper-card">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-whisper-dark">{dept.name}</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            <strong>Moderator:</strong> {dept.moderator}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Investigator:</strong> {dept.investigator}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-whisper-primary">{dept.reports}</p>
                        <p className="text-sm text-gray-600">Total Reports</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-whisper-dark">Recent Reports</h2>
              <Button variant="outline">View All Reports</Button>
            </div>

            <Card className="whisper-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700">Report ID</th>
                        <th className="text-left p-4 font-medium text-gray-700">Subject</th>
                        <th className="text-left p-4 font-medium text-gray-700">Department</th>
                        <th className="text-left p-4 font-medium text-gray-700">Status</th>
                        <th className="text-left p-4 font-medium text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentReports.map((report, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-mono text-sm">{report.id}</td>
                          <td className="p-4">{report.subject}</td>
                          <td className="p-4">{report.department}</td>
                          <td className="p-4">
                            <Badge className={`${getStatusColor(report.status)} border-0`}>
                              {report.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-600">{report.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
