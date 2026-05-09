import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ExpensesProvider } from "./context/ExpensesContext.jsx";
import AppLayout from "./components/AppLayout.jsx";
import ExpensesPage from "./pages/ExpensesPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <ExpensesProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/gastos" replace />} />
            <Route path="/gastos" element={<ExpensesPage />} />
            <Route path="/metricas" element={<AnalyticsPage />} />
          </Route>
        </Routes>
      </ExpensesProvider>
    </BrowserRouter>
  );
}

export default App;
