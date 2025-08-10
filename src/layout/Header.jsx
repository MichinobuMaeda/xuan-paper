import PropTypes from "prop-types";
import appLogo from "/favicon.svg";

function Header({ suffix }) {
  const Suffix = () => <>{suffix}</>;

  return (
    <div
      className="flex flex-row sticky h-10 top-0 w-full
        bg-light-primary dark:bg-dark-primary
        text-light-on-primary dark:text-dark-on-primary
        justify-start items-center gap-2 px-1 z-50"
    >
      <img src={appLogo} className="size-8" alt="Xuan paper logo" />
      <h1 className="text-2xl">Xuan paper</h1>
      <span className="flex flex-row grow p-1 justify-end">
        <Suffix />
      </span>
    </div>
  );
}

Header.propTypes = {
  suffix: PropTypes.node,
};

export default Header;
