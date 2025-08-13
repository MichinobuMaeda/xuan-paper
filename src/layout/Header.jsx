import PropTypes from "prop-types";
import appLogo from "/favicon.svg";

function Header({ title, suffix, bottom }) {
  return (
    <div className="flex flex-col sticky top-0 w-full z-10">
      <div
        className={`flex flex-row h-10
          bg-light-primary dark:bg-dark-primary
          text-light-on-primary dark:text-dark-on-primary
          justify-start items-center gap-2 px-1`}
      >
        <img src={appLogo} className="size-8" alt={`${title} logo`} />
        <h1 className="text-2xl">{title}</h1>
        <div className="flex grow"></div>
        {suffix}
      </div>
      {bottom}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  suffix: PropTypes.node,
  bottom: PropTypes.node,
};

export default Header;
