class Validation {

  constructor() {
    
    // Mobile: 10 digits, not starting with 0
    this.mobile = /^[1-9][0-9]{9}$/;

    // Name: Only letters, space between first and last name
    this.name = /^[a-zA-Z]+ [a-zA-Z]+$/;

    // Email: Standard email format
    this.email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Password: Min 8 chars, 1 letter, 1 number, 1 special char
    this.password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  }

 nameValidation(text) {
    return this.name.test(text);
  }

  mobileValidation(text) {
    return this.mobile.test(text);
  }

  emailValidation(text) {
    return this.email.test(text);
  }

  passwordValidation(text) {
    return this.password.test(text);
  }
}

const objValidation = new Validation();
export default objValidation;
