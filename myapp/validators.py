# validators.py
import re
from django.core.exceptions import ValidationError


def validate_gmail_custom(email):
    # Regular expression for validating Gmail addresses
    gmail_regex = re.compile(
        r'^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$'
    )
    
    if not gmail_regex.match(email):
        raise ValidationError("Enter a valid Gmail address. It should not start with a number and must be in the format username@gmail.com.")

    # Optional: Additional checks for common mistakes in Gmail addresses
    # You can extend this list with more patterns if needed
    common_mistakes_patterns = [
        r'\b\w*@gmail\.cmo\b',  # Common typo: 'cmo' instead of 'com'
        r'\b\w*@gmial\.com\b',  # Common typo: 'gmial' instead of 'gmail'
    ]
    
    for pattern in common_mistakes_patterns:
        if re.search(pattern, email):
            raise ValidationError("Email address contains common spelling mistakes.")
