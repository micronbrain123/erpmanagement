'use client'

import { useState } from 'react'

export default function ExpenseRecognitionEntry() {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    remark: '',
    recognitionDate: '19/08/2025',
    narration: ''
  })

  const [recognitionEntries, setRecognitionEntries] = useState([])
  const [recognitionItems, setRecognitionItems] = useState([])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(recognitionEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddToRecognition = () => {
    if (formData.description && formData.amount) {
      const newItem = {
        id: Date.now(),
        sl: recognitionItems.length + 1,
        description: formData.description,
        recognitionAmount: formData.amount,
        remark: formData.remark
      }
      
      setRecognitionItems(prev => [...prev, newItem])
      
      // Clear form fields for adding more items
      setFormData(prev => ({
        ...prev,
        description: '',
        amount: '',
        remark: ''
      }))
      
      console.log('Adding to recognition:', newItem)
    }
  }

  const handleSaveRecognition = () => {
    if (recognitionItems.length > 0) {
      const totalAmount = recognitionItems.reduce((sum, item) => sum + parseFloat(item.recognitionAmount || 0), 0)
      
      const newEntry = {
        id: Date.now(),
        sl: recognitionEntries.length + 1,
        recognitionDate: formData.recognitionDate,
        recognitionTotal: totalAmount.toFixed(2),
        narration: formData.narration,
        createdBy: 'Admin',
        items: [...recognitionItems]
      }
      
      setRecognitionEntries(prev => [...prev, newEntry])
      setFilteredEntries(prev => [...prev, newEntry])
      
      // Reset form and items
      setFormData({
        description: '',
        amount: '',
        remark: '',
        recognitionDate: '19/08/2025',
        narration: ''
      })
      setRecognitionItems([])
      
      console.log('Saving recognition entry:', newEntry)
    }
  }

  const handleReset = () => {
    setFormData({
      description: '',
      amount: '',
      remark: '',
      recognitionDate: '19/08/2025',
      narration: ''
    })
    setRecognitionItems([])
  }

  const handleRemoveItem = (id) => {
    setRecognitionItems(prev => prev.filter(item => item.id !== id))
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(recognitionEntries)
    } else {
      const filtered = recognitionEntries.filter(entry =>
        entry.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.recognitionDate.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEntries(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(recognitionEntries)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Recognition Entry List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #7c3aed; }
          </style>
        </head>
        <body>
          <h1>Recognition Entry List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Recognition Date</th>
                <th>Recognition Total</th>
                <th>Narration</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map((entry, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${entry.recognitionDate}</td>
                  <td>₹ ${entry.recognitionTotal}</td>
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
      ['SL', 'Recognition Date', 'Recognition Total', 'Narration', 'Created By'],
      ...filteredEntries.map((entry, index) => [
        index + 1,
        entry.recognitionDate,
        `₹ ${entry.recognitionTotal}`,
        entry.narration,
        entry.createdBy
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'recognition_entries.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = recognitionEntries.filter(entry => entry.id !== id)
      setRecognitionEntries(updatedEntries)
      setFilteredEntries(updatedEntries.filter(entry =>
        searchTerm === '' ||
        entry.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.recognitionDate.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="font-medium text-lg">Expense Recognition Entry</h2>
        </div>
        
        <div className="p-6">
          {/* Main Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="descriptionription"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="Amount"
                />
              </div>

              {/* Remark */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Remark</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.remark}
                  onChange={(e) => handleInputChange('remark', e.target.value)}
                  placeholder="Remark"
                />
                <p className="text-xs text-gray-500 mt-1">Press Enter Key to Recognition</p>
              </div>

              {/* Add to Recognition Button */}
              <div>
                <button 
                  onClick={handleAddToRecognition}
                  className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  ADD TO RECOGNITION
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Recognition Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recognition Date</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.recognitionDate}
                    onChange={(e) => handleInputChange('recognitionDate', e.target.value)}
                  />
                  <span className="absolute right-2 top-2 text-gray-400">📅</span>
                </div>
              </div>

              {/* Recognition Table */}
              <div className="border rounded p-3">
                <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-gray-700 mb-2">
                  <div>SL</div>
                  <div>Description</div>
                  <div>Recognition Amount</div>
                  <div>Remark</div>
                  <div>Actions</div>
                </div>
                
                {recognitionItems.length > 0 ? (
                  <div className="space-y-1">
                    {recognitionItems.map((item, index) => (
                      <div key={item.id} className="grid grid-cols-4 gap-2 text-xs py-1 border-t">
                        <div>{index + 1}</div>
                        <div>{item.description}</div>
                        <div>₹ {item.recognitionAmount}</div>
                        <div>{item.remark}</div>
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
              onClick={handleSaveRecognition}
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

      {/* Recognition Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recognition Entry List</h3>
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
                placeholder="Search by narration or recognition date..."
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
              <div className="grid grid-cols-6 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-4">
                <div>SL</div>
                <div>Recognition Date</div>
                <div>Recognition Total</div>
                <div>Narration</div>
                <div>Created By</div>
                <div>Actions</div>
              </div>

              {/* Table Rows */}
              {currentEntries.length > 0 ? (
                currentEntries.map((entry, index) => (
                  <div key={entry.id} className="grid grid-cols-6 gap-2 text-xs py-2 border-b hover:bg-gray-50">
                    <div>{startIndex + index + 1}</div>
                    <div>{entry.recognitionDate}</div>
                    <div className="font-medium">₹ {entry.recognitionTotal}</div>
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