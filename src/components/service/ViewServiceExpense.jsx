'use client'

import { useState } from 'react'

export default function ViewServiceExpense() {
  const [selectedVoucher, setSelectedVoucher] = useState('SE1')
  const [voucherData, setVoucherData] = useState({
    voucherNo: 'SE1',
    supplierCode: '',
    supplierName: 'Conmix Ltd',
    institution: '',
    address: 'UAE',
    contactNo: '+95123132121',
    expenseDate: '30 Sep 2024',
    expenseBy: 'SOFT TASK',
    items: [
      {
        sl: 1,
        itemName: 'Recon PH (MB)',
        rate: '3,300.00',
        per: 'Bag',
        qty: '10 Bag, 0 KG',
        discount: '0%',
        GST: '0%',
        total: '33,000.00'
      }
    ],
    subTotal: '33,000.00',
    transportCost: '0.00',
    grandTotal: '33,000.00',
    paid: '0.00',
    due: '33,000.00',
    grandTotalInWords: 'Thirty Three Thousand Only (Rs)',
    narration: ''
  })

  const [availableVouchers] = useState([
    { value: 'SE1', label: 'SE1 - Conmix Ltd' },
    { value: 'SE2', label: 'SE2 - Another Supplier' },
    { value: 'SE3', label: 'SE3 - Test Supplier' }
  ])

  const handleVoucherChange = (voucherNo) => {
    setSelectedVoucher(voucherNo)
    // In a real app, this would fetch voucher data from backend
    // For demo purposes, we'll just update with sample data
    if (voucherNo === 'SE2') {
      setVoucherData({
        ...voucherData,
        voucherNo: 'SE2',
        supplierName: 'Another Supplier',
        institution: 'XYZ Corp',
        address: 'Dhaka, Bangladesh',
        contactNo: '87654321',
        grandTotal: '15,500.00',
        due: '8,500.00',
        paid: '7,000.00',
        grandTotalInWords: 'Fifteen Thousand Five Hundred Only (Rs)'
      })
    } else if (voucherNo === 'SE1') {
      // Reset to default data
      setVoucherData({
        voucherNo: 'SE1',
        supplierCode: '',
        supplierName: 'Conmix Ltd',
        institution: '',
        address: 'UAE',
        contactNo: '+95123132121',
        expenseDate: '30 Sep 2024',
        expenseBy: 'SOFT TASK',
        items: [
          {
            sl: 1,
            itemName: 'Recon PH (MB)',
            rate: '3,300.00',
            per: 'Bag',
            qty: '10 Bag, 0 KG',
            discount: '0%',
            GST: '0%',
            total: '33,000.00'
          }
        ],
        subTotal: '33,000.00',
        transportCost: '0.00',
        grandTotal: '33,000.00',
        paid: '0.00',
        due: '33,000.00',
        grandTotalInWords: 'Thirty Three Thousand Only (Rs)',
        narration: ''
      })
    }
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Service Expense Voucher - ${voucherData.voucherNo}</title>
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
            .supplier-info {
              margin-bottom: 20px;
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
          </style>
        </head>
        <body>
          <div class="voucher-header">SERVICE EXPENSE VOUCHER</div>
          
          <div class="supplier-info">
            <strong>Supplier/Creditor Code:</strong> ${voucherData.supplierCode}<br>
            <strong>Name:</strong> ${voucherData.supplierName}<br>
            <strong>Institution:</strong> ${voucherData.institution}<br>
            <strong>Address:</strong> ${voucherData.address}<br>
            <strong>Contact No:</strong> ${voucherData.contactNo}
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
                <th>GST%</th>
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
                  <td class="text-center">${item.GST}</td>
                  <td class="text-right">${item.total}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-row"><strong>Sub Total:</strong> ${voucherData.subTotal}</div>
            <div class="total-row"><strong>Transport Cost:</strong> ${voucherData.transportCost}</div>
            <div class="total-row"><strong>Grand Total: ₹ </strong> ${voucherData.grandTotal}</div>
            <div class="total-row"><strong>Due: ₹ </strong> ${voucherData.due}</div>
            <div class="total-row"><strong>Paid: ₹ </strong> ${voucherData.paid}</div>
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

        {/* Voucher Content */}
        <div className="p-6">
          {/* Voucher Header */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold border-b-2 border-gray-800 pb-2 inline-block px-8">
              SERVICE EXPENSE VOUCHER
            </h1>
          </div>

          {/* Supplier Information and Voucher Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Left side - Supplier Information */}
            <div className="space-y-2">
              <div>
                <span className="font-semibold">Supplier/ Creditor Code :</span> {voucherData.supplierCode}
              </div>
              <div>
                <span className="font-semibold">Name :</span> {voucherData.supplierName}
              </div>
              <div>
                <span className="font-semibold">Institution :</span> {voucherData.institution}
              </div>
              <div>
                <span className="font-semibold">Address :</span> {voucherData.address}
              </div>
              <div>
                <span className="font-semibold">Contact No :</span> {voucherData.contactNo}
              </div>
            </div>
            
            {/* Right side - Voucher Details */}
            <div className="space-y-2 text-right">
              <div>
                <span className="font-semibold">Voucher No :</span> {voucherData.voucherNo}
              </div>
              <div>
                <span className="font-semibold">Expense Date :</span> {voucherData.expenseDate}
              </div>
              <div>
                <span className="font-semibold">Expense By :</span> {voucherData.expenseBy}
              </div>
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
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">GST%</th>
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
                    <td className="border border-gray-800 px-3 py-2 text-center">{item.GST}</td>
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
                
                <div className="font-semibold">Grand Total : ₹</div>
                <div className="font-semibold">{voucherData.grandTotal}</div>
                
                <div className="font-semibold">Due : ₹</div>
                <div className="font-semibold">{voucherData.due}</div>
                
                <div className="font-semibold">Paid : ₹</div>
                <div className="font-semibold">{voucherData.paid}</div>
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