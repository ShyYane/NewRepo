import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Shared/Header";
import Footer from "./Components/Shared/Footer";
import { UserProvider } from "./Context/useAuth";

function App() {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
