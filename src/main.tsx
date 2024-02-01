import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { DeleteModalContextProvider } from './context/DeleteModalContext.tsx';
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://ee46912c9870e106a2327565f25dd1b4@o4506672751575040.ingest.sentry.io/4506672755048448",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 0.3, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <DeleteModalContextProvider>
    <App />
  </DeleteModalContextProvider>,
);
