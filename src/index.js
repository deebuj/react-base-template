
import App from "./App";
import { createRoot } from "react-dom/client";
import { UserProvider } from "./utils/AppContext";

const root = createRoot(document.getElementById("root"));
root.render(
   <UserProvider>
        <App />
    </UserProvider>
);