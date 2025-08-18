'use client'

import { useState } from 'react'

export default function PurchaseReturnEntry() {
  const [formData, setFormData] = useState({
    supplierName: 'General Supplier',
    institutionName: '',
    contactNo: '',
    supplierAddress: '',
    voucherNo: 'PURR3',
    entryDate: '14/08/2025',
    searchItem: '',
    discount: '0',
    discountPercent: '0',
    GST: '0',
    GSTPercent: '0',
    total: '',
    narration: '',
    discountGSTMethod: 'individual', // 'total' or 'individual'
    subTotal: '0.00',
    grandTotal: '0.00',
    purchaseReturnAccount: 'Purchase Return'
  })

  const [purchaseReturnItems, setPurchaseReturnItems] = useState([])
  const [purchaseReturnEntries, setPurchaseReturnEntries] = useState([
    {
      id: 1,
      voucherNo: 'PURR001',
      supplier: 'ABC Suppliers Ltd',
      entryDate: '2025-08-01',
      items: 3,
      totalAmount: '₹ 7,500.00',
      status: 'Completed'
    },
    {
      id: 2,
      voucherNo: 'PURR002',
      supplier: 'XYZ Trading Co',
      entryDate: '2025-08-02',
      items: 2,
      totalAmount: ' ₹4,200.00',
      status: 'Completed'
    }
  ])
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [filteredEntries, setFilteredEntries] = useState(purchaseReturnEntries)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddToCart = () => {
    // Add current item to purchase return cart
    if (formData.searchItem && formData.total) {
      const newItem = {
        id: Date.now(),
        itemName: formData.searchItem,
        qty: 1,
        rate: formData.total,
        discount: formData.discount,
        GST: formData.GST,
        total: formData.total
      }
      setPurchaseReturnItems(prev => [...prev, newItem])
      
      // Reset item fields
      setFormData(prev => ({
        ...prev,
        searchItem: '',
        total: '',
        discount: '0',
        GST: '0'
      }))
    }
  }

  const handleSavePurchaseReturn = () => {
    const newEntry = {
      id: Date.now(),
      voucherNo: formData.voucherNo,
      supplier: formData.supplierName,
      entryDate: formData.entryDate,
      items: purchaseReturnItems.length,
      totalAmount: `₹ ${formData.grandTotal}`,
      status: 'Completed'
    }
    
    setPurchaseReturnEntries(prev => [...prev, newEntry])
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
      voucherNo: `PURR${Math.floor(Math.random() * 1000)}`
    }))
    setPurchaseReturnItems([])
    
    console.log('Saving purchase return entry:', newEntry)
  }

  const handleReset = () => {
    setFormData({
      supplierName: 'General Supplier',
      institutionName: '',
      contactNo: '',
      supplierAddress: '',
      voucherNo: 'PURR3',
      entryDate: '14/08/2025',
      searchItem: '',
      discount: '0',
      discountPercent: '0',
      GST: '0',
      GSTPercent: '0',
      total: '',
      narration: '',
      discountGSTMethod: 'individual',
      subTotal: '0.00',
      grandTotal: '0.00',
      purchaseReturnAccount: 'Purchase Return'
    })
    setPurchaseReturnItems([])
  }

  // Search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredEntries(purchaseReturnEntries)
    } else {
      const filtered = purchaseReturnEntries.filter(entry =>
        entry.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.voucherNo.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredEntries(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setFilteredEntries(purchaseReturnEntries)
    setShowSearch(false)
  }

  // Print functionality
  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Purchase Return Entry List</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            h1 { text-align: center; color: #0f766e; }
          </style>
        </head>
        <body>
          <h1>Purchase Return Entry List</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Voucher No</th>
                <th>Supplier</th>
                <th>Entry Date</th>
                <th>Items</th>
                <th>Total Amount</th>
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
      ['Voucher No', 'Supplier', 'Entry Date', 'Items', 'Total Amount', 'Status'],
      ...filteredEntries.map(entry => [
        entry.voucherNo,
        entry.supplier,
        entry.entryDate,
        entry.items,
        entry.totalAmount,
        entry.status
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'purchase_return_entries.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  // Delete entry
  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = purchaseReturnEntries.filter(entry => entry.id !== id)
      setPurchaseReturnEntries(updatedEntries)
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
          <h2 className="font-medium text-lg">Purchase Return Entry</h2>
          <p className="text-sm opacity-90">Item cart / Product cart Information</p>
        </div>
        
        <div className="p-6">
          {/* Supplier Information Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Creditor/ Supplier, Item/ Product Cart & Total Amounts Information</h3>
            
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
                    placeholder=""
                  />
                  <span className="absolute right-2 top-2 text-gray-400">▼</span>
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
                <label className="block text-xs text-gray-600 mb-1">contact No</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  value={formData.contactNo}
                  onChange={(e) => handleInputChange('contactNo', e.target.value)}
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

          {/* Discount and GST Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {/* Discount (Rs) */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Discount (Rs )</label>
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

            {/* GST (Rs) */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">GST (Rs )</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.GST}
                onChange={(e) => handleInputChange('GST', e.target.value)}
              />
            </div>

            {/* GST % */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">GST %</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.GSTPercent}
                onChange={(e) => handleInputChange('GSTPercent', e.target.value)}
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

          {/* Purchase Return Items Table */}
          <div className="mb-6">
            <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-2">
              <div>SL Item Name</div>
              <div>QTY</div>
              <div>Rate (Per)</div>
              <div>Discount(%)</div>
              <div>GST(%)</div>
              <div>Total</div>
              <div>Actions</div>
            </div>
            
            {purchaseReturnItems.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm">
                No items added to cart yet
              </div>
            ) : (
              purchaseReturnItems.map((item, index) => (
                <div key={item.id} className="grid grid-cols-7 gap-2 text-xs py-2 border-b">
                  <div>{item.itemName}</div>
                  <div>{item.qty}</div>
                  <div>{item.rate}</div>
                  <div>{item.discount}%</div>
                  <div>{item.GST}%</div>
                  <div>{item.total}</div>
                  <div>
                    <button 
                      onClick={() => setPurchaseReturnItems(items => items.filter(i => i.id !== item.id))}
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

          {/* Discount and GST Method */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">Discount and GST Method</span>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="discountGSTMethod"
                  value="total"
                  checked={formData.discountGSTMethod === 'total'}
                  onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                  className="text-teal-600"
                />
                <span className="text-sm">On Total</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="discountGSTMethod"
                  value="individual"
                  checked={formData.discountGSTMethod === 'individual'}
                  onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                  className="text-teal-600"
                />
                <span className="text-sm">Individual Item</span>
              </label>
            </div>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Sub Total */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Sub Total (Rs)</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.subTotal}
                onChange={(e) => handleInputChange('subTotal', e.target.value)}
              />
            </div>

            {/* Choose purchase return Account */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Choose purchase return Account</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.purchaseReturnAccount}
                onChange={(e) => handleInputChange('purchaseReturnAccount', e.target.value)}
              >
                <option value="Purchase Return">Purchase Return</option>
                <option value="Purchase Return - Defective">Purchase Return - Defective</option>
                <option value="Purchase Return - Quality Issue">Purchase Return - Quality Issue</option>
              </select>
            </div>

            {/* Grand Total */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Grand Total (Rs)</label>
              <input 
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.grandTotal}
                onChange={(e) => handleInputChange('grandTotal', e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button 
              onClick={handleSavePurchaseReturn}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              💾 SAVE PURCHASE RETURN
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

      {/* Purchase Return Entry List */}
      <div className="bg-white rounded-lg shadow-sm border mt-6">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Purchase Return Entry List</h3>
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
              <div className="grid grid-cols-6 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-4">
                <div>Voucher No</div>
                <div>Supplier</div>
                <div>Entry Date</div>
                <div>Items</div>
                <div>Total Amount</div>
                <div>Actions</div>
              </div>

              {/* Table Rows */}
              {currentEntries.length > 0 ? (
                currentEntries.map((entry) => (
                  <div key={entry.id} className="grid grid-cols-6 gap-2 text-xs py-2 border-b hover:bg-gray-50">
                    <div className="font-medium text-teal-600">{entry.voucherNo}</div>
                    <div>{entry.supplier}</div>
                    <div>{entry.entryDate}</div>
                    <div>{entry.items}</div>
                    <div className="font-medium">{entry.totalAmount}</div>
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