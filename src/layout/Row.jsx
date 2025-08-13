import PropTypes from "prop-types";

const Row = ({ children }) => {
  return (
    <div className={`flex flex-wrap px-4 gap-4 justify-start items-center`}>
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.node,
};

export default Row;
