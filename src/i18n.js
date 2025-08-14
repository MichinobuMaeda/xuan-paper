import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const translations = {
  en: {
    label: "En",
    translation: {
      "offline ready": "App ready to work offline",
      "update app": "New app available, click on reload button to update.",
      components: "Components",
      "theme color": "Theme color",
    },
  },
  ja: {
    label: "日",
    translation: {
      "offline ready": "オフラインで利用可能です",
      "update app":
        "新しいアプリがあります。更新するには再読み込みボタンをクリックしてください。",
      components: "コンポーネント",
      "theme color": "テーマカラー",
    },
  },
};

i18n.use(initReactI18next).init({
  resources: translations,
  lng: "ja",
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
