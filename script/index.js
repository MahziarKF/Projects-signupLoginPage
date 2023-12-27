const userEntry = document.getElementById('usernameEntry')
const passEntry = document.getElementById('passwordEntry')
const userEntryNew = document.getElementById('usernameEntryNew')
const passEntryNew = document.getElementById('passwordEntryNew')
const passEntryNewConfirm = document.getElementById('passwordEntryNewConfirm')
const emailEntry = document.getElementById('emailEntry')
const loginBtn = document.getElementById('loginBtn')
const signupBtn = document.getElementById('signupBtn')
const signupDiv = document.getElementById('signupDiv')
const changeToSignupBtn = document.getElementById('changeToSignupBtn')
const changeToLoginBtn = document.getElementById('changeToLoginBtn')
const loginDiv = document.getElementById('loginDiv')
const changeDiv = document.getElementById('changeDiv')
const actionStats = document.getElementById('actionStats')
const holder = document.getElementById('holder')
const infoImg = document.getElementById('infoImg')
const link = document.getElementById('link')
let p1 = {

}
loadAccount()
function loadAccount() {
    if (localStorage.getItem('personUsername') != null && localStorage.getItem('autoLogin') === 'on') {
        renderProfile()
        alert('you have been logged back into your account (You can disable this feature in profile settings)')
    }
    if (localStorage.getItem('autoLogin') === 'on') {
        document.getElementById('autoLoginBtnOn').style.display = 'none'
        document.getElementById('autoLoginBtnOff').style.display = 'inline-block'
    }
    // if (localStorage.getItem('autoLogin') === null || localStorage.getItem('autoLogin') === undefined) {
    //     let el = document.getElementById('autoLoginStats')
    //     el.innerHTML = `Not Selected`
    // }
}
function Person(username,password,email) {
    this.username = username
    this.password = password
    this.email = email
}
infoImg.addEventListener('mouseover', () => {
    infoImg.style.animationName = 'expand1'
    infoImg.style.animationDuration = '1s'
    infoImg.style.width = '60px'
    infoImg.style.height = '60px'
})
infoImg.addEventListener('mouseout', () => {
    infoImg.style.animationName = 'expand2'
    infoImg.style.animationDuration = '1s'
    infoImg.style.width = '50px'
    infoImg.style.height = '50px'
})
link.addEventListener('click', () => {
    alert(`
    ADDED : 
    - added new username rules
    - added empty or null detector for password and username
    -
    Last Update : 27 December
    `)
})
signupBtn.addEventListener('click', () => {
    if (userEntryNew.value != localStorage.getItem('personUsername')) {
        if (emailEntry.value != localStorage.getItem('personEmail')){
            if (emailEntry.value != null || emailEntry.value != undefined) {
                if (userEntryNew.value != null || userEntryNew.value == undefined) {
                    if (passEntryNew.value === passEntryNewConfirm.value) {
                            if (passwordChecked() === true && usernameChecked() === true){
                            p1 = new Person(userEntryNew.value,passEntryNew.value,emailEntry.value)
                            // let p1 = {
                            //     username: userEntryNew.value,
                            //     password: passEntryNew.value,
                            //     email: emailEntry.value
                            // }
                            JSON.stringify(p1.username)
                            localStorage.setItem('personUsername', p1.username)
                            
                            JSON.stringify(p1.password)
                            localStorage.setItem('personPassword', p1.password)
                            
                            JSON.stringify(p1.email)
                            localStorage.setItem('personEmail', p1.email)
                            renderProfile()
                        }
                    } else {
                        alert("Your passwords do not match.")
                    }
                } else {
                    alert("Please enter a valid username.")
                }
            } else {
                alert("Please enter an email address.") 
            }
        } else {
            alert("The email you entered already exists.\n Please log in or try another email.")
        }
    } else {
        alert("This username is currently under use.")
    }
})
loginBtn.addEventListener('click', () => {
    if (userEntry.value === localStorage.getItem('personUsername') && passEntry.value === localStorage.getItem('personPassword')) {
        renderProfile()
    } else {
        alert("wrong username or password")
    }
})
function usernameChecked() {
    username = userEntryNew.value
    if (username.length >= 5) {
        if (userEntryNew.value != undefined || userEntryNew.value != null) {
            if (userEntryNew.value[0] != 0 && userEntryNew.value[0] != 1 && userEntryNew.value[0] != 2 && userEntryNew.value[0] != 3 && userEntryNew.value[0] != 5 && userEntryNew.value[0] != 6 && userEntryNew.value[0] != 7 && userEntryNew.value[0] != 8 && userEntryNew.value[0] != 9 && userEntryNew.value[0] != 4) {
                return true
            } else {
                usernameSecurityMissing(2)
                return false
            }
        } else {
            usernameSecurityMissing(1)
            return false
        }
    } else {2
        usernameSecurityMissing(0)
        return false
    }
    
}
function usernameSecurityMissing(type) {
    if (type === 0) {
        alert('Username must be 5 letters or longer')
    } else if (type === 1) { 
        alert('Username field cannot be empty')
    } else if (type === 2) {
        alert('Username cannot start with a number')
    }
}
changeToLoginBtn.addEventListener('click', function() {
    signupDiv.style.display = 'none'
    loginDiv.style.display = 'inline-block'
    signupBtn.style.display = 'none'
    userEntryNew.style.display = 'none'
    passEntryNew.style.display = 'none'
    passEntryNewConfirm.style.display = 'none'
    loginBtn.style.display = 'inline-block'
    userEntry.style.display = 'inline-block'
    passEntry.style.display = 'inline-block'
    changeToLoginBtn.style.display = 'none'
    changeToSignupBtn.style.display = 'inline-block'
})
changeToSignupBtn.addEventListener('click', function() {
    loginDiv.style.display = 'none'
    signupDiv.style.display = 'inline-block'
    signupBtn.style.display = 'inline-block'
    userEntryNew.style.display = 'inline-block'
    passEntryNew.style.display = 'inline-block'
    passEntryNewConfirm.style.display = 'inline-block'
    loginBtn.style.display = 'none'
    userEntry.style.display = 'none'
    passEntry.style.display = 'none'
    changeToLoginBtn.style.display = 'inline-block'
    changeToSignupBtn.style.display = 'none'
})
function renderProfile() {
    holder.innerHTML = 
    `
        <p id='usernameDisplay'>Your Username : ${localStorage.getItem('personUsername')}</p>
        <p id='passwordDisplay'>Your Password : ********</p>
        <button onclick='revalPassword()' id='showPasswordBtn'>SHOW PASSWORD</button>
        <button onclick='hidePassword()' id='hidePasswordBtn'>HIDE PASSWORD</button>
        <br><button id='changePasswordBtn' onclick='changePassword()'>CHANGE PASSWORD</button>
        <p id='emailDisplay'>Email : ${localStorage.getItem('personEmail')}</p>
        <button onclick='changeEmail()' id='changeEmailBtn'>CHANGE EMAIL</button><br>
        <p id='autoLoginStats'>Auto Login Stats : ${localStorage.getItem('autoLogin')}</p><br>
        <button id='autoLoginBtnOn' onclick='autoLoginOn()'>AUTO LOGIN</button><button id='autoLoginBtnOff' onclick='autoLoginOff()'>AUTO LOGIN</button><br>
        <button id='deleteAccountBtn' onclick='deleteAccount()'>DELETE ACCOUNT</button>
    `
}
function changeEmail() {
    let passInput = prompt('Enter your password to continue.')
    if (passInput === localStorage.getItem('personPassword')) {
        let emailInput = prompt('Enter new email please.')
        let actionConfirm2 = confirm('Are you sure you want to change your email ?')
        if (actionConfirm2 === true) {
            alert('email successfully changed')
            localStorage.setItem("personEmail", emailInput)
            document.getElementById('emailDisplay').textContent = `Email :${localStorage.getItem('personEmail')}`
            location.reload();
        } else {
            alert('email changing process canceled by user')
        }
    } else {
        alert('wrong password')
    }
}
function revalPassword() {
    document.getElementById('hidePasswordBtn').style.display = 'inline-block'
    document.getElementById('showPasswordBtn').style.display = 'none'
    document.getElementById('passwordDisplay').textContent = `Your Password : ${localStorage.getItem('personPassword')}`
}
function hidePassword() {
    document.getElementById('hidePasswordBtn').style.display = 'none'
    document.getElementById('showPasswordBtn').style.display = 'inline-block'
    document.getElementById('passwordDisplay').textContent = `Your Password : ********`
}
function changePassword() {
    fromProfileToChangePassword()
}
function fromProfileToChangePassword() {
    holder.innerHTML = 
    `
        <div id="changePasswordDiv">
            <input class="input1" type="text" id="oldPassword" value="oldPassword"><br>
            <input class="input1" type="text" id="newPassword" value="newPassword"><br>
            <input class="input1" type="text" id="newPasswordConfirm" value="newPasswordConfirm"><br>
            <button id='completeChangingPasswordBtn' onclick='checkAndConfirmAndChangePassword()'>COMPLETE</button>
        </div>
    `
    document.getElementById('changePasswordDiv').style.display = 'inline-block'
}
function checkAndConfirmAndChangePassword() {
    let oldPassword = document.getElementById('oldPassword')
    let newPasswordConfirm = document.getElementById('newPassword')
    let newPassword = document.getElementById('newPasswordConfirm')
    if (oldPassword.value != newPassword.value || oldPassword.value != newPasswordConfirm.value) {
        if (oldPassword.value === localStorage.getItem('personPassword')){
            if (newPassword.value === newPasswordConfirm.value){
                    if (passwordChecked2() === true && passwordChecked3() === true) {
                    alert('Are you sure about changing your password?')
                    let actionConfirm = confirm('Please Click OK to confirm password change or click cancel to cancel')
                    if (actionConfirm === true) {
                        changeOldToNewPassword(newPassword.value)
                    } else {
                        let reload = confirm('operation canceled, reload page?')
                        if (reload === true) {
                            location.reload()
                        } 
                    }
                }
            } else {
                alert('new passwords do not match!')
            } 
        } else {
            alert('old password is incorrect')
        }
    } else {
        alert('old and new passwords should be different!')
    }
}
function changeOldToNewPassword(password) {
    JSON.stringify(password)
    localStorage.setItem('personPassword', password)
    alert("your password has been changed, for security reason page will be refreshed please login again.")
    localStorage.setItem('autoLogin', 'off')
    location.reload()
}
function passwordChecked() {
    let pass = passEntryNew.value
    if (passEntryNew.value != null || passEntryNew.value != undefined) {
        if (checkIfSymbolsAreIncluded(passEntryNew.value) === true) {
            if (hasNumber(passEntryNew.value) === true) {
                if (pass.length > 8) {
                    return true
                } else {
                    passwordSecurityMissing(3)
                    return false
                }
            } else {
                passwordSecurityMissing(2)
                return false
            }
        } else {
            passwordSecurityMissing(1)
            return false
        }
    } else {
        passwordSecurityMissing(0)
        return false
    }
}
function checkIfSymbolsAreIncluded(text) { 
    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '.'];
    return specialCharacters.some(character => text.includes(character));
}
function passwordSecurityMissing(type) {
    if (type === 0) {
        alert('Password field is empty!')
    } else if (type === 1) {
        alert('your password must include a symbol (! @ # $ % ^ & * .)')
    } else if (type === 2) {
        alert('your password must include 1 number or more')
    } else if (type === 3) {
        alert('your password must be 8 characters or longer')
    }
}
function hasNumber(text) {
    return /\d/.test(text);
}
function passwordChecked2() {
    let pass = localStorage.getItem('personPassword')
    if (localStorage.getItem('personPassword').length > 8) {
        if (checkIfSymbolsAreIncluded(localStorage.getItem('personPassword')) === true) {
            if (hasNumber(localStorage.getItem('personPassword')) === true) {
                return true
            } else {
                passwordSecurityMissing(2)
                return false
            }
        } else {
            passwordSecurityMissing(1)
            return false
        }
    } else {
        passwordSecurityMissing(0)
        return false
    }
}
function passwordChecked3() {
    let pass = newPassword.value
    if (pass.length > 8) {
        if (checkIfSymbolsAreIncluded(newPassword.value) === true) {
            if (hasNumber(newPassword.value) === true) {
                return true
            } else {
                passwordSecurityMissing(2)
                return false
            }
        } else {
            passwordSecurityMissing(1)
            return false
        }
    } else {
        passwordSecurityMissing(0)
        return false
    }
}
function autoLoginOn() {
    localStorage.setItem('autoLogin', 'on')
    document.getElementById('autoLoginBtnOff').style.display = 'inline-block'
    document.getElementById('autoLoginBtnOn').style.display = 'none'
    document.getElementById('autoLoginStats').textContent = 'Auto Login Stats : on'
}
function autoLoginOff() {
    localStorage.setItem('autoLogin', 'off')
    document.getElementById('autoLoginBtnOff').style.display = 'none'
    document.getElementById('autoLoginBtnOn').style.display = 'inline-block'
    document.getElementById('autoLoginStats').textContent = 'Auto Login Stats : off'
}
function deleteAccount() {
    let randomNumber = Math.floor(Math.random()*10000)
    let confirmationNumber = String(randomNumber)
    let deleteAccountConfirm = prompt(`please Enter The Following Randomly generated number : ${confirmationNumber}`)
    if (deleteAccountConfirm === confirmationNumber) {
        localStorage.clear()
        alert('Account Successfully Deleted')
        location.reload()
    } else {
        alert("Wrong Confirmation Number")
    }
}