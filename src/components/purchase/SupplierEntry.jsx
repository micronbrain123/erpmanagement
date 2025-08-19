'use client'

import { useState } from 'react'

export default function SupplierEntry() {
  const [formData, setFormData] = useState({
    supplierName: '',
    openingDue: '0',
    shopCompanyName: '', // Changed from institutionName
    address: '',
    contactNo: '',
    locationArea: '',
    emailAddress: '',
    gstNumber: '',
    staffContactNumber: '',
    supplierCategory: '',
    priceRating: 0,
    bankChequeImage: null,
    upiId: ''
  })

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      supplierName: 'ABC Suppliers Ltd',
      shopCompanyName: 'ABC Trading Co', // Updated
      address: 'Dhaka, Bangladesh',
      contactNo: '01712345678',
      area: 'Dhaka',
      openingDue: 5000,
      gstNumber: 'GST123456789',
      staffContactNumber: '01712345679',
      supplierCategory: 'Electronics',
      priceRating: 4,
      upiId: 'abc@paytm',
      entryBy: 'SOFT TASK'
    },
    {
      id: 2,
      supplierName: 'XYZ Enterprise',
      shopCompanyName: 'XYZ Corporation', // Updated
      address: 'Chittagong, Bangladesh',
      contactNo: '01798765432',
      area: 'Chittagong',
      openingDue: 2500,
      gstNumber: 'GST987654321',
      staffContactNumber: '01798765433',
      supplierCategory: 'Textiles',
      priceRating: 5,
      upiId: 'xyz@gpay',
      entryBy: 'SOFT TASK'
    },
    {
      id: 3,
      supplierName: 'Reliable Suppliers',
      shopCompanyName: 'Reliable Trading', // Updated
      address: 'Sylhet, Bangladesh',
      contactNo: '01656789012',
      area: 'Sylhet',
      openingDue: 0,
      gstNumber: 'GST456789123',
      staffContactNumber: '01656789013',
      supplierCategory: 'Hardware',
      priceRating: 3,
      upiId: 'reliable@phonepe',
      entryBy: 'SOFT TASK'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState('basic') // For form sections

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        bankChequeImage: file
      }))
    }
  }

  const renderStars = (rating, onRatingChange = null) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange && onRatingChange(star)}
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} ${onRatingChange ? 'hover:text-yellow-400 cursor-pointer' : 'cursor-default'}`}
          >
            ★
          </button>
        ))}
      </div>
    )
  }

  const handleSave = () => {
    if (formData.supplierName.trim() === '') {
      alert('Please enter supplier name')
      return
    }

    const newSupplier = {
      id: Date.now(),
      supplierName: formData.supplierName,
      shopCompanyName: formData.shopCompanyName,
      address: formData.address,
      contactNo: formData.contactNo,
      area: formData.locationArea,
      openingDue: parseFloat(formData.openingDue) || 0,
      gstNumber: formData.gstNumber,
      staffContactNumber: formData.staffContactNumber,
      supplierCategory: formData.supplierCategory,
      priceRating: formData.priceRating,
      upiId: formData.upiId,
      entryBy: 'SOFT TASK'
    }

    setSuppliers(prev => [...prev, newSupplier])
    setFilteredSuppliers(prev => [...prev, newSupplier])

    // Reset form
    setFormData({
      supplierName: '',
      openingDue: '0',
      shopCompanyName: '',
      address: '',
      contactNo: '',
      locationArea: '',
      emailAddress: '',
      gstNumber: '',
      staffContactNumber: '',
      supplierCategory: '',
      priceRating: 0,
      bankChequeImage: null,
      upiId: ''
    })

    console.log('Saving supplier:', newSupplier)
  }

  const handleReset = () => {
    setFormData({
      supplierName: '',
      openingDue: '0',
      shopCompanyName: '',
      address: '',
      contactNo: '',
      locationArea: '',
      emailAddress: '',
      gstNumber: '',
      staffContactNumber: '',
      supplierCategory: '',
      priceRating: 0,
      bankChequeImage: null,
      upiId: ''
    })
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredSuppliers(suppliers)
    } else {
      const filtered = suppliers.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.shopCompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactNo.includes(searchTerm) ||
        supplier.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.supplierCategory.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredSuppliers(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredSuppliers(suppliers)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Supplier List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #0f766e; }
          </style>
        </head>
        <body>
          <h1>Supplier List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Supplier Name</th>
                <th>Shop/Company</th>
                <th>Address</th>
                <th>Contact No</th>
                <th>Staff Contact</th>
                <th>Area</th>
                <th>Category</th>
                <th>Price Rating</th>
                <th>GST Number</th>
                <th>Opening Due</th>
                <th>UPI ID</th>
                <th>Entry By</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSuppliers.map((supplier, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${supplier.supplierName}</td>
                  <td>${supplier.shopCompanyName}</td>
                  <td>${supplier.address}</td>
                  <td>${supplier.contactNo}</td>
                  <td>${supplier.staffContactNumber || 'N/A'}</td>
                  <td>${supplier.area}</td>
                  <td>${supplier.supplierCategory || 'N/A'}</td>
                  <td>${'★'.repeat(supplier.priceRating || 0)}${'☆'.repeat(5 - (supplier.priceRating || 0))}</td>
                  <td>${supplier.gstNumber || 'N/A'}</td>
                  <td>${supplier.openingDue}</td>
                  <td>${supplier.upiId || 'N/A'}</td>
                  <td>${supplier.entryBy}</td>
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
      ['SL', 'Supplier Name', 'Shop/Company Name', 'Address', 'Contact No', 'Staff Contact', 'Area', 'Category', 'Price Rating', 'GST Number', 'Opening Due', 'UPI ID', 'Entry By'],
      ...filteredSuppliers.map((supplier, index) => [
        index + 1,
        supplier.supplierName,
        supplier.shopCompanyName,
        supplier.address,
        supplier.contactNo,
        supplier.staffContactNumber || '',
        supplier.area,
        supplier.supplierCategory || '',
        supplier.priceRating || 0,
        supplier.gstNumber || '',
        supplier.openingDue,
        supplier.upiId || '',
        supplier.entryBy
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'supplier_list.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete supplier
  const handleDeleteSupplier = (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      const updatedSuppliers = suppliers.filter(supplier => supplier.id !== id)
      setSuppliers(updatedSuppliers)
      setFilteredSuppliers(updatedSuppliers.filter(supplier =>
        searchTerm === '' ||
        supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.shopCompanyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactNo.includes(searchTerm) ||
        supplier.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (supplier.supplierCategory && supplier.supplierCategory.toLowerCase().includes(searchTerm.toLowerCase()))
      ))
    }
  }

  // Edit supplier
  const handleEditSupplier = (supplier) => {
    setFormData({
      supplierName: supplier.supplierName,
      openingDue: supplier.openingDue.toString(),
      shopCompanyName: supplier.shopCompanyName,
      address: supplier.address,
      contactNo: supplier.contactNo,
      locationArea: supplier.area,
      emailAddress: '',
      gstNumber: supplier.gstNumber || '',
      staffContactNumber: supplier.staffContactNumber || '',
      supplierCategory: supplier.supplierCategory || '',
      priceRating: supplier.priceRating || 0,
      bankChequeImage: null,
      upiId: supplier.upiId || ''
    })
  }

  // Pagination
  const totalPages = Math.ceil(filteredSuppliers.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentSuppliers = filteredSuppliers.slice(startIndex, endIndex)

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
          <h2 className="font-medium text-lg">Supplier Entry</h2>
        </div>
        
        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex gap-1 mb-6 border-b">
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'basic' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('basic')}
            >
              Basic Information
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'additional' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('additional')}
            >
              Additional Details
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'rating' ? 'border-teal-600 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('rating')}
            >
              Rating & Bank Details
            </button>
          </div>

          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
              {/* Supplier Name */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Supplier Name *</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.supplierName}
                  onChange={(e) => handleInputChange('supplierName', e.target.value)}
                  placeholder="Supplier Name"
                />
              </div>

              {/* Shop/Company Name */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Shop/Company Name</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.shopCompanyName}
                  onChange={(e) => handleInputChange('shopCompanyName', e.target.value)}
                  placeholder="Shop/Company Name"
                />
              </div>

              {/* Contact No */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Contact No</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.contactNo}
                  onChange={(e) => handleInputChange('contactNo', e.target.value)}
                  placeholder="Contact No"
                />
              </div>

              {/* E-mail Address */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">E-mail Address</label>
                <input 
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  placeholder="E-mail Address"
                />
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-600 mb-1">Address</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Address"
                />
              </div>

              {/* Location/Area */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Location/ Area</label>
                <div className="relative">
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                    value={formData.locationArea}
                    onChange={(e) => handleInputChange('locationArea', e.target.value)}
                  >
                    <option value="">Location/ Area</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Gazipur">Gazipur</option>
                  </select>
                  <span className="absolute right-2 top-2 text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>

              {/* Opening Due */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Opening Due</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.openingDue}
                  onChange={(e) => handleInputChange('openingDue', e.target.value)}
                  placeholder="0"
                />
              </div>
            </div>
          )}

          {/* Additional Details Tab */}
          {activeTab === 'additional' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* GST Number */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">GST Number</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.gstNumber}
                  onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  placeholder="GST Number"
                />
              </div>

              {/* Staff Contact Number */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Staff Contact Number</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.staffContactNumber}
                  onChange={(e) => handleInputChange('staffContactNumber', e.target.value)}
                  placeholder="Staff Contact Number"
                />
              </div>

              {/* Supplier Category */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Supplier Category</label>
                <div className="relative">
                  <select 
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none"
                    value={formData.supplierCategory}
                    onChange={(e) => handleInputChange('supplierCategory', e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Construction">Construction</option>
                    <option value="Chemicals">Chemicals</option>
                    <option value="Others">Others</option>
                  </select>
                  <span className="absolute right-2 top-2 text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>
            </div>
          )}

          {/* Rating & Bank Details Tab */}
          {activeTab === 'rating' && (
            <div className="space-y-6 mb-6">
              {/* Price Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supplier's Price Rating</label>
                <div className="flex items-center gap-4">
                  {renderStars(formData.priceRating, (rating) => handleInputChange('priceRating', rating))}
                  <span className="text-sm text-gray-600">
                    {formData.priceRating === 0 && 'No rating'}
                    {formData.priceRating === 1 && 'Very Expensive'}
                    {formData.priceRating === 2 && 'Expensive'}
                    {formData.priceRating === 3 && 'Fair Price'}
                    {formData.priceRating === 4 && 'Good Price'}
                    {formData.priceRating === 5 && 'Excellent Price'}
                  </span>
                </div>
              </div>

              {/* Bank Details */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-4">Supplier's Bank Details</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bank Document Upload */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Upload Cancelled Cheque or Bank Passbook</label>
                    <input 
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    {formData.bankChequeImage && (
                      <p className="text-xs text-green-600 mt-1">
                        ✓ File uploaded: {formData.bankChequeImage.name}
                      </p>
                    )}
                  </div>

                  {/* UPI ID */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">UPI ID</label>
                    <input 
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={formData.upiId}
                      onChange={(e) => handleInputChange('upiId', e.target.value)}
                      placeholder="example@paytm, example@gpay, etc."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-center gap-2 mb-6">
            <button 
              onClick={handleSave}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              💾 SAVE
            </button>
            <button 
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Supplier List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Supplier List</h3>
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
                placeholder="Search by supplier name, company, contact, area, or category..."
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
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-4">
                <div>SL</div>
                <div>Supplier Name</div>
                <div>Shop/Company</div>
                <div>Contact No</div>
                <div>Staff Contact</div>
                <div>Area</div>
                <div>Category</div>
                <div>Rating</div>
                <div>GST Number</div>
                <div>Opening Due</div>
                <div>UPI ID</div>
                <div>Actions</div>
              </div>

              {/* Table Rows */}
              {currentSuppliers.length > 0 ? (
                currentSuppliers.map((supplier, index) => (
                  <div key={supplier.id} className="grid grid-cols-12 gap-2 text-xs py-3 border-b hover:bg-gray-50">
                    <div className="font-medium">{startIndex + index + 1}</div>
                    <div className="font-medium text-teal-600">{supplier.supplierName}</div>
                    <div>{supplier.shopCompanyName}</div>
                    <div>{supplier.contactNo}</div>
                    <div>{supplier.staffContactNumber || 'N/A'}</div>
                    <div>{supplier.area}</div>
                    <div>{supplier.supplierCategory || 'N/A'}</div>
                    <div className="flex">
                      {renderStars(supplier.priceRating || 0)}
                    </div>
                    <div className="text-xs">{supplier.gstNumber || 'N/A'}</div>
                    <div className="font-medium">{supplier.openingDue}</div>
                    <div className="text-xs">{supplier.upiId || 'N/A'}</div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEditSupplier(supplier)}
                        className="text-teal-600 hover:text-teal-800 text-sm"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteSupplier(supplier.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
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
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span>
                {filteredSuppliers.length === 0 
                  ? '0-0 of 0' 
                  : `${startIndex + 1}-${Math.min(endIndex, filteredSuppliers.length)} of ${filteredSuppliers.length}`
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