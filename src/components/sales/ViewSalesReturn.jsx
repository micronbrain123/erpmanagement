'use client'

import { useState } from 'react'

export default function ViewSalesReturn() {
  const [selectedVoucher, setSelectedVoucher] = useState('SR7')
  const [voucherData, setVoucherData] = useState({
    invoiceNo: 'SR7',
    customerName: 'Anvar',
    institution: '',
    address: '',
    contactNo: '',
    returnDate: '28 Mar 2025 11:49 pm',
    returnBy: 'SOFT TASK',
    items: [
      {
        sl: 1,
        itemName: 'Anil Semiya',
        rate: '88.00',
        per: 'Pcs',
        qty: '2 Pcs',
        discount: '0%',
        vat: '0%',
        total: '176.00'
      }
    ],
    subTotal: '176.00',
    transportCost: '0.00',
    grandTotal: '176.00',
    grandTotalInWords: 'One Hundred and Seventy Six Only (BDT)',
    narration: ''
  })

  const [availableVouchers] = useState([
    { value: 'SR7', label: 'SR7 - Anvar' },
    { value: 'SR1', label: 'SR1 - ABC Company Ltd' },
    { value: 'SR2', label: 'SR2 - XYZ Trading Co' },
    { value: 'SR3', label: 'SR3 - Customer ABC' }
  ])

  const handleVoucherChange = (voucherNo) => {
    setSelectedVoucher(voucherNo)
    // In a real app, this would fetch voucher data from backend
    // For demo purposes, we'll just update with sample data
    if (voucherNo === 'SR1') {
      setVoucherData({
        ...voucherData,
        invoiceNo: 'SR1',
        customerName: 'ABC Company Ltd',
        returnDate: '25 Mar 2025 09:30 am',
        grandTotal: '15,500.00',
        subTotal: '15,500.00',
        grandTotalInWords: 'Fifteen Thousand Five Hundred Only (BDT)'
      })
    } else {
      // Reset to default data
      setVoucherData({
        invoiceNo: 'SR7',
        customerName: 'Anvar',
        institution: '',
        address: '',
        contactNo: '',
        returnDate: '28 Mar 2025 11:49 pm',
        returnBy: 'SOFT TASK',
        items: [
          {
            sl: 1,
            itemName: 'Anil Semiya',
            rate: '88.00',
            per: 'Pcs',
            qty: '2 Pcs',
            discount: '0%',
            vat: '0%',
            total: '176.00'
          }
        ],
        subTotal: '176.00',
        transportCost: '0.00',
        grandTotal: '176.00',
        grandTotalInWords: 'One Hundred and Seventy Six Only (BDT)',
        narration: ''
      })
    }
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Sales Return Voucher - ${voucherData.invoiceNo}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px;
              font-size: 12px;
            }
            .voucher-header {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .voucher-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .customer-info, .return-details {
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
              text-align: right;
            }
            .total-row {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="voucher-header">SALES RETURN VOUCHER</div>
          
          <div class="voucher-info">
            <div class="customer-info">
              <strong>Code:</strong><br>
              <strong>Name:</strong> ${voucherData.customerName}<br>
              <strong>Institution:</strong> ${voucherData.institution}<br>
              <strong>Address:</strong> ${voucherData.address}<br>
              <strong>Contact No:</strong> ${voucherData.contactNo}
            </div>
            <div class="return-details">
              <strong>Invoice No:</strong> ${voucherData.invoiceNo}<br>
              <strong>Return Date:</strong> ${voucherData.returnDate}<br>
              <strong>Return By:</strong> ${voucherData.returnBy}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Item Name</th>
                <th>Rate</th>
                <th>Per</th>
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
                  <td class="text-center">${item.per}</td>
                  <td class="text-center">${item.qty}</td>
                  <td class="text-center">${item.discount}</td>
                  <td class="text-center">${item.vat}</td>
                  <td class="text-right">${item.total}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-row"><strong>Sub Total:</strong> ${voucherData.subTotal}</div>
            <div class="total-row"><strong>Transport Cost:</strong> ${voucherData.transportCost}</div>
            <div class="total-row"><strong>Grand Total: BDT</strong> ${voucherData.grandTotal}</div>
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
        {/* Header with Search and Print Button */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
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

        {/* Voucher Content */}
        <div className="p-6">
          {/* Voucher Header */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold border-b-2 border-gray-800 pb-2 inline-block px-8">
              SALES RETURN VOUCHER
            </h1>
          </div>

          {/* Customer and Return Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Left Side - Customer Info */}
            <div className="space-y-2">
              <div><span className="font-semibold">Code :</span></div>
              <div><span className="font-semibold">Name :</span> {voucherData.customerName}</div>
              <div><span className="font-semibold">Institution :</span> {voucherData.institution}</div>
              <div><span className="font-semibold">Address :</span> {voucherData.address}</div>
              <div><span className="font-semibold">Contact No :</span> {voucherData.contactNo}</div>
            </div>

            {/* Right Side - Return Info */}
            <div className="space-y-2 text-right">
              <div><span className="font-semibold">Invoice No :</span> {voucherData.invoiceNo}</div>
              <div><span className="font-semibold">Return Date :</span> {voucherData.returnDate}</div>
              <div><span className="font-semibold">Return By :</span> {voucherData.returnBy}</div>
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
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">Per</th>
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
                    <td className="border border-gray-800 px-3 py-2 text-center">{item.per}</td>
                    <td className="border border-gray-800 px-3 py-2 text-center">{item.qty}</td>
                    <td className="border border-gray-800 px-3 py-2 text-center">{item.discount}</td>
                    <td className="border border-gray-800 px-3 py-2 text-center">{item.vat}</td>
                    <td className="border border-gray-800 px-3 py-2 text-right font-semibold">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="space-y-2 text-right mb-6">
            <div className="flex justify-end">
              <div className="grid grid-cols-2 gap-4 text-right min-w-80">
                <div className="font-semibold">Sub Total :</div>
                <div className="font-semibold">{voucherData.subTotal}</div>
                
                <div className="font-semibold">Transport Cost :</div>
                <div className="font-semibold">{voucherData.transportCost}</div>
                
                <div className="font-semibold">Grand Total : BDT</div>
                <div className="font-semibold">{voucherData.grandTotal}</div>
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