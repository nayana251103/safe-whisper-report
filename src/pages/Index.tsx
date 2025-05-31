import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Building, Search, Users, ArrowRight, Copy, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();

  const copyUserId = () => {
    if (userProfile?.numeric_user_id) {
      navigator.clipboard.writeText(userProfile.numeric_user_id);
      toast({
        title: "Copied!",
        description: "User ID copied to clipboard"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-whisper-primary" />
            <h1 className="text-2xl font-bold text-whisper-dark">Secure Whisper</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {userProfile?.numeric_user_id && (
                  <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800">ID: {userProfile.numeric_user_id}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyUserId}
                      className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                <Button 
                  variant="outline" 
                  onClick={signOut}
                  className="text-whisper-secondary border-whisper-secondary hover:bg-whisper-secondary hover:text-white"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="text-whisper-secondary border-whisper-secondary hover:bg-whisper-secondary hover:text-white"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="whisper-button"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-whisper-dark mb-6">
            Speak Up Safely
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A secure platform for reporting workplace misconduct, safety violations, and ethical concerns. 
            Your voice matters, and your privacy is protected.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="whisper-button text-lg px-8 py-4"
              onClick={() => navigate('/company-code')}
            >
              Submit a Report
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-whisper-secondary border-whisper-secondary hover:bg-whisper-secondary hover:text-white text-lg px-8 py-4"
              onClick={() => navigate('/status')}
            >
              Check Report Status
              <Search className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-whisper-dark mb-4">Key Features</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the features that make Secure Whisper the ideal platform for secure and anonymous reporting.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="whisper-card hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-whisper-primary mx-auto mb-4" />
              <CardTitle>Anonymous Reporting</CardTitle>
              <CardDescription>
                Submit reports without revealing your identity.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="whisper-card hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Building className="h-12 w-12 text-whisper-primary mx-auto mb-4" />
              <CardTitle>Company Code Verification</CardTitle>
              <CardDescription>
                Ensure your report reaches the correct organization.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="whisper-card hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Search className="h-12 w-12 text-whisper-primary mx-auto mb-4" />
              <CardTitle>Real-time Status Tracking</CardTitle>
              <CardDescription>
                Track the progress of your report with complete transparency.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
      
      {/* Staff Access Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-whisper-dark mb-4">Staff Access</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Authorized personnel can access specialized dashboards for managing reports and investigations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="whisper-card hover:shadow-lg transition-shadow cursor-pointer" 
                  onClick={() => navigate('/login', { state: { role: 'admin' } })}>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-whisper-primary mx-auto mb-4" />
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>
                  Full system management and oversight capabilities
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="whisper-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/login', { state: { role: 'moderator' } })}>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-whisper-primary mx-auto mb-4" />
                <CardTitle>Moderator Access</CardTitle>
                <CardDescription>
                  Review and moderate incoming reports
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="whisper-card hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate('/login', { state: { role: 'inspector' } })}>
              <CardHeader className="text-center">
                <Search className="h-12 w-12 text-whisper-primary mx-auto mb-4" />
                <CardTitle>Investigator Portal</CardTitle>
                <CardDescription>
                  Conduct detailed investigations and follow-ups
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-whisper-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6" />
                <h4 className="text-lg font-semibold">Secure Whisper</h4>
              </div>
              <p className="text-gray-300">
                Empowering voices while protecting identities. Your security is our priority.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-300">
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto" onClick={() => navigate('/company-code')}>Submit Report</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0 h-auto" onClick={() => navigate('/status')}>Check Status</Button></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Security</h5>
              <ul className="space-y-2 text-gray-300">
                <li>End-to-end encryption</li>
                <li>Anonymous reporting</li>
                <li>Secure data handling</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Secure Whisper. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
