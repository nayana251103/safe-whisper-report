
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, FileText, TrendingUp, MessageSquare, Eye } from 'lucide-react';

const ModeratorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for moderator's department
  const departmentStats = {
    totalReports: 25,
    newReports: 3,
    inProgress: 8,
    onHold: 2,
    closed: 12,
    assignedDepartment: 'Human Resources'
  };

  const departmentReports = [
    { id: 'RPT-HR-001', subject: 'Workplace harassment complaint', reporter: 'Anonymous', status: 'New', date: '2024-01-15', investigator: 'John Smith' },
    { id: 'RPT-HR-002', subject: 'Discrimination in hiring process', reporter: 'User12345', status: 'In Progress', date: '2024-01-14', investigator: 'John Smith' },
    { id: 'RPT-HR-003', subject: 'Inappropriate manager behavior', reporter: 'Anonymous', status: 'On Hold', date: '2024-01-13', investigator: 'Sarah Davis' },
    { id: 'RPT-HR-004', subject: 'Unfair treatment complaint', reporter: 'User67890', status: 'Closed', date: '2024-01-12', investigator: 'John Smith' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
        return 'bg-orange-100 text-orange-800';
      case 'Closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-10 w-10 text-orange-600" />
            <div>
              <h1 className="text-3xl font-bold text-whisper-dark">Moderator Dashboard</h1>
              <p className="text-gray-600">Department: {departmentStats.assignedDepartment}</p>
            </div>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <MessageSquare className="h-4 w-4 mr-2" />
            View All Comments
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="whisper-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-whisper-dark">{departmentStats.totalReports}</p>
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
                  <p className="text-2xl font-bold text-blue-600">{departmentStats.newReports}</p>
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
                  <p className="text-2xl font-bold text-yellow-600">{departmentStats.inProgress}</p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="whisper-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{departmentStats.onHold}</p>
                  <p className="text-sm text-gray-600">On Hold</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="whisper-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{departmentStats.closed}</p>
                  <p className="text-sm text-gray-600">Closed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Department Overview</TabsTrigger>
            <TabsTrigger value="reports">Monitor Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="whisper-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Department Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">This Month</span>
                      <span className="font-semibold">8 Reports</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Last Month</span>
                      <span className="font-semibold">6 Reports</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Avg. Response Time</span>
                      <span className="font-semibold">1.8 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Resolution Rate</span>
                      <span className="font-semibold">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="whisper-card">
                <CardHeader>
                  <CardTitle>Investigator Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">John Smith</span>
                      <div className="text-right">
                        <span className="font-semibold">12 cases</span>
                        <p className="text-xs text-gray-500">Avg: 1.5 days</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sarah Davis</span>
                      <div className="text-right">
                        <span className="font-semibold">8 cases</span>
                        <p className="text-xs text-gray-500">Avg: 2.1 days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-whisper-dark">Department Reports</h2>
              <Button variant="outline">Export Reports</Button>
            </div>

            <Card className="whisper-card">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-orange-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700">Report ID</th>
                        <th className="text-left p-4 font-medium text-gray-700">Subject</th>
                        <th className="text-left p-4 font-medium text-gray-700">Reporter</th>
                        <th className="text-left p-4 font-medium text-gray-700">Investigator</th>
                        <th className="text-left p-4 font-medium text-gray-700">Status</th>
                        <th className="text-left p-4 font-medium text-gray-700">Date</th>
                        <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departmentReports.map((report, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-mono text-sm">{report.id}</td>
                          <td className="p-4">{report.subject}</td>
                          <td className="p-4">{report.reporter}</td>
                          <td className="p-4">{report.investigator}</td>
                          <td className="p-4">
                            <Badge className={`${getStatusColor(report.status)} border-0`}>
                              {report.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-gray-600">{report.date}</td>
                          <td className="p-4">
                            <Button size="sm" variant="outline" className="mr-2">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Comment
                            </Button>
                          </td>
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

export default ModeratorDashboard;
