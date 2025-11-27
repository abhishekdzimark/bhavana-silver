import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Reusable Breadcrumb Component
 */
const Breadcrumb = ({ items }) => {
  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-[13px] text-gray-600 uppercase">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="text-gray-400 mx-2">|</span>}
            {item.link ? (
              <Link 
                to={item.link} 
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={item.active ? 'text-primary font-medium' : ''}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
};

export default Breadcrumb;
