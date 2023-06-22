const inputs = Array.from(document.querySelectorAll('input'));
const showPasswordBtn = document.getElementById('showPasswordBtn');


inputs.forEach(input => {
    input.addEventListener('input', inputListener);
})

showPasswordBtn.addEventListener('click', showPassword)