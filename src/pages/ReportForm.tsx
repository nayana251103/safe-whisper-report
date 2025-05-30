
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ArrowLeft, Upload, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReportForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    personAccused: '',
    department: '',
    description: '',
    evidenceText: '',
    password: '',
    confirmPassword: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [reportId, setReportId] = useState('');
  const [referenceId, setReferenceId] = useState('');

  const departments = [
    'Human Resources',
    'Finance',
    'IT Department',
    'Marketing',
    'Sales',
    'Operations',
    'Legal',
    'Management',
    'Other'
  ];

  const generateIds = () => {
    const reportId = `RPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const referenceId = `REF-${Math.floor(100000 + Math.random() * 900000)}`;
    return { reportId, referenceId };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDepartmentChange = (value: string) => {
    setFormData({
      ...formData,
      department: value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.subject || !formData.department || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    console.log('Report submitted:', { ...formData, file });
    setStep(2);
  };

  const handleSetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please set a password for status checking",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    const { reportId: newReportId, referenceId: newReferenceId } = generateIds();
    setReportId(newReportId);
    setReferenceId(newReferenceId);
    setStep(3);

    toast({
      title: "Report Submitted Successfully",
      description: "Your report has been securely submitted and will be reviewed"
    });
  };

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="whisper-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-green-600">Report Submitted</CardTitle>
              <CardDescription>
                Your report has been successfully submitted and assigned a reference ID
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                <Label className="text-sm font-medium text-gray-700">Your Reference ID</Label>
                <div className="mt-2">
                  <Input
                    value={referenceId}
                    readOnly
                    className="font-mono text-lg font-bold text-center bg-white"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> Save this Reference ID and your password. You'll need both to check your report status.
                </p>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <p>• Your report has been assigned ID: <span className="font-mono">{reportId}</span></p>
                <p>• You will be notified of any updates through the status checking system</p>
                <p>• Reports are typically reviewed within 2-5 business days</p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/status')}
                  className="w-full whisper-button" 
                  size="lg"
                >
                  Check Report Status
                </Button>
                
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="w-full"
                >
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="whisper-card">
            <CardHeader>
              <CardTitle>Set Status Check Password</CardTitle>
              <CardDescription>
                Create a password to check your report status in the future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetPassword} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Status Check Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    className="whisper-input"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="whisper-input"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    You'll use this password along with your Reference ID to check your report status.
                  </p>
                </div>

                <Button type="submit" className="w-full whisper-button" size="lg">
                  Complete Submission
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/company-code')}
            className="mb-4 text-whisper-secondary hover:text-whisper-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FileText className="h-8 w-8 text-whisper-primary" />
            <h1 className="text-2xl font-bold text-whisper-dark">Submit Report</h1>
          </div>
        </div>

        <Card className="whisper-card">
          <CardHeader>
            <CardTitle>Confidential Report Form</CardTitle>
            <CardDescription>
              Please provide details about the incident. All information is treated confidentially.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReport} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name (Optional)</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name (optional for anonymous reporting)"
                  className="whisper-input"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Brief subject of your report"
                  className="whisper-input"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personAccused">Person(s) Accused</Label>
                <Input
                  id="personAccused"
                  name="personAccused"
                  type="text"
                  placeholder="Name(s) of person(s) involved (if known)"
                  className="whisper-input"
                  value={formData.personAccused}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department to Complain *</Label>
                <Select onValueChange={handleDepartmentChange} required>
                  <SelectTrigger className="whisper-input">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept} className="hover:bg-gray-100">
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description of Incident *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Please provide a detailed description of the incident, including dates, times, and any relevant context..."
                  className="whisper-input min-h-[120px]"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidenceText">Additional Evidence (Text)</Label>
                <Textarea
                  id="evidenceText"
                  name="evidenceText"
                  placeholder="Any additional evidence, witness information, or supporting details..."
                  className="whisper-input"
                  value={formData.evidenceText}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Evidence File (Optional)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    className="whisper-input"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                  <Upload className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">
                  Accepted formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB)
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Confidentiality Notice:</strong> Your report will be handled with the utmost confidentiality and will only be shared with authorized personnel involved in the investigation.
                </p>
              </div>

              <Button type="submit" className="w-full whisper-button" size="lg">
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportForm;
