'use client'

import { useState } from 'react'

export default function ServiceExpenseEntry() {
  const [formData, setFormData] = useState({
    searchItem: '',
    searchSupplier: '',
    supplierName: 'General Supplier',
    institutionName: '',
    contactNo: '',
    supplierAddress: '',
    voucherNo: '',
    entryDate: '2025-08-18',
    discount: '0',
    discountPercent: '0',
    GST: '0',
    GSTPercent: '0',
    total: '',
    slItemName: '',
    qty: '',
    ratePerItem: '',
    discountPercentItem: '',
    GSTPercentItem: '',
    itemTotal: '',
    discountGSTMethod: 'individual',
    serviceExpenseAccount: '',
    subTotal: '0.00',
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

  const handleAddToCart = () => {
    console.log('Adding to cart:', formData)
  }

  const handleSaveServiceExpense = () => {
    console.log('Saving service expense:', formData)
  }

  const handleReset = () => {
    const today = new Date().toISOString().split('T')[0]
    setFormData({
      searchItem: '',
      searchSupplier: '',
      supplierName: 'General Supplier',
      institutionName: '',
      contactNo: '',
      supplierAddress: '',
      voucherNo: '',
      entryDate: today,
      discount: '0',
      discountPercent: '0',
      GST: '0',
      GSTPercent: '0',
      total: '',
      slItemName: '',
      qty: '',
      ratePerItem: '',
      discountPercentItem: '',
      GSTPercentItem: '',
      itemTotal: '',
      discountGSTMethod: 'individual',
      serviceExpenseAccount: '',
      subTotal: '0.00',
      grandTotal: '0.00',
      paidAmount: '0',
      dueAmount: '0'
    })
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm m-4 text-sm">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Service Expense Entry</h2>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Section - Item cart / Product cart Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Item cart / Product cart Information</h3>
          
          {/* Search Item */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">Search Item</label>
            <div className="relative">
              <input
                type="text"
                value={formData.searchItem}
                onChange={(e) => handleInputChange('searchItem', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder=""
              />
              <div className="absolute right-3 top-2.5 text-gray-400">▼</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">No options</div>
          </div>

          {/* Discount and GST Section */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Discount (Rs)</label>
              <input
                type="text"
                value={formData.discount}
                onChange={(e) => handleInputChange('discount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Discount %</label>
              <input
                type="text"
                value={formData.discountPercent}
                onChange={(e) => handleInputChange('discountPercent', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">GST (Rs)</label>
              <input
                type="text"
                value={formData.GST}
                onChange={(e) => handleInputChange('GST', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">GST %</label>
              <input
                type="text"
                value={formData.GSTPercent}
                onChange={(e) => handleInputChange('GSTPercent', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* Total Section */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-600 mb-1">Total</label>
            <input
              type="text"
              value={formData.total}
              onChange={(e) => handleInputChange('total', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <div className="text-xs text-gray-500 mt-1">Press Enter Key to service_expense Cart</div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-gray-600 text-white px-6 py-2 rounded text-sm hover:bg-gray-700 transition-colors font-medium"
          >
            ADD TO CART
          </button>
        </div>

        {/* Right Section - Creditor/Supplier Information */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Creditor/ Supplier, Item/ Product Cart & Total Amounts Information</h3>
          
          {/* Search Supplier and Supplier Name */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Search Supplier</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.searchSupplier}
                  onChange={(e) => handleInputChange('searchSupplier', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Search Supplier"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">▼</div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Supplier Name</label>
              <input
                type="text"
                value={formData.supplierName}
                onChange={(e) => handleInputChange('supplierName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Institution Name and Entry Date/Voucher */}
          <div className="grid grid-cols-2 gap-4 mb-4">
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
              </div>
            </div>
          </div>

          {/* Contact No and Supplier Address */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">contact No</label>
              <input
                type="text"
                value={formData.contactNo}
                onChange={(e) => handleInputChange('contactNo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Supplier address</label>
              <input
                type="text"
                value={formData.supplierAddress}
                onChange={(e) => handleInputChange('supplierAddress', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
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
                <td className="border border-gray-300 px-3 py-2">
                  <textarea
                    value={formData.slItemName}
                    onChange={(e) => handleInputChange('slItemName', e.target.value)}
                    className="w-full border-0 resize-none focus:ring-0 text-sm bg-transparent"
                    placeholder="Narration..."
                    rows="3"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    value={formData.qty}
                    onChange={(e) => handleInputChange('qty', e.target.value)}
                    className="w-full border-0 focus:ring-0 text-sm bg-transparent"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    value={formData.ratePerItem}
                    onChange={(e) => handleInputChange('ratePerItem', e.target.value)}
                    className="w-full border-0 focus:ring-0 text-sm bg-transparent"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    value={formData.discountPercentItem}
                    onChange={(e) => handleInputChange('discountPercentItem', e.target.value)}
                    className="w-full border-0 focus:ring-0 text-sm bg-transparent"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    value={formData.GSTPercentItem}
                    onChange={(e) => handleInputChange('GSTPercentItem', e.target.value)}
                    className="w-full border-0 focus:ring-0 text-sm bg-transparent"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  <input
                    type="text"
                    value={formData.itemTotal}
                    onChange={(e) => handleInputChange('itemTotal', e.target.value)}
                    className="w-full border-0 focus:ring-0 text-sm bg-transparent"
                  />
                </td>
                <td className="border border-gray-300 px-3 py-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Right Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div></div> {/* Empty left space */}
        
        <div className="space-y-4">
          {/* Discount and GST Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Discount and GST Method</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="discountGSTMethod"
                  value="total"
                  checked={formData.discountGSTMethod === 'total'}
                  onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                  className="mr-3 text-teal-600"
                />
                <span className="text-sm text-gray-700">On Total</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="discountGSTMethod"
                  value="individual"
                  checked={formData.discountGSTMethod === 'individual'}
                  onChange={(e) => handleInputChange('discountGSTMethod', e.target.value)}
                  className="mr-3 text-teal-600"
                />
                <span className="text-sm text-gray-700">Individual Item</span>
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
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-gray-50"
              readOnly
            />
          </div>

          {/* Choose Service Expense Account */}
          <div>
            <div className="relative">
              <select
                value={formData.serviceExpenseAccount}
                onChange={(e) => handleInputChange('serviceExpenseAccount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none text-gray-500"
              >
                <option value="">Choose Service Expense Account</option>
                <option value="expense1">Service Expense Account 1</option>
                <option value="expense2">Service Expense Account 2</option>
                <option value="expense3">Service Expense Account 3</option>
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
              onClick={handleSaveServiceExpense}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2 font-medium"
            >
              <span>💾</span>
              SAVE SERVICE EXPENSE
            </button>
            <button
              onClick={handleReset}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors font-medium"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}