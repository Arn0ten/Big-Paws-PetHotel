"use client"

/**
 * BACKEND INTEGRATION NOTES:
 *
 * This component generates and displays receipts for completed boardings.
 *
 * Integration points:
 * - Receipt generation should match your backend's receipt format
 * - Email functionality should connect to your email service API
 * - Print and download functionality should use the same template as your backend
 *
 * Data requirements:
 * - Complete BoardingOrder object with pricing details
 * - Payment information
 * - Timestamps for check-in, check-out, and release
 */

// The receipt dialog doesn't have explicit vaccination requirements sections,
// but make sure any templates used for printing or downloading don't include them

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { BoardingOrder } from "../types"
import { formatDate, formatCurrency, calculateDuration } from "../utils/helpers"
import { Printer, Download, Send } from "lucide-react"
import Image from "next/image"

interface ReceiptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  boardingOrder: BoardingOrder
}

export function ReceiptDialog({ open, onOpenChange, boardingOrder }: ReceiptDialogProps) {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    const printTemplate = `
    <html>
      <head>
        <title>Boarding Receipt - ${boardingOrder.pet.name}</title>
        <style>
          /* Previous styles remain the same... */
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            color: #333;
            background-color: #f9f9f9;
          }
          .receipt {
            border: 1px solid #ddd;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            background-color: white;
            position: relative;
            overflow: hidden;
          }
          .header {
            text-align: center;
            padding-bottom: 25px;
            border-bottom: 2px solid #f0f0f0;
            margin-bottom: 25px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #4f46e5;
            margin-bottom: 8px;
          }
          .receipt-id {
            color: #666;
            font-size: 16px;
            margin-bottom: 5px;
          }
          .section {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #f0f0f0;
          }
          .section-title {
            font-weight: bold;
            margin-bottom: 15px;
            color: #4f46e5;
            font-size: 18px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .label {
            color: #666;
            font-size: 15px;
          }
          .value {
            font-weight: 500;
            font-size: 15px;
          }
          .total {
            font-size: 22px;
            font-weight: bold;
            margin-top: 20px;
            text-align: right;
            color: #16a34a;
          }
          .footer {
            text-align: center;
            margin-top: 35px;
            font-size: 14px;
            color: #666;
          }
          .status {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
          }
          .status-paid {
            background-color: #dcfce7;
            color: #166534;
          }
          .thank-you {
            text-align: center;
            margin-top: 35px;
            font-size: 18px;
            color: #4f46e5;
            font-weight: 500;
          }
          .paw-icon {
            display: inline-block;
            margin: 0 5px;
            font-size: 16px;
          }
          .logo-image {
            width: 120px;
            height: 120px;
            margin: 0 auto 16px;
            display: block;
          }
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 400px;
            opacity: 0.03;
            z-index: 0;
            pointer-events: none;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="watermark">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-s4UwpTDkzc4Mk3NusidO22doRl47IL.png" alt="Big Paws Logo" />
          </div>
          <div class="header">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-s4UwpTDkzc4Mk3NusidO22doRl47IL.png" alt="Big Paws Logo" class="logo-image" />
            <div class="receipt-id">Receipt #REC-${boardingOrder.id}</div>
            <div>${formatDate(new Date().toISOString())}</div>
          </div>
              
          <div class="section">
            <div class="section-title">Pet Information</div>
            <div class="row">
              <span class="label">Name:</span>
              <span class="value">${boardingOrder.pet.name}</span>
            </div>
            <div class="row">
              <span class="label">Type:</span>
              <span class="value">${boardingOrder.pet.type}</span>
            </div>
            <div class="row">
              <span class="label">Breed:</span>
              <span class="value">${boardingOrder.pet.breed}</span>
            </div>
            <div class="row">
              <span class="label">Size:</span>
              <span class="value">${boardingOrder.pet.size}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Owner Information</div>
            <div class="row">
              <span class="label">Name:</span>
              <span class="value">${boardingOrder.owner.name}</span>
            </div>
            <div class="row">
              <span class="label">Email:</span>
              <span class="value">${boardingOrder.owner.email}</span>
            </div>
            <div class="row">
              <span class="label">Phone:</span>
              <span class="value">${boardingOrder.owner.phone}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Boarding Details</div>
            <div class="row">
              <span class="label">Boarding Type:</span>
              <span class="value">${boardingOrder.boardingType === "Daycare" ? "Daycare (Hourly)" : "Long Stay (Overnight)"}</span>
            </div>
            <div class="row">
              <span class="label">Duration:</span>
              <span class="value">${calculateDuration(boardingOrder.startDate, boardingOrder.endDate, boardingOrder.boardingType)}</span>
            </div>
            <div class="row">
              <span class="label">Check-in:</span>
              <span class="value">${formatDate(boardingOrder.startDate)}</span>
            </div>
            <div class="row">
              <span class="label">Check-out:</span>
              <span class="value">${formatDate(boardingOrder.endDate)}</span>
            </div>
            <div class="row">
              <span class="label">Released on:</span>
              <span class="value">${boardingOrder.releaseTimestamp ? formatDate(boardingOrder.releaseTimestamp) : "N/A"}</span>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Payment Information</div>
            <div class="row">
              <span class="label">Payment Status:</span>
              <span class="status status-paid">${boardingOrder.paymentStatus}</span>
            </div>
            <div class="total">
              Total Amount: ${formatCurrency(boardingOrder.totalPrice)}
            </div>
          </div>
          
          <div class="thank-you">
            <span class="paw-icon">🐾</span> Thank you for choosing our services! <span class="paw-icon">🐾</span>
          </div>
          
          <div class="footer">
            Big Paws Pet Hotel • 123 Pet Street, Manila • contact@bigpawspethotel.com • (02) 8123-4567
          </div>
        </div>
      </body>
    </html>
  `
    if (printWindow) {
      printWindow.document.write(printTemplate)
      printWindow.document.close()
      setTimeout(() => {
        printWindow.print()
      }, 500)
    }
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    const htmlContent = `
      <html>
        <head>
          <title>Boarding Receipt - ${boardingOrder.pet.name}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
              color: #333;
              background-color: #f9f9f9;
            }
            .receipt {
              border: 1px solid #ddd;
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              background-color: white;
              position: relative;
              overflow: hidden;
            }
            .header {
              text-align: center;
              padding-bottom: 25px;
              border-bottom: 2px solid #f0f0f0;
              margin-bottom: 25px;
            }
            .logo {
              font-size: 32px;
              font-weight: bold;
              color: #4f46e5;
              margin-bottom: 8px;
            }
            .receipt-id {
              color: #666;
              font-size: 16px;
              margin-bottom: 5px;
            }
            .section {
              margin-bottom: 25px;
              padding-bottom: 20px;
              border-bottom: 1px solid #f0f0f0;
            }
            .section-title {
              font-weight: bold;
              margin-bottom: 15px;
              color: #4f46e5;
              font-size: 18px;
            }
            .row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .label {
              color: #666;
              font-size: 15px;
            }
            .value {
              font-weight: 500;
              font-size: 15px;
            }
            .total {
              font-size: 22px;
              font-weight: bold;
              margin-top: 20px;
              text-align: right;
              color: #16a34a;
            }
            .footer {
              text-align: center;
              margin-top: 35px;
              font-size: 14px;
              color: #666;
            }
            .status {
              display: inline-block;
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 14px;
              font-weight: 500;
            }
            .status-paid {
              background-color: #dcfce7;
              color: #166534;
            }
            .thank-you {
              text-align: center;
              margin-top: 35px;
              font-size: 18px;
              color: #4f46e5;
              font-weight: 500;
            }
            .paw-icon {
              display: inline-block;
              margin: 0 5px;
              font-size: 16px;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 120px;
              color: rgba(79, 70, 229, 0.03);
              z-index: 0;
              pointer-events: none;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="watermark">BIG PAWS</div>
            <div class="header">
              <div class="logo">Big Paws Pet Hotel</div>
              <div class="receipt-id">Receipt #REC-${boardingOrder.id}</div>
              <div>${formatDate(new Date().toISOString())}</div>
            </div>
            
            <div class="section">
              <div class="section-title">Pet Information</div>
              <div class="row">
                <span class="label">Name:</span>
                <span class="value">${boardingOrder.pet.name}</span>
              </div>
              <div class="row">
                <span class="label">Type:</span>
                <span class="value">${boardingOrder.pet.type}</span>
              </div>
              <div class="row">
                <span class="label">Breed:</span>
                <span class="value">${boardingOrder.pet.breed}</span>
              </div>
              <div class="row">
                <span class="label">Size:</span>
                <span class="value">${boardingOrder.pet.size}</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Owner Information</div>
              <div class="row">
                <span class="label">Name:</span>
                <span class="value">${boardingOrder.owner.name}</span>
              </div>
              <div class="row">
                <span class="label">Email:</span>
                <span class="value">${boardingOrder.owner.email}</span>
              </div>
              <div class="row">
                <span class="label">Phone:</span>
                <span class="value">${boardingOrder.owner.phone}</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Boarding Details</div>
              <div class="row">
                <span class="label">Boarding Type:</span>
                <span class="value">${boardingOrder.boardingType === "Daycare" ? "Daycare (Hourly)" : "Long Stay (Overnight)"}</span>
              </div>
              <div class="row">
                <span class="label">Duration:</span>
                <span class="value">${calculateDuration(boardingOrder.startDate, boardingOrder.endDate, boardingOrder.boardingType)}</span>
              </div>
              <div class="row">
                <span class="label">Check-in:</span>
                <span class="value">${formatDate(boardingOrder.startDate)}</span>
              </div>
              <div class="row">
                <span class="label">Check-out:</span>
                <span class="value">${formatDate(boardingOrder.endDate)}</span>
              </div>
              <div class="row">
                <span class="label">Released on:</span>
                <span class="value">${boardingOrder.releaseTimestamp ? formatDate(boardingOrder.releaseTimestamp) : "N/A"}</span>
              </div>
            </div>
            
            <div class="section">
              <div class="section-title">Payment Information</div>
              <div class="row">
                <span class="label">Payment Status:</span>
                <span class="status status-paid">${boardingOrder.paymentStatus}</span>
              </div>
              <div class="total">
                Total Amount: ${formatCurrency(boardingOrder.totalPrice)}
              </div>
            </div>
            
            <div class="thank-you">
              <span class="paw-icon">🐾</span> Thank you for choosing our services! <span class="paw-icon">🐾</span>
            </div>
            
            <div class="footer">
              Big Paws Pet Hotel • 123 Pet Street, Manila • contact@bigpawspethotel.com • (02) 8123-4567
            </div>
          </div>
        </body>
      </html>
    `
    const file = new Blob([htmlContent], { type: "text/html" })
    element.href = URL.createObjectURL(file)
    element.download = `receipt-${boardingOrder.id}.html`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleSendEmail = () => {
    // In a real implementation, this would send an API request to email the receipt
    alert(`Receipt would be sent to ${boardingOrder.owner.email}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto dark:bg-gray-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-s4UwpTDkzc4Mk3NusidO22doRl47IL.png"
                alt="Big Paws Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            Boarding Receipt
          </DialogTitle>
        </DialogHeader>

        <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 shadow-sm relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-s4UwpTDkzc4Mk3NusidO22doRl47IL.png"
              alt="Big Paws Logo"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>

          <div className="text-center border-b pb-4 mb-4 relative">
            <div className="flex items-center justify-center mb-1">
              <div className="relative w-16 h-16 mb-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogo-s4UwpTDkzc4Mk3NusidO22doRl47IL.png"
                  alt="Big Paws Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Receipt #REC-{boardingOrder.id}</p>
            <p className="text-sm">{formatDate(new Date().toISOString())}</p>
          </div>

          <div className="space-y-4 relative">
            <div className="border-b pb-3">
              <h4 className="font-medium text-primary mb-2">Pet Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{boardingOrder.pet.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{boardingOrder.pet.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Breed:</span>
                  <span>{boardingOrder.pet.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Size:</span>
                  <span>{boardingOrder.pet.size}</span>
                </div>
              </div>
            </div>

            <div className="border-b pb-3">
              <h4 className="font-medium text-primary mb-2">Owner Information</h4>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">{boardingOrder.owner.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span>{boardingOrder.owner.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{boardingOrder.owner.phone}</span>
                </div>
              </div>
            </div>

            <div className="border-b pb-3">
              <h4 className="font-medium text-primary mb-2">Boarding Details</h4>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Boarding Type:</span>
                  <span>{boardingOrder.boardingType === "Daycare" ? "Daycare (Hourly)" : "Long Stay (Overnight)"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>
                    {calculateDuration(boardingOrder.startDate, boardingOrder.endDate, boardingOrder.boardingType)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in:</span>
                  <span>{formatDate(boardingOrder.startDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out:</span>
                  <span>{formatDate(boardingOrder.endDate)}</span>
                </div>
                {boardingOrder.releaseTimestamp && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Released on:</span>
                    <span>{formatDate(boardingOrder.releaseTimestamp)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Services Section */}
            {boardingOrder.additionalServices && boardingOrder.additionalServices.length > 0 && (
              <div className="space-y-2 mt-4">
                <h3 className="text-sm font-medium">Additional Services</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-2">Service</th>
                        <th className="text-right p-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boardingOrder.additionalServices.map((service, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                          <td className="p-2">
                            {service.name}
                            {service.timestamp && (
                              <span className="text-xs text-muted-foreground block">
                                {new Date(service.timestamp).toLocaleDateString()}
                              </span>
                            )}
                          </td>
                          <td className="p-2 text-right">{formatCurrency(service.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium text-primary mb-2">Payment Information</h4>
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-muted-foreground">Payment Status:</span>
                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                  {boardingOrder.paymentStatus}
                </span>
              </div>
              <div className="text-right text-lg font-bold text-green-600 dark:text-green-400">
                Total Amount: {formatCurrency(boardingOrder.totalPrice)}
              </div>
            </div>
          </div>

          <div className="text-center mt-6 text-primary font-medium">
            <span className="inline-block mx-1">🐾</span>
            Thank you for choosing our services!
            <span className="inline-block mx-1">🐾</span>
          </div>

          <div className="text-center mt-4 text-xs text-muted-foreground">
            Big Paws Pet Hotel • 123 Pet Street, Manila • contact@bigpawspethotel.com • (02) 8123-4567
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 mt-4">
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={handlePrint} className="flex-1 sm:flex-none">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleDownload} className="flex-1 sm:flex-none">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" onClick={handleSendEmail} className="flex-1 sm:flex-none">
              <Send className="mr-2 h-4 w-4" />
              Email
            </Button>
          </div>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

