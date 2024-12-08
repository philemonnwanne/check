import { ClientDashboardLayout } from "@/layouts/ClientDashboardLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CreditCard, Banknote, FileCheck, AlertCircle } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

// Mock data - in a real app, this would come from an API
const mockInvoices = [
  {
    id: "INV001",
    caseId: "CASE001",
    caseTitle: "Smith vs. Johnson",
    amount: 5000,
    paid: 2000,
    dueDate: "2024-04-30",
    status: "partial",
    paymentMethod: {
      type: "credit_card",
      last4: "4242",
    },
    isIncremental: true,
    nextPaymentDate: "2024-04-15",
    feeStructure: {
      type: "hourly",
      rate: 350,
      details: "Billed at $350/hour with detailed time tracking"
    }
  },
  {
    id: "INV002",
    caseId: "CASE002",
    caseTitle: "Property Dispute",
    amount: 3000,
    paid: 3000,
    dueDate: "2024-03-15",
    status: "paid",
    paymentMethod: {
      type: "bank_transfer",
      last4: "9876",
    },
    isIncremental: false,
    feeStructure: {
      type: "flat_fee",
      amount: 3000,
      details: "One-time flat fee for entire case representation"
    }
  },
  {
    id: "INV003",
    caseId: "CASE003",
    caseTitle: "Personal Injury Claim",
    amount: "TBD",
    paid: 0,
    dueDate: "Upon settlement",
    status: "pending",
    paymentMethod: {
      type: "contingency",
      percentage: 33
    },
    isIncremental: false,
    feeStructure: {
      type: "contingency",
      percentage: 33,
      details: "33% of settlement amount upon successful resolution"
    }
  }
]

const mockPaymentMethods = [
  {
    id: "PM001",
    type: "credit_card",
    last4: "4242",
    expiryDate: "12/25",
    isDefault: true,
  },
  {
    id: "PM002",
    type: "bank_account",
    last4: "9876",
    bankName: "Chase",
    isDefault: false,
  },
]

export default function ClientBilling() {
  const [activeTab, setActiveTab] = useState("invoices")
  const { toast } = useToast()

  const handlePayment = (invoiceId: string, amount: number) => {
    toast({
      title: "Processing payment",
      description: `Payment of $${amount} for invoice ${invoiceId} is being processed.`,
    })
  }

  const getFeeStructureBadge = (feeStructure: any) => {
    const variants = {
      hourly: "default",
      flat_fee: "secondary",
      contingency: "outline"
    } as const;
    
    return (
      <div className="flex flex-col gap-1">
        <Badge variant={variants[feeStructure.type as keyof typeof variants]}>
          {feeStructure.type === 'hourly' && `Hourly Rate: $${feeStructure.rate}`}
          {feeStructure.type === 'flat_fee' && 'Flat Fee'}
          {feeStructure.type === 'contingency' && `${feeStructure.percentage}% Contingency`}
        </Badge>
        <span className="text-xs text-muted-foreground">{feeStructure.details}</span>
      </div>
    );
  };

  return (
    <ClientDashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">
            Manage your invoices and payment methods
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices" className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Case</TableHead>
                  <TableHead>Fee Structure</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.caseTitle}</TableCell>
                    <TableCell>{getFeeStructureBadge(invoice.feeStructure)}</TableCell>
                    <TableCell>
                      {typeof invoice.amount === 'number' ? (
                        <>
                          ${invoice.amount.toFixed(2)}
                          {invoice.status === "partial" && (
                            <div className="text-sm text-muted-foreground">
                              Paid: ${invoice.paid.toFixed(2)}
                            </div>
                          )}
                        </>
                      ) : (
                        invoice.amount
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={invoice.status === "paid" ? "default" : "secondary"}
                      >
                        {invoice.status === "paid" ? "Paid" : "Partial Payment"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {invoice.paymentMethod.type === "credit_card" ? (
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>****{invoice.paymentMethod.last4}</span>
                        </div>
                      ) : invoice.paymentMethod.type === "contingency" ? (
                        <div className="flex items-center gap-2">
                          <FileCheck className="h-4 w-4" />
                          <span>Contingency Based</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Banknote className="h-4 w-4" />
                          <span>****{invoice.paymentMethod.last4}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {invoice.isIncremental ? (
                        <div>
                          <div>Next: {invoice.nextPaymentDate}</div>
                          <div className="text-sm text-muted-foreground">
                            Final: {invoice.dueDate}
                          </div>
                        </div>
                      ) : (
                        invoice.dueDate
                      )}
                    </TableCell>
                    <TableCell>
                      {invoice.status !== "paid" && invoice.paymentMethod.type !== "contingency" && (
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handlePayment(
                                invoice.id,
                                invoice.isIncremental ? 
                                  (invoice.amount - invoice.paid) / 4 : 
                                  invoice.amount - invoice.paid
                              )
                            }
                          >
                            {invoice.isIncremental ? "Pay Next Installment" : "Pay Full Amount"}
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={handleAddPaymentMethod}>
                Add Payment Method
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {mockPaymentMethods.map((method) => (
                <Card key={method.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {method.type === "credit_card" ? "Credit Card" : "Bank Account"}
                    </CardTitle>
                    {method.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {method.type === "credit_card" ? (
                          <>
                            <CreditCard className="h-4 w-4" />
                            <div>
                              <p>****{method.last4}</p>
                              <p className="text-sm text-muted-foreground">
                                Expires: {method.expiryDate}
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Banknote className="h-4 w-4" />
                            <div>
                              <p>{method.bankName}</p>
                              <p className="text-sm text-muted-foreground">
                                ****{method.last4}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemovePaymentMethod(method.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClientDashboardLayout>
  )
}