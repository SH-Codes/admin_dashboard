import random
from datetime import datetime

# Function to generate member ID
def generate_membership_number(gender: str, registration_date: datetime) -> str:
    # Step 1: Last 2 digits of the registration year
    year_part = registration_date.strftime('%y')  # Gets the last two digits of the year

    # Step 2: Gender digit (you can customize the mapping)
    gender_mapping = {'Male': '1', 'Female': '2'}
    gender_part = gender_mapping.get(gender, '0')  # Default to '0' if gender is unknown


    # Step 4: Random 4-digit number (between 0000 and 9999)
    random_part = f"{random.randint(0, 999):05d}"

    # Combine all parts to form the membership number
    membership_number = f"{year_part}{gender_part}{random_part}"

    return membership_number

# # Example usage
gender = 'Male'
# race = 'RaceA'
registration_date = datetime(2024, 9, 5)  # Example registration date

membership_id = generate_membership_number(gender, registration_date)
print("Generated Membership ID:", membership_id)
