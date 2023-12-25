const feedbackForm = document.querySelector('.feedback-form');

(() => {
  try {
    const formData = JSON.parse(localStorage.getItem('feedback-form-state'));

    setFormInputValues(feedbackForm, formData);
  } catch (err) {
    console.error(err);
  }
})();

feedbackForm.addEventListener('input', putFormDataToLocalStorage);

feedbackForm.addEventListener('submit', onSubmitForm);

function clearFormInputs(formRef) {
  formRef.elements.email.value = '';
  formRef.elements.message.value = '';
}

function putFormDataToLocalStorage(e) {
  const formData = {
    email: e.currentTarget.elements.email.value,
    message: e.currentTarget.elements.message.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function setFormInputValues(formRef, { email, message }) {
  formRef.elements.email.value = email || '';
  formRef.elements.message.value = message || '';
}

function onSubmitForm(e) {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;

  if (!email.value || !message.value)
    return alert('There should not be any empty fields');

  console.log({
    email: e.currentTarget.elements.email.value,
    message: e.currentTarget.elements.message.value,
  });

  clearFormInputs(e.currentTarget);

  localStorage.removeItem('feedback-form-state');
}
