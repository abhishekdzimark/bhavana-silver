/**
 * Generate a random captcha code
 * @param {number} length - Length of captcha code (default: 6)
 * @returns {string} - Random captcha code
 */
export const generateCaptcha = (length = 6) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

/**
 * Validate captcha input against expected code
 * @param {string} input - User input
 * @param {string} expected - Expected captcha code
 * @returns {boolean} - Whether captcha is valid
 */
export const validateCaptcha = (input, expected) => {
  return input === expected;
};
