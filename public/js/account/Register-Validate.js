$(document).ready(()=>{

})
let rules = [
    {
        key : 'email',
        value : $("#email"),
        rule : 'required|email|maxlength[50]'
    },
    {
        key : 'firstname',
        value : $("#firstname"),
        rule : 'required'
    },
    {
        key : 'lastname',
        value : $("#lastname"),
        rule : 'required'
    },
    {
        key : 'address',
        value : $("#address"),
        rule : ''
    },
    {
        key : 'phonenumber',
        value : $("#phonenumber"),
        rule : 'required|phone'
    },
    {
        key : 'username',
        value : $("#username"),
        rule : 'required'
    },
    {
        key :'password',
        value: $("#password"),
        rule : 'required|password|minlength[6]'
    },
    {
        key :'re-password',
        value: $("#re-password"),
        rule : 'required|match'
    }

]


function validPhone(){

}
function validEmail(){

}
function isEmpty(){

}
function validPassword(){

}
function checkRePass(){

}
function minlength(){

}
function maxlength(){

}