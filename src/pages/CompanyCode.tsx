
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const CompanyCode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [companyCode, setCompanyCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);

  useEffect(() => {
    // Fetch available companies for demonstration
    const fetchCompanies = async () => {
      try {
        const { data, error } = await supabase
          .from('companies')
          .select('name, code');
        
        if (error) {
          console.error('Error fetching companies:', error);
          return;
        }
        
        console.log('Fetched companies:', data);
        setCompanies(data || []);
      } catch (error) {
        console.error('Error in fetchCompanies:', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter your company code",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Verifying company code:', companyCode.toUpperCase());
      
      // Verify company code exists
      const { data, error } = await supabase
        .from('companies')
        .select('id, name, code')
        .eq('code', companyCode.toUpperCase())
        .maybeSingle();

      console.log('Company verification result:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Verification Error",
          description: "Failed to verify company code. Please try again.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      if (!data) {
        toast({
          title: "Invalid Code",
          description: "Please enter a valid company code. Available codes: TECH001, GLOB002, INNO003",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Company Code Verified",
        description: `Welcome to ${data.name}! You can now proceed to submit your report.`
      });
      
      // Navigate to report form with company info
      navigate('/report', { state: { company: data } });
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while verifying the company code",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
            <Building className="h-8 w-8 text-whisper-primary" />
            <h1 className="text-2xl font-bold text-whisper-dark">Company Verification</h1>
          </div>
        </div>

        <Card className="whisper-card">
          <CardHeader>
            <CardTitle>Enter Company Code</CardTitle>
            <CardDescription>
              Please enter your organization's unique company code to proceed with your report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyCode">Company Code</Label>
                <Input
                  id="companyCode"
                  name="companyCode"
                  type="text"
                  placeholder="Enter your company code"
                  className="whisper-input text-center font-mono text-lg"
                  value={companyCode}
                  onChange={(e) => setCompanyCode(e.target.value.toUpperCase())}
                  disabled={loading}
                />
              </div>

              {companies.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Available Test Companies:</strong>
                  </p>
                  <div className="space-y-1">
                    {companies.map((company) => (
                      <div key={company.code} className="text-xs text-gray-600">
                        {company.name} - <span className="font-mono font-bold">{company.code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>For testing:</strong> Try using TECH001, GLOB002, or INNO003
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full whisper-button" 
                size="lg"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                This code ensures your report reaches the correct organization's compliance team
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyCode;
