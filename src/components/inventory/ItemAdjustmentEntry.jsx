'use client'

import { useState } from 'react'

export default function ItemAdjustmentEntry() {
  // Get today's date in DD/MM/YYYY format
  const getTodayFormatted = () => {
    const today = new Date()
    const day = today.getDate().toString().padStart(2, '0')
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const year = today.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Convert DD/MM/YYYY to YYYY-MM-DD for date input
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return ''
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }

  // Convert YYYY-MM-DD to DD/MM/YYYY for display
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return ''
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  }

  const [formData, setFormData] = useState({
    searchItem: '',
    adjustType: 'Damage Stock',
    voucherNo: 'A001',
    entryDate: getTodayFormatted(),
    narration: '',
    subTotal: 0.00
  })

  const [cartItems, setCartItems] = useState([])
  const [showItemDropdown, setShowItemDropdown] = useState(false)

  const availableItems = [
    { id: 1, name: 'Rice Premium', rate: 85.00, unit: 'kg' },
    { id: 2, name: 'Wheat Flour', rate: 45.00, unit: 'kg' },
    { id: 3, name: 'Sugar White', rate: 65.00, unit: 'kg' },
    { id: 4, name: 'Oil Soybean', rate: 120.00, unit: 'ltr' },
    { id: 5, name: 'Salt Refined', rate: 25.00, unit: 'kg' }
  ]

  const adjustmentTypes = [
    'Damage Stock',
    'Lost Stock',
    'Expired Stock',
    'Stock Increase',
    'Stock Decrease',
    'Correction Entry'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDateChange = (value) => {
    const formattedDate = formatDateForDisplay(value)
    handleInputChange('entryDate', formattedDate)
  }

  const addToCart = () => {
    if (!formData.searchItem) {
      alert('Please select an item')
      return
    }

    const selectedItem = availableItems.find(item => item.name === formData.searchItem)
    if (!selectedItem) {
      alert('Selected item not found')
      return
    }

    const newItem = {
      id: Date.now(),
      sl: cartItems.length + 1,
      itemName: selectedItem.name,
      adjustType: formData.adjustType,
      qty: 1,
      rate: selectedItem.rate,
      total: selectedItem.rate * 1
    }

    setCartItems(prev => [...prev, newItem])
    setFormData(prev => ({ ...prev, searchItem: '' }))
    setShowItemDropdown(false)
    calculateTotals([...cartItems, newItem])
  }

  const updateCartItem = (id, field, value) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === 'qty' || field === 'rate') {
            updatedItem.total = (parseFloat(updatedItem.qty) || 0) * (parseFloat(updatedItem.rate) || 0)
          }
          return updatedItem
        }
        return item
      })
      calculateTotals(updated)
      return updated
    })
  }

  const removeCartItem = (id) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      setCartItems(prev => {
        const updated = prev.filter(item => item.id !== id)
        // Re-index the serial numbers
        const reIndexed = updated.map((item, index) => ({
          ...item,
          sl: index + 1
        }))
        calculateTotals(reIndexed)
        return reIndexed
      })
    }
  }

  const calculateTotals = (items) => {
    const subTotal = items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0)
    setFormData(prev => ({
      ...prev,
      subTotal: subTotal
    }))
  }

  const handleSaveAdjustment = () => {
    // Validation
    if (!formData.adjustType) {
      alert('Please select an adjustment type')
      return
    }

    if (cartItems.length === 0) {
      alert('Please add at least one item to adjust')
      return
    }

    if (!formData.entryDate) {
      alert('Please select entry date')
      return
    }

    // Simulate saving
    const adjustmentData = {
      voucherNo: formData.voucherNo,
      entryDate: formData.entryDate,
      adjustType: formData.adjustType,
      items: cartItems,
      narration: formData.narration,
      subTotal: formData.subTotal,
      createdAt: new Date().toISOString()
    }

    console.log('Item Adjustment Entry Saved:', adjustmentData)
    alert(`Item Adjustment Entry ${formData.voucherNo} saved successfully!`)
    
    // Auto-generate next voucher number
    const nextVoucherNum = parseInt(formData.voucherNo.replace('A', '')) + 1
    setFormData(prev => ({
      ...prev,
      voucherNo: `A${nextVoucherNum.toString().padStart(3, '0')}`
    }))
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      setFormData({
        searchItem: '',
        adjustType: 'Damage Stock',
        voucherNo: 'A001',
        entryDate: getTodayFormatted(),
        narration: '',
        subTotal: 0.00
      })
      setCartItems([])
      setShowItemDropdown(false)
    }
  }

  const filteredItems = availableItems.filter(item =>
    item.name.toLowerCase().includes(formData.searchItem.toLowerCase())
  )

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg">
          <h2 className="font-medium text-lg">Item Adjustment Entry</h2>
        </div>
        
        <div className="p-6">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Side - Item Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Item cart / Product cart information</h3>
              
              {/* Search Item */}
              <div className="mb-4 relative">
                <label className="block text-xs text-gray-600 mb-1">Search Item</label>
                <input
                  type="text"
                  placeholder="Search Item"
                  value={formData.searchItem}
                  onChange={(e) => {
                    handleInputChange('searchItem', e.target.value)
                    setShowItemDropdown(true)
                  }}
                  onFocus={() => setShowItemDropdown(true)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                
                {/* Dropdown for items */}
                {showItemDropdown && filteredItems.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
                    {filteredItems.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          handleInputChange('searchItem', item.name)
                          setShowItemDropdown(false)
                        }}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {item.name} - {item.rate} Rs/{item.unit}
                      </div>
                    ))}
                  </div>
                )}
                
                {showItemDropdown && filteredItems.length === 0 && formData.searchItem && (
                  <div className="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1">
                    <div className="px-3 py-2 text-sm text-gray-500">No options</div>
                  </div>
                )}
              </div>

              {/* Adjust Type */}
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1">Adjust Type</label>
                <div className="space-y-2">
                  {adjustmentTypes.map((type, index) => (
                    <label key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="adjustType"
                        value={type}
                        checked={formData.adjustType === type}
                        onChange={(e) => handleInputChange('adjustType', e.target.value)}
                        className="mr-2 text-teal-600"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total and Add to Cart */}
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1">Total</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Press Enter Key to add to Cart"
                    readOnly
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50"
                  />
                  <button
                    onClick={addToCart}
                    className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Item Cart Information */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Item Cart Information</h3>
              
              <div className="grid grid-cols-1 gap-4 mb-4">
                {/* Voucher No and Entry Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Voucher No</label>
                    <input
                      type="text"
                      value={formData.voucherNo}
                      onChange={(e) => handleInputChange('voucherNo', e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Entry Date</label>
                    <input
                      type="date"
                      value={formatDateForInput(formData.entryDate)}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Sub Total Display */}
              <div className="mb-4">
                <label className="block text-xs text-gray-600 mb-1">Sub Total (Rs)</label>
                <input
                  type="number"
                  value={formData.subTotal.toFixed(2)}
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-right font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">SL</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Item Name</th>
                    <th className="border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700">Adjust Type</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-xs font-semibold text-gray-700">QTY</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-xs font-semibold text-gray-700">Rate (Per)</th>
                    <th className="border border-gray-300 px-3 py-2 text-right text-xs font-semibold text-gray-700">Total</th>
                    <th className="border border-gray-300 px-3 py-2 text-center text-xs font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-xs text-center">{item.sl}</td>
                        <td className="border border-gray-300 px-3 py-2 text-xs">{item.itemName}</td>
                        <td className="border border-gray-300 px-3 py-2 text-xs">{item.adjustType}</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">
                          <input
                            type="number"
                            value={item.qty}
                            onChange={(e) => updateCartItem(item.id, 'qty', e.target.value)}
                            className="w-16 text-xs text-center border rounded px-1 py-1"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-right">
                          <input
                            type="number"
                            value={item.rate}
                            onChange={(e) => updateCartItem(item.id, 'rate', e.target.value)}
                            className="w-20 text-xs text-right border rounded px-1 py-1"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-xs text-right">
                          {item.total.toFixed(2)}
                        </td>
                        <td className="border border-gray-300 px-3 py-2 text-center">
                          <button
                            onClick={() => removeCartItem(item.id)}
                            className="text-red-600 hover:text-red-800 text-xs"
                            title="Remove Item"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="border border-gray-300 px-3 py-8 text-center text-gray-500 text-sm">
                        No items added to adjustment cart
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side - Narration */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Narration</label>
              <textarea
                value={formData.narration}
                onChange={(e) => handleInputChange('narration', e.target.value)}
                placeholder="Narration..."
                rows={4}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
              />
            </div>

            {/* Right Side - Action Buttons */}
            <div className="flex flex-col justify-end">
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveAdjustment}
                  className="flex-1 bg-teal-600 text-white px-6 py-3 rounded text-sm font-medium hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  🔒 SAVE
                </button>
                <button
                  onClick={handleReset}
                  className="bg-teal-600 text-white px-6 py-3 rounded text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  RESET
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}