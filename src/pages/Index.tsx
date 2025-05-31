
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, FileText, Search, Users, UserCheck, Eye, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();
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
      case 'admin-login':
      case 'moderator-login':
      case 'inspector-login':
        navigate('/login', { state: { role: option.replace('-login', '') } });
        break;
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // If user is logged in, show different content
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          {/* Header with logout */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-whisper-primary" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-whisper-primary to-whisper-secondary bg-clip-text text-transparent">
                  Secure Whisper
                </h1>
              </div>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </div>
            <p className="text-lg text-gray-600">
              Welcome back, {userProfile?.email}! What would you like to do today?
            </p>
          </div>

          {/* User Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="whisper-card hover:scale-105 transition-transform duration-200 cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-whisper-primary to-whisper-secondary rounded-full">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-whisper-dark">Submit New Report</CardTitle>
                <CardDescription className="text-gray-600">
                  Report workplace misconduct securely and confidentially
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate('/company-code')}
                  className="w-full whisper-button"
                  size="lg"
                >
                  Create Report
                </Button>
              </CardContent>
            </Card>

            <Card className="whisper-card hover:scale-105 transition-transform duration-200 cursor-pointer">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl text-whisper-dark">Check Report Status</CardTitle>
                <CardDescription className="text-gray-600">
                  Track the progress of your submitted reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate('/status')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                  size="lg"
                >
                  Check Status
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Role-based dashboard access */}
          {userProfile?.role && userProfile.role !== 'user' && (
            <div className="mt-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-whisper-dark mb-2">Staff Dashboard</h2>
                <p className="text-gray-600">Access your {userProfile.role} dashboard</p>
              </div>
              
              <div className="flex justify-center">
                <Card className="whisper-card hover:scale-105 transition-transform duration-200 cursor-pointer max-w-md">
                  <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full ${
                        userProfile.role === 'admin' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                        userProfile.role === 'moderator' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                        'bg-gradient-to-r from-purple-500 to-purple-600'
                      }`}>
                        {userProfile.role === 'admin' && <Users className="h-6 w-6 text-white" />}
                        {userProfile.role === 'moderator' && <UserCheck className="h-6 w-6 text-white" />}
                        {userProfile.role === 'investigator' && <Eye className="h-6 w-6 text-white" />}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-whisper-dark mb-2 capitalize">{userProfile.role} Dashboard</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {userProfile.role === 'admin' && 'Manage system settings and user roles'}
                      {userProfile.role === 'moderator' && 'Monitor and manage reports'}
                      {userProfile.role === 'investigator' && 'Investigate and resolve reports'}
                    </p>
                    <Button 
                      onClick={() => navigate(`/${userProfile.role}`)}
                      className={`w-full text-white ${
                        userProfile.role === 'admin' ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' :
                        userProfile.role === 'moderator' ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700' :
                        'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700'
                      }`}
                      size="sm"
                    >
                      Open Dashboard
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Original homepage for non-authenticated users
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-8">
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

        {/* Staff Login Section */}
        <div className="mt-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-whisper-dark mb-2">Staff Access</h2>
            <p className="text-gray-600">Login as Admin, Moderator, or Inspector</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Admin Login */}
            <Card className="whisper-card hover:scale-105 transition-transform duration-200 cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-whisper-dark mb-2">Admin</h3>
                <p className="text-sm text-gray-600 mb-4">Manage departments, users, and system settings</p>
                <Button 
                  onClick={() => handleOptionSelect('admin-login')}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                  size="sm"
                >
                  Admin Login
                </Button>
              </CardContent>
            </Card>

            {/* Moderator Login */}
            <Card className="whisper-card hover:scale-105 transition-transform duration-200 cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full">
                    <UserCheck className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-whisper-dark mb-2">Moderator</h3>
                <p className="text-sm text-gray-600 mb-4">Monitor and manage reports across departments</p>
                <Button 
                  onClick={() => handleOptionSelect('moderator-login')}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                  size="sm"
                >
                  Moderator Login
                </Button>
              </CardContent>
            </Card>

            {/* Inspector Login */}
            <Card className="whisper-card hover:scale-105 transition-transform duration-200 cursor-pointer">
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-whisper-dark mb-2">Inspector</h3>
                <p className="text-sm text-gray-600 mb-4">Investigate and resolve specific reports</p>
                <Button 
                  onClick={() => handleOptionSelect('inspector-login')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  size="sm"
                >
                  Inspector Login
                </Button>
              </CardContent>
            </Card>
          </div>
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
