import React, { useState } from "react";
import PropTypes from "prop-types";
import appLogo from "/favicon.svg";

function Header({ title, suffix, bottom }) {
  const [transition, setTransition] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  window.addEventListener("scroll", () => {
    const currentScrollTop = window.scrollY;
    setTransition(currentScrollTop > lastScrollTop);
    setLastScrollTop(currentScrollTop);
  });

  return (
    <div
      className={`flex flex-col w-full
      sticky top-0 transition-all duration-500 z-10
      ${transition ? "-translate-y-10 sm:translate-0" : ""}`}
    >
      <div
        className={`flex flex-row h-10
          bg-light-primary dark:bg-dark-primary
          text-light-on-primary dark:text-dark-on-primary
          justify-start items-center gap-2 px-1`}
      >
        <h1 className="flex flex-row grow gap-2 text-xl sm:text-2xl">
          <img src={appLogo} className="size-8" alt={`${title} logo`} />
          {title}
        </h1>
        {suffix}
      </div>
      {bottom}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  center: PropTypes.node,
  suffix: PropTypes.node,
  bottom: PropTypes.node,
};

export default Header;
