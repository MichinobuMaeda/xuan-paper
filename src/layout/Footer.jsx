function Footer() {
  return (
    <div
      className={`flex flex-row justify-center-safe
        items-start sm:items-end px-2 pt-2 pb-8 gap-2
        bg-light-background dark:bg-dark-background
        text-light-on-background dark:text-dark-on-background`}
    >
      <img
        className="size-32"
        src="/xuan-paper-url.png"
        alt="https://xuan-paper.michinobu.jp/"
      />
      <div className="flex flex-col py-2">
        <div className="flex flex-row gap-2">
          Source:
          <a
            className="flex sm:hidden text-light-link dark:text-dark-link"
            href="https://github.com/MicxhinobuMaeda/xuan-paper"
          >
            GitHub
          </a>
        </div>
        <a
          className="hidden sm:flex text-sm text-light-link dark:text-dark-link"
          href="https://github.com/MichinobuMaeda/xuan-paper"
        >
          https://github.com/MichinobuMaeda/xuan-paper
        </a>
      </div>
    </div>
  );
}

export default Footer;
