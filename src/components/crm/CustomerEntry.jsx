'use client'

import { useState } from 'react'

export default function CustomerEntry() {
  const [formData, setFormData] = useState({
    customerName: '',
    profession: '',
    institutionName: '',
    address: '',
    contactNo: '',
    locationArea: '',
    expectation: '',
    emailAddress: '',
    initialConversation: '',
    creationDate: '08/19/2025',
    partyType: ''
  })

  const [customerEntries, setCustomerEntries] = useState([
    {
      id: 1,
      sl: 1,
      customerName: 'Rajesh Kumar',
      profession: 'Business Owner',
      contactNo: '+91 98765 43210',
      address: 'Park Street, Kolkata',
      area: 'Kolkata',
      employee: 'SOFT TASK',
      initialConversation: 'Interested in accounting software',
      expectation: '85%',
      status: 'Approved',
      creationDate: '18 Aug 2025'
    },
    {
      id: 2,
      sl: 2,
      customerName: 'Priya Sharma',
      profession: 'CA',
      contactNo: '+91 87654 32109',
      address: 'MG Road, Mumbai',
      area: 'Mumbai',
      employee: 'SOFT TASK',
      initialConversation: 'Looking for ERP solution',
      expectation: '92%',
      status: 'Pending',
      creationDate: '15 Aug 2025'
    },
    {
      id: 3,
      sl: 3,
      customerName: 'Amit Patel',
      profession: 'Retailer',
      contactNo: '+91 76543 21098',
      address: 'Commercial Street, Bangalore',
      area: 'Bangalore',
      employee: 'SOFT TASK',
      initialConversation: 'Need inventory management',
      expectation: '78%',
      status: 'Approved',
      creationDate: '12 Aug 2025'
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(customerEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSaveCustomer = () => {
    if (!formData.customerName.trim()) {
      alert('Please enter customer name')
      return
    }

    const newEntry = {
      id: Date.now(),
      sl: customerEntries.length + 1,
      customerName: formData.customerName,
      profession: formData.profession,
      contactNo: formData.contactNo,
      address: formData.address,
      area: formData.locationArea,
      employee: 'SOFT TASK',
      initialConversation: formData.initialConversation,
      expectation: formData.expectation + '%',
      status: 'Pending',
      creationDate: formData.creationDate
    }
    
    setCustomerEntries(prev => [...prev, newEntry])
    setFilteredEntries(prev => [...prev, newEntry])
    
    // Reset form
    setFormData({
      customerName: '',
      profession: '',
      institutionName: '',
      address: '',
      contactNo: '',
      locationArea: '',
      expectation: '',
      emailAddress: '',
      initialConversation: '',
      creationDate: '08/19/2025',
      partyType: ''
    })
    
    console.log('Saving customer entry:', newEntry)
  }

  const handleReset = () => {
    setFormData({
      customerName: '',
      profession: '',
      institutionName: '',
      address: '',
      contactNo: '',
      locationArea: '',
      expectation: '',
      emailAddress: '',
      initialConversation: '',
      creationDate: '08/19/2025',
      partyType: ''
    })
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(customerEntries)
    } else {
      const filtered = customerEntries.filter(entry =>
        entry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.contactNo.includes(searchTerm) ||
        entry.area.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEntries(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(customerEntries)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Customer List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #7c3aed; }
          </style>
        </head>
        <body>
          <h1>Customer List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Customer Name</th>
                <th>Profession</th>
                <th>Contact No</th>
                <th>Address</th>
                <th>Area</th>
                <th>Employee</th>
                <th>Initial Conversation</th>
                <th>Expectation %</th>
                <th>Status</th>
                <th>Creation Date</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map((entry) => `
                <tr>
                  <td>${entry.sl}</td>
                  <td>${entry.customerName}</td>
                  <td>${entry.profession}</td>
                  <td>${entry.contactNo}</td>
                  <td>${entry.address}</td>
                  <td>${entry.area}</td>
                  <td>${entry.employee}</td>
                  <td>${entry.initialConversation}</td>
                  <td>${entry.expectation}</td>
                  <td>${entry.status}</td>
                  <td>${entry.creationDate}</td>
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
      ['SL', 'Customer Name', 'Profession', 'Contact No', 'Address', 'Area', 'Employee', 'Initial Conversation', 'Expectation %', 'Status', 'Creation Date'],
      ...filteredEntries.map((entry) => [
        entry.sl,
        entry.customerName,
        entry.profession,
        entry.contactNo,
        entry.address,
        entry.area,
        entry.employee,
        entry.initialConversation,
        entry.expectation,
        entry.status,
        entry.creationDate
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'customer_entries.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = customerEntries.filter(entry => entry.id !== id)
      // Update serial numbers
      const reorderedEntries = updatedEntries.map((entry, index) => ({
        ...entry,
        sl: index + 1
      }))
      setCustomerEntries(reorderedEntries)
      setFilteredEntries(reorderedEntries.filter(entry =>
        searchTerm === '' ||
        entry.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.contactNo.includes(searchTerm) ||
        entry.area.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="font-medium text-lg">Customer Entry</h2>
        </div>
        
        <div className="p-6">
          {/* Main Form Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* First Row */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                placeholder="Customer Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.profession}
                onChange={(e) => handleInputChange('profession', e.target.value)}
                placeholder="Profession"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.institutionName}
                onChange={(e) => handleInputChange('institutionName', e.target.value)}
                placeholder="Institution Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Address"
              />
            </div>

            {/* Second Row */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact No</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.contactNo}
                onChange={(e) => handleInputChange('contactNo', e.target.value)}
                placeholder="Contact No"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location/Area</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.locationArea}
                onChange={(e) => handleInputChange('locationArea', e.target.value)}
              >
                <option value="">Select Location/Area</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Durgapur">Durgapur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expectation %</label>
              <input 
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.expectation}
                onChange={(e) => handleInputChange('expectation', e.target.value)}
                placeholder="Expectation %"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail Address</label>
              <input 
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.emailAddress}
                onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                placeholder="E-mail Address"
              />
            </div>
          </div>

          {/* Third Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Initial Conversation</label>
              <textarea 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                rows="3"
                value={formData.initialConversation}
                onChange={(e) => handleInputChange('initialConversation', e.target.value)}
                placeholder="Initial Conversation"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Creation Date</label>
              <div className="relative">
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.creationDate}
                  onChange={(e) => handleInputChange('creationDate', e.target.value)}
                />
                <span className="absolute right-2 top-2 text-gray-400">📅</span>
              </div>
            </div>
          </div>

          {/* Party Type Radio Buttons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Party Type</label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="partyType" 
                  value="Corporate"
                  checked={formData.partyType === 'Corporate'}
                  onChange={(e) => handleInputChange('partyType', e.target.value)}
                  className="mr-2"
                />
                Corporate
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="partyType" 
                  value="Retailer"
                  checked={formData.partyType === 'Retailer'}
                  onChange={(e) => handleInputChange('partyType', e.target.value)}
                  className="mr-2"
                />
                Retailer
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="partyType" 
                  value="WholeSaler"
                  checked={formData.partyType === 'WholeSaler'}
                  onChange={(e) => handleInputChange('partyType', e.target.value)}
                  className="mr-2"
                />
                WholeSaler
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="partyType" 
                  value="Distributor"
                  checked={formData.partyType === 'Distributor'}
                  onChange={(e) => handleInputChange('partyType', e.target.value)}
                  className="mr-2"
                />
                Distributor
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleSaveCustomer}
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

      {/* Customer List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Customer List</h3>
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
              <button 
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="More Options"
              >
                ☰
              </button>
              <button 
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
                title="Filter"
              >
                ⚙️
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Search by customer name, profession, contact, or area..."
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

          {/* Table - Scrollable */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">SL</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Customer Name</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Profession</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Contact No</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Address</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Area</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Employee</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Initial Conversation</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Expectation %</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Status</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Creation Date</th>
                  <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.length > 0 ? (
                  currentEntries.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 text-xs">{entry.sl}</td>
                      <td className="py-2 px-2 text-xs font-medium">{entry.customerName}</td>
                      <td className="py-2 px-2 text-xs">{entry.profession}</td>
                      <td className="py-2 px-2 text-xs">{entry.contactNo}</td>
                      <td className="py-2 px-2 text-xs">{entry.address}</td>
                      <td className="py-2 px-2 text-xs">{entry.area}</td>
                      <td className="py-2 px-2 text-xs">{entry.employee}</td>
                      <td className="py-2 px-2 text-xs">{entry.initialConversation}</td>
                      <td className="py-2 px-2 text-xs font-medium">{entry.expectation}</td>
                      <td className="py-2 px-2 text-xs">
                        <span className={`px-2 py-1 rounded text-xs ${
                          entry.status === 'Approved' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-xs">{entry.creationDate}</td>
                      <td className="py-2 px-2 text-xs">
                        <div className="flex gap-1">
                          <button 
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="text-red-600 hover:text-red-800"
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
                    <td colSpan="12" className="text-center py-8 text-gray-500">
                      {searchTerm ? 'No matching records found' : 'No customers available'}
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