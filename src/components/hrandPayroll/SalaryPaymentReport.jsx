'use client'

import { useState } from 'react'

export default function SalaryPaymentReport() {
  const [filterData, setFilterData] = useState({
    filterType: '',
    fromDate: '2025-08-08',
    toDate: '2025-08-13'
  })

  const [reportData, setReportData] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Sample data for demonstration - expanded with different dates and departments
  const allSampleData = [
    {
      id: 1,
      sl: 1,
      employeeName: 'John Doe',
      department: 'Sales Dept',
      designation: 'Marketing Officer',
      paymentDate: '2025-08-13',
      basicSalary: 25000,
      allowances: 5000,
      deductions: 2000,
      netSalary: 28000
    },
    {
      id: 2,
      sl: 2,
      employeeName: 'Jane Smith',
      department: 'Recovery',
      designation: 'Software Engineer',
      paymentDate: '2025-08-13',
      basicSalary: 35000,
      allowances: 7000,
      deductions: 3000,
      netSalary: 39000
    },
    {
      id: 3,
      sl: 3,
      employeeName: 'Mike Johnson',
      department: 'Commercial',
      designation: 'Finance Manager',
      paymentDate: '2025-08-13',
      basicSalary: 45000,
      allowances: 8000,
      deductions: 4000,
      netSalary: 49000
    },
    {
      id: 4,
      sl: 4,
      employeeName: 'Sarah Wilson',
      department: 'Sales Dept',
      designation: 'Marketing Officer',
      paymentDate: '2025-08-12',
      basicSalary: 28000,
      allowances: 6000,
      deductions: 2500,
      netSalary: 31500
    },
    {
      id: 5,
      sl: 5,
      employeeName: 'David Brown',
      department: 'Recovery',
      designation: 'Account Manager',
      paymentDate: '2025-08-11',
      basicSalary: 32000,
      allowances: 5500,
      deductions: 3200,
      netSalary: 34300
    },
    {
      id: 6,
      sl: 6,
      employeeName: 'Lisa Garcia',
      department: 'Commercial',
      designation: 'Finance Manager',
      paymentDate: '2025-08-10',
      basicSalary: 42000,
      allowances: 7500,
      deductions: 3800,
      netSalary: 45700
    },
    {
      id: 7,
      sl: 7,
      employeeName: 'Robert Taylor',
      department: 'Sales Dept',
      designation: 'Junior Accountant',
      paymentDate: '2025-08-09',
      basicSalary: 22000,
      allowances: 4000,
      deductions: 1800,
      netSalary: 24200
    },
    {
      id: 8,
      sl: 8,
      employeeName: 'Emily Davis',
      department: 'Recovery',
      designation: 'Software Engineer',
      paymentDate: '2025-08-08',
      basicSalary: 38000,
      allowances: 8000,
      deductions: 4000,
      netSalary: 42000
    }
  ]

  const filterReportData = () => {
    let filtered = [...allSampleData]

    // Filter by date range
    if (filterData.fromDate && filterData.toDate) {
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.paymentDate)
        const fromDate = new Date(filterData.fromDate)
        const toDate = new Date(filterData.toDate)
        return recordDate >= fromDate && recordDate <= toDate
      })
    }

    // Apply additional filters based on filter type
    switch (filterData.filterType) {
      case 'department':
        // For demo, filter by Sales Dept only
        filtered = filtered.filter(record => record.department === 'Sales Dept')
        break
      case 'designation':
        // For demo, filter by Marketing Officer only
        filtered = filtered.filter(record => record.designation === 'Marketing Officer')
        break
      case 'employee':
        // For demo, filter by employees with names starting with 'J'
        filtered = filtered.filter(record => record.employeeName.startsWith('J'))
        break
      case 'date_range':
        // Date range filtering is already applied above
        break
      default:
        // 'All Records' - no additional filtering
        break
    }

    // Reassign serial numbers
    filtered = filtered.map((record, index) => ({
      ...record,
      sl: index + 1
    }))

    return filtered
  }

  const filterTypes = [
    { value: '', label: 'All Records' },
    { value: 'department', label: 'By Department' },
    { value: 'designation', label: 'By Designation' },
    { value: 'employee', label: 'By Employee' },
    { value: 'date_range', label: 'By Date Range' }
  ]

  const handleInputChange = (field, value) => {
    setFilterData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGenerateReport = () => {
    // Apply filters to get the filtered data
    const filteredData = filterReportData()
    setReportData(filteredData)
    setShowResults(true)
    setCurrentPage(1)
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Salary Payment Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; color: #0f766e; margin-bottom: 10px; }
            .report-title { font-size: 18px; margin-bottom: 20px; }
            .filter-info { text-align: center; margin-bottom: 20px; font-size: 14px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 6px; text-align: left; font-size: 11px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .number { text-align: right; }
            .total-row { font-weight: bold; background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Fayullah Factory</div>
            <div class="report-title">Salary Payment Report</div>
            <div class="filter-info">
              Period: ${filterData.fromDate} to ${filterData.toDate}
              ${filterData.filterType ? ` | Filter: ${filterTypes.find(f => f.value === filterData.filterType)?.label}` : ''}
            </div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Payment Date</th>
                <th>Basic Salary</th>
                <th>Allowances</th>
                <th>Deductions</th>
                <th>Net Salary</th>
              </tr>
            </thead>
            <tbody>
              ${reportData.map(record => `
                <tr>
                  <td>${record.sl}</td>
                  <td>${record.employeeName}</td>
                  <td>${record.department}</td>
                  <td>${record.designation}</td>
                  <td>${record.paymentDate}</td>
                  <td class="number">৳${record.basicSalary.toLocaleString()}</td>
                  <td class="number">৳${record.allowances.toLocaleString()}</td>
                  <td class="number">৳${record.deductions.toLocaleString()}</td>
                  <td class="number">৳${record.netSalary.toLocaleString()}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="5">Total</td>
                <td class="number">৳${reportData.reduce((sum, record) => sum + record.basicSalary, 0).toLocaleString()}</td>
                <td class="number">৳${reportData.reduce((sum, record) => sum + record.allowances, 0).toLocaleString()}</td>
                <td class="number">৳${reportData.reduce((sum, record) => sum + record.deductions, 0).toLocaleString()}</td>
                <td class="number">৳${reportData.reduce((sum, record) => sum + record.netSalary, 0).toLocaleString()}</td>
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

  const handleExport = () => {
    const csvContent = [
      ['SL', 'Employee Name', 'Department', 'Designation', 'Payment Date', 'Basic Salary', 'Allowances', 'Deductions', 'Net Salary'],
      ...reportData.map(record => [
        record.sl,
        record.employeeName,
        record.department,
        record.designation,
        record.paymentDate,
        record.basicSalary,
        record.allowances,
        record.deductions,
        record.netSalary
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `salary_payment_report_${filterData.fromDate}_to_${filterData.toDate}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Pagination logic
  const totalPages = Math.ceil(reportData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentRecords = reportData.slice(startIndex, endIndex)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const generatePageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Report Filter Form */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
          <h2 className="font-medium text-lg">Salary Payment Report</h2>
          <div className="text-right">
            <div className="text-sm font-semibold">Fayullah Factory</div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Filter Type Dropdown */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Filter Type</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
                value={filterData.filterType}
                onChange={(e) => handleInputChange('filterType', e.target.value)}
              >
                {filterTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">From Date</label>
              <input 
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={filterData.fromDate}
                onChange={(e) => handleInputChange('fromDate', e.target.value)}
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">To Date</label>
              <input 
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={filterData.toDate}
                onChange={(e) => handleInputChange('toDate', e.target.value)}
              />
            </div>

            {/* Generate Report Button */}
            <div className="flex items-end">
              <button 
                onClick={handleGenerateReport}
                className="w-full bg-cyan-500 text-white px-6 py-2 rounded text-sm hover:bg-cyan-600 transition-colors flex items-center justify-center gap-2"
              >
                📊 REPORT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Results */}
      {showResults && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Salary Payment Records</h3>
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

            {/* Filter Info */}
            <div className="bg-gray-50 p-3 rounded mb-4 text-sm">
              <span className="font-medium">Report Filters: </span>
              Period: {filterData.fromDate} to {filterData.toDate}
              {filterData.filterType && (
                <span> | Filter Type: {filterTypes.find(f => f.value === filterData.filterType)?.label}</span>
              )}
            </div>

            {/* Top Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, reportData.length)} of {reportData.length} entries
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  {generatePageNumbers().map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 border rounded text-sm ${
                        currentPage === page 
                          ? 'bg-teal-600 text-white border-teal-600' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Report Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">SL</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Employee Name</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Department</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Designation</th>
                    <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Payment Date</th>
                    <th className="text-right py-3 px-2 text-xs font-semibold text-gray-700">Basic Salary</th>
                    <th className="text-right py-3 px-2 text-xs font-semibold text-gray-700">Allowances</th>
                    <th className="text-right py-3 px-2 text-xs font-semibold text-gray-700">Deductions</th>
                    <th className="text-right py-3 px-2 text-xs font-semibold text-gray-700">Net Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-sm">{record.sl}</td>
                      <td className="py-3 px-2 text-sm font-medium">{record.employeeName}</td>
                      <td className="py-3 px-2 text-sm">{record.department}</td>
                      <td className="py-3 px-2 text-sm">{record.designation}</td>
                      <td className="py-3 px-2 text-sm">{record.paymentDate}</td>
                      <td className="py-3 px-2 text-sm text-right">৳{record.basicSalary.toLocaleString()}</td>
                      <td className="py-3 px-2 text-sm text-right">৳{record.allowances.toLocaleString()}</td>
                      <td className="py-3 px-2 text-sm text-right">৳{record.deductions.toLocaleString()}</td>
                      <td className="py-3 px-2 text-sm text-right font-medium text-green-600">৳{record.netSalary.toLocaleString()}</td>
                    </tr>
                  ))}
                  
                  {/* Summary Row */}
                  {reportData.length > 0 && (
                    <tr className="border-b-2 bg-gray-100 font-semibold">
                      <td className="py-3 px-2 text-sm" colSpan="5">Total</td>
                      <td className="py-3 px-2 text-sm text-right">
                        ৳{reportData.reduce((sum, record) => sum + record.basicSalary, 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-sm text-right">
                        ৳{reportData.reduce((sum, record) => sum + record.allowances, 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-sm text-right">
                        ৳{reportData.reduce((sum, record) => sum + record.deductions, 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-2 text-sm text-right text-green-600">
                        ৳{reportData.reduce((sum, record) => sum + record.netSalary, 0).toLocaleString()}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, reportData.length)} of {reportData.length} entries
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  {generatePageNumbers().map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 border rounded text-sm ${
                        currentPage === page 
                          ? 'bg-teal-600 text-white border-teal-600' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded text-sm disabled:bg-gray-100 disabled:text-gray-400 hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* No Data Message */}
            {reportData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No salary payment records found for the selected criteria.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}