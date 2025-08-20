'use client'

import { useState, useMemo } from 'react'

export default function ExpenseBalanceReport() {
  const [filterType, setFilterType] = useState('Date Wise')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [fromDate, setFromDate] = useState('20/08/2025')
  const [toDate, setToDate] = useState('20/08/2025')
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showReport, setShowReport] = useState(false)

  // Filter Type options
  const filterTypeOptions = [
    'Date Wise',
    'Account Wise',
    'Category Wise',
    'Monthly',
    'Yearly'
  ]

  // Account options for expense accounts
  const accountOptions = [
    { value: '', label: 'Search Account' },
    { value: 'office-rent', label: 'Office Rent' },
    { value: 'utilities', label: 'Utilities Expense' },
    { value: 'salary', label: 'Salary & Wages' },
    { value: 'transport', label: 'Transport Expense' },
    { value: 'marketing', label: 'Marketing Expense' },
    { value: 'maintenance', label: 'Maintenance & Repair' },
    { value: 'telephone', label: 'Telephone Expense' },
    { value: 'stationery', label: 'Office Stationery' },
    { value: 'fuel', label: 'Fuel Expense' },
    { value: 'insurance', label: 'Insurance Premium' },
    { value: 'misc', label: 'Miscellaneous Expense' }
  ]

  // Sample expense balance data
  const [expenseData] = useState([
    {
      id: 1,
      sl: 1,
      accountName: 'Office Rent',
      openingBalance: 0.00,
      debitAmount: 15000.00,
      creditAmount: 0.00,
      expenseAmount: 15000.00
    },
    {
      id: 2,
      sl: 2,
      accountName: 'Utilities Expense',
      openingBalance: 500.00,
      debitAmount: 3500.00,
      creditAmount: 0.00,
      expenseAmount: 4000.00
    },
    {
      id: 3,
      sl: 3,
      accountName: 'Salary & Wages',
      openingBalance: 2000.00,
      debitAmount: 45000.00,
      creditAmount: 0.00,
      expenseAmount: 47000.00
    },
    {
      id: 4,
      sl: 4,
      accountName: 'Transport Expense',
      openingBalance: 0.00,
      debitAmount: 8500.00,
      creditAmount: 500.00,
      expenseAmount: 8000.00
    },
    {
      id: 5,
      sl: 5,
      accountName: 'Marketing Expense',
      openingBalance: 1000.00,
      debitAmount: 12000.00,
      creditAmount: 0.00,
      expenseAmount: 13000.00
    },
    {
      id: 6,
      sl: 6,
      accountName: 'Telephone Expense',
      openingBalance: 200.00,
      debitAmount: 2800.00,
      creditAmount: 0.00,
      expenseAmount: 3000.00
    },
    {
      id: 7,
      sl: 7,
      accountName: 'Office Stationery',
      openingBalance: 0.00,
      debitAmount: 1500.00,
      creditAmount: 0.00,
      expenseAmount: 1500.00
    },
    {
      id: 8,
      sl: 8,
      accountName: 'Fuel Expense',
      openingBalance: 300.00,
      debitAmount: 5200.00,
      creditAmount: 0.00,
      expenseAmount: 5500.00
    },
    {
      id: 9,
      sl: 9,
      accountName: 'Insurance Premium',
      openingBalance: 0.00,
      debitAmount: 6000.00,
      creditAmount: 0.00,
      expenseAmount: 6000.00
    },
    {
      id: 10,
      sl: 10,
      accountName: 'Miscellaneous Expense',
      openingBalance: 100.00,
      debitAmount: 2400.00,
      creditAmount: 0.00,
      expenseAmount: 2500.00
    }
  ])

  // Filter data based on search term
  const filteredData = useMemo(() => {
    let filtered = expenseData;
    
    if (searchTerm.trim()) {
      filtered = filtered.filter(entry =>
        entry.accountName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [expenseData, searchTerm]);

  const handleGetReport = () => {
    console.log('Generating expense balance report:', {
      filterType,
      selectedAccount,
      fromDate,
      toDate
    })
    setShowReport(true)
    setCurrentPage(1)
    setSearchTerm('')
    setShowSearch(false)
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setShowSearch(false)
  }

  // Calculate totals
  const totals = useMemo(() => {
    return filteredData.reduce((acc, entry) => {
      acc.totalOpening += entry.openingBalance
      acc.totalDebit += entry.debitAmount
      acc.totalCredit += entry.creditAmount
      acc.totalExpense += entry.expenseAmount
      return acc
    }, {
      totalOpening: 0,
      totalDebit: 0,
      totalCredit: 0,
      totalExpense: 0,
      count: filteredData.length
    })
  }, [filteredData])

  // Print functionality
  const handlePrint = () => {
    const selectedAccountName = accountOptions.find(opt => opt.value === selectedAccount)?.label || 'All Accounts'
    const printContent = `
      <html>
        <head>
          <title>Expense Balance Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 11px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #0d9488; }
            .amount { text-align: right; }
            .header-info { margin: 20px 0; }
            .totals { background-color: #f9f9f9; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>Expense Balance Report</h1>
          <div class="header-info">
            <p>Filter Type: ${filterType}</p>
            <p>Account: ${selectedAccountName}</p>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Period: ${fromDate} to ${toDate}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Account Name</th>
                <th>Opening Balance</th>
                <th>Debit Amount</th>
                <th>Credit Amount</th>
                <th>Expense Amount</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map((entry) => `
                <tr>
                  <td>${entry.sl}</td>
                  <td>${entry.accountName}</td>
                  <td class="amount">${entry.openingBalance.toFixed(2)}</td>
                  <td class="amount">${entry.debitAmount.toFixed(2)}</td>
                  <td class="amount">${entry.creditAmount.toFixed(2)}</td>
                  <td class="amount">${entry.expenseAmount.toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="totals">
                <td colspan="2">Grand Total:</td>
                <td class="amount">${totals.totalOpening.toFixed(2)}</td>
                <td class="amount">${totals.totalDebit.toFixed(2)}</td>
                <td class="amount">${totals.totalCredit.toFixed(2)}</td>
                <td class="amount">${totals.totalExpense.toFixed(2)}</td>
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
      ['SL', 'Account Name', 'Opening Balance', 'Debit Amount', 'Credit Amount', 'Expense Amount'],
      ...filteredData.map((entry) => [
        entry.sl,
        entry.accountName,
        entry.openingBalance.toFixed(2),
        entry.debitAmount.toFixed(2),
        entry.creditAmount.toFixed(2),
        entry.expenseAmount.toFixed(2)
      ]),
      ['Grand Total:', '', totals.totalOpening.toFixed(2), totals.totalDebit.toFixed(2), totals.totalCredit.toFixed(2), totals.totalExpense.toFixed(2)]
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'expense_balance_report.csv'
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
          <h2 className="font-medium text-lg">Expense Balance Report</h2>
        </div>
        
        <div className="p-6">
          {/* Filter Section */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter Type</label>
              <select 
                className="w-36 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {filterTypeOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Account</label>
              <select 
                className="w-48 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
              >
                {accountOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input 
                type="text"
                className="w-32 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input 
                type="text"
                className="w-32 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={handleGetReport}
                className="bg-teal-500 text-white px-6 py-2 mt-7 rounded text-sm hover:bg-teal-600 transition-colors flex items-center gap-2"
              >
                🔍 GET REPORT
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
            <h3 className="text-lg font-medium">Expense Balance Report</h3>
            <div className="flex gap-2">
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

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700 border-r">SL</th>
                    <th className="text-left py-2 px-3 text-xs font-semibold text-gray-700 border-r">Account Name</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700 border-r">Opening Balance</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700 border-r">Debit Amount</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700 border-r">Credit Amount</th>
                    <th className="text-right py-2 px-3 text-xs font-semibold text-gray-700">Expense Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 text-xs border-r">{entry.sl}</td>
                      <td className="py-2 px-3 text-xs font-medium border-r">{entry.accountName}</td>
                      <td className="py-2 px-3 text-xs text-right border-r">{entry.openingBalance.toFixed(2)}</td>
                      <td className="py-2 px-3 text-xs text-right border-r">{entry.debitAmount.toFixed(2)}</td>
                      <td className="py-2 px-3 text-xs text-right border-r">{entry.creditAmount.toFixed(2)}</td>
                      <td className="py-2 px-3 text-xs text-right font-medium">{entry.expenseAmount.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-100 font-bold border-t-2">
                    <td className="py-2 px-3 text-xs border-r" colSpan="2">Grand Total :</td>
                    <td className="py-2 px-3 text-xs text-right border-r">{totals.totalOpening.toFixed(2)}</td>
                    <td className="py-2 px-3 text-xs text-right border-r">{totals.totalDebit.toFixed(2)}</td>
                    <td className="py-2 px-3 text-xs text-right border-r">{totals.totalCredit.toFixed(2)}</td>
                    <td className="py-2 px-3 text-xs text-right font-bold">{totals.totalExpense.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}