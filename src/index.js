import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Intro from "./Intro/main";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Intro />
  </StrictMode>
);
