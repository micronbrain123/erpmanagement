'use client'

import { useState } from 'react'

export default function LoanBalanceReport() {
  const [filterType, setFilterType] = useState('All Loan Accounts')
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showReport, setShowReport] = useState(false)

  // Sample loan balance data
  const [loanData] = useState([
    {
      id: 1,
      sl: 1,
      accountName: 'Business Expansion Loan',
      openingBalance: 500000.00,
      receivedAmount: 0.00,
      paymentAmount: 25000.00,
      balance: 475000.00
    },
    {
      id: 2,
      sl: 2,
      accountName: 'Equipment Purchase Loan',
      openingBalance: 300000.00,
      receivedAmount: 0.00,
      paymentAmount: 15000.00,
      balance: 285000.00
    },
    {
      id: 3,
      sl: 3,
      accountName: 'Working Capital Loan',
      openingBalance: 200000.00,
      receivedAmount: 50000.00,
      paymentAmount: 10000.00,
      balance: 240000.00
    },
    {
      id: 4,
      sl: 4,
      accountName: 'Vehicle Loan',
      openingBalance: 150000.00,
      receivedAmount: 0.00,
      paymentAmount: 8000.00,
      balance: 142000.00
    },
    {
      id: 5,
      sl: 5,
      accountName: 'Short Term Credit',
      openingBalance: 75000.00,
      receivedAmount: 25000.00,
      paymentAmount: 5000.00,
      balance: 95000.00
    }
  ])

  const [filteredData, setFilteredData] = useState(loanData)

  // Filter options
  const filterOptions = [
    'All Loan Accounts',
    'Active Loans',
    'High Balance Loans',
    'Low Balance Loans',
    'Recently Updated'
  ]

  // Calculate grand totals
  const grandTotals = {
    openingBalance: filteredData.reduce((sum, loan) => sum + loan.openingBalance, 0),
    receivedAmount: filteredData.reduce((sum, loan) => sum + loan.receivedAmount, 0),
    paymentAmount: filteredData.reduce((sum, loan) => sum + loan.paymentAmount, 0),
    balance: filteredData.reduce((sum, loan) => sum + loan.balance, 0)
  }

  const handleGetReport = () => {
    console.log('Generating loan balance report with filter:', filterType)
    setShowReport(true)
    setCurrentPage(1)
    // Reset search when generating new report
    setSearchTerm('')
    setFilteredData(loanData)
    setShowSearch(false)
    // Here you would typically make an API call to get filtered data
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredData(loanData)
    } else {
      const filtered = loanData.filter(entry =>
        entry.accountName.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredData(loanData)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Loan Balance Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 11px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #7c3aed; }
            .amount { text-align: right; }
            .total-row { background-color: #f9f9f9; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Loan Balance Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Account Name</th>
                <th>Opening Balance</th>
                <th>Received Amount</th>
                <th>Payment Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map((entry) => `
                <tr>
                  <td>${entry.sl}</td>
                  <td>${entry.accountName}</td>
                  <td class="amount">${entry.openingBalance.toFixed(2)}</td>
                  <td class="amount">${entry.receivedAmount.toFixed(2)}</td>
                  <td class="amount">${entry.paymentAmount.toFixed(2)}</td>
                  <td class="amount">${entry.balance.toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="2"><strong>Grand Total</strong></td>
                <td class="amount"><strong>${grandTotals.openingBalance.toFixed(2)}</strong></td>
                <td class="amount"><strong>${grandTotals.receivedAmount.toFixed(2)}</strong></td>
                <td class="amount"><strong>${grandTotals.paymentAmount.toFixed(2)}</strong></td>
                <td class="amount"><strong>${grandTotals.balance.toFixed(2)}</strong></td>
              </tr>
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
      ['SL', 'Account Name', 'Opening Balance', 'Received Amount', 'Payment Amount', 'Balance'],
      ...filteredData.map((entry) => [
        entry.sl,
        entry.accountName,
        entry.openingBalance.toFixed(2),
        entry.receivedAmount.toFixed(2),
        entry.paymentAmount.toFixed(2),
        entry.balance.toFixed(2)
      ]),
      ['Grand Total', '', 
        grandTotals.openingBalance.toFixed(2),
        grandTotals.receivedAmount.toFixed(2),
        grandTotals.paymentAmount.toFixed(2),
        grandTotals.balance.toFixed(2)
      ]
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'loan_balance_report.csv'
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
          <h2 className="font-medium text-lg">Loan Balance Report</h2>
        </div>
        
        <div className="p-6">
          {/* Filter Section */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
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
            <h3 className="text-lg font-medium">Loan Balance Report</h3>
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
                placeholder="Search by account name..."
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
          <div className="overflow-x-auto max-w-6xl mx-auto border rounded">
            <table className="min-w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700">SL</th>
                  <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700 min-w-[200px]">Account Name</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">Opening Balance</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">Received Amount</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">Payment Amount</th>
                  <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">Balance</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  <>
                    {currentEntries.map((entry) => (
                      <tr key={entry.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 text-xs">{entry.sl}</td>
                        <td className="py-2 px-3 text-xs font-medium">{entry.accountName}</td>
                        <td className="py-2 px-3 text-xs text-right">{entry.openingBalance.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-right">{entry.receivedAmount.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-right">{entry.paymentAmount.toFixed(2)}</td>
                        <td className="py-2 px-3 text-xs text-right">
                          <span className={entry.balance > 0 ? 'text-red-600' : entry.balance < 0 ? 'text-green-600' : 'text-gray-900'}>
                            {entry.balance.toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                    
                    {/* Grand Total Row */}
                    <tr className="border-t-2 border-gray-400 bg-gray-100">
                      <td className="py-2 px-3 text-xs font-bold" colSpan="2">
                        Grand Total
                      </td>
                      <td className="py-2 px-3 text-xs text-right font-bold">{grandTotals.openingBalance.toFixed(2)}</td>
                      <td className="py-2 px-3 text-xs text-right font-bold">{grandTotals.receivedAmount.toFixed(2)}</td>
                      <td className="py-2 px-3 text-xs text-right font-bold">{grandTotals.paymentAmount.toFixed(2)}</td>
                      <td className="py-2 px-3 text-xs text-right font-bold">
                        <span className={grandTotals.balance > 0 ? 'text-red-600' : grandTotals.balance < 0 ? 'text-green-600' : 'text-gray-900'}>
                          {grandTotals.balance.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-500">
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

          {/* Summary Information */}
          <div className="mt-4 p-4 bg-gray-50 rounded border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Total Accounts:</span>
                <div className="text-lg font-bold text-blue-600">{filteredData.length}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Opening Balance:</span>
                <div className="text-lg font-bold text-purple-600">₹{grandTotals.openingBalance.toFixed(2)}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Total Payments:</span>
                <div className="text-lg font-bold text-green-600">₹{grandTotals.paymentAmount.toFixed(2)}</div>
              </div>
              <div>
                <span className="font-medium text-gray-600">Current Balance:</span>
                <div className={`text-lg font-bold ${grandTotals.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  ₹{grandTotals.balance.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div>
                <span className="font-medium text-gray-600">Total Received:</span>
                <div className="text-lg font-bold text-blue-600">₹{grandTotals.receivedAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}