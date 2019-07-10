export default function validateChangePassword(values) {
  let errors = {};

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  } else if (values.password !== values.passwordConfirmation){
    errors.password = 'Password doesnt match '
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Confirm Password is required';
  } else if (values.passwordConfirmation.length < 8) {
    errors.passwordConfirmation = 'Confirm Password must be 8 or more characters';
  } else if (values.passwordConfirmation !== values.password) {
    errors.passwordConfirmation = 'Confirm Password doesnt match';
  }
  return errors;
};
