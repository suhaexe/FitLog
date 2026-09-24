import { Dumbbell } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-line border-t mt-20">
      <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted mx-auto max-w-7xl gap-3 px-4 py-6">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-accent" size={18} />
          <span className="font-display tracking-widest text-white">
            FITLOG
          </span>
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
};

export default Footer;
