function onSuccess_Sign_In(googleUser) {
    let email = googleUser.getBasicProfile().getEmail()
    // let name = googleUser.getBasicProfile().getName()
    // console.log(email+','+name)
    $.ajax(
        {
            method : 'post',
            url : 'google_Account_signIn',
            data : {'email' : email},
            dataType : 'json',
            success : function(result){
                if(result.code == '200'){
                    alert('successfully loged in!')
                    window.location.href = result.url
                }else{
                    window.location.href = result.url
                }
            }
        }
    )
}
function onSuccess_Sign_Up(googleUser) {
    let email = googleUser.getBasicProfile().getEmail()
    let name = googleUser.getBasicProfile().getName()
    // console.log(email+','+name)
    
}
function onFailure(error) {
    console.log(error);
}
function renderButton_Sign_In() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 360,
        'height': 50,
        'longtitle': true,
        'theme': 'transparent',
        'font-size':18,
        'border-radius': 25,
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
function renderButton_Sign_Up() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 360,
        'height': 50,
        'longtitle': true,
        'theme': 'transparent',
        'font-size':18,
        'border-radius': 25,
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}