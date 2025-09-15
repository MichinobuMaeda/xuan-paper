import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    label: "En",
    translation: {
      "offline ready": "You can install this app for offline use.",
      "need refresh": "A new app is available. Click to refresh.",
      "pin menu": "Pin the menu",
      "unpin menu": "Unpin the menu",
      components: "Components",
      "theme color": "Theme color",
      "reset color": "Reset color",
      undo: "Undo",
      rotate: "Rotate",
    },
  },
  ja: {
    label: "日",
    translation: {
      "offline ready":
        "このアプリはオフラインで使用するためにインストールできます。",
      "need refresh":
        "新しいアプリがあります。ボタンをクリックして更新してください。",
      "pin menu": "メニューをピン留め",
      "unpin menu": "メニューのピン留めを解除",
      components: "コンポーネント",
      "theme color": "テーマカラー",
      "reset color": "配色復帰",
      undo: "操作取消",
      rotate: "縦横切替",
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
