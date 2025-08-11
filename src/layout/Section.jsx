import PropTypes from "prop-types";

const Section = ({ label, prefix, suffix, children }) => {
  return (
    <>
      <div
        className={`flex flex-wrap px-4 py-1 mb-2 gap-2 justify-start
            text-xl sticky top-10 z-20
            bg-light-tertiary-container dark:bg-dark-tertiary-container
            text-light-on-tertiary-container dark:text-dark-on-tertiary-container`}
      >
        {prefix}
        <div className="flex grow">{label}</div>
        {suffix}
      </div>
      <div
        className={`flex flex-col w-full gap-4 pb-4
        bg-light-form dark:bg-dark-form
        text-light-on-form dark:text-dark-on-form`}
      >
        {children}
      </div>
    </>
  );
};

Section.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
};

export default Section;
