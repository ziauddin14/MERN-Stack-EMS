import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'

// Add Leave
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body

    // Find employee by userId 
    const employee = await Employee.findOne({ userId })

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" })
    }

    // Create new leave using employee's _id
    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    })

    await newLeave.save()
    return res.status(200).json({ success: true, message: "Leave added successfully" })
  } catch (error) {
    console.error("Add Leave Error:", error)
    return res.status(500).json({ success: false, error: "Leave add server error" })
  }
}

// Get Leaves by userId
const getLeaves = async (req, res) => {
  try {
    const { id } = req.params

    // Find employee by userId
    const employee = await Employee.findOne({ userId: id })

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" })
    }

    // Find all leaves of that employee
    const leaves = await Leave.find({ employeeId: employee._id })

    return res.status(200).json({ success: true, leaves })
  } catch (error) {
    console.error("Get Leave Error:", error)
    return res.status(500).json({ success: false, error: "Leave get server error" })
  }
}

export { addLeave, getLeaves }
