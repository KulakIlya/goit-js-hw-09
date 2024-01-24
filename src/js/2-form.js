const feedbackForm = document.querySelector('.feedback-form');

const clearFormInputs = formRef => {
  formRef.elements.email.value = '';
  formRef.elements.message.value = '';
};

const putFormDataToLocalStorage = e => {
  const formData = {
    email: e.currentTarget.elements.email.value.trim(),
    message: e.currentTarget.elements.message.value.trim(),
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const setFormInputValues = (formRef, { email, message }) => {
  formRef.elements.email.value = email || '';
  formRef.elements.message.value = message || '';
};

const onSubmitForm = e => {
  e.preventDefault();

  const { email, message } = e.currentTarget.elements;

  if (!email.value && !message.value)
    return alert(
      'Будь ласка, заповніть обидва поля – електронну пошту та повідомлення – перед надсиланням'
    );

  console.log({
    email: e.currentTarget.elements.email.value.trim(),
    message: e.currentTarget.elements.message.value.trim(),
  });

  clearFormInputs(e.currentTarget);

  localStorage.removeItem('feedback-form-state');
};

(() => {
  try {
    const formData =
      JSON.parse(localStorage.getItem('feedback-form-state')) ?? {};

    setFormInputValues(feedbackForm, formData);
  } catch (err) {
    console.error(err);
  }
})();

feedbackForm.addEventListener('input', putFormDataToLocalStorage);

feedbackForm.addEventListener('submit', onSubmitForm);
