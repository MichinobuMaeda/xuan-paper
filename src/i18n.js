import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    translation: {
      "offline ready": "App ready to work offline",
      "update app": "New app available, click on reload button to update.",
      components: "Components",
      "color theme": "Color theme",
      hue: "Hue",
      contrast: "Contrast",
    },
  },
  ja: {
    translation: {
      "offline ready": "オフラインで利用可能です",
      "update app":
        "新しいアプリがあります。更新するには再読み込みボタンをクリックしてください。",
      components: "コンポーネント",
      "color theme": "カラーテーマ",
      hue: "色相",
      contrast: "コントラスト",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ja",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
