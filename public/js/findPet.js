document.getElementById('adoptForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const petType = document.querySelector('input[name="petType"]:checked');
    const breed = document.getElementById('breed').value.trim();
    const age = document.getElementById('age').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const getAlong = document.querySelectorAll('input[name="getAlong"]:checked');

    // Clear previous error messages
    let errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(msg => msg.remove());

    let isValid = true;

    // Validate pet type
    if (!petType) {
        isValid = false;
        document.getElementById('petTypeQuestion').insertAdjacentHTML('afterend', '<div class="error">Please specify a pet type.</div>');
    }

    // Validate breed
    if (breed === '') {
        isValid = false;
        document.getElementById('breedQuestion').insertAdjacentHTML('afterend', '<div class="error">Please specify the breed.</div>');
    }

    // Validate age
    if (age === '') {
        isValid = false;
        document.getElementById('ageQuestion').insertAdjacentHTML('afterend', '<div class="error">Age is required.</div>');
    }

    // Validate gender
    if (gender === '') {
        isValid = false;
        document.getElementById('genderQuestion').insertAdjacentHTML('afterend', '<div class="error">Please choose a gender.</div>');
    }

    // Validate get along
    if (getAlong.length === 0) {
        isValid = false;
        document.getElementById('getAlongQuestion').insertAdjacentHTML('afterend', '<div class="error">Please select at least one option.</div>');
    }

    // Submit form if valid
    if (isValid) {
        event.currentTarget.submit();
    }
});
