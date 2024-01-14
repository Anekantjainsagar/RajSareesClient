import { Inter } from "next/font/google";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import State from "./Context/State";
import Login from "./Components/Login/Login";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Raj Sarees Enterprises",
  description: "An Amazing Shop for Sarees",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <State>
        <body className={inter.className}>
          <Login />
          <Navbar />
          {children}
          <Footer />
        </body>
      </State>
    </html>
  );
}
