function Footer() {
  return (
    <div
      className="flex flex-row sticky bottom-0 w-full
        bg-light-primary-container dark:bg-dark-primary-container
        justify-center-safe items-center gap-2 px-1 py-1"
    >
      <div
        className="text-sm
         text-light-on-primary-container dark:text-dark-on-primary-container"
      >
        <a
          href="https://github.com/MichinobuMaeda/xuan-paper"
          className="text-light-link dark:text-dark-link"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Footer;
