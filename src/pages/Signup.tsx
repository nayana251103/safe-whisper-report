
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowLeft, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [generatedUserId, setGeneratedUserId] = useState('');

  const generateUserId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.password || !formData.confirmPassword) {
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

    // Generate User ID and move to step 2
    const userId = generateUserId();
    setGeneratedUserId(userId);
    setStep(2);

    console.log('Account created:', { userId, password: formData.password });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const copyUserId = () => {
    navigator.clipboard.writeText(generatedUserId);
    toast({
      title: "Copied!",
      description: "User ID copied to clipboard"
    });
  };

  const proceedToCompanyCode = () => {
    toast({
      title: "Account Created Successfully",
      description: "Please save your User ID for future logins"
    });
    navigate('/company-code');
  };

  if (step === 2) {
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
              <CardTitle className="text-green-600">Account Created!</CardTitle>
              <CardDescription>
                Your account has been successfully created. Please save your User ID.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
                <Label className="text-sm font-medium text-gray-700">Your User ID</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    value={generatedUserId}
                    readOnly
                    className="font-mono text-lg font-bold text-center"
                  />
                  <Button
                    onClick={copyUserId}
                    size="sm"
                    variant="outline"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Please save this User ID safely. You will need it to login to your account in the future.
                </p>
              </div>

              <Button 
                onClick={proceedToCompanyCode}
                className="w-full whisper-button" 
                size="lg"
              >
                Continue to Report
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
              Create your secure account. A unique User ID will be generated for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  After registration, you'll receive a unique 8-digit User ID that you'll use for future logins.
                </p>
              </div>

              <Button type="submit" className="w-full whisper-button" size="lg">
                Create Account
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
