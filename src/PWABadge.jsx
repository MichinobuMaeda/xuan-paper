import Button from "./xuan-paper/Button.jsx";
import { useTranslation } from "react-i18next";

import { useRegisterSW } from "virtual:pwa-register/react";

function PWABadge() {
  // check for updates every hour
  const period = 60 * 60 * 1000;

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === "activated") {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener("statechange", (e) => {
          /** @type {ServiceWorker} */
          const sw = e.target;
          if (sw.state === "activated") registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  const { t } = useTranslation();

  return needRefresh ? (
    <div
      className={`flex flex-row py-1 px-2 h-12 items-center gap-2
        bg-light-error-container dark:bg-dark-error-container
        text-light-on-error-container dark:text-dark-on-error-container`}
    >
      <div className="flex flex-row grow">{t("update app")}</div>
      <Button
        icon={
          /* Material icon 'Refresh' */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
          </svg>
        }
        style="danger"
        size="xs"
        onClick={() => updateServiceWorker(true)}
      />
    </div>
  ) : offlineReady ? (
    <div
      className={`flex flex-row py-1 px-2 h-12 items-center gap-2
        bg-light-secondary-container dark:bg-dark-secondary-container
        text-light-on-secondary-container dark:text-dark-on-secondary-container`}
    >
      <div className="flex flex-row grow">{t("offline ready")}</div>
      <Button
        icon={
          /* Material icon 'Close' */
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        }
        style="text"
        size="xs"
        onClick={() => close()}
      />
    </div>
  ) : (
    <></>
  );
}

export default PWABadge;

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 * @param period {number}
 * @param swUrl {string}
 * @param r {ServiceWorkerRegistration}
 */
function registerPeriodicSync(period, swUrl, r) {
  if (period <= 0) return;

  setInterval(async () => {
    if ("onLine" in navigator && !navigator.onLine) return;

    const resp = await fetch(swUrl, {
      cache: "no-store",
      headers: {
        cache: "no-store",
        "cache-control": "no-cache",
      },
    });

    if (resp?.status === 200) await r.update();
  }, period);
}
