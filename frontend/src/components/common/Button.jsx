import PropTypes from 'prop-types';

/**
 * Reusable Button component with multiple variants
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-sans font-medium transition-all duration-300 uppercase tracking-wider inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary/90 text-white hover:shadow-lg transform hover:-translate-y-0.5',
    secondary: 'bg-gray-900 hover:bg-gray-800 text-white',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    outlineGray: 'border border-gray-300 text-gray-700 hover:border-gray-900 hover:bg-gray-50',
    ghost: 'text-primary hover:bg-primary/10',
  };
  
  const sizes = {
    small: 'px-6 py-2 text-[12px]',
    medium: 'px-8 py-3 text-[13px]',
    large: 'px-12 py-3.5 text-[14px]',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'outlineGray', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
