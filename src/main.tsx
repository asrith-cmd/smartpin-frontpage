  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { Analytics } from "@vercel/analytics/react";
  import { reportWebVitals } from "./reportWebVitals";
  import "./styles/index.css";

  const root = createRoot(document.getElementById("root")!);

  root.render(
    <>
      <App />
      <Analytics />
    </>
  );

  reportWebVitals();
  