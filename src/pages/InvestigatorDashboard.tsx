
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, FileText, Clock, MessageSquare, Paperclip, Send } from 'lucide-react';

const InvestigatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('assigned');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  // Mock data for investigator's assigned reports
  const investigatorStats = {
    assignedReports: 12,
    newAssignments: 2,
    inProgress: 6,
    onHold: 1,
    completed: 3,
    assignedDepartment: 'Human Resources',
    investigatorName: 'John Smith'
  };

  const assignedReports = [
    { 
      id: 'RPT-HR-001', 
      subject: 'Workplace harassment complaint', 
      reporter: 'Anonymous', 
      status: 'New', 
      date: '2024-01-15',
      priority: 'High',
      description: 'Employee reports inappropriate behavior from supervisor during team meetings.',
      evidence: ['Screenshot of messages', 'Witness statement']
    },
    { 
      id: 'RPT-HR-002', 
      subject: 'Discrimination in hiring process', 
      reporter: 'User12345', 
      status: 'In Progress', 
      date: '2024-01-14',
      priority: 'Medium',
      description: 'Candidate alleges discriminatory questions during interview process.',
      evidence: ['Interview recording', 'Email correspondence']
    },
    { 
      id: 'RPT-HR-004', 
      subject: 'Unfair treatment complaint', 
      reporter: 'User67890', 
      status: 'On Hold', 
      date: '2024-01-12',
      priority: 'Low',
      description: 'Employee claims unfair workload distribution and missed promotion opportunities.',
      evidence: ['Performance reviews', 'Work assignment logs']
    },
  ];

  const comments = [
    { id: 1, author: 'Reporter', content: 'This incident happened during the weekly team meeting on January 10th.', date: '2024-01-15 10:30' },
    { id: 2, author: 'Investigator', content: 'Thank you for the report. I will need to review the meeting recordings. Can you provide any witness information?', date: '2024-01-15 14:20' },
    { id: 3, author: 'Reporter', content: 'Yes, Sarah Johnson was present and witnessed the incident.', date: '2024-01-15 16:45' },
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-10 w-10 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-whisper-dark">Investigator Dashboard</h1>
              <p className="text-gray-600">{investigatorStats.investigatorName} - {investigatorStats.assignedDepartment}</p>
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Clock className="h-4 w-4 mr-2" />
            Time Tracking
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="whisper-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-whisper-dark">{investigatorStats.assignedReports}</p>
                  <p className="text-sm text-gray-600">Assigned Reports</p>
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
                  <p className="text-2xl font-bold text-blue-600">{investigatorStats.newAssignments}</p>
                  <p className="text-sm text-gray-600">New Assignments</p>
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
                  <p className="text-2xl font-bold text-yellow-600">{investigatorStats.inProgress}</p>
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
                  <p className="text-2xl font-bold text-orange-600">{investigatorStats.onHold}</p>
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
                  <p className="text-2xl font-bold text-green-600">{investigatorStats.completed}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assigned">Assigned Reports</TabsTrigger>
            <TabsTrigger value="investigation">Investigation Details</TabsTrigger>
          </TabsList>

          <TabsContent value="assigned" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-whisper-dark">My Assigned Reports</h2>
            </div>

            <div className="grid gap-6">
              {assignedReports.map((report, index) => (
                <Card key={index} className="whisper-card cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setSelectedReport(report.id)}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-lg font-semibold text-whisper-dark">{report.subject}</h3>
                          <Badge className={`${getStatusColor(report.status)} border-0`}>
                            {report.status}
                          </Badge>
                          <Badge className={`${getPriorityColor(report.priority)} border-0`}>
                            {report.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">Report ID: {report.id}</p>
                        <p className="text-sm text-gray-600">Reporter: {report.reporter}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="text-sm text-gray-600">{report.date}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Communicate
                          </Button>
                          <Select>
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue placeholder="Update Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="on-hold">On Hold</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{report.description}</p>
                    <div className="flex items-center space-x-2">
                      <Paperclip className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Evidence: {report.evidence.join(', ')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investigation" className="space-y-6">
            {selectedReport ? (
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="whisper-card">
                  <CardHeader>
                    <CardTitle>Investigation Progress</CardTitle>
                    <CardDescription>Report ID: {selectedReport}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Update Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Investigation Notes</Label>
                      <Textarea 
                        id="notes" 
                        placeholder="Add your investigation notes here..."
                        rows={4}
                      />
                    </div>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Update Investigation
                    </Button>
                  </CardContent>
                </Card>

                <Card className="whisper-card">
                  <CardHeader>
                    <CardTitle>Communication Thread</CardTitle>
                    <CardDescription>Two-way communication with reporter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                      {comments.map((comment) => (
                        <div key={comment.id} className="border-l-4 border-purple-200 pl-4 py-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-gray-500">{comment.date}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Textarea 
                        placeholder="Type your message to the reporter..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <Button className="w-full" size="sm">
                        <Send className="h-3 w-3 mr-1" />
                        Send Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="whisper-card">
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a report from the "Assigned Reports" tab to view investigation details</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InvestigatorDashboard;
