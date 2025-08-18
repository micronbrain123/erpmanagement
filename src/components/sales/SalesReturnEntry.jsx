'use client'

import { useState } from 'react'
import { Plus, Save, RotateCcw, ChevronDown, Calendar } from 'lucide-react'

export default function SalesReturnEntry() {
  // Get today's date in DD/MM/YYYY format
  const getTodayFormatted = () => {
    const today = new Date()
    const day = today.getDate().toString().padStart(2, '0')
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const year = today.getFullYear()
    return `${day}/${month}/${year}`
  }

  const [formData, setFormData] = useState({
    searchItem: '',
    searchCustomer: '',
    saleInvoice: '',
    institutionName: '',
    contactNo: '',
    customerAddress: '',
    voucherNo: '',
    entryDate: getTodayFormatted(),
    discountRs: '0',
    discountPercent: '0',
    GSTRs: '0',
    GSTPercent: '0',
    total: '0',
    narration: '',
    discountGSTMethod: 'Individual Item',
    salesReturnAcc: 'Sales Return',
    grandTotal: '0.00',
    subTotal: '0.00'
  })

  const [cartItems, setCartItems] = useState([])

  // Sample data
  const customers = [
    { id: 1, name: 'Customer A', address: '123 Main St', contact: '01234567890', institution: 'ABC Company' },
    { id: 2, name: 'Customer B', address: '456 Oak Ave', contact: '01987654321', institution: 'XYZ Corp' },
    { id: 3, name: 'Customer C', address: '789 Pine Rd', contact: '01122334455', institution: 'DEF Ltd' }
  ]

  const items = [
    { id: 1, name: 'Product A', rate: 100, qty: 10 },
    { id: 2, name: 'Product B', rate: 200, qty: 5 },
    { id: 3, name: 'Product C', rate: 150, qty: 8 }
  ]

  const salesReturnAccounts = ['Sales Return', 'Return Account A', 'Return Account B']

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCustomerSelect = (customer) => {
    setFormData(prev => ({
      ...prev,
      searchCustomer: customer.name,
      customerAddress: customer.address,
      contactNo: customer.contact,
      institutionName: customer.institution
    }))
  }

  const addToCart = () => {
    if (!formData.searchItem) {
      alert('Please select an item')
      return
    }

    // This would normally add the selected item to cart
    // For demo, we'll add a sample item
    const newItem = {
      id: Date.now(),
      name: formData.searchItem || 'Sample Item',
      qty: 1,
      returnQty: 1,
      rate: 100,
      discountPercent: 0,
      GSTPercent: 0,
      total: 100
    }

    setCartItems(prev => [...prev, newItem])
    calculateTotals([...cartItems, newItem])
    setFormData(prev => ({ ...prev, searchItem: '' }))
  }

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    calculateTotals(updatedCart)
  }

  const updateCartItem = (id, field, value) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: parseFloat(value) || 0 }
        
        // Recalculate total for this item
        const baseAmount = updatedItem.rate * updatedItem.returnQty
        const discountAmount = baseAmount * (updatedItem.discountPercent / 100)
        const afterDiscount = baseAmount - discountAmount
        const GSTAmount = afterDiscount * (updatedItem.GSTPercent / 100)
        updatedItem.total = afterDiscount + GSTAmount
        
        return updatedItem
      }
      return item
    })
    
    setCartItems(updatedCart)
    calculateTotals(updatedCart)
  }

  const calculateTotals = (items) => {
    const subTotal = items.reduce((sum, item) => sum + item.total, 0)
    const totalDiscount = parseFloat(formData.discountRs) || 0
    const totalGST = parseFloat(formData.GSTRs) || 0
    
    let grandTotal = subTotal
    
    if (formData.discountGSTMethod === 'On Total') {
      grandTotal = subTotal - totalDiscount + totalGST
    }
    
    setFormData(prev => ({
      ...prev,
      subTotal: subTotal.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
      total: subTotal.toString()
    }))
  }

  const handleSave = () => {
    if (cartItems.length === 0) {
      alert('Please add items to the return')
      return
    }

    if (!formData.searchCustomer) {
      alert('Please select a customer')
      return
    }

    // Here you would save the sales return
    console.log('Saving sales return:', {
      customer: formData.searchCustomer,
      items: cartItems,
      totals: {
        subTotal: formData.subTotal,
        grandTotal: formData.grandTotal
      },
      formData
    })
    
    alert('Sales return saved successfully!')
  }

  const handleReset = () => {
    setFormData({
      searchItem: '',
      searchCustomer: '',
      saleInvoice: '',
      institutionName: '',
      contactNo: '',
      customerAddress: '',
      voucherNo: '',
      entryDate: getTodayFormatted(),
      discountRs: '0',
      discountPercent: '0',
      GSTRs: '0',
      GSTPercent: '0',
      total: '0',
      narration: '',
      discountGSTMethod: 'Individual Item',
      salesReturnAcc: 'Sales Return',
      grandTotal: '0.00',
      subTotal: '0.00'
    })
    setCartItems([])
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="bg-teal-600 text-white px-6 py-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Sales Return Entry</h2>
          <p className="text-sm opacity-90">Item cart / Product cart Information</p>
        </div>

        <div className="p-6">
          {/* Search Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Section - Item Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Item</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={formData.searchItem}
                  onChange={(e) => handleInputChange('searchItem', e.target.value)}
                  placeholder="Search for items..."
                />
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              {formData.searchItem && (
                <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-sm max-h-32 overflow-y-auto">
                  {items
                    .filter(item => item.name.toLowerCase().includes(formData.searchItem.toLowerCase()))
                    .map(item => (
                      <div
                        key={item.id}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                        onClick={() => handleInputChange('searchItem', item.name)}
                      >
                        {item.name} - Rate: ₹ {item.rate}
                      </div>
                    ))}
                  {!items.some(item => item.name.toLowerCase().includes(formData.searchItem.toLowerCase())) && (
                    <div className="px-4 py-2 text-gray-500 text-sm">No options</div>
                  )}
                </div>
              )}

              {/* Discount and GST Section */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Discount (Rs)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.discountRs}
                    onChange={(e) => handleInputChange('discountRs', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Discount %</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.discountPercent}
                    onChange={(e) => handleInputChange('discountPercent', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">GST (Rs)</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.GSTRs}
                    onChange={(e) => handleInputChange('GSTRs', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">GST %</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    value={formData.GSTPercent}
                    onChange={(e) => handleInputChange('GSTPercent', e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs text-gray-600 mb-1">Total</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  value={formData.total}
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Press Enter Key to sales Cart</p>
              </div>

              <button
                onClick={addToCart}
                className="mt-4 w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                ADD TO CART
              </button>
            </div>

            {/* Right Section - Customer Information */}
            <div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-4">Customer, Item/ Product Cart & Total Amounts Information</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Search Customer</label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                        value={formData.searchCustomer}
                        onChange={(e) => handleInputChange('searchCustomer', e.target.value)}
                        placeholder="Search customer..."
                      />
                      <ChevronDown className="absolute right-3 top-3 h-3 w-3 text-gray-400" />
                    </div>
                    {formData.searchCustomer && (
                      <div className="mt-1 bg-white border border-gray-200 rounded shadow-sm max-h-24 overflow-y-auto">
                        {customers
                          .filter(customer => customer.name.toLowerCase().includes(formData.searchCustomer.toLowerCase()))
                          .map(customer => (
                            <div
                              key={customer.id}
                              className="px-3 py-1 hover:bg-gray-50 cursor-pointer text-xs"
                              onClick={() => handleCustomerSelect(customer)}
                            >
                              {customer.name}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Sale Invoice</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={formData.saleInvoice}
                      onChange={(e) => handleInputChange('saleInvoice', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Institution Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={formData.institutionName}
                      onChange={(e) => handleInputChange('institutionName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Contact No</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={formData.contactNo}
                      onChange={(e) => handleInputChange('contactNo', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Customer address</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={formData.customerAddress}
                      onChange={(e) => handleInputChange('customerAddress', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Voucher No</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={formData.voucherNo}
                      onChange={(e) => handleInputChange('voucherNo', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs text-gray-600 mb-1">Entry Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      value={formData.entryDate}
                      onChange={(e) => handleInputChange('entryDate', e.target.value)}
                    />
                    <Calendar className="absolute right-3 top-3 h-3 w-3 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Items Table */}
          {cartItems.length > 0 && (
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-8 gap-2 text-xs font-semibold text-gray-700 border-b pb-2 mb-4">
                  <div>SL Item Name</div>
                  <div>QTY</div>
                  <div>Return Qty</div>
                  <div>Rate (Per)</div>
                  <div>Discount %</div>
                  <div>GST %</div>
                  <div>Total</div>
                  <div>Actions</div>
                </div>

                {cartItems.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-8 gap-2 text-xs py-2 border-b">
                    <div className="font-medium">{item.name}</div>
                    <div>
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1 text-xs"
                        value={item.qty}
                        onChange={(e) => updateCartItem(item.id, 'qty', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1 text-xs"
                        value={item.returnQty}
                        onChange={(e) => updateCartItem(item.id, 'returnQty', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1 text-xs"
                        value={item.rate}
                        onChange={(e) => updateCartItem(item.id, 'rate', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1 text-xs"
                        value={item.discountPercent}
                        onChange={(e) => updateCartItem(item.id, 'discountPercent', e.target.value)}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        className="w-full border rounded px-2 py-1 text-xs"
                        value={item.GSTPercent}
                        onChange={(e) => updateCartItem(item.id, 'GSTPercent', e.target.value)}
                      />
                    </div>
                    <div className="font-medium text-green-600">
                      ₹ {item.total.toFixed(2)}
                    </div>
                    <div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 text-xs"
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Narration */}
          <div className="mb-6">
            <label className="block text-xs text-gray-600 mb-1">SL Item Name</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 h-20"
              value={formData.narration}
              onChange={(e) => handleInputChange('narration', e.target.value)}
              placeholder="Narration..."
            />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Discount and GST Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Discount and GST Method</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="discountGSTMethod"
                    value="On Total"
                    checked={formData.discountGSTMethod === 'On Total'}
                    onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">On Total</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="discountGSTMethod"
                    value="Individual Item"
                    checked={formData.discountGSTMethod === 'Individual Item'}
                    onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">Individual Item</span>
                </label>
              </div>
            </div>

            {/* Sales Return Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Choose a Sales Return Acc</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formData.salesReturnAcc}
                onChange={(e) => handleInputChange('salesReturnAcc', e.target.value)}
              >
                {salesReturnAccounts.map(acc => (
                  <option key={acc} value={acc}>{acc}</option>
                ))}
              </select>
            </div>

            {/* Totals */}
            <div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="mb-3">
                  <label className="block text-xs text-gray-600 mb-1">Sub Total (Rs)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                    value={formData.subTotal}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Grand Total (Rs)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 font-medium"
                    value={formData.grandTotal}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleReset}
              className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <RotateCcw size={16} />
              RESET
            </button>
            <button
              onClick={handleSave}
              className="bg-teal-600 text-white px-8 py-2 rounded hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              SAVE SALES RETURN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}