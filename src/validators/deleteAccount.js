// src/validators/deleteAccount.js

let errors;

export default (account) => {
  errors = false;

	const validation =  {
		email: emailValidator(account.values.email),
	}

	if(errors === true) return validation;

	return false;
}

function emailValidator(email) {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) {
  	errors = true;
  	return 'validation.email.empty';
  }
  if (!re.test(email)) {
  	errors = true;
  	return 'validation.email.notValid';
  }

  return false;
};