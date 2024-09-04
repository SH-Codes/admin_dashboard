function updateDateTime() {
  const dateTimeDisplay = document.querySelector('.date-time-display');
  const now = new Date();
  
  // Get day of the week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[now.getDay()];

  // Get date
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = now.getFullYear();

  // Get time
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Format date and time
  const formattedDate = `${dayOfWeek}, ${month}/${day}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Update the display
  dateTimeDisplay.textContent = `${formattedDate}, ${formattedTime}`;
}

// Update every second
setInterval(updateDateTime, 1000);

// Initial call to set the date and time immediately
updateDateTime();
