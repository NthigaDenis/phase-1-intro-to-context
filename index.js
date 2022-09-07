// Your code here
function createEmployeeRecord(details) {
    let employee = {
        timeInEvents: [],
        timeOutEvents: []
    }
    employee.firstName = details[0];
    employee.familyName = details[1];
    employee.title = details[2];
    employee.payPerHour = details[3];
    return employee;
}
//createEmployeeRecord(['Julian', 'Mark', 'Cleaner', 2]);
//Creates a 'database' of employee records, by using the create employee function
// Gets values from an array
function createEmployeeRecords(employeeData) {
    return employeeData.map(data => {
        return createEmployeeRecord(data)
    })
}
//Time in
function createTimeInEvent(employee, dateStamp) {
    let timeInEvent = {
        // creates the correct type
        type: "TimeIn",
        // extracts the correct hour - 1300
        hour: parseInt((dateStamp).split(" ")[1]),
        // extracts the correct date - 2018-01-01
        date: dateStamp.split(" ")[0]
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
};
//Time out
function createTimeOutEvent(employee, dateStamp) {
    let timeOutEvent = {
        // creates the correct type
        type: "TimeOut",
        // extracts the correct hour - 1300
        hour: parseInt((dateStamp).split(" ")[1]),
        // extracts the correct date - 2018-01-01
        date: dateStamp.split(" ")[0]
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
};
// calculates the hours worked when given an employee record and a date ("YYYY-MM-DD")
function hoursWorkedOnDate(employee, givenDate) {
    let inEvent = employee.timeInEvents.find((event) => {
        return event.date === givenDate
    })
    let outEvent = employee.timeOutEvents.find(event => {
        return event.date === givenDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}
//Wages Earned
function wagesEarnedOnDate(employee, givenDate) {
    let grossWage = hoursWorkedOnDate(employee, givenDate)
        * employee.payPerHour
    return parseFloat(grossWage.toString())
}
function allWagesFor(employee) {
    let eligibleDates = employee.timeInEvents.map(event => {
        return event.date
    })
    let payableHours = eligibleDates.reduce((memo, date) => {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return payableHours
}
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((memo, record) => {
        return memo + allWagesFor(record)
    }, 0)
}
