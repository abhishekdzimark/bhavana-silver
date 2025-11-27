import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiMail, FiRefreshCw } from 'react-icons/fi';
import Input from '../common/Input';
import Button from '../common/Button';
import { generateCaptcha, validateCaptcha } from '../../utils/captcha';

/**
 * Reusable Lead/Appointment Form Component
 */
const LeadForm = ({ onSubmit, submitButtonText = 'SUBMIT' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    company: '',
    dateTime: '',
    message: '',
    captcha: ''
  });

  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setFormData({ ...formData, captcha: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate captcha
    if (!validateCaptcha(formData.captcha, captchaCode)) {
      alert('Invalid captcha code. Please try again.');
      refreshCaptcha();
      return;
    }

    // Call parent onSubmit handler
    if (onSubmit) {
      onSubmit(formData);
    }

    // Reset form
    setFormData({
      name: '',
      email: '',
      mobile: '',
      country: '',
      company: '',
      dateTime: '',
      message: '',
      captcha: ''
    });
    refreshCaptcha();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Row 1: Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name*"
          required
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email*"
          required
          icon={FiMail}
        />
      </div>

      {/* Row 2: Mobile and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input
          type="tel"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Mobile No *"
          required
        />
        <Input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country*"
          required
        />
      </div>

      {/* Row 3: Company and Date/Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company"
        />
        <Input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          placeholder="Select Date & Time*"
          required
        />
      </div>

      {/* Row 4: Message */}
      <div className="mb-6">
        <Input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message*"
          required
        />
      </div>

      {/* Row 5: Captcha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="form-group flex items-center gap-4">
          <div className="captcha-display bg-gray-200 px-6 py-3 rounded font-mono text-lg tracking-widest select-none relative">
            <span className="text-gray-700">{captchaCode}</span>
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)'
            }}></div>
          </div>
          <button
            type="button"
            onClick={refreshCaptcha}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            aria-label="Refresh captcha"
          >
            <FiRefreshCw className="w-5 h-5 text-gray-600 hover:text-primary transition-colors duration-300" />
          </button>
        </div>
        <Input
          type="text"
          name="captcha"
          value={formData.captcha}
          onChange={handleChange}
          placeholder="Enter Captcha Code *"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <Button type="submit" variant="primary" size="large">
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};

LeadForm.propTypes = {
  onSubmit: PropTypes.func,
  submitButtonText: PropTypes.string,
};

export default LeadForm;
