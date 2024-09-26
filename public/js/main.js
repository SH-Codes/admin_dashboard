function updateDateTime () {
  const dateTimeDisplay = document.querySelector('.date-time-display');
  const date = new Date();

  // Format date and time
  const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Update the display
  dateTimeDisplay.textContent = `${formattedDate} ${formattedTime}`;
}

// Update every second
setInterval(updateDateTime, 1000);

// Initial call to set the date and time immediately
updateDateTime();

// Button navigation
// function navigateTo (page) {
//   window.location.href = page;
// }

// navigateTo("dashboard.html");

function changeLabelColor () {
  const selectElement = document.getElementsByClassName('memberStatus');
  const labelElement = document.getElementsById('memberStatusLabel');

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

// Add event listener to call the function when the selection changes
document.getElementById('memberStatus').addEventListener('change', changeLabelColor);

changeLabelColor();

function generateMembershipNumber () {
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
  const genderMapping = { Male: '1', Female: '2' };
  const genderPart = genderMapping[gender] || '0';

  // Generate the last five random digits
  const randomPart = Math.floor(10000 + Math.random() * 90000).toString();

  // Construct the 6-digit membership number
  const membershipNumber = year + genderPart + randomPart;

  // Set the generated membership number in the input field
  document.getElementById('MemberId').value = membershipNumber;
}

document.getElementById('signInButton').addEventListener('click', function (event) {
  // Prevent default behavior (e.g., page refresh)
  event.preventDefault();

  // Clear previous error messages
  clearErrors();

  let valid = true;

  // Validate Email
  const email = document.getElementById('email').value;
  if (!validateEmail(email)) {
    setError('emailError', 'Please enter a valid email address');
    valid = false;
  }

  // Validate Password
  const password = document.getElementById('password').value;
  if (password.length < 6) {
    setError('passwordError', 'Password must be at least 6 characters long');
    valid = false;
  }

  // If valid, redirect to dashboard
  if (valid) {
    window.location.href = 'dashboard.html';
  }
});

// Clear any previous error messages
function clearErrors () {
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';
}

// Set error message for a field
function setError (id, message) {
  document.getElementById(id).textContent = message;
  document.getElementById("error").style.color = 'red';
}

// Validate email using regex
function validateEmail (email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

document.getElementById('saveMemberInfo').addEventListener('click', function (event) {
  // Prevent form submission to validate first
  event.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const birthDate = new Date(document.getElementById('birthDate').value);
  const gender = document.getElementById('gender').value;
  const maritalStatus = document.getElementById('maritalStatus').value;
  const employmentStatus = document.getElementById('employmentStatus').value;
  const occupation = document.getElementById('occupation').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const mobileNumber = document.getElementById('mobileNumber').value.trim();
  const email = document.getElementById('email').value.trim();
  const addressLine1 = document.getElementById('addressLine1').value.trim();
  const addressLine2 = document.getElementById('addressLine2').value.trim();
  const zoneArea = document.getElementById('zoneArea').value.trim();
  const postalCode = document.getElementById('postalCode').value.trim();

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;
  let errorMessage = '';

  // Validate First Name
  if (firstName === '') {
    errorMessage += 'First Name is required.\n';
    document.getElementById('firstName').style.borderColor = 'red';
    isValid = false;
  } else if (firstName.length < 4) {
    errorMessage += 'First Name must have at least 4 characters.\n';
    document.getElementById('firstName').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('firstName').style.borderColor = '';
  }

  // Validate Last Name
  if (lastName === '') {
    errorMessage += 'Last Name is required.\n';
    document.getElementById('lastName').style.borderColor = 'red';
    isValid = false;
  } else if (lastName.length < 4) {
    errorMessage += 'Last Name must have at least 4 characters.\n';
    document.getElementById('lastName').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('lastName').style.borderColor = '';
  }

  // Validate Birth Date
  if (birthDate >= new Date()) {
    errorMessage += 'Birth date cannot be today or in the future.\n';
    document.getElementById('birthDate').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('birthDate').style.borderColor = '';
  }

  // Validate Gender
  if (gender === '') {
    errorMessage += 'Gender is required.\n';
    document.getElementById('gender').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('gender').style.borderColor = '';
  }

  // Validate Marital Status
  if (maritalStatus === '') {
    errorMessage += 'Marital Status is required.\n';
    document.getElementById('maritalStatus').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('maritalStatus').style.borderColor = '';
  }

  // Validate Employment Status and Occupation
  if ((employmentStatus === 'Employed' || employmentStatus === 'Self Employed') && occupation === '') {
    errorMessage += 'Occupation is required for active employment status.\n';
    document.getElementById('occupation').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('occupation').style.borderColor = '';
  }

  // Validate Phone Number
  if (isNaN(phoneNumber) || phoneNumber.length !== 10) {
    errorMessage += 'Enter a valid Phone number with 10 digits.\n';
    document.getElementById('phoneNumber').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('phoneNumber').style.borderColor = '';
  }

  // Validate Mobile Number
  if (isNaN(mobileNumber) || mobileNumber.length !== 10) {
    errorMessage += 'Enter a valid Mobile number with 10 digits.\n';
    document.getElementById('mobileNumber').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('mobileNumber').style.borderColor = '';
  }

  // Validate Email
  if (!emailPattern.test(email)) {
    errorMessage += 'Please enter a valid email address.\n';
    document.getElementById('email').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('email').style.borderColor = '';
  }

  // Validate Address Line 1 and 2
  if (addressLine1 === '' || addressLine2 === '') {
    errorMessage += 'Address Line 1 and Address Line 2 cannot be empty.\n';
    document.getElementById('addressLine1').style.borderColor = 'red';
    document.getElementById('addressLine2').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('addressLine1').style.borderColor = '';
    document.getElementById('addressLine2').style.borderColor = '';
  }

  // Validate Zone Area
  if (zoneArea.length < 4 || zoneArea === '') {
    errorMessage += 'Zone area must have at least 4 characters.\n';
    document.getElementById('zoneArea').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('zoneArea').style.borderColor = '';
  }

  // Validate Postal Code
  if (isNaN(postalCode) || postalCode.length < 4 || postalCode.length > 5) {
    errorMessage += 'Postal Code must be a number and contain 4-5 digits.\n';
    document.getElementById('postalCode').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('postalCode').style.borderColor = '';
  }

  // Display error message if invalid
  if (!isValid) {
    alert(errorMessage); // You can also display this in a custom error container
  } else {
    // Submit the form or call any function like generateMembershipNumber()
    generateMembershipNumber();
  }
});

document.getElementById('spouseInfoForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const maidenName = document.getElementById('maidenName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const birthDate = new Date(document.getElementById('birthDate').value);
  const gender = document.getElementById('gender').value;
  const employmentStatus = document.getElementById('employmentStatus').value;
  const occupation = document.getElementById('occupation').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const mobileNumber = document.getElementById('mobileNumber').value.trim();
  const email = document.getElementById('email').value.trim();
  const spouseReligion = document.getElementById('spouseReligion').value.trim();

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;
  let errorMessage = '';

  // Validate First Name
  if (firstName === '') {
    errorMessage += 'First Name is required.\n';
    document.getElementById('firstName').style.borderColor = 'red';
    isValid = false;
  } else if (firstName.length < 4) {
    errorMessage += 'First Name must have at least 4 characters.\n';
    document.getElementById('firstName').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('firstName').style.borderColor = '';
  }

  // Validate Maiden Name
  if (maidenName !== '' && maidenName.length < 4) {
    errorMessage += 'Maiden Name must have at least 4 characters.\n';
    document.getElementById('maidenName').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('maidenName').style.borderColor = '';
  }

  // Validate Last Name
  if (lastName === '') {
    errorMessage += 'Last Name is required.\n';
    document.getElementById('lastName').style.borderColor = 'red';
    isValid = false;
  } else if (lastName.length < 4) {
    errorMessage += 'Last Name must have at least 4 characters.\n';
    document.getElementById('lastName').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('lastName').style.borderColor = '';
  }

  // Validate Birth Date
  if (birthDate >= new Date()) {
    errorMessage += 'Birth date cannot be today or in the future.\n';
    document.getElementById('birthDate').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('birthDate').style.borderColor = '';
  }

  // Validate Gender
  if (gender === '') {
    errorMessage += 'Gender is required.\n';
    document.getElementById('gender').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('gender').style.borderColor = '';
  }

  // Validate Employment Status and Occupation
  if ((employmentStatus === 'Employed' || employmentStatus === 'Self Employed') && occupation === '') {
    errorMessage += 'Occupation is required for active employment status.\n';
    document.getElementById('occupation').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('occupation').style.borderColor = '';
  }

  // Validate Phone Number
  if (isNaN(phoneNumber) || phoneNumber.length !== 10) {
    errorMessage += 'Enter a valid Phone number with 10 digits.\n';
    document.getElementById('phoneNumber').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('phoneNumber').style.borderColor = '';
  }

  // Validate Mobile Number
  if (isNaN(mobileNumber) || mobileNumber.length !== 10) {
    errorMessage += 'Enter a valid Mobile number with 10 digits.\n';
    document.getElementById('mobileNumber').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('mobileNumber').style.borderColor = '';
  }

  // Validate Email
  if (!emailPattern.test(email)) {
    errorMessage += 'Please enter a valid email address.\n';
    document.getElementById('email').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('email').style.borderColor = '';
  }

  // Validate Spouse Religion
  if (spouseReligion !== '' && spouseReligion.length < 4) {
    errorMessage += 'Spouse Religion must have at least 4 characters.\n';
    document.getElementById('spouseReligion').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('spouseReligion').style.borderColor = '';
  }

  // If the form is valid, you can submit it here or show the error message
  if (!isValid) {
    alert(errorMessage); // You can replace this with another way to display the error
  }
});

document.getElementById('dependentsInfoForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const birthDate = new Date(document.getElementById('birthDate').value);
  const gender = document.getElementById('gender').value;
  const relationship = document.getElementById('relationship').value.trim();
  const inSundaySchool = document.getElementById('inSundaySchool').value.trim();

  let isValid = true;
  let errorMessage = '';

  // Validate First Name
  if (firstName === '') {
    errorMessage += 'First Name is required.\n';
    document.getElementById('firstName').style.borderColor = 'red';
    isValid = false;
  } else if (firstName.length < 4) {
    errorMessage += 'First Name must have at least 4 characters.\n';
    document.getElementById('firstName').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('firstName').style.borderColor = '';
  }

  // Validate Last Name
  if (lastName === '') {
    errorMessage += 'Last Name is required.\n';
    document.getElementById('lastName').style.borderColor = 'red';
    isValid = false;
  } else if (lastName.length < 4) {
    errorMessage += 'Last Name must have at least 4 characters.\n';
    document.getElementById('lastName').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('lastName').style.borderColor = '';
  }

  // Validate Birth Date
  if (birthDate >= new Date()) {
    errorMessage += 'Birth date cannot be today or in the future.\n';
    document.getElementById('birthDate').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('birthDate').style.borderColor = '';
  }

  // Validate Gender
  if (gender === '') {
    errorMessage += 'Gender is required.\n';
    document.getElementById('gender').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('gender').style.borderColor = '';
  }

  // Validate dependent relationship
  if (relationship === '' || relationship.length < 3) {
    errorMessage += 'Relationship cannot be empty and must have at least 3 characters.\n';
    document.getElementById('relationship').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('relationship').style.borderColor = '';
  }

  // Validate attends suday school relationship
  if (inSundaySchool === '') {
    errorMessage += 'This feld cannot cannot be empty.\n';
    document.getElementById('inSundaySchool').style.borderColor = 'red';
    isValid = false;
  } else {
    document.getElementById('inSundaySchool').style.borderColor = '';
  }

  // If the form is valid, you can submit it here or show the error message
  if (!isValid) {
    alert(errorMessage); // You can replace this with another way to display the error
  }
});

