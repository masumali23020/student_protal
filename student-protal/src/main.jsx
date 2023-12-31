import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/app/store";

// toast notification 
import ToastProvider from "./components/ui/ToastProvider";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <ToastProvider />
      <App />
    </Provider>
  </StrictMode>
);
