'use client'

import { useState, useEffect } from 'react'

export default function MonthlySalaryReport() {
  const [filters, setFilters] = useState({
    payYear: '2025',
    payMonth: 'August'
  })

  const [salaryData, setSalaryData] = useState([
    {
      id: 1,
      sl: 1,
      name: 'd',
      department: '',
      designation: '',
      salary: 21000.00,
      attendance: 0,
      leaveWithPay: 0,
      deduction: 0.00,
      conveyance: 0.00,
      ma: 0.00,
      ta: 0.00,
      da: 0.00,
      othersCommission: 0.00,
      salesAmount: 0.00,
      salesCommissionPercent: 0.00,
      salesCommission: 0.00,
      paidPayable: 0.00,
      payYear: '2025',
      payMonth: 'August'
    },
    {
      id: 2,
      sl: 2,
      name: 'Khawar Zahid',
      department: 'Logistics',
      designation: 'Junior Accountant',
      salary: 25000.00,
      attendance: 0,
      leaveWithPay: 0,
      deduction: 0.00,
      conveyance: 0.00,
      ma: 0.00,
      ta: 0.00,
      da: 0.00,
      othersCommission: 0.00,
      salesAmount: 25000.00,
      salesCommissionPercent: 0.00,
      salesCommission: 0.00,
      paidPayable: 0.00,
      payYear: '2025',
      payMonth: 'August'
    },
    {
      id: 3,
      sl: 3,
      name: 'wwq',
      department: 'Account',
      designation: 'Cashier',
      salary: 24000.00,
      attendance: 1,
      leaveWithPay: 0,
      deduction: 0.00,
      conveyance: 0.00,
      ma: 0.00,
      ta: 0.00,
      da: 0.00,
      othersCommission: 0.00,
      salesAmount: 2.00,
      salesCommissionPercent: 0.00,
      salesCommission: 0.00,
      paidPayable: 800.00,
      payYear: '2025',
      payMonth: 'July'
    },
    {
      id: 4,
      sl: 4,
      name: 'xxx',
      department: '',
      designation: '',
      salary: 25000.00,
      attendance: 1,
      leaveWithPay: 0,
      deduction: 0.00,
      conveyance: 0.00,
      ma: 0.00,
      ta: 0.00,
      da: 0.00,
      othersCommission: 0.00,
      salesAmount: 0.00,
      salesCommissionPercent: 0.00,
      salesCommission: 0.00,
      paidPayable: 833.33,
      payYear: '2024',
      payMonth: 'August'
    },
    {
      id: 5,
      sl: 5,
      name: 'Alice Johnson',
      department: 'HR',
      designation: 'HR Manager',
      salary: 28000.00,
      attendance: 22,
      leaveWithPay: 2,
      deduction: 500.00,
      conveyance: 2000.00,
      ma: 1000.00,
      ta: 800.00,
      da: 600.00,
      othersCommission: 1200.00,
      salesAmount: 15000.00,
      salesCommissionPercent: 5.00,
      salesCommission: 750.00,
      paidPayable: 32850.00,
      payYear: '2025',
      payMonth: 'August'
    },
    {
      id: 6,
      sl: 6,
      name: 'Bob Smith',
      department: 'Sales',
      designation: 'Sales Executive',
      salary: 22000.00,
      attendance: 24,
      leaveWithPay: 0,
      deduction: 200.00,
      conveyance: 1500.00,
      ma: 800.00,
      ta: 600.00,
      da: 400.00,
      othersCommission: 2000.00,
      salesAmount: 45000.00,
      salesCommissionPercent: 8.00,
      salesCommission: 3600.00,
      paidPayable: 30700.00,
      payYear: '2025',
      payMonth: 'August'
    }
  ])

  const [filteredData, setFilteredData] = useState(salaryData)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate totals
  const calculateTotals = (data) => {
    return data.reduce((totals, item) => ({
      salary: totals.salary + item.salary,
      attendance: totals.attendance + item.attendance,
      leaveWithPay: totals.leaveWithPay + item.leaveWithPay,
      deduction: totals.deduction + item.deduction,
      conveyance: totals.conveyance + item.conveyance,
      ma: totals.ma + item.ma,
      ta: totals.ta + item.ta,
      da: totals.da + item.da,
      othersCommission: totals.othersCommission + item.othersCommission,
      salesAmount: totals.salesAmount + item.salesAmount,
      salesCommissionPercent: totals.salesCommissionPercent + item.salesCommissionPercent,
      salesCommission: totals.salesCommission + item.salesCommission,
      paidPayable: totals.paidPayable + item.paidPayable
    }), {
      salary: 0,
      attendance: 0,
      leaveWithPay: 0,
      deduction: 0,
      conveyance: 0,
      ma: 0,
      ta: 0,
      da: 0,
      othersCommission: 0,
      salesAmount: 0,
      salesCommissionPercent: 0,
      salesCommission: 0,
      paidPayable: 0
    })
  }

  const totals = calculateTotals(filteredData)

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGetReport = () => {
    // Filter data based on selected year and month
    const filtered = salaryData.filter(item => 
      item.payYear === filters.payYear && item.payMonth === filters.payMonth
    )
    
    setFilteredData(filtered)
    setCurrentPage(1)
    
    // If there's a search term active, apply it to the filtered results
    if (searchTerm.trim() !== '') {
      const searchFiltered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.designation.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(searchFiltered)
    }
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      // If no search term, show filtered data based on current filters
      const filtered = salaryData.filter(item => 
        item.payYear === filters.payYear && item.payMonth === filters.payMonth
      )
      setFilteredData(filtered)
    } else {
      // Apply search to current filtered data
      const baseFiltered = salaryData.filter(item => 
        item.payYear === filters.payYear && item.payMonth === filters.payMonth
      )
      const searchFiltered = baseFiltered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.designation.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredData(searchFiltered)
    }
    setCurrentPage(1)
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    // Reset to current filter state
    const filtered = salaryData.filter(item => 
      item.payYear === filters.payYear && item.payMonth === filters.payMonth
    )
    setFilteredData(filtered)
    setShowSearch(false)
    setCurrentPage(1)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Monthly Salary Payable Report</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px;
              font-size: 12px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .filters {
              margin-bottom: 20px;
              text-align: center;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 20px; 
              font-size: 10px;
            }
            th, td { 
              border: 1px solid #333; 
              padding: 4px; 
              text-align: center; 
            }
            th { 
              background-color: #f2f2f2; 
              font-weight: bold; 
              font-size: 9px;
            }
            .total-row {
              font-weight: bold;
              background-color: #f9f9f9;
            }
            .rotate-text {
              writing-mode: vertical-rl;
              text-orientation: mixed;
              height: 80px;
              white-space: nowrap;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Monthly Salary Payable Report</h2>
          </div>
          <div class="filters">
            <p><strong>Pay Year:</strong> ${filters.payYear} | <strong>Pay Month:</strong> ${filters.payMonth}</p>
            <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th rowspan="2">SL</th>
                <th rowspan="2">Name</th>
                <th rowspan="2">Department</th>
                <th rowspan="2">Designation</th>
                <th rowspan="2">Salary</th>
                <th rowspan="2">Attendance</th>
                <th rowspan="2">Leave With Pay</th>
                <th rowspan="2">Deduction</th>
                <th rowspan="2">Conveyance</th>
                <th rowspan="2">MA</th>
                <th rowspan="2">TA</th>
                <th rowspan="2">DA</th>
                <th rowspan="2">Others Commission</th>
                <th colspan="3">Sales</th>
                <th rowspan="2">Paid/Payable</th>
              </tr>
              <tr>
                <th>Amount</th>
                <th>Commission%</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map(item => `
                <tr>
                  <td>${item.sl}</td>
                  <td style="text-align: left;">${item.name}</td>
                  <td style="text-align: left;">${item.department}</td>
                  <td style="text-align: left;">${item.designation}</td>
                  <td>${item.salary.toFixed(2)}</td>
                  <td>${item.attendance}</td>
                  <td>${item.leaveWithPay}</td>
                  <td>${item.deduction.toFixed(2)}</td>
                  <td>${item.conveyance.toFixed(2)}</td>
                  <td>${item.ma.toFixed(2)}</td>
                  <td>${item.ta.toFixed(2)}</td>
                  <td>${item.da.toFixed(2)}</td>
                  <td>${item.othersCommission.toFixed(2)}</td>
                  <td>${item.salesAmount.toFixed(2)}</td>
                  <td>${item.salesCommissionPercent.toFixed(2)}</td>
                  <td>${item.salesCommission.toFixed(2)}</td>
                  <td>${item.paidPayable.toFixed(2)}</td>
                </tr>
              `).join('')}
              <tr class="total-row">
                <td colspan="4"><strong>Grand Total :</strong></td>
                <td><strong>${totals.salary.toFixed(2)}</strong></td>
                <td><strong>${totals.attendance.toFixed(2)}</strong></td>
                <td><strong>${totals.leaveWithPay.toFixed(2)}</strong></td>
                <td><strong>${totals.deduction.toFixed(2)}</strong></td>
                <td><strong>${totals.conveyance.toFixed(2)}</strong></td>
                <td><strong>${totals.ma.toFixed(2)}</strong></td>
                <td><strong>${totals.ta.toFixed(2)}</strong></td>
                <td><strong>${totals.da.toFixed(2)}</strong></td>
                <td><strong>${totals.othersCommission.toFixed(2)}</strong></td>
                <td><strong>${totals.salesAmount.toFixed(2)}</strong></td>
                <td><strong>${totals.salesCommissionPercent.toFixed(2)}</strong></td>
                <td><strong>${totals.salesCommission.toFixed(2)}</strong></td>
                <td><strong>${totals.paidPayable.toFixed(2)}</strong></td>
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
      ['SL', 'Name', 'Department', 'Designation', 'Salary', 'Attendance', 'Leave With Pay', 'Deduction', 'Conveyance', 'MA', 'TA', 'DA', 'Others Commission', 'Sales Amount', 'Sales Commission%', 'Sales Commission', 'Paid/Payable'],
      ...filteredData.map(item => [
        item.sl,
        item.name,
        item.department,
        item.designation,
        item.salary,
        item.attendance,
        item.leaveWithPay,
        item.deduction,
        item.conveyance,
        item.ma,
        item.ta,
        item.da,
        item.othersCommission,
        item.salesAmount,
        item.salesCommissionPercent,
        item.salesCommission,
        item.paidPayable
      ]),
      ['Grand Total:', '', '', '', totals.salary, totals.attendance, totals.leaveWithPay, totals.deduction, totals.conveyance, totals.ma, totals.ta, totals.da, totals.othersCommission, totals.salesAmount, totals.salesCommissionPercent, totals.salesCommission, totals.paidPayable]
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `monthly_salary_report_${filters.payMonth}_${filters.payYear}.csv`
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
      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
          <h2 className="font-medium text-lg">Monthly Salary Payable Report</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-end gap-4 mb-4">
            {/* Select Pay of Year */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Select Pay of Year</label>
              <select 
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 min-w-[120px]"
                value={filters.payYear}
                onChange={(e) => handleFilterChange('payYear', e.target.value)}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>

            {/* Select Pay of Month */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Select Pay of Month</label>
              <select 
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 min-w-[120px]"
                value={filters.payMonth}
                onChange={(e) => handleFilterChange('payMonth', e.target.value)}
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            {/* Get Report Button */}
            <button 
              onClick={handleGetReport}
              className="bg-cyan-500 text-white px-6 py-2 rounded text-sm hover:bg-cyan-600 transition-colors flex items-center gap-2"
            >
              🔍 GET REPORT
            </button>
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Monthly Salary Payable Report</h3>
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
                placeholder="Search by name, department, or designation..."
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

          {/* Table */}
          <div className="relative">
            <div className="overflow-auto max-h-80 border border-gray-300 rounded-lg" style={{ width: '100%', overflowX: 'auto' }}>
                <table className="w-full text-xs" style={{ minWidth: '900px' }}>
                <thead className="sticky top-0 bg-gray-50 z-10">
                    <tr>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-8">SL</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-24">Name</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-20">Dept.</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-24">Designation</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-16">Salary</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-12">Att.</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-12">Leave</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-16">Deduction</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-16">Convey.</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-12">MA</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-12">TA</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-12">DA</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-16">Others</th>
                    <th colSpan="3" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50">Sales</th>
                    <th rowSpan="2" className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-20">Payable</th>
                    </tr>
                    <tr>
                    <th className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-16">Amount</th>
                    <th className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-12">%</th>
                    <th className="border border-gray-300 p-1 font-semibold text-gray-700 bg-gray-50 w-16">Comm.</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEntries.length > 0 ? (
                    <>
                        {currentEntries.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 p-1 text-center text-xs">{item.sl}</td>
                            <td className="border border-gray-300 p-1 text-left text-xs truncate" title={item.name}>{item.name}</td>
                            <td className="border border-gray-300 p-1 text-left text-xs truncate" title={item.department}>{item.department}</td>
                            <td className="border border-gray-300 p-1 text-left text-xs truncate" title={item.designation}>{item.designation}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{(item.salary/1000).toFixed(0)}k</td>
                            <td className="border border-gray-300 p-1 text-center text-xs">{item.attendance}</td>
                            <td className="border border-gray-300 p-1 text-center text-xs">{item.leaveWithPay}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.deduction.toFixed(0)}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.conveyance.toFixed(0)}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.ma.toFixed(0)}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.ta.toFixed(0)}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.da.toFixed(0)}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.othersCommission.toFixed(0)}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{(item.salesAmount/1000).toFixed(0)}k</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.salesCommissionPercent.toFixed(1)}%</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{item.salesCommission.toFixed(0)}</td>
                            <td className="border border-gray-300 p-1 text-right text-xs">{(item.paidPayable/1000).toFixed(1)}k</td>
                        </tr>
                        ))}
                        {/* Grand Total Row */}
                        <tr className="bg-gray-100 font-semibold sticky bottom-0">
                        <td colSpan="4" className="border border-gray-300 p-1 text-center bg-gray-100 text-xs">Grand Total :</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{(totals.salary/1000).toFixed(0)}k</td>
                        <td className="border border-gray-300 p-1 text-center bg-gray-100 text-xs">{totals.attendance.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-center bg-gray-100 text-xs">{totals.leaveWithPay.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.deduction.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.conveyance.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.ma.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.ta.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.da.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.othersCommission.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{(totals.salesAmount/1000).toFixed(0)}k</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.salesCommissionPercent.toFixed(1)}%</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{totals.salesCommission.toFixed(0)}</td>
                        <td className="border border-gray-300 p-1 text-right bg-gray-100 text-xs">{(totals.paidPayable/1000).toFixed(1)}k</td>
                        </tr>
                    </>
                    ) : (
                    <tr>
                        <td colSpan="17" className="border border-gray-300 p-8 text-center text-gray-500">
                        {searchTerm ? 'No matching records found' : 'No salary data available for the selected period'}
                        </td>
                    </tr>
                    )}
                </tbody>
                </table>
            </div>
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
                <option value="5">5</option>
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
    </div>
  )
}