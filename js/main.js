function updateDateTime() {
  const dateTimeDisplay = document.querySelector('.date-time-display');
 
  // Get day of the week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Get date
  const date = new Date();
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();

  // Get time
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  
  // Format date and time
  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  // Update the display
  dateTimeDisplay.textContent = `${dayOfWeek}, ${formattedDate} ${formattedTime}`
}

// Update every second
setInterval(updateDateTime, 1000);

// Initial call to set the date and time immediately
updateDateTime();

//Button navigation
function navigateTo(page) {
  window.location.href = page;
}


function changeLabelColor() {
  const selectElement = document.getElementById('MemberStatusSelect');
  const labelElement = document.getElementById('MemberStatus');

  const selectedValue = selectElement.value;

  // Reset label color
  labelElement.style.color = '';

  // Change label color based on the selected option
  if (selectedValue === 'Active') {
      labelElement.style.color = 'green';
  } else if (selectedValue === 'Inactive') {
      labelElement.style.color = 'orange';
  } else if (selectedValue === 'Deceased') {
      labelElement.style.color = 'red';
  }
}

changeLabelColor ();

function generateMembershipNumber() {
  const registrationDate = document.getElementById('RegistrationDate').value;
  const gender = document.getElementById('Gender').value;

  // Ensure both fields are filled
  if (!registrationDate || !gender) {
      alert('Please select both Registration Date and Gender');
      return;
  }

  // Extract the last two digits of the registration year
  const year = new Date(registrationDate).getFullYear().toString().slice(-2);

  // Gender mapping (1 for Male, 2 for Female)
  const genderMapping = { 'Male': '1', 'Female': '2' };
  const genderPart = genderMapping[gender] || '0';

 // Generate the last five random digits
const randomPart = Math.floor(10000 + Math.random() * 90000).toString();

  // Construct the 6-digit membership number
  const membershipNumber = year + genderPart + randomPart;

  // Set the generated membership number in the input field
  document.getElementById('MemberId').value = membershipNumber;
}