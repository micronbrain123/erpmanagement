import "./globals.css";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { NavigationProvider } from "./contexts/NavigationContext";

export const metadata = {
  title: "ERP System",
  description: "Enterprise Resource Planning System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationProvider>
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100 min-h-screen">
              {children}
            </main>
          </div>
        </NavigationProvider>
      </body>
    </html>
  );
}