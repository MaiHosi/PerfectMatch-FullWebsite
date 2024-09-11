
// Handle pet form validation
document.getElementById('petForm').addEventListener('submit', function(event) {
    const fname = document.getElementById('fname').value.trim();
    const familyname = document.getElementById('familyname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const pet = document.querySelector('input[name="pet"]:checked');
    const breed = document.getElementById('breed').value.trim();
    const otherBreed = document.getElementById('otherBreed').value.trim();
    const age = document.getElementById('age').value.trim();
    const sex = document.querySelector('input[name="sex"]:checked');
    const getAlong = document.querySelectorAll('input[name="getAlong"]:checked');
    const neutered = document.querySelector('input[name="neutered"]:checked');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/; 
    let isValid = true;

    // Remove previous error messages
    let errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(msg => msg.remove());

    // Validate fields
    if (fname === '') {
        isValid = false;
        document.getElementById('fname').insertAdjacentHTML('afterend', '<div class="error">First Name is required.</div>');
    }

    if (familyname === '') {
        isValid = false;
        document.getElementById('familyname').insertAdjacentHTML('afterend', '<div class="error">Family Name is required.</div>');
    }

    if (email === '') {
        isValid = false;
        document.getElementById('email').insertAdjacentHTML('afterend', '<div class="error">Email is required.</div>');
    } else if (!emailPattern.test(email)) {
        isValid = false;
        document.getElementById('email').insertAdjacentHTML('afterend', '<div class="error">Email format is invalid.</div>');
    }

    if (phone === '') {
        isValid = false;
        document.getElementById('phone').insertAdjacentHTML('afterend', '<div class="error">Phone number is required.</div>');
    } else if (!phonePattern.test(phone)) {
        isValid = false;
        document.getElementById('phone').insertAdjacentHTML('afterend', '<div class="error">Phone number format is invalid. It should be 10 digits.</div>');
    }

    if (!pet) {
        isValid = false;
        document.getElementById('petType').insertAdjacentHTML('afterend', '<div class="error">Please specify.</div>');
    }

    if (breed === '') {
        isValid = false;
        document.getElementById('breed').insertAdjacentHTML('afterend', '<div class="error">Breed is required.</div>');
    }

    if (otherBreed === '') {
        isValid = false;
        document.getElementById('otherBreed').insertAdjacentHTML('afterend', '<div class="error">Please specify the breed.</div>');
    }

    if (age === '') {
        isValid = false;
        document.getElementById('age').insertAdjacentHTML('afterend', '<div class="error">Age is required.</div>');
    }

    if (!sex) {
        isValid = false;
        document.getElementById('sexQuestion').insertAdjacentHTML('afterend', '<div class="error">Please select the sex of your pet.</div>');
    }

    if (getAlong.length === 0) {
        isValid = false;
        document.getElementById('getAlong').insertAdjacentHTML('afterend', '<div class="error">Please select at least one option for how your pet gets along.</div>');
    }

    if (!neutered) {
        isValid = false;
        document.getElementById('neutered').insertAdjacentHTML('afterend', '<div class="error">Please specify.</div>');
    }

    if (!isValid) {
        event.preventDefault();
    }
});


document.getElementById('petForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather form data
    const formData = new FormData(this);

    // Convert form data to a JSON object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send data to the server
    fetch('/submitPetForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Pet information submitted successfully!');
            // Optionally, redirect to another page or clear the form
            document.getElementById('petForm').reset();
        } else {
            alert('There was an error submitting the form.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

