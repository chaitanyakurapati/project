// src/Survey.js
import React, { useState } from 'react';

const Survey = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    favoriteColor: '',
    feedback: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age || isNaN(formData.age) || formData.age < 0) newErrors.age = 'Valid age is required';
    if (!formData.favoriteColor) newErrors.favoriteColor = 'Favorite color is required';
    if (!formData.feedback) newErrors.feedback = 'Feedback is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // In a real application, you would send the data to a server here
      console.log('Form Data Submitted:', formData);
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div>
      <h1>Survey Form</h1>
      {submitted ? (
        <div>
          <h2>Thank you for your submission!</h2>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>

          <div>
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </label>
            {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
          </div>

          <div>
            <label>
              Favorite Color:
              <input
                type="text"
                name="favoriteColor"
                value={formData.favoriteColor}
                onChange={handleChange}
              />
            </label>
            {errors.favoriteColor && <p style={{ color: 'red' }}>{errors.favoriteColor}</p>}
          </div>

          <div>
            <label>
              Feedback:
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
              />
            </label>
            {errors.feedback && <p style={{ color: 'red' }}>{errors.feedback}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Survey;
