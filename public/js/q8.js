function updateDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', options);
}

updateDateTime();

setInterval(updateDateTime, 1000);