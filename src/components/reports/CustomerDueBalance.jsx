'use client'

import { useState } from 'react'

export default function CustomerDueBalance() {
  const [filterType, setFilterType] = useState('All Customer')
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showReport, setShowReport] = useState(false)

  // Sample customer due balance data based on the screenshot
  const [customerData] = useState([
    {
      id: 1,
      sl: 1,
      code: 'CUS-61',
      customerName: 'Bangia cement',
      contactNo: '',
      address: 'Dhaka',
      opening: 0.00,
      billAmount: 393088.00,
      received: 10000.00,
      payment: 0.00,
      return: 0.00,
      discount: 0.00,
      balance: 383088.00
    },
    {
      id: 2,
      sl: 2,
      code: 'CUS-65',
      customerName: 'Delwar Store',
      contactNo: '01945628561',
      address: 'Hanif Ali Mor',
      opening: 0.00,
      billAmount: 834560.00,
      received: 9000.00,
      payment: 0.00,
      return: 2980.00,
      discount: 0.00,
      balance: 822580.00
    },
    {
      id: 3,
      sl: 3,
      code: 'CUS-151',
      customerName: 'Babul',
      contactNo: '01890608090',
      address: '',
      opening: 60000.00,
      billAmount: 5700.00,
      received: 2000.00,
      payment: 0.00,
      return: 0.00,
      discount: 0.00,
      balance: 63700.00
    },
    {
      id: 4,
      sl: 4,
      code: 'CUS-172',
      customerName: 'Akash',
      contactNo: '',
      address: '',
      opening: 0.00,
      billAmount: 3000.00,
      received: 0.00,
      payment: 0.00,
      return: 0.00,
      discount: 0.00,
      balance: 3000.00
    }
  ])

  const [filteredData, setFilteredData] = useState(customerData)

  // Filter options based on the screenshot
  const filterOptions = [
    'All Customer',
    'Active Customer',
    'Inactive Customer',
    'Corporate',
    'Retailer'
  ]

  const handleGetReport = () => {
    console.log('Generating report with filter:', filterType)
    setShowReport(true)
    setCurrentPage(1)
    // Reset search when generating new report
    setSearchTerm('')
    setFilteredData(customerData)
    setShowSearch(false)
    // Here you would typically make an API call to get filtered data
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredData(customerData)
    } else {
      const filtered = customerData.filter(entry =>
        entry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.contactNo.includes(searchTerm) ||
        entry.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredData(customerData)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Customer Due Balance Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 11px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #7c3aed; }
            .amount { text-align: right; }
          </style>
        </head>
        <body>
          <h1>Customer Due Balance Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Code</th>
                <th>Customer Name</th>
                <th>Contact No</th>
                <th>Address</th>
                <th>Opening</th>
                <th>Bill Amount</th>
                <th>Received</th>
                <th>Payment</th>
                <th>Return</th>
                <th>Discount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map((entry) => `
                <tr>
                  <td>${entry.sl}</td>
                  <td>${entry.code}</td>
                  <td>${entry.customerName}</td>
                  <td>${entry.contactNo}</td>
                  <td>${entry.address}</td>
                  <td class="amount">${entry.opening.toFixed(2)}</td>
                  <td class="amount">${entry.billAmount.toFixed(2)}</td>
                  <td class="amount">${entry.received.toFixed(2)}</td>
                  <td class="amount">${entry.payment.toFixed(2)}</td>
                  <td class="amount">${entry.return.toFixed(2)}</td>
                  <td class="amount">${entry.discount.toFixed(2)}</td>
                  <td class="amount">${entry.balance.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  // Export functionality
  const handleExport = () => {
    const csvContent = [
      ['SL', 'Code', 'Customer Name', 'Contact No', 'Address', 'Opening', 'Bill Amount', 'Received', 'Payment', 'Return', 'Discount', 'Balance'],
      ...filteredData.map((entry) => [
        entry.sl,
        entry.code,
        entry.customerName,
        entry.contactNo,
        entry.address,
        entry.opening.toFixed(2),
        entry.billAmount.toFixed(2),
        entry.received.toFixed(2),
        entry.payment.toFixed(2),
        entry.return.toFixed(2),
        entry.discount.toFixed(2),
        entry.balance.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'customer_due_balance.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentEntries = filteredData.slice(startIndex, endIndex)

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
          <h2 className="font-medium text-lg">Customer Due Balance Report</h2>
        </div>
        
        <div className="p-6">
          {/* Filter Section */}
          <div className="flex items-center gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter Type</label>
              <select 
                className="w-48 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {filterOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleGetReport}
                className="bg-teal-600 text-white mt-7 px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                📊 GET REPORT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Results - Only show when showReport is true */}
      {showReport && (
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Customer Due Balance Report</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Search"
              >
                🔍
              </button>
              <button 
                onClick={handleExport}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Export to CSV"
              >
                📤
              </button>
              <button 
                onClick={handlePrint}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Print"
              >
                🖨️
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Search by customer name, code, contact, or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button 
                onClick={handleSearch}
                className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors"
              >
                Search
              </button>
              <button 
                onClick={handleClearSearch}
                className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          )}

          {/* Table - Scrollable */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">SL</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Code</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Customer Name</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Contact No</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Address</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Opening</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Bill Amount</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Received</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Payment</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Return</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Discount</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Balance</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 text-xs">{entry.sl}</td>
                      <td className="py-2 px-2 text-xs font-medium">{entry.code}</td>
                      <td className="py-2 px-2 text-xs">{entry.customerName}</td>
                      <td className="py-2 px-2 text-xs">{entry.contactNo}</td>
                      <td className="py-2 px-2 text-xs">{entry.address}</td>
                      <td className="py-2 px-2 text-xs text-right">{entry.opening.toFixed(2)}</td>
                      <td className="py-2 px-2 text-xs text-right font-medium">{entry.billAmount.toFixed(2)}</td>
                      <td className="py-2 px-2 text-xs text-right">{entry.received.toFixed(2)}</td>
                      <td className="py-2 px-2 text-xs text-right">{entry.payment.toFixed(2)}</td>
                      <td className="py-2 px-2 text-xs text-right">{entry.return.toFixed(2)}</td>
                      <td className="py-2 px-2 text-xs text-right">{entry.discount.toFixed(2)}</td>
                      <td className="py-2 px-2 text-xs text-right font-medium">
                        <span className={entry.balance > 0 ? 'text-red-600' : entry.balance < 0 ? 'text-green-600' : 'text-gray-900'}>
                          {entry.balance.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center py-8 text-gray-500">
                      {searchTerm ? 'No matching records found' : 'No data available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select 
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="border rounded px-2 py-1"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span>
                {filteredData.length === 0 
                  ? '0-0 of 0' 
                  : `${startIndex + 1}-${Math.min(endIndex, filteredData.length)} of ${filteredData.length}`
                }
              </span>
              <div className="flex gap-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ‹
                </button>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="p-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}