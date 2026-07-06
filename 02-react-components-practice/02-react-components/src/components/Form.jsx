import { useState } from 'react';
import Button from './Button.jsx';

/**
 * Form
 * Small controlled contact form demonstrating local state + validation.
 *
 * Props:
 * - onSubmit (fn, optional): called with { name, email, message } on valid submit
 */
export default function Form({ onSubmit }) {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate(current) {
    const nextErrors = {};
    if (!current.name.trim()) nextErrors.name = 'Name is required.';
    if (!/^\S+@\S+\.\S+$/.test(current.email)) nextErrors.email = 'Enter a valid email.';
    if (current.message.trim().length < 10) {
      nextErrors.message = 'Message should be at least 10 characters.';
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      onSubmit?.(values);
      setSubmitted(true);
      setValues({ name: '', email: '', message: '' });
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={values.name} onChange={handleChange} />
        {errors.name && <span className="form__error">{errors.name}</span>}
      </div>

      <div className="form__field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={values.email} onChange={handleChange} />
        {errors.email && <span className="form__error">{errors.email}</span>}
      </div>

      <div className="form__field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
        />
        {errors.message && <span className="form__error">{errors.message}</span>}
      </div>

      <Button type="submit">Send message</Button>
      {submitted && <p className="form__success">Thanks — your message was sent.</p>}
    </form>
  );
}
