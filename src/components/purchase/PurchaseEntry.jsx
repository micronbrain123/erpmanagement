'use client'

import { useState } from 'react'

export default function PurchaseEntry() {
  const [formData, setFormData] = useState({
    supplierName: 'General Supplier',
    institutionName: '',
    contactNo: '',
    supplierAddress: '',
    previousDue: '0',
    voucherNo: 'PUR47',
    entryDate: '14/08/2025',
    searchItem: '',
    discount: '0',
    discountPercent: '0',
    vat: '0',
    vatPercent: '0',
    total: '',
    narration: '',
    discountVatMethod: 'individual', // 'total' or 'individual'
    subTotal: '0.00',
    transportCost: '0',
    grandTotal: '0.00',
    paidAmount: '0',
    dueAmount: '0'
  })

  const [purchaseItems, setPurchaseItems] = useState([])
  const [purchaseEntries, setPurchaseEntries] = useState([
    {
      id: 1,
      voucherNo: 'PUR001',
      supplier: 'ABC Suppliers Ltd',
      entryDate: '2025-08-01',
      items: 5,
      totalAmount: '15,500.00 BDT',
      paidAmount: '10,000.00 BDT',
      dueAmount: '5,500.00 BDT',
      status: 'Completed'
    },
    {
      id: 2,
      voucherNo: 'PUR002',
      supplier: 'XYZ Trading Co',
      entryDate: '2025-08-02',
      items: 3,
      totalAmount: '8,750.00 BDT',
      paidAmount: '8,750.00 BDT',
      dueAmount: '0.00 BDT',
      status: 'Paid'
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(purchaseEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddToCart = () => {
    // Add current item to purchase cart
    if (formData.searchItem && formData.total) {
      const newItem = {
        id: Date.now(),
        itemName: formData.searchItem,
        qty: 1,
        rate: formData.total,
        discount: formData.discount,
        vat: formData.vat,
        total: formData.total
      }
      setPurchaseItems(prev => [...prev, newItem])
      
      // Reset item fields
      setFormData(prev => ({
        ...prev,
        searchItem: '',
        total: '',
        discount: '0',
        vat: '0'
      }))
    }
  }

  const handleSavePurchase = () => {
    const newEntry = {
      id: Date.now(),
      voucherNo: formData.voucherNo,
      supplier: formData.supplierName,
      entryDate: formData.entryDate,
      items: purchaseItems.length,
      totalAmount: `${formData.grandTotal} BDT`,
      paidAmount: `${formData.paidAmount} BDT`,
      dueAmount: `${formData.dueAmount} BDT`,
      status: parseFloat(formData.dueAmount) === 0 ? 'Paid' : 'Partial'
    }
    
    setPurchaseEntries(prev => [...prev, newEntry])
    setFilteredEntries(prev => [...prev, newEntry])
    
    // Reset form
    setFormData(prev => ({
      ...prev,
      supplierName: 'General Supplier',
      institutionName: '',
      contactNo: '',
      supplierAddress: '',
      searchItem: '',
      total: '',
      narration: '',
      subTotal: '0.00',
      grandTotal: '0.00',
      paidAmount: '0',
      dueAmount: '0',
      voucherNo: `PUR${Math.floor(Math.random() * 1000)}`
    }))
    setPurchaseItems([])
    
    console.log('Saving purchase entry:', newEntry)
  }

  const handleReset = () => {
    setFormData({
      supplierName: 'General Supplier',
      institutionName: '',
      contactNo: '',
      supplierAddress: '',
      previousDue: '0',
      voucherNo: 'PUR47',
      entryDate: '14/08/2025',
      searchItem: '',
      discount: '0',
      discountPercent: '0',
      vat: '0',
      vatPercent: '0',
      total: '',
      narration: '',
      discountVatMethod: 'individual',
      subTotal: '0.00',
      transportCost: '0',
      grandTotal: '0.00',
      paidAmount: '0',
      dueAmount: '0'
    })
    setPurchaseItems([])
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(purchaseEntries)
    } else {
      const filtered = purchaseEntries.filter(entry =>
        entry.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.voucherNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEntries(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(purchaseEntries)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Purchase Entry List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #0f766e; }
          </style>
        </head>
        <body>
          <h1>Purchase Entry List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Voucher No</th>
                <th>Supplier</th>
                <th>Entry Date</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Paid Amount</th>
                <th>Due Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEntries.map(entry => `
                <tr>
                  <td>${entry.voucherNo}</td>
                  <td>${entry.supplier}</td>
                  <td>${entry.entryDate}</td>
                  <td>${entry.items}</td>
                  <td>${entry.totalAmount}</td>
                  <td>${entry.paidAmount}</td>
                  <td>${entry.dueAmount}</td>
                  <td>${entry.status}</td>
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
      ['Voucher No', 'Supplier', 'Entry Date', 'Items', 'Total Amount', 'Paid Amount', 'Due Amount', 'Status'],
      ...filteredEntries.map(entry => [
        entry.voucherNo,
        entry.supplier,
        entry.entryDate,
        entry.items,
        entry.totalAmount,
        entry.paidAmount,
        entry.dueAmount,
        entry.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'purchase_entries.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = purchaseEntries.filter(entry => entry.id !== id)
      setPurchaseEntries(updatedEntries)
      setFilteredEntries(updatedEntries.filter(entry =>
        searchTerm === '' ||
        entry.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.voucherNo.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h2 className="font-medium text-lg">Purchase Entry</h2>
          <p className="text-sm opacity-90">Item cart / Product cart Information</p>
        </div>
        
        <div className="p-6">
          {/* Supplier Information Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Supplier, Item/ Product Cart & Total Amounts Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Search Item */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Search Item</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.searchItem}
                    onChange={(e) => handleInputChange('searchItem', e.target.value)}
                    placeholder="Search Item"
                  />
                  <span className="absolute right-2 top-2 text-gray-400 text-lg">+</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">No options</p>
              </div>

              {/* Search Supplier */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Search Supplier</label>
                <select 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.supplierName}
                  onChange={(e) => handleInputChange('supplierName', e.target.value)}
                >
                  <option value="General Supplier">General Supplier</option>
                  <option value="ABC Suppliers Ltd">ABC Suppliers Ltd</option>
                  <option value="XYZ Trading Co">XYZ Trading Co</option>
                </select>
              </div>

              {/* Supplier Name */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Supplier Name</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.supplierName}
                  onChange={(e) => handleInputChange('supplierName', e.target.value)}
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
                  placeholder="contact No"
                />
              </div>

              {/* Supplier Address */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Supplier address</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.supplierAddress}
                  onChange={(e) => handleInputChange('supplierAddress', e.target.value)}
                  placeholder="Supplier address"
                />
              </div>

              {/* Institution Name */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Institution Name</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.institutionName}
                  onChange={(e) => handleInputChange('institutionName', e.target.value)}
                  placeholder="Institution Name"
                />
              </div>

              {/* Previous Due */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Previous Due</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.previousDue}
                  onChange={(e) => handleInputChange('previousDue', e.target.value)}
                />
              </div>

              {/* Voucher No */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Voucher No</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.voucherNo}
                  onChange={(e) => handleInputChange('voucherNo', e.target.value)}
                />
              </div>

              {/* Entry Date */}
              <div>
                <label className="block text-xs text-gray-600 mb-1">Entry Date</label>
                <div className="relative">
                  <input 
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.entryDate}
                    onChange={(e) => handleInputChange('entryDate', e.target.value)}
                  />
                  <span className="absolute right-2 top-2 text-gray-400">📅</span>
                </div>
              </div>
            </div>
          </div>

          {/* Discount and VAT Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Discount (BDT) */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Discount (BDT)</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.discount}
                onChange={(e) => handleInputChange('discount', e.target.value)}
              />
            </div>

            {/* Discount % */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Discount %</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.discountPercent}
                onChange={(e) => handleInputChange('discountPercent', e.target.value)}
              />
            </div>

            {/* Vat (BDT) */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Vat (BDT)</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.vat}
                onChange={(e) => handleInputChange('vat', e.target.value)}
              />
            </div>

            {/* Vat % */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Vat %</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.vatPercent}
                onChange={(e) => handleInputChange('vatPercent', e.target.value)}
              />
            </div>
          </div>

          {/* Total and Add to Cart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.total}
                onChange={(e) => handleInputChange('total', e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">Press Enter Key to purchase Cart</p>
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={handleAddToCart}
                className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
              >
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Purchase Items Table */}
          <div className="mb-6">
            <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-2">
              <div>SL Item Name</div>
              <div>QTY</div>
              <div>Rate (Per)</div>
              <div>Discount(%)</div>
              <div>Vat(%)</div>
              <div>Total</div>
              <div>Actions</div>
            </div>
            
            {purchaseItems.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm">
                No items added to cart yet
              </div>
            ) : (
              purchaseItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-7 gap-2 text-xs py-2 border-b">
                  <div>{item.itemName}</div>
                  <div>{item.qty}</div>
                  <div>{item.rate}</div>
                  <div>{item.discount}%</div>
                  <div>{item.vat}%</div>
                  <div>{item.total}</div>
                  <div>
                    <button 
                      onClick={() => setPurchaseItems(items => items.filter(i => i.id !== item.id))}
                      className="text-red-600 hover:text-red-800"
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Narration */}
          <div className="mb-6">
            <textarea 
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              rows="3"
              placeholder="Narration..."
              value={formData.narration}
              onChange={(e) => handleInputChange('narration', e.target.value)}
            />
          </div>

          {/* Discount and VAT Method */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">Discount and Vat Method</span>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="discountVatMethod"
                  value="total"
                  checked={formData.discountVatMethod === 'total'}
                  onChange={(e) => handleInputChange('discountVatMethod', e.target.value)}
                  className="text-teal-600"
                />
                <span className="text-sm">On Total</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="discountVatMethod"
                  value="individual"
                  checked={formData.discountVatMethod === 'individual'}
                  onChange={(e) => handleInputChange('discountVatMethod', e.target.value)}
                  className="text-teal-600"
                />
                <span className="text-sm">Individual Item</span>
              </label>
            </div>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Sub Total */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Sub Total (BDT)</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.subTotal}
                onChange={(e) => handleInputChange('subTotal', e.target.value)}
              />
            </div>

            {/* Grand Total */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Grand Total (BDT)</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.grandTotal}
                onChange={(e) => handleInputChange('grandTotal', e.target.value)}
              />
            </div>

            {/* Transport Cost */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Transport Cost (BDT)</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.transportCost}
                onChange={(e) => handleInputChange('transportCost', e.target.value)}
              />
            </div>

            <div></div>

            {/* Paid Amount */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Paid Amount</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.paidAmount}
                onChange={(e) => handleInputChange('paidAmount', e.target.value)}
              />
            </div>

            {/* Due Amount */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Due Amount</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.dueAmount}
                onChange={(e) => handleInputChange('dueAmount', e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button 
              onClick={handleSavePurchase}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              💾 SAVE PURCHASE
            </button>
            <button 
              onClick={handleReset}
              className="bg-gray-500 text-white px-6 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              RESET
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Purchase Entry List</h3>
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
                placeholder="Search by supplier name or voucher number..."
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
                <div>Voucher No</div>
                <div>Supplier</div>
                <div>Entry Date</div>
                <div>Items</div>
                <div>Total Amount</div>
                <div>Paid Amount</div>
                <div>Due Amount</div>
                <div>Status</div>
                <div>Actions</div>
              </div>

              {/* Table Rows */}
              {currentEntries.length > 0 ? (
                currentEntries.map((entry) => (
                  <div key={entry.id} className="grid grid-cols-9 gap-2 text-xs py-2 border-b hover:bg-gray-50">
                    <div className="font-medium text-teal-600">{entry.voucherNo}</div>
                    <div>{entry.supplier}</div>
                    <div>{entry.entryDate}</div>
                    <div>{entry.items}</div>
                    <div className="font-medium">{entry.totalAmount}</div>
                    <div>{entry.paidAmount}</div>
                    <div>{entry.dueAmount}</div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        entry.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : entry.status === 'Completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {entry.status}
                      </span>
                    </div>
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