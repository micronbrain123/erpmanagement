'use client'

import { useState, useEffect } from 'react'

export default function DashboardContent() {
  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  // Update time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      
      // Format time (11:13:50 AM)
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      
      // Format date (12 AUG 2025)
      const dateString = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).toUpperCase()
      
      setCurrentTime(timeString)
      setCurrentDate(dateString)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Sample data for the dashboard
  const salesData = [
    { month: 'August', amount: '₹ 2,005.00' },
    { month: 'July', amount: '₹ 858,388.00' },
    { month: 'June', amount: '₹ 75,970.00' },
    { month: 'May', amount: '₹ 849,445.33' }
  ]

  const todayData = [
    { label: 'Today Due Collection', amount: '₹ 0.00' },
    { label: 'Today Sales', amount: '₹ 0.00' },
    { label: 'Today Expense', amount: '₹ 5.00' },
    { label: 'Today Profit/ Loss', amount: '₹ 0.00' }
  ]

  const balanceData = [
    { account: 'Cash In Hand', balance: '₹ 1,512,992,558.50' },
    { account: 'Bank Accounts', balance: '₹ 6,224,604.00' },
    { account: 'Customer Due', balance: '₹ 1,340,202.00' },
    { account: 'Supplier Due', balance: '₹ -3,404,497.42' }
  ]

  const modules = [
    { name: 'SALES MODULE', color: 'bg-teal-600' },
    { name: 'ACCOUNTS MODULE', color: 'bg-indigo-600' },
    { name: 'POS MODULE', color: 'bg-blue-600' },
    { name: 'PURCHASE MODULE', color: 'bg-teal-500' },
    { name: 'INVENTORY MODULE', color: 'bg-green-600' },
    { name: 'MANUFACTURING MODULE', color: 'bg-gray-600' }
  ]

  return (
    <div className=" bg-gray-50 min-h-screen text-sm">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Branch and User Info */}
        <div className="text-green-700">
          <div className="text-sm font-medium">
            Branch: <span className="text-gray-800">Durgapur, West Bengal</span> 
            <br />
            User: <span className="text-gray-800">abc</span>
          </div>
          <div className="text-sm font-medium">
            <span className="text-gray-800">Mummy Care Management</span>
          </div>
        </div>

        {/* Account Resolver Badge */}
        <div className="bg-teal-600 text-white px-6 py-2 rounded-full">
          <span className="font-semibold text-sm">ACCOUNT RESOLVER</span>
          <div className="text-xs text-center">Mummy Care Management</div>
        </div>

        {/* Date and Time */}
        <div className="text-right">
          <div className="text-green-600 font-medium text-xs mb-1">Durgapur, West Bengal</div>
          <div className="text-teal-600 font-bold text-xl">{currentTime}</div>
          <div className="text-gray-700 font-medium text-xs">{currentDate}</div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Sales of Last 4 Months */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="bg-green-400 text-white px-3 py-2 rounded-t-lg">
            <h3 className="font-medium text-sm text-center">Sales of the Last 4 Months</h3>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="font-semibold text-gray-700 pb-2">Particular Month</div>
              <div className="font-semibold text-gray-700 pb-2">Sold Amount</div>
              {salesData.map((item, index) => (
                <div key={index} className="contents">
                  <div className="py-1 text-gray-600"> {item.month}</div>
                  <div className="py-1 font-medium">{item.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today Summary */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="bg-green-400 text-white px-3 py-2 rounded-t-lg">
            <h3 className="font-medium text-sm text-center">Today Summary</h3>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="font-semibold text-gray-700 pb-2">Particular Account</div>
              <div className="font-semibold text-gray-700 pb-2">Amount</div>
              {todayData.map((item, index) => (
                <div key={index} className="contents">
                  <div className="py-1 text-gray-600"> {item.label}</div>
                  <div className="py-1 font-medium">{item.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Balance Summary */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="bg-green-400 text-white px-3 py-2 rounded-t-lg">
            <h3 className="font-medium text-sm text-center">Balance Summary</h3>
          </div>
          <div className="p-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="font-semibold text-gray-700 pb-2">Particular Account</div>
              <div className="font-semibold text-gray-700 pb-2">Balance</div>
              {balanceData.map((item, index) => (
                <div key={index} className="contents">
                  <div className="py-1 text-gray-600"> {item.account}</div>
                  <div className="py-1 font-medium">{item.balance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {modules.map((module, index) => (
          <div
            key={index}
            className={`${module.color} text-white p-3 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">📊</div>
              <div className="text-xs font-medium leading-tight">{module.name}</div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  )
}