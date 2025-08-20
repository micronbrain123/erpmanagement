'use client'

import { useState } from 'react'

export default function JournalDoubleEntry() {
  const [formData, setFormData] = useState({
    chooseAccount: '',
    journalCode: '',
    debitAmount: '',
    creditAmount: '',
    journalDate: '19/08/2025',
    narration: ''
  })

  const [journalEntries, setJournalEntries] = useState([])
  const [tempEntries, setTempEntries] = useState([])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(journalEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddToJournal = () => {
    if (formData.chooseAccount && (formData.debitAmount || formData.creditAmount)) {
      const newTempEntry = {
        id: Date.now(),
        account: formData.chooseAccount,
        debitAmount: formData.debitAmount,
        creditAmount: formData.creditAmount,
        narration: formData.narration
      }
      
      setTempEntries(prev => [...prev, newTempEntry])
      
      // Reset only the account and amounts, keep journal code, date and narration
      setFormData(prev => ({
        ...prev,
        chooseAccount: '',
        debitAmount: '',
        creditAmount: ''
      }))
    }
  }

  const handleSaveJournal = () => {
    if (tempEntries.length >= 2 && formData.journalCode) {
      const totalDebit = tempEntries.reduce((sum, entry) => sum + (parseFloat(entry.debitAmount) || 0), 0)
      const totalCredit = tempEntries.reduce((sum, entry) => sum + (parseFloat(entry.creditAmount) || 0), 0)
      
      if (Math.abs(totalDebit - totalCredit) < 0.01) { // Allow for small floating point differences
        const newJournalEntry = {
          id: Date.now(),
          sl: journalEntries.length + 1,
          journalCode: formData.journalCode,
          journalDate: formData.journalDate,
          debitTotal: totalDebit.toFixed(2),
          creditTotal: totalCredit.toFixed(2),
          narration: formData.narration,
          entries: [...tempEntries],
          createdBy: 'Admin'
        }
        
        setJournalEntries(prev => [...prev, newJournalEntry])
        setFilteredEntries(prev => [...prev, newJournalEntry])
        
        // Reset form and temp entries
        setFormData({
          chooseAccount: '',
          journalCode: `JRN-${Math.floor(Math.random() * 1000)}`,
          debitAmount: '',
          creditAmount: '',
          journalDate: '19/08/2025',
          narration: ''
        })
        setTempEntries([])
        
        console.log('Saving journal entry:', newJournalEntry)
      } else {
        alert('Debit and Credit amounts must be equal!')
      }
    } else {
      alert('Please add at least 2 entries and provide a journal code!')
    }
  }

  const handleReset = () => {
    setFormData({
      chooseAccount: '',
      journalCode: '',
      debitAmount: '',
      creditAmount: '',
      journalDate: '19/08/2025',
      narration: ''
    })
    setTempEntries([])
  }

  const handleRemoveTempEntry = (id) => {
    setTempEntries(prev => prev.filter(entry => entry.id !== id))
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(journalEntries)
    } else {
      const filtered = journalEntries.filter(entry =>
        entry.journalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.entries.some(e => e.account.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredEntries(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(journalEntries)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Journal Entry List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #7c3aed; }
          </style>
        </head>
        <body>
          <h1>Journal Entry List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Journal Code</th>
                <th>Journal Date</th>
                <th>Debit Total</th>
                <th>Credit Total</th>
                <th>Narration</th>
                <th>Created By</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map((entry, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${entry.journalCode}</td>
                  <td>${entry.journalDate}</td>
                  <td>₹ ${entry.debitTotal}</td>
                  <td>₹ ${entry.creditTotal}</td>
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
      ['SL', 'Journal Code', 'Journal Date', 'Debit Total', 'Credit Total', 'Narration', 'Created By'],
      ...filteredEntries.map((entry, index) => [
        index + 1,
        entry.journalCode,
        entry.journalDate,
        `₹ ${entry.debitTotal}`,
        `₹ ${entry.creditTotal}`,
        entry.narration,
        entry.createdBy
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'journal_entries.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = journalEntries.filter(entry => entry.id !== id)
      setJournalEntries(updatedEntries)
      setFilteredEntries(updatedEntries.filter(entry =>
        searchTerm === '' ||
        entry.journalCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.narration.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.entries.some(e => e.account.toLowerCase().includes(searchTerm.toLowerCase()))
      ))
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredEntries.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentEntries = filteredEntries.slice(startIndex, endIndex)

  // Calculate totals for temp entries
  const tempDebitTotal = tempEntries.reduce((sum, entry) => sum + (parseFloat(entry.debitAmount) || 0), 0)
  const tempCreditTotal = tempEntries.reduce((sum, entry) => sum + (parseFloat(entry.creditAmount) || 0), 0)

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
          <h2 className="font-medium text-lg">Journal / Double Entry</h2>
        </div>
        
        <div className="p-6">
          {/* Main Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Choose Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Account (By Search)</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.chooseAccount}
                  onChange={(e) => handleInputChange('chooseAccount', e.target.value)}
                >
                  <option value="">Choose Account (By Search)</option>
                  <option value="Cash Account">Cash Account</option>
                  <option value="Bank Account">Bank Account</option>
                  <option value="Sales Account">Sales Account</option>
                  <option value="Purchase Account">Purchase Account</option>
                  <option value="Rent Account">Rent Account</option>
                  <option value="Salary Account">Salary Account</option>
                  <option value="Office Expenses">Office Expenses</option>
                  <option value="Equipment Account">Equipment Account</option>
                </select>
              </div>

              {/* Journal Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Journal Code</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.journalCode}
                  onChange={(e) => handleInputChange('journalCode', e.target.value)}
                  placeholder="Journal Code"
                />
              </div>

              {/* Debit Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Debit Amount</label>
                <input 
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.debitAmount}
                  onChange={(e) => handleInputChange('debitAmount', e.target.value)}
                  placeholder="Debit Amount"
                />
              </div>

              {/* Credit Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Credit Amount</label>
                <input 
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.creditAmount}
                  onChange={(e) => handleInputChange('creditAmount', e.target.value)}
                  placeholder="Credit Amount"
                />
              </div>

              {/* Add to Journal Button */}
              <div className="pt-4">
                <button 
                  onClick={handleAddToJournal}
                  className="bg-gray-600 text-white px-6 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  ADD TO JOURNAL
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">
                Press Enter Key to Journal
              </div>
            </div>

            {/* Middle Column - Current Journal Entries */}
            <div>
              <div className="border rounded p-4">
                <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-2">
                  <div>SL</div>
                  <div>Account</div>
                  <div>Debit Amount</div>
                  <div>Credit Amount</div>
                  <div>Actions</div>
                </div>
                
                {tempEntries.length > 0 ? (
                  <>
                    {tempEntries.map((entry, index) => (
                      <div key={entry.id} className="grid grid-cols-4 gap-2 text-xs py-1 border-b">
                        <div>{index + 1}</div>
                        <div>{entry.account}</div>
                        <div>{entry.debitAmount ? `₹${entry.debitAmount}` : '-'}</div>
                        <div>{entry.creditAmount ? `₹${entry.creditAmount}` : '-'}</div>
                        <div>
                          <button 
                            onClick={() => handleRemoveTempEntry(entry.id)}
                            className="text-red-600 hover:text-red-800 text-xs"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="grid grid-cols-4 gap-2 text-xs py-2 font-semibold border-t">
                      <div></div>
                      <div>Total:</div>
                      <div>₹{tempDebitTotal.toFixed(2)}</div>
                      <div>₹{tempCreditTotal.toFixed(2)}</div>
                    </div>
                    <div className="text-center mt-2">
                      <span className={`text-xs ${Math.abs(tempDebitTotal - tempCreditTotal) < 0.01 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.abs(tempDebitTotal - tempCreditTotal) < 0.01 ? 'Balanced ✓' : 'Not Balanced ✗'}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No entries added yet
                  </div>
                )}
              </div>

              {/* Narration */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Narration...</label>
                <textarea 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 h-24"
                  placeholder="Narration..."
                  value={formData.narration}
                  onChange={(e) => handleInputChange('narration', e.target.value)}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Journal Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Journal Date</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.journalDate}
                    onChange={(e) => handleInputChange('journalDate', e.target.value)}
                  />
                  <span className="absolute right-2 top-2 text-gray-400">📅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleSaveJournal}
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

      {/* Journal Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Journal Entry List</h3>
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
                placeholder="Search by journal code, accounts or narration..."
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
                <div>Journal Code</div>
                <div>Journal Date</div>
                <div>Debit Total</div>
                <div>Credit Total</div>
                <div>Narration</div>
                <div>Created By</div>
                <div>Actions</div>
              </div>

              {/* Table Rows */}
              {currentEntries.length > 0 ? (
                currentEntries.map((entry, index) => (
                  <div key={entry.id} className="grid grid-cols-8 gap-2 text-xs py-2 border-b hover:bg-gray-50">
                    <div>{startIndex + index + 1}</div>
                    <div className="font-medium text-teal-600">{entry.journalCode}</div>
                    <div>{entry.journalDate}</div>
                    <div className="font-medium">₹ {entry.debitTotal}</div>
                    <div className="font-medium">₹ {entry.creditTotal}</div>
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