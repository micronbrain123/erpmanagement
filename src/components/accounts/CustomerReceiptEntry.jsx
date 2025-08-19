'use client'

import { useState } from 'react'

export default function CustomerReceiptEntry() {
  const [formData, setFormData] = useState({
    selectCustomer: '',
    receiptCode: 'RCV-24',
    receiptDate: '19/08/2025',
    receivedCashBankAccount: '',
    receivedAmount: '',
    anyDiscount: false,
    narration: '',
    smsToMobile: false
  })

  const [receiptEntries, setReceiptEntries] = useState([])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(receiptEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddToReceipt = () => {
    // Add current entry to receipt list
    console.log('Adding to receipt:', formData)
  }

  const handleSaveReceipt = () => {
    const newEntry = {
      id: Date.now(),
      receiptCode: formData.receiptCode,
      receiptDate: formData.receiptDate,
      customer: formData.selectCustomer,
      totalDiscount: formData.anyDiscount ? '0.00' : '0.00',
      receivedTotal: formData.receivedAmount || '0.00',
      narration: formData.narration,
      createdBy: 'Admin'
    }
    
    setReceiptEntries(prev => [...prev, newEntry])
    setFilteredEntries(prev => [...prev, newEntry])
    
    // Reset form
    setFormData(prev => ({
      ...prev,
      selectCustomer: '',
      receivedAmount: '',
      narration: '',
      receiptCode: `RCV-${Math.floor(Math.random() * 1000)}`
    }))
    
    console.log('Saving receipt entry:', newEntry)
  }

  const handleReset = () => {
    setFormData({
      selectCustomer: '',
      receiptCode: 'RCV-24',
      receiptDate: '19/08/2025',
      receivedCashBankAccount: '',
      receivedAmount: '',
      anyDiscount: false,
      narration: '',
      smsToMobile: false
    })
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(receiptEntries)
    } else {
      const filtered = receiptEntries.filter(entry =>
        entry.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.receiptCode.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEntries(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(receiptEntries)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Receipt Entry List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #0f766e; }
          </style>
        </head>
        <body>
          <h1>Receipt Entry List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Receipt Code</th>
                <th>Receipt Date</th>
                <th>Customer</th>
                <th>Total Discount</th>
                <th>Received Total</th>
                <th>Narration</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map((entry, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${entry.receiptCode}</td>
                  <td>${entry.receiptDate}</td>
                  <td>${entry.customer}</td>
                  <td>₹ ${entry.totalDiscount}</td>
                  <td>₹ ${entry.receivedTotal}</td>
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
      ['SL', 'Receipt Code', 'Receipt Date', 'Customer', 'Total Discount', 'Received Total', 'Narration', 'Created By'],
      ...filteredEntries.map((entry, index) => [
        index + 1,
        entry.receiptCode,
        entry.receiptDate,
        entry.customer,
        `₹ ${entry.totalDiscount}`,
        `₹ ${entry.receivedTotal}`,
        entry.narration,
        entry.createdBy
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'receipt_entries.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = receiptEntries.filter(entry => entry.id !== id)
      setReceiptEntries(updatedEntries)
      setFilteredEntries(updatedEntries.filter(entry =>
        searchTerm === '' ||
        entry.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.receiptCode.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="font-medium text-lg">Customer Receipt Entry</h2>
        </div>
        
        <div className="p-6">
          {/* Main Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Select Customer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Customer</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.selectCustomer}
                  onChange={(e) => handleInputChange('selectCustomer', e.target.value)}
                >
                  <option value="">Select Customer</option>
                  <option value="Customer A">Customer A</option>
                  <option value="Customer B">Customer B</option>
                  <option value="Customer C">Customer C</option>
                </select>
              </div>

              {/* Received Cash/Bank Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Received Cash/ Bank Account</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.receivedCashBankAccount}
                  onChange={(e) => handleInputChange('receivedCashBankAccount', e.target.value)}
                >
                  <option value="">Select Account</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank Account 1">Bank Account 1</option>
                  <option value="Bank Account 2">Bank Account 2</option>
                </select>
              </div>

              {/* Received Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Received Amount</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.receivedAmount}
                  onChange={(e) => handleInputChange('receivedAmount', e.target.value)}
                  placeholder="Enter amount"
                />
              </div>

              {/* Any Discount */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.anyDiscount}
                    onChange={(e) => handleInputChange('anyDiscount', e.target.checked)}
                    className="text-teal-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Any Discount ?</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">Press Enter Key to Receipt Cart</p>
              </div>

              {/* Add to Receipt Button */}
              <div>
                <button 
                  onClick={handleAddToReceipt}
                  className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  ADD TO RECEIPT
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Receipt Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Code</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.receiptCode}
                  onChange={(e) => handleInputChange('receiptCode', e.target.value)}
                />
              </div>

              {/* Receipt Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Date</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.receiptDate}
                    onChange={(e) => handleInputChange('receiptDate', e.target.value)}
                  />
                  <span className="absolute right-2 top-2 text-gray-400">📅</span>
                </div>
              </div>

              {/* Receipt Table Headers */}
              <div className="border rounded p-3">
                <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-700 mb-2">
                  <div>SL</div>
                  <div>Received Into</div>
                  <div>From Customer</div>
                  <div>EMI No</div>
                  <div>Voucher</div>
                  <div>Amount</div>
                  <div>Discount</div>
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

          {/* SMS to Mobile */}
          <div className="mb-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.smsToMobile}
                onChange={(e) => handleInputChange('smsToMobile', e.target.checked)}
                className="text-teal-600"
              />
              <span className="text-sm text-gray-700">Sms to Mobile?</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleSaveReceipt}
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

      {/* Receipt Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Receipt Entry List</h3>
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
                placeholder="Search by customer name or receipt code..."
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
              <div className="grid grid-cols-8 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-4">
                <div>SL</div>
                <div>Receipt Code</div>
                <div>Receipt Date</div>
                <div>Customer</div>
                <div>Total Discount</div>
                <div>Received Total</div>
                <div>Narration</div>
                <div>Created By</div>
                <div>Actions</div>
              </div>

              {/* Table Rows */}
              {currentEntries.length > 0 ? (
                currentEntries.map((entry, index) => (
                  <div key={entry.id} className="grid grid-cols-8 gap-2 text-xs py-2 border-b hover:bg-gray-50">
                    <div>{startIndex + index + 1}</div>
                    <div className="font-medium text-teal-600">{entry.receiptCode}</div>
                    <div>{entry.receiptDate}</div>
                    <div>{entry.customer}</div>
                    <div className="font-medium">₹ {entry.totalDiscount}</div>
                    <div className="font-medium">₹ {entry.receivedTotal}</div>
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