// Your code here
function createEmployeeRecord(array) {
    const employee = {
        firstName: `${array[0]}`,
        familyName: `${array[1]}`,
        title: `${array[2]}`,
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateTimeStamp) {
    const [date, hour] = dateTimeStamp.split(' ')
    employeeRecord.timeInEvents.push({
        type: 'TimeIn',
        date: date,
        hour: parseInt(hour, 10)
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTimeStamp) {
    const [date, hour] = dateTimeStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: parseInt(hour, 10)
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(function(employeeRecord){return employeeRecord.date === date})
    const timeOut = employeeRecord.timeOutEvents.find(function(employeeRecord){return employeeRecord.date === date})

    return (timeOut.hour - timeIn.hour) / 100
} 

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const wage = hoursWorked * employeeRecord.payPerHour

    return wage
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(function(e){ return e.date })

    let wages = datesWorked.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employeeRecord, date)
    }, 0)

    return wages
}

function calculatePayroll(employeeArray) {
    const payroll = employeeArray.reduce(function(memo, employees){
        return memo + allWagesFor(employees)
    }, 0)
    return payroll
}

function findEmployeeByFirstName(employees, firstName) {
    const foundEmployee = employees.find(function(record){
        return record.firstName === firstName
    })
    return foundEmployee
}