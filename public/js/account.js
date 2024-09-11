
document.getElementById('createAccountForm').onsubmit = function(event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernamePattern = /^[a-zA-Z0-9]+$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,}$/;
    
    if (!usernamePattern.test(username)) {
        alert('Username can only contain letters and digits.');
        event.preventDefault();
    } else if (!passwordPattern.test(password)) {
        alert('Password must be at least 4 characters long and contain at least one letter and one digit. No special characters');
        event.preventDefault();
    }
};
