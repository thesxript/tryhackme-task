import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster richColors={true} position="top-center" />
      <AppRoutes />
    </BrowserRouter>
  );
}
