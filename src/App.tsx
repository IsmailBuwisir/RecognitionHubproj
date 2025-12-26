import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import SendPage from "./pages/SendPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/send" element={<SendPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
