'use client'

import { useState, useEffect } from 'react'

export default function SalaryPayment() {
  // Date utility functions
  const getTodayFormatted = () => {
    const today = new Date()
    const day = today.getDate().toString().padStart(2, '0')
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const year = today.getFullYear()
    return `${day}/${month}/${year}`
  }

  const formatDateForInput = (dateStr) => {
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }

  const formatDateForDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  }

  const getCurrentMonth = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return months[new Date().getMonth()]
  }

  const getCurrentYear = () => {
    return new Date().getFullYear().toString()
  }

  // Generate payment code
  const generatePaymentCode = () => {
    const prefix = 'EPAY'
    const timestamp = Date.now().toString().slice(-4)
    return `${prefix}${timestamp}`
  }

  const [formData, setFormData] = useState({
    paymentType: 'Basic Salary',
    paymentFromAccount: '',
    paymentToEmployee: '',
    paymentAmount: '',
    paymentCode: generatePaymentCode(),
    entryDate: getTodayFormatted(),
    payYear: getCurrentYear(),
    payMonth: getCurrentMonth(),
    salaryAccount: 'Salary',
    narration: ''
  })

  const [paymentEntries, setPaymentEntries] = useState([
    {
      id: 1,
      paymentCode: 'EPAY001',
      employee: 'John Doe',
      paymentDate: '01/08/2025',
      payFromAcc: 'Cash',
      payForMonth: 'August',
      year: '2025',
      payTotal: '25,000.00 BDT',
      narration: 'Monthly salary payment',
      paymentBy: 'Admin',
      status: 'Completed',
      createdAt: new Date('2025-08-01').getTime()
    },
    {
      id: 2,
      paymentCode: 'EPAY002',
      employee: 'Jane Smith',
      paymentDate: '02/08/2025',
      payFromAcc: 'Bank',
      payForMonth: 'August',
      year: '2025',
      payTotal: '30,000.00 BDT',
      narration: 'Monthly salary payment',
      paymentBy: 'Admin',
      status: 'Pending',
      createdAt: new Date('2025-08-02').getTime()
    }
  ])

  const [paymentCart, setPaymentCart] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(paymentEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // Update filtered entries when payment entries change
  useEffect(() => {
    handleSearch()
  }, [paymentEntries])

  const handleInputChange = (field, value) => {
    if (field === 'entryDate' && value.includes('-')) {
      // Handle date input change
      const formattedDate = formatDateForDisplay(value)
      setFormData(prev => ({
        ...prev,
        entryDate: formattedDate
      }))
      
      // Auto-update month and year
      const date = new Date(value)
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]
      setFormData(prev => ({
        ...prev,
        payMonth: months[date.getMonth()],
        payYear: date.getFullYear().toString()
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleAddToPayment = () => {
    if (!formData.paymentToEmployee || !formData.paymentAmount) {
      alert('Please select an employee and enter payment amount')
      return
    }

    const newCartItem = {
      id: Date.now(),
      employee: formData.paymentToEmployee,
      paymentType: formData.paymentType,
      amount: formData.paymentAmount,
      account: formData.salaryAccount
    }

    setPaymentCart(prev => [...prev, newCartItem])
    
    // Clear employee and amount
    setFormData(prev => ({
      ...prev,
      paymentToEmployee: '',
      paymentAmount: ''
    }))
  }

  const handleRemoveFromCart = (id) => {
    setPaymentCart(prev => prev.filter(item => item.id !== id))
  }

  const calculateCartTotal = () => {
    return paymentCart.reduce((total, item) => {
      return total + (parseFloat(item.amount) || 0)
    }, 0).toFixed(2)
  }

  const handleSave = () => {
    if (paymentCart.length === 0) {
      alert('Please add at least one payment to the cart')
      return
    }

    // Create new payment entries from cart
    const newEntries = paymentCart.map(item => ({
      id: Date.now() + Math.random(),
      paymentCode: generatePaymentCode(),
      employee: item.employee,
      paymentDate: formData.entryDate,
      payFromAcc: formData.paymentFromAccount,
      payForMonth: formData.payMonth,
      year: formData.payYear,
      payTotal: `${parseFloat(item.amount).toFixed(2)} BDT`,
      narration: formData.narration || 'Salary payment',
      paymentBy: 'Admin',
      status: 'Completed',
      createdAt: Date.now()
    }))

    setPaymentEntries(prev => [...prev, ...newEntries])
    setPaymentCart([])
    
    // Reset form
    setFormData(prev => ({
      ...prev,
      paymentFromAccount: '',
      paymentToEmployee: '',
      paymentAmount: '',
      paymentCode: generatePaymentCode(),
      narration: ''
    }))

    alert(`${newEntries.length} payment(s) saved successfully for ${formData.entryDate}!`)
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(paymentEntries)
    } else {
      const filtered = paymentEntries.filter(entry =>
        entry.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.paymentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.payFromAcc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.payForMonth.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.year.includes(searchTerm)
      )
      setFilteredEntries(filtered)
    }
    setCurrentPage(1)
  }

  // Clear search
  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(paymentEntries)
    setShowSearch(false)
    setCurrentPage(1)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Salary Payment Entry List</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; color: #0f766e; margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Fayullah Factory</div>
            <div class="report-title">Salary Payment Entry List</div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
            <div>Total Records: ${filteredEntries.length}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Payment Code</th>
                <th>Employee</th>
                <th>Payment Date</th>
                <th>Pay From Account</th>
                <th>Pay For Month</th>
                <th>Year</th>
                <th>Pay Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map(entry => `
                <tr>
                  <td>${entry.paymentCode}</td>
                  <td>${entry.employee}</td>
                  <td>${entry.paymentDate}</td>
                  <td>${entry.payFromAcc}</td>
                  <td>${entry.payForMonth}</td>
                  <td>${entry.year}</td>
                  <td>${entry.payTotal}</td>
                  <td>${entry.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="footer">
            Salary Payment Report - Fayullah Factory Management System
          </div>
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
      ['Fayullah Factory - Salary Payment Entry List'],
      [`Generated on: ${new Date().toLocaleString()}`],
      [`Total Records: ${filteredEntries.length}`],
      [],
      ['Payment Code', 'Employee', 'Payment Date', 'Pay From Account', 'Pay For Month', 'Year', 'Pay Total', 'Narration', 'Payment By', 'Status'],
      ...filteredEntries.map(entry => [
        entry.paymentCode,
        entry.employee,
        entry.paymentDate,
        entry.payFromAcc,
        entry.payForMonth,
        entry.year,
        entry.payTotal,
        entry.narration,
        entry.paymentBy,
        entry.status
      ])
    ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `salary_payment_entries_${formData.entryDate.replace(/\//g, '-')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = paymentEntries.filter(entry => entry.id !== id)
      setPaymentEntries(updatedEntries)
    }
  }

  // Quick date shortcuts
  const setToday = () => {
    const today = getTodayFormatted()
    setFormData(prev => ({
      ...prev,
      entryDate: today,
      payMonth: getCurrentMonth(),
      payYear: getCurrentYear()
    }))
  }

  const setYesterday = () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const formattedDate = formatDateForDisplay(yesterday.toISOString().split('T')[0])
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    setFormData(prev => ({
      ...prev,
      entryDate: formattedDate,
      payMonth: months[yesterday.getMonth()],
      payYear: yesterday.getFullYear().toString()
    }))
  }

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentEntries = filteredEntries.slice(startIndex, endIndex)

  // Generate years and months
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear - 2; i <= currentYear + 2; i++) {
    years.push(i.toString())
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const employees = [
    'John Doe', 'Jane Smith', 'Khawar Zahid', 'Ahmed Khan', 'Maria Rodriguez'
  ]

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
          <h2 className="font-medium text-lg">Salary Payment Entry</h2>
          <div className="text-right">
            <div className="text-sm font-semibold">Fayullah Factory</div>
            <div className="text-xs opacity-90">Payroll Management System</div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {/* Payment Type */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Payment Type</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.paymentType}
                onChange={(e) => handleInputChange('paymentType', e.target.value)}
              >
                <option value="Basic Salary">Basic Salary</option>
                <option value="Overtime">Overtime</option>
                <option value="Bonus">Bonus</option>
                <option value="Allowance">Allowance</option>
                <option value="Commission">Commission</option>
              </select>
            </div>

            {/* Payment From Account */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Payment From Account *</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.paymentFromAccount}
                onChange={(e) => handleInputChange('paymentFromAccount', e.target.value)}
              >
                <option value="">Select Account</option>
                <option value="Cash">Cash</option>
                <option value="Bank - Primary">Bank - Primary</option>
                <option value="Bank - Salary">Bank - Salary</option>
                <option value="Petty Cash">Petty Cash</option>
              </select>
            </div>

            {/* Payment Code */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Payment Code</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.paymentCode}
                  onChange={(e) => handleInputChange('paymentCode', e.target.value)}
                />
                <button 
                  onClick={() => handleInputChange('paymentCode', generatePaymentCode())}
                  className="bg-gray-200 text-gray-700 px-2 py-2 rounded text-xs hover:bg-gray-300 transition-colors"
                  title="Generate New Code"
                >
                  🔄
                </button>
              </div>
            </div>

            {/* Entry Date */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Entry Date</label>
              <input 
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formatDateForInput(formData.entryDate)}
                onChange={(e) => handleInputChange('entryDate', e.target.value)}
              />
            </div>

            {/* Payment To Employee */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Payment To Employee *</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.paymentToEmployee}
                onChange={(e) => handleInputChange('paymentToEmployee', e.target.value)}
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp} value={emp}>{emp}</option>
                ))}
              </select>
            </div>

            {/* Select Pay of Year */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Select Pay of Year</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.payYear}
                onChange={(e) => handleInputChange('payYear', e.target.value)}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Select Pay of Month */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Select Pay of Month</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.payMonth}
                onChange={(e) => handleInputChange('payMonth', e.target.value)}
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* Choose a salary Account */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Choose a Salary Account</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.salaryAccount}
                onChange={(e) => handleInputChange('salaryAccount', e.target.value)}
              >
                <option value="Salary">Salary</option>
                <option value="Allowance">Allowance</option>
                <option value="Bonus">Bonus</option>
                <option value="Overtime">Overtime</option>
              </select>
            </div>
          </div>

          {/* Date Shortcuts */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={setToday}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Today
            </button>
            <button 
              onClick={setYesterday}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Yesterday
            </button>
          </div>

          {/* Current Date Display */}
          <div className="text-sm text-gray-600 mb-4">
            Selected Date: <span className="font-medium">{formData.entryDate}</span>
            <span className="ml-4">Pay Period: <span className="font-medium">{formData.payMonth} {formData.payYear}</span></span>
          </div>

          {/* Payment Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Payment Amount *</label>
              <input 
                type="number"
                step="0.01"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.paymentAmount}
                onChange={(e) => handleInputChange('paymentAmount', e.target.value)}
                placeholder="Enter amount"
              />
              <p className="text-xs text-gray-500 mt-1">Press Enter or click Add to Payment to add to cart</p>
            </div>
            
            {/* Add to Payment Button */}
            <div className="flex items-end">
              <button 
                onClick={handleAddToPayment}
                className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
              >
                ADD TO PAYMENT
              </button>
            </div>
          </div>

          {/* Payment Cart */}
          {paymentCart.length > 0 && (
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Payment Cart</h4>
              <div className="space-y-2">
                {paymentCart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded border">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.employee}</div>
                      <div className="text-xs text-gray-500">{item.paymentType} - {item.account}</div>
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      {parseFloat(item.amount).toFixed(2)} BDT
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="ml-3 text-red-500 hover:text-red-700"
                      title="Remove from cart"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Amount:</span>
                  <span className="font-semibold text-lg text-green-600">{calculateCartTotal()} BDT</span>
                </div>
              </div>
            </div>
          )}

          {/* Narration */}
          <div className="mb-6">
            <label className="block text-xs text-gray-600 mb-1">Narration</label>
            <textarea 
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              rows="3"
              placeholder="Enter payment description or notes..."
              value={formData.narration}
              onChange={(e) => handleInputChange('narration', e.target.value)}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button 
              onClick={handleSave}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
              disabled={paymentCart.length === 0}
            >
              💾 SAVE PAYMENTS ({paymentCart.length})
            </button>
          </div>
        </div>
      </div>

      {/* Salary Payment Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Salary Payment Entry List ({filteredEntries.length} records)</h3>
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
                placeholder="Search by employee name, payment code, account, month, or year..."
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
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Payment Code</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Employee</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Payment Date</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Pay From Acc</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Pay For Month</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Year</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Pay Total</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Narration</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Payment By</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 text-xs font-medium text-teal-600">{entry.paymentCode}</td>
                      <td className="py-3 px-2 text-xs">{entry.employee}</td>
                      <td className="py-3 px-2 text-xs">{entry.paymentDate}</td>
                      <td className="py-3 px-2 text-xs">{entry.payFromAcc}</td>
                      <td className="py-3 px-2 text-xs">{entry.payForMonth}</td>
                      <td className="py-3 px-2 text-xs">{entry.year}</td>
                      <td className="py-3 px-2 text-xs font-medium">{entry.payTotal}</td>
                      <td className="py-3 px-2 text-xs max-w-32 truncate" title={entry.narration}>{entry.narration}</td>
                      <td className="py-3 px-2 text-xs">{entry.paymentBy}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          entry.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className="flex gap-1 justify-center">
                          <button 
                            className="text-blue-600 hover:text-blue-800 text-xs p-1"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-red-600 hover:text-red-800 text-xs p-1"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="text-center py-8 text-gray-500">
                      {searchTerm ? 'No matching records found' : 'No payment entries found'}
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
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span>
                {filteredEntries.length === 0 
                  ? '0-0 of 0' 
                  : `${startIndex + 1}-${Math.min(endIndex, filteredEntries.length)} of ${filteredEntries.length}`
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