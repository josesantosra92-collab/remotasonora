import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Upload, Clock, DollarSign, CheckCircle2 } from "lucide-react";

export default function ClientPortal() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [user, setUser] = useState(null);
  const [clientUser, setClientUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const storedEmail = localStorage.getItem('clientEmail');
      if (!storedEmail) {
        setLoading(false);
        return;
      }

      const clients = await base44.entities.ClientUser.list();
      const clientData = clients.find(c => c.email === storedEmail);
      
      if (clientData) {
        if (!clientData.email_verified) {
          alert("Please verify your email first. Check your inbox.");
        }
        setUser({ email: storedEmail });
        setClientUser(clientData);
      }
    } catch (error) {
      console.log("Not authenticated", error);
      setUser(null);
      setClientUser(null);
    } finally {
      setLoading(false);
    }
  };

  const { data: timesheets = [] } = useQuery({
    queryKey: ['timesheets', clientUser?.id],
    queryFn: async () => {
      if (!clientUser) return [];
      const all = await base44.entities.ClientTimesheet.list();
      return all.filter(t => t.client_user_id === clientUser.id && t.visible_to_client);
    },
    enabled: !!clientUser
  });

  const { data: invoices = [] } = useQuery({
    queryKey: ['invoices', clientUser?.id],
    queryFn: async () => {
      if (!clientUser) return [];
      const all = await base44.entities.ClientInvoice.list();
      return all.filter(i => i.client_user_id === clientUser.id && i.visible_to_client);
    },
    enabled: !!clientUser
  });

  const { data: contracts = [] } = useQuery({
    queryKey: ['contracts', clientUser?.id],
    queryFn: async () => {
      if (!clientUser) return [];
      const all = await base44.entities.ClientContract.list();
      return all.filter(c => c.client_user_id === clientUser.id && c.visible_to_client);
    },
    enabled: !!clientUser
  });

  const registerMutation = useMutation({
    mutationFn: async (data) => {
      const verificationToken = Math.random().toString(36).substring(2, 15);
      
      const clientUser = await base44.entities.ClientUser.create({
        ...data,
        user_id: null,
        verification_token: verificationToken,
        email_verified: true
      });

      await base44.integrations.Core.SendEmail({
        to: "hello@remotasonora.com",
        subject: "New Client Registration",
        body: `New client registered:\n\nName: ${data.first_name} ${data.last_name}\nCompany: ${data.company}\nEmail: ${data.email}\nAddress: ${data.address}\nZIP: ${data.zip_code}`
      });

      localStorage.setItem('clientEmail', data.email);

      return clientUser;
    },
    onSuccess: () => {
      alert("Registration successful! Signing you in...");
      checkAuth();
    }
  });

  const uploadIdMutation = useMutation({
    mutationFn: async (file) => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.ClientUser.update(clientUser.id, {
        ...clientUser,
        id_document_url: file_url
      });
      return file_url;
    },
    onSuccess: () => {
      alert("ID uploaded successfully!");
      checkAuth();
    }
  });

  const uploadSignedContractMutation = useMutation({
    mutationFn: async ({ contractId, file }) => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const contract = contracts.find(c => c.id === contractId);
      await base44.entities.ClientContract.update(contractId, {
        ...contract,
        signed_contract_url: file_url,
        status: "signed",
        signed_date: new Date().toISOString().split('T')[0]
      });
      
      await base44.integrations.Core.SendEmail({
        to: "hello@remotasonora.com",
        subject: "Contract Signed by Client",
        body: `Client ${clientUser.first_name} ${clientUser.last_name} has signed the contract: ${contract.contract_name}`
      });
    },
    onSuccess: () => {
      alert("Contract uploaded successfully!");
      checkAuth();
    }
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const confirmEmail = formData.get('confirmEmail');

    if (email !== confirmEmail) {
      alert("Emails do not match!");
      return;
    }

    registerMutation.mutate({
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      company: formData.get('company'),
      address: formData.get('address'),
      zip_code: formData.get('zip_code'),
      email: email
    });
  };



  const handleLogout = () => {
    localStorage.removeItem('clientEmail');
    setUser(null);
    setClientUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user && !showCreateForm) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-slate-700/40 bg-slate-950/90 backdrop-blur-2xl">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center font-black text-white shadow-2xl">
                RS
              </div>
              <div className="font-black text-xl bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Client Portal
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-md mx-auto px-4 py-16">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                Client Portal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={async (e) => {
                e.preventDefault();
                const email = e.target.email.value;
                const clients = await base44.entities.ClientUser.list();
                const client = clients.find(c => c.email === email);
                if (client) {
                  localStorage.setItem('clientEmail', email);
                  checkAuth();
                } else {
                  alert("Email not found. Please create an account.");
                }
              }} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input id="email" name="email" type="email" required className="bg-slate-800 border-slate-600 text-white" />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
              </form>
              <div className="border-t border-slate-700 my-4"></div>
              <p className="text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowCreateForm(true)}
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  Create account
                </button>
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!user && showCreateForm) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-slate-700/40 bg-slate-950/90 backdrop-blur-2xl">
          <div className="max-w-4xl mx-auto px-4 py-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center font-black text-white shadow-2xl">
                RS
              </div>
              <div className="font-black text-xl bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Client Portal
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-md mx-auto px-4 py-16">
          <Card className="bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">
                Create Your Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="first_name" className="text-slate-300">First Name</Label>
                    <Input id="first_name" name="first_name" required className="bg-slate-800 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="last_name" className="text-slate-300">Last Name</Label>
                    <Input id="last_name" name="last_name" required className="bg-slate-800 border-slate-600 text-white" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="company" className="text-slate-300">Company</Label>
                  <Input id="company" name="company" required className="bg-slate-800 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="address" className="text-slate-300">Address</Label>
                  <Input id="address" name="address" required className="bg-slate-800 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="zip_code" className="text-slate-300">ZIP Code</Label>
                  <Input id="zip_code" name="zip_code" required className="bg-slate-800 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input id="email" name="email" type="email" required className="bg-slate-800 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="confirmEmail" className="text-slate-300">Confirm Email</Label>
                  <Input id="confirmEmail" name="confirmEmail" type="email" required className="bg-slate-800 border-slate-600 text-white" />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Create Account
                </Button>
                <p className="text-center text-sm text-slate-400">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (user && !clientUser) {
    handleLogout();
    return null;
  }

  const totalHours = timesheets.reduce((sum, t) => sum + t.hours, 0);
  const totalAmount = timesheets.reduce((sum, t) => sum + (t.total_amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-700/40 bg-slate-950/90 backdrop-blur-2xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center font-black text-white shadow-2xl">
                RS
              </div>
              <div>
                <div className="font-black text-xl bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Client Portal
                </div>
                <div className="text-sm text-slate-400">{clientUser.company}</div>
              </div>
            </div>
            <Button onClick={handleLogout} className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome, {clientUser.first_name} {clientUser.last_name}
          </h1>
          <p className="text-slate-400">Manage your timesheets, invoices, and contracts</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{totalHours.toFixed(1)}</div>
                  <div className="text-sm text-slate-400">Total Hours</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-green-600/20 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">${totalAmount.toFixed(2)}</div>
                  <div className="text-sm text-slate-400">Total Billed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{invoices.length}</div>
                  <div className="text-sm text-slate-400">Invoices</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Timesheets</h2>
            <div className="space-y-3">
              {timesheets.length === 0 ? (
                <Card className="bg-slate-900 border-slate-700">
                  <CardContent className="p-8 text-center text-slate-400">
                    No timesheets available
                  </CardContent>
                </Card>
              ) : (
                timesheets.map((timesheet) => (
                  <Card key={timesheet.id} className="bg-slate-900 border-slate-700">
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-slate-400">Date</div>
                          <div className="font-medium">{timesheet.date}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Hours</div>
                          <div className="font-medium">{timesheet.hours}h</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Rate</div>
                          <div className="font-medium">${timesheet.rate_per_hour}/h</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-400">Total</div>
                          <div className="font-medium">${timesheet.total_amount}</div>
                        </div>
                        <div className="md:col-span-4">
                          <div className="text-sm text-slate-400">Description</div>
                          <div className="text-slate-300">{timesheet.description}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Invoices</h2>
            <div className="space-y-3">
              {invoices.length === 0 ? (
                <Card className="bg-slate-900 border-slate-700">
                  <CardContent className="p-8 text-center text-slate-400">
                    No invoices available
                  </CardContent>
                </Card>
              ) : (
                invoices.map((invoice) => (
                  <Card key={invoice.id} className="bg-slate-900 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="grid md:grid-cols-4 gap-4 flex-1">
                          <div>
                            <div className="text-sm text-slate-400">Invoice #</div>
                            <div className="font-medium">{invoice.invoice_number}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Date</div>
                            <div className="font-medium">{invoice.invoice_date}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Total Hours</div>
                            <div className="font-medium">{invoice.total_hours}h</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-400">Amount</div>
                            <div className="font-bold text-lg">${invoice.total_amount}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {invoice.pdf_url && (
                            <a href={invoice.pdf_url} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="border-slate-600">
                                <Download className="h-4 w-4 mr-2" />
                                PDF
                              </Button>
                            </a>
                          )}
                          {invoice.xml_url && (
                            <a href={invoice.xml_url} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="border-slate-600">
                                <Download className="h-4 w-4 mr-2" />
                                XML
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contracts</h2>
            <div className="space-y-3">
              {contracts.length === 0 ? (
                <Card className="bg-slate-900 border-slate-700">
                  <CardContent className="p-8 text-center text-slate-400">
                    No contracts available
                  </CardContent>
                </Card>
              ) : (
                contracts.map((contract) => (
                  <Card key={contract.id} className="bg-slate-900 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="font-bold text-lg">{contract.contract_name}</div>
                          <div className="text-sm text-slate-400">
                            Status: <span className={contract.status === 'signed' ? 'text-green-400' : 'text-yellow-400'}>
                              {contract.status}
                            </span>
                          </div>
                        </div>
                        {contract.status === 'signed' && (
                          <CheckCircle2 className="h-6 w-6 text-green-400" />
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {contract.contract_pdf_url && (
                          <a href={contract.contract_pdf_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="border-slate-600">
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </Button>
                          </a>
                        )}
                        {contract.contract_xml_url && (
                          <a href={contract.contract_xml_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="border-slate-600">
                              <Download className="h-4 w-4 mr-2" />
                              Download XML
                            </Button>
                          </a>
                        )}
                        {contract.status !== 'signed' && (
                          <div>
                            <Label htmlFor={`upload-contract-${contract.id}`} className="cursor-pointer">
                              <Button variant="outline" size="sm" className="border-blue-600 text-blue-400" asChild>
                                <span>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Signed Contract
                                </span>
                              </Button>
                            </Label>
                            <input
                              id={`upload-contract-${contract.id}`}
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  uploadSignedContractMutation.mutate({ contractId: contract.id, file });
                                }
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Upload ID Document</h2>
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-6">
                {clientUser.id_document_url ? (
                  <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>ID Document uploaded</span>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="upload-id" className="cursor-pointer">
                      <Button variant="outline" className="border-blue-600 text-blue-400" asChild>
                        <span>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload ID Document
                        </span>
                      </Button>
                    </Label>
                    <input
                      id="upload-id"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          uploadIdMutation.mutate(file);
                        }
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
