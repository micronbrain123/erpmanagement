'use client'

import { useState, useEffect } from 'react'

export default function AttendanceEntry() {
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
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }

  // Convert YYYY-MM-DD to DD/MM/YYYY for display
  const formatDateForDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split('-')
    return `${day}/${month}/${year}`
  }

  // Get current month and year
  const getCurrentMonth = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return months[new Date().getMonth()]
  }

  const getCurrentYear = () => {
    return new Date().getFullYear().toString()
  }

  const [attendanceDate, setAttendanceDate] = useState(getTodayFormatted())
  const [payYear, setPayYear] = useState(getCurrentYear())
  const [payMonth, setPayMonth] = useState(getCurrentMonth())
  
  // Base employee template
  const employeeTemplate = [
    {
      id: 1,
      sl: 1,
      employeeName: 'John Doe',
      department: 'IT Department',
      designation: 'Software Engineer',
      contact: '+8801234567890'
    },
    {
      id: 2,
      sl: 2,
      employeeName: 'Jane Smith',
      department: 'Account',
      designation: 'Cashier',
      contact: '+8801234567891'
    },
    {
      id: 3,
      sl: 3,
      employeeName: 'Khawar Zahid',
      department: 'Logistics',
      designation: 'Junior Accountant',
      contact: '+97165856633'
    },
    {
      id: 4,
      sl: 4,
      employeeName: 'Ahmed Khan',
      department: 'HR',
      designation: 'HR Manager',
      contact: '+8801234567892'
    },
    {
      id: 5,
      sl: 5,
      employeeName: 'Maria Rodriguez',
      department: 'Sales',
      designation: 'Sales Executive',
      contact: '+8801234567893'
    }
  ]

  // Create fresh attendance data with default values
  const createFreshAttendanceData = () => {
    return employeeTemplate.map(emp => ({
      ...emp,
      present: false,
      absence: false,
      leaveWithPay: false,
      leaveWithoutPay: false
    }))
  }

  // Store attendance data by date
  const [attendanceByDate, setAttendanceByDate] = useState({})
  const [attendanceData, setAttendanceData] = useState(createFreshAttendanceData())

  const [counts, setCounts] = useState({
    present: 0,
    absence: 0,
    leaveWithPay: 0,
    leaveWithoutPay: 0
  })

  // Calculate counts whenever attendance data changes
  useEffect(() => {
    const newCounts = {
      present: attendanceData.filter(emp => emp.present).length,
      absence: attendanceData.filter(emp => emp.absence).length,
      leaveWithPay: attendanceData.filter(emp => emp.leaveWithPay).length,
      leaveWithoutPay: attendanceData.filter(emp => emp.leaveWithoutPay).length
    }
    setCounts(newCounts)
  }, [attendanceData])

  // Load attendance data for selected date
  const loadAttendanceForDate = (date) => {
    if (attendanceByDate[date]) {
      setAttendanceData(attendanceByDate[date])
    } else {
      // No data for this date, load fresh template
      setAttendanceData(createFreshAttendanceData())
    }
  }

  const handleDateChange = (value) => {
    // Convert YYYY-MM-DD to DD/MM/YYYY
    const formattedDate = formatDateForDisplay(value)
    setAttendanceDate(formattedDate)
    
    // Auto-update month and year based on selected date
    const date = new Date(value)
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    setPayMonth(months[date.getMonth()])
    setPayYear(date.getFullYear().toString())

    // Load attendance data for this date
    loadAttendanceForDate(formattedDate)
  }

  const handleAttendanceChange = (employeeId, type) => {
    setAttendanceData(prev => prev.map(employee => {
      if (employee.id === employeeId) {
        // Reset all attendance types first
        const updated = {
          ...employee,
          present: false,
          absence: false,
          leaveWithPay: false,
          leaveWithoutPay: false
        }
        // Set the selected type
        updated[type] = true
        return updated
      }
      return employee
    }))
  }

  const handleCheck = () => {
    // Validate date format
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
    if (!dateRegex.test(attendanceDate)) {
      alert('Please select a valid attendance date')
      return
    }

    console.log('Loading attendance for:', { attendanceDate, payYear, payMonth })
    
    // Load attendance data for the selected date
    loadAttendanceForDate(attendanceDate)
    
    const hasData = attendanceByDate[attendanceDate]
    if (hasData) {
      alert(`Attendance data loaded for ${attendanceDate}!`)
    } else {
      alert(`No existing attendance data found for ${attendanceDate}. Ready for new entry.`)
    }
  }

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>Attendance Entry Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; color: #0f766e; margin-bottom: 10px; }
            .report-title { font-size: 18px; margin-bottom: 20px; }
            .date-info { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; font-size: 12px; }
            th { background-color: #f2f2f2; font-weight: bold; }
            .status-yes { background-color: #dcfce7; color: #166534; text-align: center; }
            .status-no { background-color: #fee2e2; color: #dc2626; text-align: center; }
            .summary { margin-top: 20px; }
            .summary-item { display: inline-block; margin-right: 30px; margin-bottom: 10px; }
            .footer { margin-top: 40px; text-align: center; font-size: 10px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">Fayullah Factory</div>
            <div class="report-title">Attendance Entry Report</div>
            <div class="date-info">
              Date: ${attendanceDate} | Month: ${payMonth} | Year: ${payYear}
            </div>
            <div>Generated on: ${new Date().toLocaleString()}</div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Contact</th>
                <th>Present</th>
                <th>Absence</th>
                <th>Leave with Pay</th>
                <th>Leave without Pay</th>
              </tr>
            </thead>
            <tbody>
              ${attendanceData.map(emp => `
                <tr>
                  <td>${emp.sl}</td>
                  <td>${emp.employeeName}</td>
                  <td>${emp.department}</td>
                  <td>${emp.designation}</td>
                  <td>${emp.contact}</td>
                  <td class="${emp.present ? 'status-yes' : 'status-no'}">${emp.present ? 'YES' : 'NO'}</td>
                  <td class="${emp.absence ? 'status-yes' : 'status-no'}">${emp.absence ? 'YES' : 'NO'}</td>
                  <td class="${emp.leaveWithPay ? 'status-yes' : 'status-no'}">${emp.leaveWithPay ? 'YES' : 'NO'}</td>
                  <td class="${emp.leaveWithoutPay ? 'status-yes' : 'status-no'}">${emp.leaveWithoutPay ? 'YES' : 'NO'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="summary">
            <h3>Summary</h3>
            <div class="summary-item"><strong>Present:</strong> ${counts.present}</div>
            <div class="summary-item"><strong>Absence:</strong> ${counts.absence}</div>
            <div class="summary-item"><strong>Leave with Pay:</strong> ${counts.leaveWithPay}</div>
            <div class="summary-item"><strong>Leave without Pay:</strong> ${counts.leaveWithoutPay}</div>
            <div class="summary-item"><strong>Total Employees:</strong> ${attendanceData.length}</div>
          </div>
          
          <div class="footer">
            Attendance Report - Fayullah Factory Management System
          </div>
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  const handleSave = () => {
    // Validate that at least some attendance is marked
    const hasAttendance = attendanceData.some(emp => 
      emp.present || emp.absence || emp.leaveWithPay || emp.leaveWithoutPay
    )
    
    if (!hasAttendance) {
      alert('Please mark attendance for at least one employee before saving.')
      return
    }

    // Save attendance data for this specific date
    setAttendanceByDate(prev => ({
      ...prev,
      [attendanceDate]: [...attendanceData]
    }))

    const attendanceReport = {
      date: attendanceDate,
      month: payMonth,
      year: payYear,
      employees: attendanceData,
      summary: counts,
      totalEmployees: attendanceData.length,
      savedAt: new Date().toISOString()
    }
    
    console.log('Saving attendance report:', attendanceReport)
    console.log('All saved dates:', Object.keys({...attendanceByDate, [attendanceDate]: attendanceData}))
    alert(`Attendance saved successfully for ${attendanceDate}!`)
  }

  const handleExport = () => {
    const csvContent = [
      ['Fayullah Factory - Attendance Report'],
      [`Date: ${attendanceDate} | Month: ${payMonth} | Year: ${payYear}`],
      [`Generated on: ${new Date().toLocaleString()}`],
      [],
      ['SL', 'Employee Name', 'Department', 'Designation', 'Contact', 'Present', 'Absence', 'Leave with Pay', 'Leave without Pay'],
      ...attendanceData.map(emp => [
        emp.sl,
        emp.employeeName,
        emp.department,
        emp.designation,
        emp.contact,
        emp.present ? 'YES' : 'NO',
        emp.absence ? 'YES' : 'NO',
        emp.leaveWithPay ? 'YES' : 'NO',
        emp.leaveWithoutPay ? 'YES' : 'NO'
      ]),
      [],
      ['Summary'],
      ['Present', counts.present],
      ['Absence', counts.absence],
      ['Leave with Pay', counts.leaveWithPay],
      ['Leave without Pay', counts.leaveWithoutPay],
      ['Total Employees', attendanceData.length]
    ].map(row => Array.isArray(row) ? row.join(',') : row).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `attendance_${attendanceDate.replace(/\//g, '-')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const markAllPresent = () => {
    setAttendanceData(prev => prev.map(emp => ({
      ...emp,
      present: true,
      absence: false,
      leaveWithPay: false,
      leaveWithoutPay: false
    })))
  }

  const markAllAbsent = () => {
    setAttendanceData(prev => prev.map(emp => ({
      ...emp,
      present: false,
      absence: true,
      leaveWithPay: false,
      leaveWithoutPay: false
    })))
  }

  const clearAll = () => {
    setAttendanceData(prev => prev.map(emp => ({
      ...emp,
      present: false,
      absence: false,
      leaveWithPay: false,
      leaveWithoutPay: false
    })))
  }

  // Quick date shortcuts
  const setToday = () => {
    const today = getTodayFormatted()
    setAttendanceDate(today)
    setPayMonth(getCurrentMonth())
    setPayYear(getCurrentYear())
    loadAttendanceForDate(today)
  }

  const setYesterday = () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const formattedDate = formatDateForDisplay(yesterday.toISOString().split('T')[0])
    setAttendanceDate(formattedDate)
    
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    setPayMonth(months[yesterday.getMonth()])
    setPayYear(yesterday.getFullYear().toString())
    loadAttendanceForDate(formattedDate)
  }

  // Generate years for dropdown (current year ± 2)
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear - 2; i <= currentYear + 2; i++) {
    years.push(i.toString())
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Get saved dates count for display
  const savedDatesCount = Object.keys(attendanceByDate).length
  const hasDataForCurrentDate = !!attendanceByDate[attendanceDate]

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="bg-teal-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
          <h2 className="font-medium text-lg">Attendance Entry</h2>
          <div className="text-right">
            <div className="text-sm font-semibold">Fayullah Factory</div>
            <div className="text-xs opacity-90">Attendance Management System</div>
          </div>
        </div>
        
        <div className="p-6">
          {/* Date Selection Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Select Pay of Year */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Select Pay of Year</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={payYear}
                onChange={(e) => setPayYear(e.target.value)}
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Select Pay of Month */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Select Pay of Month</label>
              <select 
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={payMonth}
                onChange={(e) => setPayMonth(e.target.value)}
              >
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            {/* Attendance Date */}
            <div>
              <label className="block text-xs text-gray-600 mb-1">Attendance Date</label>
              <input 
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                value={formatDateForInput(attendanceDate)}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>

            {/* Check Button */}
            <div className="flex items-end">
              <button 
                onClick={handleCheck}
                className="bg-cyan-500 text-white px-6 py-2 rounded text-sm hover:bg-cyan-600 transition-colors w-full"
              >
                CHECK
              </button>
            </div>
          </div>

          {/* Date Shortcuts */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={setToday}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Today
            </button>
            <button 
              onClick={setYesterday}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            >
              Yesterday
            </button>
          </div>

          {/* Current Date Display with Status */}
          <div className="text-sm text-gray-600 mb-4">
            Selected Date: <span className="font-medium">{attendanceDate}</span>
            <span className="ml-4">Month/Year: <span className="font-medium">{payMonth} {payYear}</span></span>
            {hasDataForCurrentDate ? (
              <span className="ml-4 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">✓ Data Saved</span>
            ) : (
              <span className="ml-4 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">⚠ Unsaved</span>
            )}
            {savedDatesCount > 0 && (
              <span className="ml-2 text-xs text-gray-500">({savedDatesCount} dates saved)</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={markAllPresent}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors"
            >
              Mark All Present
            </button>
            <button 
              onClick={markAllAbsent}
              className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Mark All Absent
            </button>
            <button 
              onClick={clearAll}
              className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700 transition-colors"
            >
              Clear All
            </button>
            <div className="flex-1"></div>
            <button 
              onClick={handlePrint}
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              🖨️ Print
            </button>
            <button 
              onClick={handleExport}
              className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              📤 Export
            </button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{counts.present}</div>
              <div className="text-xs text-green-700">Present</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{counts.absence}</div>
              <div className="text-xs text-red-700">Absent</div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{counts.leaveWithPay}</div>
              <div className="text-xs text-blue-700">Leave (Paid)</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">{counts.leaveWithoutPay}</div>
              <div className="text-xs text-orange-700">Leave (Unpaid)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">SL</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Employee Name</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Department</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Designation</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold text-gray-700">Contact</th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      </span>
                      Present
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      </span>
                      Absence
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      </span>
                      Leave with Pay
                    </div>
                  </th>
                  <th className="text-center py-3 px-2 text-xs font-semibold text-gray-700">
                    <div className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      </span>
                      Leave without Pay
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((employee) => (
                  <tr key={employee.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 text-sm">{employee.sl}</td>
                    <td className="py-3 px-2 text-sm font-medium">{employee.employeeName}</td>
                    <td className="py-3 px-2 text-sm">{employee.department}</td>
                    <td className="py-3 px-2 text-sm">{employee.designation}</td>
                    <td className="py-3 px-2 text-sm">{employee.contact}</td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleAttendanceChange(employee.id, 'present')}
                        className={`w-12 py-1 rounded text-xs font-medium transition-colors ${
                          employee.present 
                            ? 'bg-green-200 text-green-800 border border-green-300' 
                            : 'bg-red-200 text-red-800 border border-red-300 hover:bg-red-300'
                        }`}
                      >
                        {employee.present ? 'YES' : 'NO'}
                      </button>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleAttendanceChange(employee.id, 'absence')}
                        className={`w-12 py-1 rounded text-xs font-medium transition-colors ${
                          employee.absence 
                            ? 'bg-green-200 text-green-800 border border-green-300' 
                            : 'bg-red-200 text-red-800 border border-red-300 hover:bg-red-300'
                        }`}
                      >
                        {employee.absence ? 'YES' : 'NO'}
                      </button>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleAttendanceChange(employee.id, 'leaveWithPay')}
                        className={`w-12 py-1 rounded text-xs font-medium transition-colors ${
                          employee.leaveWithPay 
                            ? 'bg-green-200 text-green-800 border border-green-300' 
                            : 'bg-red-200 text-red-800 border border-red-300 hover:bg-red-300'
                        }`}
                      >
                        {employee.leaveWithPay ? 'YES' : 'NO'}
                      </button>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button
                        onClick={() => handleAttendanceChange(employee.id, 'leaveWithoutPay')}
                        className={`w-12 py-1 rounded text-xs font-medium transition-colors ${
                          employee.leaveWithoutPay 
                            ? 'bg-green-200 text-green-800 border border-green-300' 
                            : 'bg-red-200 text-red-800 border border-red-300 hover:bg-red-300'
                        }`}
                      >
                        {employee.leaveWithoutPay ? 'YES' : 'NO'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold">
                  <td colSpan="5" className="py-3 px-2 text-sm text-right">Counting Total :</td>
                  <td className="py-3 px-2 text-center text-sm text-green-600">{counts.present}</td>
                  <td className="py-3 px-2 text-center text-sm text-red-600">{counts.absence}</td>
                  <td className="py-3 px-2 text-center text-sm text-blue-600">{counts.leaveWithPay}</td>
                  <td className="py-3 px-2 text-center text-sm text-orange-600">{counts.leaveWithoutPay}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button 
              onClick={handleSave}
              className="bg-teal-600 text-white px-6 py-2 rounded text-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              💾 SAVE ATTENDANCE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}