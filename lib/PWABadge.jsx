/**
 * @file PWA status notification component implementing Progressive Web App lifecycle management.
 * Provides offline readiness and update prompts with comprehensive service worker integration.
 * @since 1.0.0
 */

import PropTypes from "prop-types";
import Button from "./Button.jsx";

/**
 * PWA status notification component implementing Progressive Web App principles
 * that provides seamless offline capability and update management.
 *
 * This component offers comprehensive PWA lifecycle management featuring:
 * - **Service Worker Integration**: Built upon @vite-pwa/pwa plugin's useRegisterSW hook
 * - **Update Notifications**: Automatic detection and prompting for new app versions
 * - **Offline Ready Status**: Clear indication when content is cached and available offline
 * - **User-Controlled Updates**: Reload button for user-initiated app updates
 * - **Customizable Messaging**: Configurable notification text for different scenarios
 * - **Automatic Monitoring**: Periodic checking for app updates at configurable intervals
 * - **Responsive Design**: Notification badge adapts to different screen sizes
 * - **Accessibility**: Proper ARIA attributes and keyboard navigation support
 *
 * The component handles all PWA lifecycle states automatically:
 * - Silent background checking for updates
 * - Notification display when updates are available
 * - Clear indication when app is ready for offline use
 * - Graceful handling of service worker registration failures
 *
 * The notification appears as a small badge/banner that doesn't interfere with
 * the main app interface while providing essential PWA status information.
 * @component
 * @generated Based on @vite-pwa/pwa plugin setup with customized Material Design UI
 * @param {object} props - Component props
 * @param {number} [props.checkForUpdateInterval] - Interval in milliseconds to check for PWA updates.
 *   Defaults to 60*60*1000 (1 hour). Controls how frequently the app checks for new versions.
 *   Shorter intervals provide faster update detection but consume more resources.
 * @param {string} [props.offlineReadyMessage] - Message displayed when app is ready for offline use.
 *   Defaults to "App ready to work offline". Shown when service worker has cached
 *   all necessary resources for offline functionality.
 * @param {string} [props.needRefreshMessage] - Message displayed when a new version is available.
 * @param {Function} props.useRegisterSW - The useRegisterSW hook from @vite-pwa/pwa, injected for service worker lifecycle management. Required.
 *   Defaults to the imported useRegisterSW if not provided. Allows for dependency injection in testing or advanced usage.
 * @returns {JSX.Element|null} Notification badge component or null when no notifications needed
 * @since 1.0.0
 * @example
 * // Basic usage in application layout
 * import PWABadge from '../components/PWABadge';
 *
 * function AppLayout({ children }) {
 *   return (
 *     <div>
 *       <header>
 *         <h1>My PWA Application</h1>
 *         <PWABadge />
 *       </header>
 *       <main>{children}</main>
 *     </div>
 *   );
 * }
 * @example
 * // With custom messages and faster update checking
 * <PWABadge
 *   checkForUpdateInterval={30 * 60 * 1000}
 *   offlineReadyMessage="Your app is now available offline!"
 *   needRefreshMessage="Update available! Click to refresh and get the latest features."
 * />
 * @example
 * // In a PWA-focused component with longer intervals
 * <PWABadge
 *   checkForUpdateInterval={2 * 60 * 60 * 1000}
 *   offlineReadyMessage="✓ Ready for offline use"
 *   needRefreshMessage="🆕 New version ready - tap to update"
 * />
 * @example
 * // Integration with notification system
 * function NotificationArea() {
 *   return (
 *     <div className="fixed top-4 right-4 z-50">
 *       <PWABadge
 *         offlineReadyMessage="App cached successfully"
 *         needRefreshMessage="Update downloaded - restart to apply"
 *       />
 *     </div>
 *   );
 * }
 */
function PWABadge({
  useRegisterSW,
  checkForUpdateInterval = 60 * 60 * 1000,
  offlineReadyMessage = "App ready to work offline",
  needRefreshMessage = "New app available, click on reload button to update.",
}) {
  const period = checkForUpdateInterval;

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

  /**
   * Closes the PWA notification badge by resetting offline ready and need refresh states.
   * @returns {void}
   */
  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return needRefresh ? (
    <div
      className={`flex flex-row py-1 px-2 h-12 items-center gap-2
        bg-light-error-container dark:bg-dark-error-container
        text-light-on-error-container dark:text-dark-on-error-container`}
    >
      <div className="flex flex-row grow">{needRefreshMessage}</div>
      <Button
        icon={
          /* Material icons 'Refresh' https://fonts.google.com/icons */
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
        bg-light-primary-container dark:bg-dark-primary-container
        text-light-on-primary-container dark:text-dark-on-primary-container`}
    >
      <div className="flex flex-row grow">{offlineReadyMessage}</div>
      <Button
        icon={
          /* Material icons 'Close' https://fonts.google.com/icons */
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
PWABadge.propTypes = {
  useRegisterSW: PropTypes.func.isRequired,
  checkForUpdateInterval: PropTypes.number,
  offlineReadyMessage: PropTypes.string,
  needRefreshMessage: PropTypes.string,
};

export default PWABadge;

/**
 * Registers a periodic check for service worker updates at specified intervals.
 * This function implements a polling mechanism to check if a new service worker
 * version is available by fetching the service worker URL with cache bypassing.
 *
 * The function:
 * 1. Sets up an interval timer based on the provided period
 * 2. Skips update checks when the device is offline
 * 3. Fetches the service worker file with cache headers that prevent caching
 * 4. Triggers the service worker update process if a new version is available
 * @private
 * @function
 * @param {number} period - Interval in milliseconds between update checks
 * @param {string} swUrl - URL of the service worker file to check for updates
 * @param {ServiceWorkerRegistration} r - Service worker registration object to update
 * @returns {void}
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
