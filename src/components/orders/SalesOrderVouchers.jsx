'use client'

import { useState } from 'react'

export default function SalesOrderVouchers() {
  const [selectedVoucher, setSelectedVoucher] = useState('S010')
  const [voucherData, setVoucherData] = useState({
    voucherNo: 'S010',
    customerName: 'General Customer',
    debtorCode: '',
    institution: '',
    address: '',
    contactNo: '',
    orderDate: '08 Jul 2025',
    orderBy: 'SOFT TASK',
    items: [
      {
        sl: 1,
        itemName: 'test',
        rate: 'NaN',
        per: 'Pcs',
        qty: '1 Cutton, 0 Pcs',
        discount: '0%',
        GST: '0%',
        total: '0.00'
      }
    ],
    quantityTotal: '1',
    subTotal: '0.00',
    transportCost: '0.00',
    grandTotal: '0.00',
    due: '0.00',
    paid: '0.00',
    grandTotalInWords: 'Only (Rs)',
    narration: ''
  })

  const [availableVouchers] = useState([
    { value: 'S010', label: 'S010 - General Customer' },
    { value: 'S001', label: 'S001 - ABC Trading Ltd' },
    { value: 'S002', label: 'S002 - XYZ Corporation' },
    { value: 'S003', label: 'S003 - Prime Customer' },
    { value: 'S004', label: 'S004 - Elite Buyers' }
  ])

  const handleVoucherChange = (voucherNo) => {
    setSelectedVoucher(voucherNo)
    // In a real app, this would fetch voucher data from backend
    // For demo purposes, we'll just update with sample data
    if (voucherNo === 'S001') {
      setVoucherData({
        ...voucherData,
        voucherNo: 'S001',
        customerName: 'ABC Trading Ltd',
        orderDate: '05 Jul 2025',
        grandTotal: '25,500.00',
        due: '5,500.00',
        paid: '20,000.00',
        grandTotalInWords: 'Twenty Five Thousand Five Hundred Only (Rs)'
      })
    } else if (voucherNo === 'S002') {
      setVoucherData({
        ...voucherData,
        voucherNo: 'S002',
        customerName: 'XYZ Corporation',
        orderDate: '03 Jul 2025',
        grandTotal: '18,750.00',
        due: '0.00',
        paid: '18,750.00',
        grandTotalInWords: 'Eighteen Thousand Seven Hundred Fifty Only (Rs)'
      })
    } else {
      // Reset to default data
      setVoucherData({
        voucherNo: 'S010',
        customerName: 'General Customer',
        debtorCode: '',
        institution: '',
        address: '',
        contactNo: '',
        orderDate: '08 Jul 2025',
        orderBy: 'SOFT TASK',
        items: [
          {
            sl: 1,
            itemName: 'test',
            rate: 'NaN',
            per: 'Pcs',
            qty: '1 Cutton, 0 Pcs',
            discount: '0%',
            GST: '0%',
            total: '0.00'
          }
        ],
        quantityTotal: '1',
        subTotal: '0.00',
        transportCost: '0.00',
        grandTotal: '0.00',
        due: '0.00',
        paid: '0.00',
        grandTotalInWords: 'Only (Rs)',
        narration: ''
      })
    }
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Sales Order Voucher - ${voucherData.voucherNo}</title>
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
            .customer-info, .voucher-info {
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
          <div class="invoice-header">ORDER VOUCHER</div>
          
          <div class="invoice-info">
            <div class="customer-info">
              <strong>Customer/ Debtor Code:</strong> ${voucherData.debtorCode}<br>
              <strong>Name:</strong> ${voucherData.customerName}<br>
              <strong>Institution:</strong> ${voucherData.institution}<br>
              <strong>Address:</strong> ${voucherData.address}<br>
              <strong>Contact No:</strong> ${voucherData.contactNo}
            </div>
            <div class="voucher-info">
              <strong>Voucher No:</strong> ${voucherData.voucherNo}<br>
              <strong>Order Date:</strong> ${voucherData.orderDate}<br>
              <strong>Order By:</strong> ${voucherData.orderBy}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Item Name</th>
                <th>Rate</th>
                <th>Per</th>
                <th>ORDER QTY</th>
                <th>Discount%</th>
                <th>GST%</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${voucherData.items.map(item => `
                <tr>
                  <td style="text-align: center;">${item.sl}</td>
                  <td>${item.itemName}</td>
                  <td class="text-right">${item.rate}</td>
                  <td style="text-align: center;">${item.per}</td>
                  <td>${item.qty}</td>
                  <td style="text-align: center;">${item.discount}</td>
                  <td style="text-align: center;">${item.GST}</td>
                  <td class="text-right">${item.total}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-row"><strong>Sub Total:</strong> ${voucherData.subTotal}</div>
            <div class="total-row"><strong>Transport Cost:</strong> ${voucherData.transportCost}</div>
            <div class="total-row"><strong>Grand Total: ₹</strong> ${voucherData.grandTotal}</div>
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
        {/* Header with Search */}
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
              ORDER VOUCHER
            </h1>
          </div>

          {/* Customer and Voucher Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Left Side - Customer Info */}
            <div className="space-y-2">
              <div><span className="font-semibold">Customer/ Debtor Code :</span> {voucherData.debtorCode}</div>
              <div><span className="font-semibold">Name :</span> {voucherData.customerName}</div>
              <div><span className="font-semibold">Institution :</span> {voucherData.institution}</div>
              <div><span className="font-semibold">Address :</span> {voucherData.address}</div>
              <div><span className="font-semibold">Contact No :</span> {voucherData.contactNo}</div>
            </div>

            {/* Right Side - Voucher Info */}
            <div className="space-y-2 text-right">
              <div><span className="font-semibold">Voucher No :</span> {voucherData.voucherNo}</div>
              <div><span className="font-semibold">Order Date :</span> {voucherData.orderDate}</div>
              <div><span className="font-semibold">Order By :</span> {voucherData.orderBy}</div>
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
                  <th className="border border-gray-800 px-3 py-2 text-center font-semibold">ORDER QTY</th>
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
                    <td className="border border-gray-800 px-3 py-2">{item.qty}</td>
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