import { useState } from 'react';

/**
 * Hook used to handle inputs changes and trigger
 * the passed callback on [handleSubmit]
 *
 * @param {Object} initialValues key-value pair; key - name of the field;
 *                               value - initial value of field
 * @param {Function} callback
 */
const useSubmitForm = (initialValues, callback) => {
  const keepInitialValues = initialValues;
  const [inputs, setInputs] = useState(initialValues);

  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };

  const handleInputChange = event => {
    event.persist();
    setInputs(oldInputs => ({
      ...oldInputs,
      [event.target.name]: event.target.value
    }));
  };

  const clearInputs = () => setInputs(keepInitialValues);

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    clearInputs
  };
};
export default useSubmitForm;
