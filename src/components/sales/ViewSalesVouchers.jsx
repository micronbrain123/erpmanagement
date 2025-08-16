'use client'

import { useState } from 'react'

export default function ViewSalesVouchers() {
  const [selectedVoucher, setSelectedVoucher] = useState('INV-245')
  const [voucherData, setVoucherData] = useState({
    invoiceNo: 'INV-245',
    customerName: 'General Customer',
    address: '',
    contactNo: '',
    salesDate: '13 Aug 2025 11:49 pm',
    salesBy: 'SOFT TASK',
    items: [
      {
        sl: 1,
        itemName: 'Mouse',
        rate: '0.00',
        qty: '1 Cutton, 0 Pcs',
        discount: '0%',
        vat: '0%',
        total: '0.00'
      },
      {
        sl: 2,
        itemName: 'SHAHI ST-10 CHARGER',
        rate: '0.00',
        qty: '1 Pcs',
        discount: '0%',
        vat: '0%',
        total: '0.00'
      }
    ],
    quantityTotal: '11',
    amountSubTotal: '0.00',
    transportCost: '0.00',
    grandTotal: '0.00',
    paid: '0.00',
    due: '0.00',
    previousDue: '0',
    invoiceDue: '0.00',
    currentDue: '0.00',
    grandTotalInWords: 'Only (BDT)',
    narration: ''
  })

  const [availableVouchers] = useState([
    { value: 'INV-245', label: 'INV-245 - General Customer' },
    { value: 'INV-001', label: 'INV-001 - ABC Company Ltd' },
    { value: 'INV-002', label: 'INV-002 - XYZ Trading Co' },
    { value: 'INV-003', label: 'INV-003 - Customer ABC' }
  ])

  const handleVoucherChange = (voucherNo) => {
    setSelectedVoucher(voucherNo)
    // In a real app, this would fetch voucher data from backend
    // For demo purposes, we'll just update with sample data
    if (voucherNo === 'INV-001') {
      setVoucherData({
        ...voucherData,
        invoiceNo: 'INV-001',
        customerName: 'ABC Company Ltd',
        salesDate: '10 Aug 2025 09:30 am',
        grandTotal: '25,500.00',
        due: '5,500.00',
        paid: '20,000.00',
        currentDue: '5,500.00',
        grandTotalInWords: 'Twenty Five Thousand Five Hundred Only (BDT)'
      })
    } else {
      // Reset to default data
      setVoucherData({
        invoiceNo: 'INV-245',
        customerName: 'General Customer',
        address: '',
        contactNo: '',
        salesDate: '13 Aug 2025 11:49 pm',
        salesBy: 'SOFT TASK',
        items: [
          {
            sl: 1,
            itemName: 'Mouse',
            rate: '0.00',
            qty: '1 Cutton, 0 Pcs',
            discount: '0%',
            vat: '0%',
            total: '0.00'
          },
          {
            sl: 2,
            itemName: 'SHAHI ST-10 CHARGER',
            rate: '0.00',
            qty: '1 Pcs',
            discount: '0%',
            vat: '0%',
            total: '0.00'
          }
        ],
        quantityTotal: '11',
        amountSubTotal: '0.00',
        transportCost: '0.00',
        grandTotal: '0.00',
        paid: '0.00',
        due: '0.00',
        previousDue: '0',
        invoiceDue: '0.00',
        currentDue: '0.00',
        grandTotalInWords: 'Only (BDT)',
        narration: ''
      })
    }
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Sales Invoice - ${voucherData.invoiceNo}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px;
              font-size: 12px;
            }
            .invoice-header {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .invoice-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .customer-info, .invoice-details {
              width: 48%;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-bottom: 15px;
            }
            th, td { 
              border: 1px solid #000; 
              padding: 8px; 
              text-align: left;
            }
            th { 
              background-color: #f0f0f0; 
              font-weight: bold;
              text-align: center;
            }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
            .total-section {
              margin-top: 10px;
            }
            .total-row {
              margin: 5px 0;
            }
            .due-info {
              margin: 10px 0;
              padding: 10px;
              background-color: #f9f9f9;
              border: 1px solid #ddd;
            }
          </style>
        </head>
        <body>
          <div class="invoice-header">INVOICE</div>
          
          <div class="invoice-info">
            <div class="customer-info">
              <strong>Name:</strong> ${voucherData.customerName}<br>
              <strong>Address:</strong> ${voucherData.address}<br>
              <strong>Contact No:</strong> ${voucherData.contactNo}
            </div>
            <div class="invoice-details">
              <strong>Invoice No:</strong> ${voucherData.invoiceNo}<br>
              <strong>Sales Date:</strong> ${voucherData.salesDate}<br>
              <strong>Sales By:</strong> ${voucherData.salesBy}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Item Name</th>
                <th>Rate</th>
                <th>QTY</th>
                <th>Discount%</th>
                <th>Vat%</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${voucherData.items.map(item => `
                <tr>
                  <td class="text-center">${item.sl}</td>
                  <td>${item.itemName}</td>
                  <td class="text-right">${item.rate}</td>
                  <td>${item.qty}</td>
                  <td class="text-center">${item.discount}</td>
                  <td class="text-center">${item.vat}</td>
                  <td class="text-right">${item.total}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="due-info">
            <div><strong>Previous Due:</strong> ${voucherData.previousDue}</div>
            <div><strong>Invoice Due:</strong> ${voucherData.invoiceDue}</div>
            <div><strong>Current Due:</strong> ${voucherData.currentDue}</div>
          </div>

          <div class="total-section">
            <div class="total-row"><strong>Quantity Total:</strong> (${voucherData.quantityTotal})</div>
            <div class="total-row"><strong>Amount Sub Total:</strong> ${voucherData.amountSubTotal}</div>
            <div class="total-row"><strong>Transport Cost:</strong> ${voucherData.transportCost}</div>
            <div class="total-row"><strong>Grand Total: BDT</strong> ${voucherData.grandTotal}</div>
            <div class="total-row"><strong>Paid: BDT</strong> ${voucherData.paid}</div>
            <div class="total-row"><strong>Due: BDT</strong> ${voucherData.due}</div>
          </div>

          <div style="margin-top: 20px;">
            <strong>In Word of Grand Total:</strong> ${voucherData.grandTotalInWords}
          </div>

          ${voucherData.narration ? `
            <div style="margin-top: 15px;">
              <strong>Narration:</strong> ${voucherData.narration}
            </div>
          ` : ''}
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header with Search and AUTO PAD Button */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                className="bg-green-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                AUTO PAD ?
              </button>
              <button 
                onClick={handlePrint}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Print Voucher"
              >
                🖨️
              </button>
            </div>
            <div>
              <select 
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 min-w-60"
                value={selectedVoucher}
                onChange={(e) => handleVoucherChange(e.target.value)}
              >
                <option value="">SEARCH VOUCHER NO</option>
                {availableVouchers.map(voucher => (
                  <option key={voucher.value} value={voucher.value}>
                    {voucher.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-6">
          {/* Invoice Header */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold border-b-2 border-gray-800 pb-2 inline-block px-8">
              INVOICE
            </h1>
          </div>

          {/* Customer and Invoice Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Left Side - Customer Info */}
            <div className="space-y-2">
              <div><span className="font-semibold">Name :</span> {voucherData.customerName}</div>
              <div><span className="font-semibold">Address :</span> {voucherData.address}</div>
              <div><span className="font-semibold">Contact No :</span> {voucherData.contactNo}</div>
            </div>

            {/* Right Side - Invoice Info */}
            <div className="space-y-2 text-right">
              <div><span className="font-semibold">Invoice No :</span> {voucherData.invoiceNo}</div>
              <div><span className="font-semibold">Sales Date :</span> {voucherData.salesDate}</div>
              <div><span className="font-semibold">Sales By :</span> {voucherData.salesBy}</div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-800">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">SL</th>
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">Item Name</th>
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">Rate</th>
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">QTY</th>
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">Discount%</th>
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">Vat%</th>
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {voucherData.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-800 px-3 py-2 text-center">{item.sl}</td>
                    <td className="border border-gray-800 px-3 py-2">{item.itemName}</td>
                    <td className="border border-gray-800 px-3 py-2 text-right">{item.rate}</td>
                    <td className="border border-gray-800 px-3 py-2">{item.qty}</td>
                    <td className="border border-gray-800 px-3 py-2 text-center">{item.discount}</td>
                    <td className="border border-gray-800 px-3 py-2 text-center">{item.vat}</td>
                    <td className="border border-gray-800 px-3 py-2 text-right font-semibold">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Due Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="font-semibold">Previous Due :</span> {voucherData.previousDue}
              </div>
              <div>
                <span className="font-semibold">Invoice Due :</span> {voucherData.invoiceDue}
              </div>
              <div>
                <span className="font-semibold">Current Due :</span> {voucherData.currentDue}
              </div>
            </div>
          </div>

          {/* Totals Section */}
          <div className="space-y-2 text-right mb-6">
            <div className="font-semibold">
              Quantity Total : ({voucherData.quantityTotal})
            </div>
            <div className="flex justify-end">
              <div className="grid grid-cols-2 gap-4 text-right min-w-80">
                <div className="font-semibold">Amount Sub Total :</div>
                <div className="font-semibold">{voucherData.amountSubTotal}</div>
                
                <div className="font-semibold">Transport Cost :</div>
                <div className="font-semibold">{voucherData.transportCost}</div>
                
                <div className="font-semibold">Grand Total : BDT</div>
                <div className="font-semibold">{voucherData.grandTotal}</div>
                
                <div className="font-semibold">Paid : BDT</div>
                <div className="font-semibold">{voucherData.paid}</div>
                
                <div className="font-semibold">Due : BDT</div>
                <div className="font-semibold">{voucherData.due}</div>
              </div>
            </div>
          </div>

          {/* Grand Total in Words */}
          <div className="mb-6">
            <span className="font-semibold">In Word of Grand Total : </span>
            {voucherData.grandTotalInWords}
          </div>

          {/* Narration */}
          <div>
            <div className="font-semibold mb-2">Narration :</div>
            <div className="min-h-12 border-b border-gray-300 pb-2">
              {voucherData.narration}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}