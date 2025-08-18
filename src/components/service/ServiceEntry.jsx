'use client'

import { useState } from 'react'

export default function ServiceEntry() {
  const [formData, setFormData] = useState({
    searchItem: '',
    searchCustomer: '',
    customerName: 'General Customer',
    institutionName: '',
    contactNo: '',
    customerAddress: '',
    voucherNo: 'SV10',
    entryDate: '2025-08-18', // Changed to ISO format for date input
    discount: '0',
    discountPercent: '0',
    GST: '0',
    GSTPercent: '0',
    total: '',
    slItemName: '',
    qty: '',
    ratePerItem: '',
    discountPercent: '',
    GSTPercent: '',
    subTotal: '0.00',
    discountGSTMethod: 'individual',
    servicesAccount: '',
    grandTotal: '0.00',
    paidAmount: '0',
    dueAmount: '0'
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Format date for display (DD/MM/YYYY)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  // Get today's date in ISO format
  const getTodayISO = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', formData)
  }

  const handleSave = () => {
    console.log('Saving service entry:', formData)
  }

  const handleReset = () => {
    setFormData({
      searchItem: '',
      searchCustomer: '',
      customerName: 'General Customer',
      institutionName: '',
      contactNo: '',
      customerAddress: '',
      voucherNo: 'SV10',
      entryDate: getTodayISO(),
      discount: '0',
      discountPercent: '0',
      GST: '0',
      GSTPercent: '0',
      total: '',
      slItemName: '',
      qty: '',
      ratePerItem: '',
      discountPercent: '',
      GSTPercent: '',
      subTotal: '0.00',
      discountGSTMethod: 'individual',
      servicesAccount: '',
      grandTotal: '0.00',
      paidAmount: '0',
      dueAmount: '0'
    })
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm m-4 text-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Service Entry</h2>
      
      {/* Item Cart / Product Cart Information Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Item cart / Product cart Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Search Item */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Search Item</label>
            <div className="relative">
              <input
                type="text"
                value={formData.searchItem}
                onChange={(e) => handleInputChange('searchItem', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Search Item"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">▼</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">No options</div>
          </div>

          {/* Search Customer */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Search Customer</label>
            <div className="relative">
              <input
                type="text"
                value={formData.searchCustomer}
                onChange={(e) => handleInputChange('searchCustomer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Search Customer"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">▼</div>
            </div>
          </div>
        </div>

        {/* Discount and GST Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Discount (Rs)</label>
            <input
              type="text"
              value={formData.discount}
              onChange={(e) => handleInputChange('discount', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Discount %</label>
            <input
              type="text"
              value={formData.discountPercent}
              onChange={(e) => handleInputChange('discountPercent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">GST (Rs)</label>
            <input
              type="text"
              value={formData.GST}
              onChange={(e) => handleInputChange('GST', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">GST %</label>
            <input
              type="text"
              value={formData.GSTPercent}
              onChange={(e) => handleInputChange('GSTPercent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Total and Add to Cart */}
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">Total</label>
            <input
              type="text"
              value={formData.total}
              onChange={(e) => handleInputChange('total', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <div className="text-xs text-gray-500 mt-1">Press Enter Key to service Cart</div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Customer Information Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Debtor/ Customer, Item/ Product Cart & Total Amounts Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Customer Name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Institution Name</label>
            <input
              type="text"
              value={formData.institutionName}
              onChange={(e) => handleInputChange('institutionName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Voucher No</label>
              <input
                type="text"
                value={formData.voucherNo}
                onChange={(e) => handleInputChange('voucherNo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Entry Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.entryDate}
                  onChange={(e) => handleInputChange('entryDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Selected: {formatDateForDisplay(formData.entryDate)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Contact No</label>
            <input
              type="text"
              value={formData.contactNo}
              onChange={(e) => handleInputChange('contactNo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Customer address</label>
            <input
              type="text"
              value={formData.customerAddress}
              onChange={(e) => handleInputChange('customerAddress', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Service Items Table */}
      <div className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-600">SL Item Name</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-600">QTY</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-600">Rate (Per)</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-600">Discount %</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-600">GST %</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-600">Total</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-xs font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-8">
                  <textarea
                    value={formData.slItemName}
                    onChange={(e) => handleInputChange('slItemName', e.target.value)}
                    className="w-full border-0 resize-none focus:ring-0 text-sm"
                    placeholder="Narration..."
                    rows="3"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2"></td>
                <td className="border border-gray-300 px-3 py-2"></td>
                <td className="border border-gray-300 px-3 py-2"></td>
                <td className="border border-gray-300 px-3 py-2"></td>
                <td className="border border-gray-300 px-3 py-2"></td>
                <td className="border border-gray-300 px-3 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Side Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div></div> {/* Empty space for left column */}
        
        <div className="space-y-4">
          {/* Discount and GST Method */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Discount and GST Method</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="discountGSTMethod"
                  value="total"
                  checked={formData.discountGSTMethod === 'total'}
                  onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">On Total</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="discountGSTMethod"
                  value="individual"
                  checked={formData.discountGSTMethod === 'individual'}
                  onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">Individual Item</span>
              </label>
            </div>
          </div>

          {/* Sub Total */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Sub Total (Rs)</label>
            <input
              type="text"
              value={formData.subTotal}
              onChange={(e) => handleInputChange('subTotal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              readOnly
            />
          </div>

          {/* Select Services Account */}
          <div>
            <div className="relative">
              <select
                value={formData.servicesAccount}
                onChange={(e) => handleInputChange('servicesAccount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
              >
                <option value="">Select Services Account</option>
                <option value="account1">Service Account 1</option>
                <option value="account2">Service Account 2</option>
              </select>
              <div className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">▼</div>
            </div>
          </div>

          {/* Grand Total */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Grand Total (Rs)</label>
            <input
              type="text"
              value={formData.grandTotal}
              onChange={(e) => handleInputChange('grandTotal', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Paid and Due Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Paid Amount</label>
              <input
                type="text"
                value={formData.paidAmount}
                onChange={(e) => handleInputChange('paidAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Due Amount</label>
              <input
                type="text"
                value={formData.dueAmount}
                onChange={(e) => handleInputChange('dueAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <span>💾</span>
              SAVE SERVICES
            </button>
            <button
              onClick={handleReset}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}