import PropTypes from 'prop-types';

/**
 * Reusable Certification Grid Component
 */
const CertificationGrid = ({ certifications, title = "OUR CERTIFICATES" }) => {
  return (
    <div className="border-t pt-12 mt-12">
      <h2 className="section-heading mb-12 md:mb-16">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto items-center">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-4 bg-white border border-gray-200 hover:border-primary transition-all duration-300 hover:shadow-lg group"
          >
            <img
              src={cert.image}
              alt={cert.name}
              className="w-full h-auto max-h-20 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

CertificationGrid.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default CertificationGrid;
