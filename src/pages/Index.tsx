
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, FileText, Search } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    
    switch (option) {
      case 'login':
        navigate('/login');
        break;
      case 'signup':
        navigate('/signup');
        break;
      case 'anonymous':
        navigate('/company-code');
        break;
      case 'status':
        navigate('/status');
        break;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Shield className="h-12 w-12 text-whisper-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-whisper-primary to-whisper-secondary bg-clip-text text-transparent">
              Secure Whisper
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A secure, anonymous platform for reporting workplace misconduct, harassment, fraud, and unethical behavior
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Secure & Anonymous</span>
            </div>
          </div>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Report With Login */}
          <Card className="whisper-card hover:scale-105 transition-transform duration-200 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-whisper-primary to-whisper-secondary rounded-full">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-whisper-dark">Report With Account</CardTitle>
              <CardDescription className="text-gray-600">
                Create an account or login to submit and track your reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => handleOptionSelect('signup')}
                className="w-full whisper-button"
                size="lg"
              >
                Create Account
              </Button>
              <Button 
                onClick={() => handleOptionSelect('login')}
                variant="outline" 
                className="w-full border-whisper-primary text-whisper-primary hover:bg-whisper-primary hover:text-white"
                size="lg"
              >
                Login
              </Button>
            </CardContent>
          </Card>

          {/* Report Without Login */}
          <Card className="whisper-card hover:scale-105 transition-transform duration-200 cursor-pointer group">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl text-whisper-dark">Anonymous Report</CardTitle>
              <CardDescription className="text-gray-600">
                Submit a report without creating an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleOptionSelect('anonymous')}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                size="lg"
              >
                Report Anonymously
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Status Check */}
        <div className="text-center">
          <Card className="whisper-card max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Search className="h-5 w-5 text-whisper-secondary" />
                <span className="text-whisper-dark font-medium">Check Report Status</span>
              </div>
              <Button 
                onClick={() => handleOptionSelect('status')}
                variant="ghost"
                className="text-whisper-secondary hover:text-whisper-primary hover:bg-whisper-primary/10"
              >
                Check status using Reference ID
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>Your identity and reports are protected by enterprise-grade encryption</p>
          <p>For urgent matters requiring immediate attention, please contact your local authorities</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
