
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
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

    setLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password);

      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message,
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      setShowSuccess(true);
      toast({
        title: "Account Created Successfully",
        description: "Your secure user ID has been generated"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyUserId = () => {
    if (userProfile?.numeric_user_id) {
      navigator.clipboard.writeText(userProfile.numeric_user_id);
      toast({
        title: "Copied!",
        description: "User ID copied to clipboard"
      });
    }
  };

  if (showSuccess && userProfile?.numeric_user_id) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-whisper-dark">Account Created!</h1>
            </div>
          </div>

          <Card className="whisper-card">
            <CardHeader>
              <CardTitle className="text-center text-green-600">Success!</CardTitle>
              <CardDescription className="text-center">
                Your secure account has been created. Please save your User ID for future reference.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Your 8-Digit User ID:</strong>
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <code className="text-2xl font-mono bg-white px-4 py-2 rounded border text-blue-900">
                    {userProfile.numeric_user_id}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyUserId}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  Save this ID - you'll need it to submit reports with your account
                </p>
              </div>

              <Button 
                onClick={() => navigate('/')}
                className="w-full whisper-button" 
                size="lg"
              >
                Continue to Dashboard
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
            <Shield className="h-8 w-8 text-whisper-primary" />
            <h1 className="text-2xl font-bold text-whisper-dark">Create Account</h1>
          </div>
        </div>

        <Card className="whisper-card">
          <CardHeader>
            <CardTitle>Secure Registration</CardTitle>
            <CardDescription>
              Create your secure account to submit and track reports. You'll receive a unique 8-digit User ID.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="whisper-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a secure password"
                  className="whisper-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Upon registration, you'll receive a unique 8-digit User ID that you can use to submit reports while maintaining your privacy and security.
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full whisper-button" 
                size="lg"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Button
                  variant="link"
                  onClick={() => navigate('/login')}
                  className="p-0 text-whisper-secondary hover:text-whisper-primary"
                >
                  Login here
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
