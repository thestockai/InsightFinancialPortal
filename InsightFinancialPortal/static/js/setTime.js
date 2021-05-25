// var time = 60
function setTime(obj,time) {
    if (time == 0) {
        obj.removeAttribute("disabled");

        obj.innerHTML = 'Send Codes'
        return
    } else {
        // console.log('time:'+time)
        obj.setAttribute("disabled", true);
        obj.innerHTML ='Resend (' + time + 's)'
        time--
        setTimeout(function () { setTime(obj, time) }, 1000)
    }
}
