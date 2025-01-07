import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Products, SelectedProduct } from "./Routes";

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/products/all" />} />
      <Route path="/products/:filter" element={<Products />} />
      <Route path="/product/:id" element={<SelectedProduct />} />
    </Routes>
  );
}

export default App;
