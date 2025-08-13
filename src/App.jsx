import "./App.css";
import PWABadge from "./PWABadge.jsx";

import ToggleLanguageButton from "./layout/ToggleLanguageButton.jsx";
import Header from "./layout/Header.jsx";
import Footer from "./layout/Footer.jsx";
import ComponentsDemo from "./ComponentsDemo.jsx";
import ColorThemeGenerator from "./ColorThemeGenerator.jsx";

function App() {
  return (
    <div className="flex flex-col items-center">
      <Header suffix={<ToggleLanguageButton />} bottom={<PWABadge />} />
      <main
        className={`flex flex-col pt-2 pb-6 gap-2 w-full sm:max-w-[1024px]
          bg-light-form dark:bg-dark-form
          text-light-on-form dark:text-dark-on-form`}
      >
        <div
          className={`flex flex-wrap px-2 gap-2 justify-start
            text-light-tertiary dark:text-dark-tertiary`}
        >
          Tailwind / React / Material design 3
        </div>
        <ComponentsDemo />
        <ColorThemeGenerator />
      </main>
      <Footer />
    </div>
  );
}

export default App;
