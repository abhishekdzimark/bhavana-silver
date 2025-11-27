import PropTypes from 'prop-types';

/**
 * Reusable Input component for forms
 */
const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  icon: Icon,
  error,
  className = '',
  ...props
}) => {
  const baseStyles = 'w-full px-0 py-3 text-body text-gray-900 bg-transparent border-0 border-b-2 transition-colors duration-300 placeholder-gray-500 focus:outline-none';
  const borderColor = error 
    ? 'border-red-500 focus:border-red-600' 
    : 'border-gray-300 focus:border-primary';
  
  return (
    <div className="form-group relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`${baseStyles} ${borderColor} ${className}`}
        {...props}
      />
      {Icon && (
        <Icon className="absolute right-0 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
      )}
      {error && (
        <span className="text-red-500 text-xs mt-1 block">{error}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
