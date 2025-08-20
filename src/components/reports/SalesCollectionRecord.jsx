'use client'

import { useState, useMemo } from 'react'

export default function SalesCollectionRecord() {
  const [filterType, setFilterType] = useState('All')
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [showReport, setShowReport] = useState(false)
  
  // Convert to proper date format for input fields
  const formatDateForInput = (dateStr) => {
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  }
  
  const formatDateForDisplay = (dateStr) => {
    const date = new Date(dateStr)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }
  
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  
  const [fromDate, setFromDate] = useState(todayStr)
  const [toDate, setToDate] = useState(todayStr)

  // Sample sales & collection record data
  const [salesCollectionData] = useState([
    {
      id: 1,
      sl: 1,
      date: '2025-08-20',
      customerName: 'Ahmed Trading',
      invoiceNo: 'INV-2025-001',
      saleAmount: 25000.00,
      collectionAmount: 20000.00,
      previousDue: 5000.00,
      currentDue: 10000.00,
      paymentMethod: 'Cash',
      remarks: 'Partial payment received'
    },
    {
      id: 2,
      sl: 2,
      date: '2025-08-20',
      customerName: 'Bismillah Enterprise',
      invoiceNo: 'INV-2025-002',
      saleAmount: 18000.00,
      collectionAmount: 18000.00,
      previousDue: 2000.00,
      currentDue: 2000.00,
      paymentMethod: 'Bank Transfer',
      remarks: 'Full payment received'
    },
    {
      id: 3,
      sl: 3,
      date: '2025-08-19',
      customerName: 'City Corporation',
      invoiceNo: 'INV-2025-003',
      saleAmount: 35000.00,
      collectionAmount: 30000.00,
      previousDue: 15000.00,
      currentDue: 20000.00,
      paymentMethod: 'Cheque',
      remarks: 'Balance carried forward'
    },
    {
      id: 4,
      sl: 4,
      date: '2025-08-19',
      customerName: 'Digital Solutions',
      invoiceNo: 'INV-2025-004',
      saleAmount: 42000.00,
      collectionAmount: 42000.00,
      previousDue: 0.00,
      currentDue: 0.00,
      paymentMethod: 'Cash',
      remarks: 'Advance payment adjusted'
    },
    {
      id: 5,
      sl: 5,
      date: '2025-08-18',
      customerName: 'Express Logistics',
      invoiceNo: 'INV-2025-005',
      saleAmount: 28000.00,
      collectionAmount: 15000.00,
      previousDue: 8000.00,
      currentDue: 21000.00,
      paymentMethod: 'Bank Transfer',
      remarks: 'Installment payment'
    },
    {
      id: 6,
      sl: 6,
      date: '2025-08-18',
      customerName: 'Metro Trading',
      invoiceNo: 'INV-2025-006',
      saleAmount: 55000.00,
      collectionAmount: 55000.00,
      previousDue: 12000.00,
      currentDue: 12000.00,
      paymentMethod: 'Cash',
      remarks: 'Full payment on delivery'
    },
    // Additional sample data for better testing
    {
      id: 7,
      sl: 7,
      date: '2025-08-15',
      customerName: 'Tech Solutions',
      invoiceNo: 'INV-2025-007',
      saleAmount: 28000.00,
      collectionAmount: 20000.00,
      previousDue: 5000.00,
      currentDue: 13000.00,
      paymentMethod: 'Bank Transfer',
      remarks: 'Monthly payment'
    },
    {
      id: 8,
      sl: 8,
      date: '2025-08-10',
      customerName: 'Global Industries',
      invoiceNo: 'INV-2025-008',
      saleAmount: 45000.00,
      collectionAmount: 30000.00,
      previousDue: 10000.00,
      currentDue: 25000.00,
      paymentMethod: 'Cheque',
      remarks: 'Quarterly payment'
    }
  ])

  // Filter options
  const filterOptions = [
    'All',
    'Today',
    'This Week',
    'This Month',
    'Custom Range'
  ]

  // Date filtering logic
  const getDateRange = (filterType) => {
    const now = new Date()
    let startDate, endDate

    switch (filterType) {
      case 'Today':
        startDate = endDate = now.toISOString().split('T')[0]
        break
      case 'This Week':
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - now.getDay())
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        startDate = startOfWeek.toISOString().split('T')[0]
        endDate = endOfWeek.toISOString().split('T')[0]
        break
      case 'This Month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]
        break
      case 'Custom Range':
        return { startDate: fromDate, endDate: toDate }
      default:
        return null
    }
    
    return { startDate, endDate }
  }

  // Auto-update date fields when filter type changes
  const handleFilterTypeChange = (newFilterType) => {
    setFilterType(newFilterType)
    
    if (newFilterType !== 'Custom Range') {
      const dateRange = getDateRange(newFilterType)
      if (dateRange) {
        setFromDate(dateRange.startDate)
        setToDate(dateRange.endDate)
      }
    }
  }

  // Use useMemo to filter data based on search term and date filters
  const filteredData = useMemo(() => {
    let filtered = salesCollectionData;
    
    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(entry =>
        entry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.remarks.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by date range
    if (filterType !== 'All') {
      const dateRange = getDateRange(filterType)
      if (dateRange) {
        const { startDate, endDate } = dateRange
        filtered = filtered.filter(entry => {
          return entry.date >= startDate && entry.date <= endDate
        })
      }
    }
    
    return filtered;
  }, [salesCollectionData, searchTerm, filterType, fromDate, toDate]);

  const handleGetReport = () => {
    console.log('Generating sales & collection record:', {
      filterType,
      fromDate,
      toDate,
      dateRange: getDateRange(filterType)
    })
    setShowReport(true)
    setCurrentPage(1)
    // Reset search when generating new report
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
      acc.totalSales += entry.saleAmount
      acc.totalCollection += entry.collectionAmount
      acc.totalPreviousDue += entry.previousDue
      acc.totalCurrentDue += entry.currentDue
      return acc
    }, {
      totalSales: 0,
      totalCollection: 0,
      totalPreviousDue: 0,
      totalCurrentDue: 0,
      count: filteredData.length
    })
  }, [filteredData])

  // Print functionality with proper date formatting
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Sales Paid & Previous Collection Record</title>
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
          <h1>Sales Paid & Previous Collection Record</h1>
          <div class="header-info">
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <p>Period: ${formatDateForDisplay(fromDate)} to ${formatDateForDisplay(toDate)}</p>
            <p>Filter Type: ${filterType}</p>
            <p>Total Records: ${totals.count}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Invoice No</th>
                <th>Sale Amount</th>
                <th>Collection Amount</th>
                <th>Previous Due</th>
                <th>Current Due</th>
                <th>Payment Method</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map((entry) => `
                <tr>
                  <td>${entry.sl}</td>
                  <td>${formatDateForDisplay(entry.date)}</td>
                  <td>${entry.customerName}</td>
                  <td>${entry.invoiceNo}</td>
                  <td class="amount">${entry.saleAmount.toFixed(2)}</td>
                  <td class="amount">${entry.collectionAmount.toFixed(2)}</td>
                  <td class="amount">${entry.previousDue.toFixed(2)}</td>
                  <td class="amount">${entry.currentDue.toFixed(2)}</td>
                  <td>${entry.paymentMethod}</td>
                  <td>${entry.remarks}</td>
                </tr>
              `).join('')}
              <tr class="totals">
                <td colspan="4">TOTAL</td>
                <td class="amount">${totals.totalSales.toFixed(2)}</td>
                <td class="amount">${totals.totalCollection.toFixed(2)}</td>
                <td class="amount">${totals.totalPreviousDue.toFixed(2)}</td>
                <td class="amount">${totals.totalCurrentDue.toFixed(2)}</td>
                <td colspan="2"></td>
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

  // Export functionality with proper date formatting
  const handleExport = () => {
    const csvContent = [
      ['SL', 'Date', 'Customer Name', 'Invoice No', 'Sale Amount', 'Collection Amount', 'Previous Due', 'Current Due', 'Payment Method', 'Remarks'],
      ...filteredData.map((entry) => [
        entry.sl,
        formatDateForDisplay(entry.date),
        entry.customerName,
        entry.invoiceNo,
        entry.saleAmount.toFixed(2),
        entry.collectionAmount.toFixed(2),
        entry.previousDue.toFixed(2),
        entry.currentDue.toFixed(2),
        entry.paymentMethod,
        entry.remarks
      ]),
      ['TOTAL', '', '', '', totals.totalSales.toFixed(2), totals.totalCollection.toFixed(2), totals.totalPreviousDue.toFixed(2), totals.totalCurrentDue.toFixed(2), '', '']
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sales_collection_record_${formatDateForDisplay(fromDate)}_to_${formatDateForDisplay(toDate)}.csv`
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
          <h2 className="font-medium text-lg">Sales Paid & Previous Collection Record</h2>
        </div>
        
        <div className="p-6">
          {/* Filter Section */}
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter Type</label>
              <select 
                className="w-36 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={filterType}
                onChange={(e) => handleFilterTypeChange(e.target.value)}
              >
                {filterOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input 
                type="date"
                className="w-36 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value)
                  setFilterType('Custom Range')
                }}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input 
                type="date"
                className="w-36 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value)
                  setFilterType('Custom Range')
                }}
              />
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={handleGetReport}
                className="bg-teal-500 text-white mt-7 px-6 py-2 rounded text-sm hover:bg-teal-600 transition-colors flex items-center gap-2"
              >
                🔍 REPORT
              </button>
            </div>
          </div>

          {/* Date Range Info */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Selected Period:</strong> {formatDateForDisplay(fromDate)} to {formatDateForDisplay(toDate)}
              {filterType !== 'All' && filterType !== 'Custom Range' && (
                <span className="ml-2 text-blue-600">({filterType})</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Report Results - Only show when showReport is true */}
      {showReport && (
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Sales Paid & Previous Collection Record</h3>
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

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-700">Total Sales</h4>
              <p className="text-lg font-bold text-blue-900">{totals.totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-700">Total Collection</h4>
              <p className="text-lg font-bold text-green-900">{totals.totalCollection.toFixed(2)}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-700">Previous Due</h4>
              <p className="text-lg font-bold text-yellow-900">{totals.totalPreviousDue.toFixed(2)}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-red-700">Current Due</h4>
              <p className="text-lg font-bold text-red-900">{totals.totalCurrentDue.toFixed(2)}</p>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Search by customer, invoice, payment method, or remarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button 
                onClick={() => {}}
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
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Date</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Customer Name</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Invoice No</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Sale Amount</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Collection Amount</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Previous Due</th>
                  <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700">Current Due</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Payment Method</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 text-xs">{entry.sl}</td>
                      <td className="py-2 px-2 text-xs">{formatDateForDisplay(entry.date)}</td>
                      <td className="py-2 px-2 text-xs font-medium">{entry.customerName}</td>
                      <td className="py-2 px-2 text-xs font-medium text-blue-600">{entry.invoiceNo}</td>
                      <td className="py-2 px-2 text-xs text-right font-medium">{entry.saleAmount.toFixed(2)}</td>
                      <td className="py-2 px-2 text-xs text-right font-medium text-green-600">{entry.collectionAmount.toFixed(2)}</td>
                      <td className="py-2 px-2 text-xs text-right">{entry.previousDue.toFixed(2)}</td>
                      <td className="py-2 px-2 text-xs text-right">
                        <span className={entry.currentDue > 0 ? 'text-red-600 font-medium' : 'text-gray-900'}>
                          {entry.currentDue.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          entry.paymentMethod === 'Cash' ? 'bg-green-100 text-green-800' :
                          entry.paymentMethod === 'Bank Transfer' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {entry.paymentMethod}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-xs text-gray-600">{entry.remarks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-8 text-gray-500">
                      {searchTerm ? 'No matching records found' : 'No data available for the selected date range'}
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