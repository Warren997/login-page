document.querySelector('#showRegister').addEventListener('click', () => {
    document.querySelector('#registerForm').style.display = 'block'
    document.querySelector('#logInForm').style.display = 'none'
})

document.querySelector('#showLogin').addEventListener('click', () => {
    document.querySelector('#registerForm').style.display = 'none'
    document.querySelector('#logInForm').style.display = 'block'
})





//