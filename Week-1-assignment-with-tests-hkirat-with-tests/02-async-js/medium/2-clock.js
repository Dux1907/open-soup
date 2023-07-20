// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)
setInterval(function print() {
    console.clear()
    var a
    if (new Date().getHours() > 11)
        a = 'PM'
    else
        a = 'AM'
    console.log(new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ' ' + a)
}, 1000)

// setInterval(function print() {
//     console.clear()
//     console.log(new Date().toLocaleTimeString())
// },1000)
