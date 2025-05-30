
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StatusCheck = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    referenceId: '',
    password: ''
  });
  const [reportStatus, setReportStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.referenceId || !formData.password) {
      toast({
        title: "Error",
        description: "Please enter both Reference ID and password",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock report status data
      const mockStatus = {
        referenceId: formData.referenceId,
        reportId: `RPT-${Date.now()}-123`,
        status: 'In Progress',
        submittedDate: new Date().toLocaleDateString(),
        lastUpdate: new Date().toLocaleDateString(),
        department: 'Human Resources',
        comments: [
          {
            date: new Date().toLocaleDateString(),
            author: 'Investigation Team',
            message: 'Thank you for your report. We have received it and begun our preliminary review.'
          },
          {
            date: new Date(Date.now() - 86400000).toLocaleDateString(),
            author: 'HR Investigator',
            message: 'We are currently gathering additional information related to your report. We may reach out if we need any clarification.'
          }
        ]
      };
      
      setReportStatus(mockStatus);
      setLoading(false);
      
      toast({
        title: "Status Retrieved",
        description: "Your report status has been loaded successfully"
      });
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <Clock className="h-4 w-4" />;
      case 'In Progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'Closed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Closed':
        return 'bg-green-100 text-green-800';
      case 'On Hold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (reportStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl space-y-6">
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => {
                setReportStatus(null);
                setFormData({ referenceId: '', password: '' });
              }}
              className="mb-4 text-whisper-secondary hover:text-whisper-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Check Another Report
            </Button>
          </div>

          <Card className="whisper-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Report Status</CardTitle>
                  <CardDescription>Reference ID: {reportStatus.referenceId}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(reportStatus.status)} border-0`}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(reportStatus.status)}
                    <span>{reportStatus.status}</span>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Report ID</Label>
                  <p className="font-mono text-sm">{reportStatus.reportId}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Department</Label>
                  <p className="text-sm">{reportStatus.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Submitted</Label>
                  <p className="text-sm">{reportStatus.submittedDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Last Update</Label>
                  <p className="text-sm">{reportStatus.lastUpdate}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600 mb-3 block">Investigation Updates</Label>
                <div className="space-y-3">
                  {reportStatus.comments.map((comment: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border-l-4 border-whisper-primary">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong> Our investigation team is actively reviewing your report. 
                  You will be notified of any significant updates. Thank you for your patience.
                </p>
              </div>

              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-whisper-secondary hover:text-whisper-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Search className="h-8 w-8 text-whisper-primary" />
            <h1 className="text-2xl font-bold text-whisper-dark">Check Report Status</h1>
          </div>
        </div>

        <Card className="whisper-card">
          <CardHeader>
            <CardTitle>Report Status Lookup</CardTitle>
            <CardDescription>
              Enter your Reference ID and password to check your report status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="referenceId">Reference ID</Label>
                <Input
                  id="referenceId"
                  name="referenceId"
                  type="text"
                  placeholder="REF-123456"
                  className="whisper-input font-mono"
                  value={formData.referenceId}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your status check password"
                  className="whisper-input"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> These are the Reference ID and password you set when submitting your report.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full whisper-button" 
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Checking Status...</span>
                  </div>
                ) : (
                  'Check Status'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatusCheck;
