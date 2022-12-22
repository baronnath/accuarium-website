// src/validators/subscribe.js

let errors;

export default (subscriber) => {
  errors = false;

	const validation =  {
		email: emailValidator(subscriber.values.email),
		policy: policyValidator(subscriber.values.policy),
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

function policyValidator(policy) {
  if(!policy) {
    errors = true;
  	return 'validation.policy.notAccepted';
  }

  return false;
};