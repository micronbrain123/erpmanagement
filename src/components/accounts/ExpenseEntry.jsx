'use client'

import { useState } from 'react'

export default function ExpenseEntry() {
  const [formData, setFormData] = useState({
    expenseHead: '',
    selectCategory: '',
    expenseAmount: '',
    payFromAccount: '',
    selectEmployee: '',
    payTo: '',
    expenseDate: '19/08/2025',
    expenseCode: 'PAY-28',
    narration: ''
  })

  const [expenseEntries, setExpenseEntries] = useState([])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(expenseEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddToExpense = () => {
    // Add current entry to expense list
    console.log('Adding to expense:', formData)
  }

  const handleSaveExpense = () => {
    const newEntry = {
      id: Date.now(),
      expenseCode: formData.expenseCode,
      expenseDate: formData.expenseDate,
      purposes: formData.expenseHead,
      paymentFrom: formData.payFromAccount,
      expenseTotal: formData.expenseAmount || '0.00',
      payTo: formData.payTo,
      narration: formData.narration,
      createdBy: 'Admin'
    }
    
    setExpenseEntries(prev => [...prev, newEntry])
    setFilteredEntries(prev => [...prev, newEntry])
    
    // Reset form
    setFormData(prev => ({
      ...prev,
      expenseHead: '',
      selectCategory: '',
      expenseAmount: '',
      payTo: '',
      narration: '',
      expenseCode: `PAY-${Math.floor(Math.random() * 1000)}`
    }))
    
    console.log('Saving expense entry:', newEntry)
  }

  const handleReset = () => {
    setFormData({
      expenseHead: '',
      selectCategory: '',
      expenseAmount: '',
      payFromAccount: '',
      selectEmployee: '',
      payTo: '',
      expenseDate: '19/08/2025',
      expenseCode: 'PAY-28',
      narration: ''
    })
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(expenseEntries)
    } else {
      const filtered = expenseEntries.filter(entry =>
        entry.purposes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.expenseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.payTo.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEntries(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(expenseEntries)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Expense Entry List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #7c3aed; }
          </style>
        </head>
        <body>
          <h1>Expense Entry List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Expense Code</th>
                <th>Expense Date</th>
                <th>Purposes</th>
                <th>Payment From</th>
                <th>Expense Total</th>
                <th>Pay To</th>
                <th>Narration</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map((entry, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${entry.expenseCode}</td>
                  <td>${entry.expenseDate}</td>
                  <td>${entry.purposes}</td>
                  <td>${entry.paymentFrom}</td>
                  <td>₹ ${entry.expenseTotal}</td>
                  <td>${entry.payTo}</td>
                  <td>${entry.narration}</td>
                  <td>${entry.createdBy}</td>
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
      ['SL', 'Expense Code', 'Expense Date', 'Purposes', 'Payment From', 'Expense Total', 'Pay To', 'Narration', 'Created By'],
      ...filteredEntries.map((entry, index) => [
        index + 1,
        entry.expenseCode,
        entry.expenseDate,
        entry.purposes,
        entry.paymentFrom,
        `₹ ${entry.expenseTotal}`,
        entry.payTo,
        entry.narration,
        entry.createdBy
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'expense_entries.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = expenseEntries.filter(entry => entry.id !== id)
      setExpenseEntries(updatedEntries)
      setFilteredEntries(updatedEntries.filter(entry =>
        searchTerm === '' ||
        entry.purposes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.expenseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.payTo.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentEntries = filteredEntries.slice(startIndex, endIndex)

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
          <h2 className="font-medium text-lg">Expense Entry</h2>
        </div>
        
        <div className="p-6">
          {/* Main Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Expense Head */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expense Head</label>
                <div className="relative">
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.expenseHead}
                    onChange={(e) => handleInputChange('expenseHead', e.target.value)}
                  >
                    <option value="">Expense Head</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Travel & Transport">Travel & Transport</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Professional Services">Professional Services</option>
                  </select>
                  <span className="absolute right-8 top-2 text-green-500 text-lg">+</span>
                </div>
              </div>

              {/* Select Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Category (Optional)</label>
                <div className="relative">
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.selectCategory}
                    onChange={(e) => handleInputChange('selectCategory', e.target.value)}
                  >
                    <option value="">Select Category (Optional)</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Operational">Operational</option>
                    <option value="Marketing">Marketing</option>
                    <option value="IT & Technology">IT & Technology</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Finance">Finance</option>
                  </select>
                  <span className="absolute right-8 top-2 text-green-500 text-lg">+</span>
                </div>
              </div>

              {/* Expense Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expense Amount</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.expenseAmount}
                  onChange={(e) => handleInputChange('expenseAmount', e.target.value)}
                  placeholder="Expense Amount"
                />
                <p className="text-xs text-gray-500 mt-1">Press Enter Key to expense</p>
              </div>

              {/* Add to Expense Button */}
              <div>
                <button 
                  onClick={handleAddToExpense}
                  className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  ADD TO EXPENSE
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Pay From Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pay From Account</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.payFromAccount}
                  onChange={(e) => handleInputChange('payFromAccount', e.target.value)}
                >
                  <option value="">Pay From Account</option>
                  <option value="Cash">Cash</option>
                  <option value="SBI Current Account">SBI Current Account</option>
                  <option value="HDFC Savings Account">HDFC Savings Account</option>
                  <option value="ICICI Business Account">ICICI Business Account</option>
                  <option value="Axis Bank Account">Axis Bank Account</option>
                </select>
              </div>

              {/* Employee and Pay To Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Select Employee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Employee</label>
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.selectEmployee}
                    onChange={(e) => handleInputChange('selectEmployee', e.target.value)}
                  >
                    <option value="">Select Employee</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Mike Johnson">Mike Johnson</option>
                    <option value="Sarah Wilson">Sarah Wilson</option>
                    <option value="David Brown">David Brown</option>
                  </select>
                </div>

                {/* Pay To */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pay To</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.payTo}
                    onChange={(e) => handleInputChange('payTo', e.target.value)}
                    placeholder="Pay To"
                  />
                </div>
              </div>

              {/* Expense Date and Code Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Expense Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expense Date</label>
                  <div className="relative">
                    <input 
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={formData.expenseDate}
                      onChange={(e) => handleInputChange('expenseDate', e.target.value)}
                    />
                    <span className="absolute right-2 top-2 text-gray-400">📅</span>
                  </div>
                </div>

                {/* Expense Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expense Code</label>
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.expenseCode}
                    onChange={(e) => handleInputChange('expenseCode', e.target.value)}
                  />
                </div>
              </div>

              {/* Expense Table Headers */}
              <div className="border rounded p-3">
                <div className="grid grid-cols-5 gap-2 text-xs font-semibold text-gray-700 mb-2">
                  <div>SL Account</div>
                  <div>Category</div>
                  <div>Expense Amount</div>
                  <div>Actions</div>
                </div>
                
                <div className="text-center py-4 text-gray-500 text-sm border-t">
                  No items added yet
                </div>
              </div>
            </div>
          </div>

          {/* Narration */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Narration...</label>
            <textarea 
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              rows="3"
              placeholder="Narration..."
              value={formData.narration}
              onChange={(e) => handleInputChange('narration', e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleSaveExpense}
              className="bg-teal-600 text-white px-8 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              💾 SAVE
            </button>
            <button 
              onClick={handleReset}
              className="bg-gray-500 text-white px-8 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Expense Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Expense Entry List</h3>
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
                placeholder="Search by purpose, expense code, or pay to..."
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

          {/* Table Headers */}
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-9 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-4">
                <div>SL</div>
                <div>Expense Code</div>
                <div>Expense Date</div>
                <div>Purposes</div>
                <div>Payment From</div>
                <div>Expense Total</div>
                <div>Pay To</div>
                <div>Narration</div>
                <div>Created By</div>
                <div>Actions</div>
              </div>

              {/* Table Rows */}
              {currentEntries.length > 0 ? (
                currentEntries.map((entry, index) => (
                  <div key={entry.id} className="grid grid-cols-9 gap-2 text-xs py-2 border-b hover:bg-gray-50">
                    <div>{startIndex + index + 1}</div>
                    <div className="font-medium text-teal-600">{entry.expenseCode}</div>
                    <div>{entry.expenseDate}</div>
                    <div>{entry.purposes}</div>
                    <div>{entry.paymentFrom}</div>
                    <div className="font-medium">₹ {entry.expenseTotal}</div>
                    <div>{entry.payTo}</div>
                    <div>{entry.narration}</div>
                    <div>{entry.createdBy}</div>
                    <div className="flex gap-1">
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-xs"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="text-red-600 hover:text-red-800 text-xs"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {searchTerm ? 'No matching records found' : 'Sorry, no matching records found'}
                </div>
              )}
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