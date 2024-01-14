import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import State from "@/app/(website)/Context/State";
import Footer from "./Components/Footer";
import { sansation } from "../Utils/font";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <State>
        <body className={sansation.className}>
          <div className="w-full h-full flex items-start overflow-hidden">
            <Sidebar />
            <div className="w-[84vw] overflow-hidden">
              <Navbar />
              <div className="p-4">{children}</div>
              <Footer />
            </div>
          </div>
        </body>
      </State>
    </html>
  );
}
