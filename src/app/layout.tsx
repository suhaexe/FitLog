import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata = {
  title: "FitLog",
  description: "Workout library",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en"
    data-scroll-behavior="smooth" 
    className={inter.variable + " " + oswald.variable}>
      <body className="flex flex-col bg-bg text-white min-h-screen">
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </PlanProvider>
      </body>
    </html>
  );
};

export default layout;
