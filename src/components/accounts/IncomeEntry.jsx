'use client'

import { useState } from 'react'

export default function IncomeEntry() {
  const [formData, setFormData] = useState({
    incomeHead: '',
    receiptIntoAccount: '',
    incomeAmount: '',
    incomeCode: 'RCV-1',
    incomeDate: '19/08/2025',
    narration: ''
  })

  const [incomeEntries, setIncomeEntries] = useState([])
  const [incomeItems, setIncomeItems] = useState([])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(incomeEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddToIncome = () => {
    if (formData.incomeHead && formData.receiptIntoAccount && formData.incomeAmount) {
      const newItem = {
        id: Date.now(),
        sl: incomeItems.length + 1,
        account: `${formData.incomeHead} - ${formData.receiptIntoAccount}`,
        incomeAmount: formData.incomeAmount
      }
      
      setIncomeItems(prev => [...prev, newItem])
      
      // Clear form fields for adding more items
      setFormData(prev => ({
        ...prev,
        incomeHead: '',
        receiptIntoAccount: '',
        incomeAmount: ''
      }))
      
      console.log('Adding to income:', newItem)
    }
  }

  const handleSaveIncome = () => {
    if (incomeItems.length > 0) {
      const totalAmount = incomeItems.reduce((sum, item) => sum + parseFloat(item.incomeAmount || 0), 0)
      
      const newEntry = {
        id: Date.now(),
        sl: incomeEntries.length + 1,
        incomeCode: formData.incomeCode,
        incomeDate: formData.incomeDate,
        receivedInto: incomeItems.map(item => item.account).join(', '),
        incomeTotal: totalAmount.toFixed(2),
        narration: formData.narration,
        createdBy: 'Admin',
        items: [...incomeItems]
      }
      
      setIncomeEntries(prev => [...prev, newEntry])
      setFilteredEntries(prev => [...prev, newEntry])
      
      // Reset form and items
      setFormData({
        incomeHead: '',
        receiptIntoAccount: '',
        incomeAmount: '',
        incomeCode: `RCV-${Math.floor(Math.random() * 1000)}`,
        incomeDate: '19/08/2025',
        narration: ''
      })
      setIncomeItems([])
      
      console.log('Saving income entry:', newEntry)
    }
  }

  const handleReset = () => {
    setFormData({
      incomeHead: '',
      receiptIntoAccount: '',
      incomeAmount: '',
      incomeCode: 'RCV-1',
      incomeDate: '19/08/2025',
      narration: ''
    })
    setIncomeItems([])
  }

  const handleRemoveItem = (id) => {
    setIncomeItems(prev => prev.filter(item => item.id !== id))
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(incomeEntries)
    } else {
      const filtered = incomeEntries.filter(entry =>
        entry.incomeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.receivedInto.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEntries(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(incomeEntries)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Income Entry List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #7c3aed; }
          </style>
        </head>
        <body>
          <h1>Income Entry List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Income Code</th>
                <th>Income Date</th>
                <th>Received Into</th>
                <th>Income Total</th>
                <th>Narration</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map((entry, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${entry.incomeCode}</td>
                  <td>${entry.incomeDate}</td>
                  <td>${entry.receivedInto}</td>
                  <td>₹ ${entry.incomeTotal}</td>
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
      ['SL', 'Income Code', 'Income Date', 'Received Into', 'Income Total', 'Narration', 'Created By'],
      ...filteredEntries.map((entry, index) => [
        index + 1,
        entry.incomeCode,
        entry.incomeDate,
        entry.receivedInto,
        `₹ ${entry.incomeTotal}`,
        entry.narration,
        entry.createdBy
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'income_entries.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = incomeEntries.filter(entry => entry.id !== id)
      setIncomeEntries(updatedEntries)
      setFilteredEntries(updatedEntries.filter(entry =>
        searchTerm === '' ||
        entry.incomeCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.receivedInto.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="font-medium text-lg">Income Entry</h2>
        </div>
        
        <div className="p-6">
          {/* Main Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Income Head */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Income Head</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.incomeHead}
                  onChange={(e) => handleInputChange('incomeHead', e.target.value)}
                >
                  <option value="">Income Head</option>
                  <option value="Sales Revenue">Sales Revenue</option>
                  <option value="Service Income">Service Income</option>
                  <option value="Interest Income">Interest Income</option>
                  <option value="Rental Income">Rental Income</option>
                  <option value="Other Income">Other Income</option>
                </select>
              </div>

              {/* Receipt Into Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Into Account</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.receiptIntoAccount}
                  onChange={(e) => handleInputChange('receiptIntoAccount', e.target.value)}
                >
                  <option value="">Receipt Into Account</option>
                  <option value="Cash Account">Cash Account</option>
                  <option value="Bank Account 1">Bank Account 1</option>
                  <option value="Bank Account 2">Bank Account 2</option>
                  <option value="Savings Account">Savings Account</option>
                </select>
              </div>

              {/* Income Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Income Amount</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.incomeAmount}
                  onChange={(e) => handleInputChange('incomeAmount', e.target.value)}
                  placeholder="Income Amount"
                />
                <p className="text-xs text-gray-500 mt-1">Press Enter Key to income</p>
              </div>

              {/* Add to Income Button */}
              <div>
                <button 
                  onClick={handleAddToIncome}
                  className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  ADD TO INCOME
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Income Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Income Code</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.incomeCode}
                  onChange={(e) => handleInputChange('incomeCode', e.target.value)}
                />
              </div>

              {/* Income Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Income Date</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.incomeDate}
                    onChange={(e) => handleInputChange('incomeDate', e.target.value)}
                  />
                  <span className="absolute right-2 top-2 text-gray-400">📅</span>
                </div>
              </div>

              {/* Income Table */}
              <div className="border rounded p-3">
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-gray-700 mb-2">
                  <div>SL</div>
                  <div>Account</div>
                  <div>Income Amount</div>
                  <div>Actions</div>
                </div>
                
                {incomeItems.length > 0 ? (
                  <div className="space-y-1">
                    {incomeItems.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-3 gap-2 text-xs py-1 border-t">
                        <div>{index + 1}</div>
                        <div>{item.account}</div>
                        <div>₹ {item.incomeAmount}</div>
                        <div>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-600 hover:text-red-800 text-xs"
                            title="Remove"
                          >
                            ❌
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm border-t">
                    No items added yet
                  </div>
                )}
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
              onClick={handleSaveIncome}
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

      {/* Income Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Income Entry List</h3>
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
                placeholder="Search by income code, narration or account..."
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
              <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-4">
                <div>SL</div>
                <div>Income Code</div>
                <div>Income Date</div>
                <div>Received Into</div>
                <div>Income Total</div>
                <div>Narration</div>
                <div>Created By</div>
                <div>Actions</div>
              </div>

              {/* Table Rows */}
              {currentEntries.length > 0 ? (
                currentEntries.map((entry, index) => (
                  <div key={entry.id} className="grid grid-cols-7 gap-2 text-xs py-2 border-b hover:bg-gray-50">
                    <div>{startIndex + index + 1}</div>
                    <div className="font-medium text-teal-600">{entry.incomeCode}</div>
                    <div>{entry.incomeDate}</div>
                    <div>{entry.receivedInto}</div>
                    <div className="font-medium">₹ {entry.incomeTotal}</div>
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