// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import LogRocket from "logrocket";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  beforeSend(event) {
    const logRocketSession = LogRocket.sessionURL;
    if (logRocketSession !== null) {
      console.log(`2. sessionURL = ${sessionURL}`);
      event.extra["LogRocket"] = logRocketSession;
      return event;
    } else {
      console.log(`3. sessionURL = ${sessionURL}`);
      return event;
    }
  },
  dsn:
    SENTRY_DSN ||
    "https://e6c9ec5a6496487c8e5f9a928092c01c@o1101084.ingest.sentry.io/6126759",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "local",
});

LogRocket.init("lhcjho/test-project");

LogRocket.getSessionURL((sessionURL) => {
  Sentry.configureScope((scope) => {
    console.log(`1. sessionURL = ${sessionURL}`);
    scope.setExtra("sessionURL", sessionURL);
  });
});
