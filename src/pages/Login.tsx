
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  // Get the role from the navigation state
  const role = location.state?.role;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userId || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate login logic
    console.log('Login attempt:', formData, 'Role:', role);
    
    toast({
      title: "Login Successful",
      description: `Welcome back to Secure Whisper${role ? ` - ${role.charAt(0).toUpperCase() + role.slice(1)}` : ''}`
    });
    
    // Navigate based on role
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'moderator') {
      navigate('/moderator');
    } else if (role === 'inspector') {
      navigate('/investigator');
    } else {
      // Regular user login - navigate to company code entry
      navigate('/company-code');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getTitle = () => {
    if (role) {
      return `${role.charAt(0).toUpperCase() + role.slice(1)} Login`;
    }
    return 'Login';
  };

  const getDescription = () => {
    if (role) {
      return `Enter your ${role} credentials to access your dashboard`;
    }
    return 'Enter your User ID and password to access your account';
  };

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
            <Shield className="h-8 w-8 text-whisper-primary" />
            <h1 className="text-2xl font-bold text-whisper-dark">{getTitle()}</h1>
          </div>
        </div>

        <Card className="whisper-card">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              {getDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userId">{role ? 'Staff ID' : 'User ID'}</Label>
                <Input
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder={role ? 'Enter your Staff ID' : 'Enter your 8-digit User ID'}
                  className="whisper-input"
                  value={formData.userId}
                  onChange={handleInputChange}
                  maxLength={role ? undefined : 8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="whisper-input"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" className="w-full whisper-button" size="lg">
                {role ? `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}` : 'Login'}
              </Button>
            </form>

            {!role && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Button
                    variant="link"
                    onClick={() => navigate('/signup')}
                    className="p-0 text-whisper-secondary hover:text-whisper-primary"
                  >
                    Sign up here
                  </Button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
