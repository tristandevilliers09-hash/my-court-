import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Utensils, Martini, Coffee, Wine, ChevronRight } from 'lucide-react';

// --- Types ---
interface MenuItem {
  name: string;
  price: string;
  description: string;
  tag?: string;
  featured?: boolean;
}

interface DrinkItem extends MenuItem {
  icon: 'cocktail' | 'wine' | 'coffee';
  iconBg: string;
}

// --- Data ---
const BREAKFAST_ITEMS: MenuItem[] = [
  {
    name: "Courtyard Benedict",
    price: "R 145",
    description: "Poached free-range eggs on sourdough, wilted organic spinach, and our signature lemon-thyme hollandaise."
  },
  {
    name: "Whipped Ricotta Toast",
    price: "R 120",
    description: "House-made ricotta with local orange blossom honey, toasted pistachios, and seasonal stone fruit."
  },
  {
    name: "Shakshuka Rustica",
    price: "R 135",
    description: "Spiced tomato and pepper ragu, crumbled feta, sourdough crisps, and farm eggs."
  }
];

const LUNCH_ITEMS: MenuItem[] = [
  {
    name: "Harvest Grain Bowl",
    price: "R 155",
    description: "Quinoa, roasted heritage carrots, avocado, pomegranate, and a tahini-miso dressing.",
    tag: "VEGAN"
  },
  {
    name: "Line-Caught Sea Bass",
    price: "R 195",
    description: "Daily catch from Port Alfred harbor, pan-seared with crushed baby potatoes, charred asparagus, and caper butter sauce.",
    featured: true,
    tag: "CHEF'S SIGNATURE"
  },
  {
    name: "The Rise Burger",
    price: "R 165",
    description: "Grass-fed beef, smoked provolone, caramelized balsamic onions, and truffle aioli on brioche."
  },
  {
    name: "Wild Mushroom Pappardelle",
    price: "R 175",
    description: "Fresh pasta, forest mushrooms, thyme, parmesan shards, and truffle-scented cream."
  },
  {
    name: "Cape Malay Curry",
    price: "R 180",
    description: "Traditional spiced lamb or vegetable curry, served with jasmine rice and handmade sambals."
  }
];

const DRINK_ITEMS: DrinkItem[] = [
  {
    name: "The Courtyard Mule",
    price: "R 110",
    description: "Vodka, house-fermented ginger beer, cucumber ribbons, and fresh mint.",
    icon: 'cocktail',
    iconBg: 'bg-secondary-fixed'
  },
  {
    name: "Hibiscus Rosé Spritz",
    price: "R 125",
    description: "Local Rosé, hibiscus reduction, soda, and seasonal berries.",
    icon: 'wine',
    iconBg: 'bg-tertiary-fixed'
  },
  {
    name: "Cold Brew Martini",
    price: "R 115",
    description: "12-hour cold brew, dark rum, and vanilla bean syrup.",
    icon: 'coffee',
    iconBg: 'bg-primary-fixed'
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-xl shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-surface-container rounded-full transition-colors md:hidden"
          >
            <Menu className="w-6 h-6 text-primary" />
          </button>
          <span className="text-xl md:text-2xl font-headline italic text-primary tracking-tight">Rise Courtyard Cafe</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Our Story', 'Menu', 'Gallery', 'Find Us'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`text-sm font-medium tracking-wide transition-all hover:text-primary ${item === 'Menu' ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface/70'}`}
            >
              {item}
            </a>
          ))}
        </div>

        <button className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-medium transition-transform active:scale-95 hover:shadow-lg hover:shadow-primary/20">
          Book Table
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 bg-background z-[60] p-8 flex flex-col gap-8 md:hidden"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-headline italic text-primary">Rise Courtyard Cafe</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X className="w-6 h-6 text-on-surface" />
              </button>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              {['Our Story', 'Menu', 'Gallery', 'Find Us'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="text-2xl font-headline text-on-surface"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => (
  <section className="pt-32 pb-16 md:pt-48 md:pb-24 max-w-7xl mx-auto px-6 md:px-12">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col md:flex-row items-end justify-between gap-12 border-b border-outline-variant/20 pb-16"
    >
      <div className="max-w-2xl">
        <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-6 block">Seasonally Inspired</span>
        <h1 className="text-6xl md:text-8xl font-headline leading-[1.1] text-on-surface">
          The Courtyard <br /> Menu
        </h1>
        <p className="text-on-surface-variant text-lg md:text-xl mt-8 leading-relaxed max-w-lg">
          From sun-drenched breakfasts to intimate twilight cocktails, our menu celebrates Port Alfred's organic bounty.
        </p>
      </div>
      <div className="hidden lg:block relative">
        <div className="w-56 h-56 rounded-full overflow-hidden border-8 border-surface-container relative z-10">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1544787210-2827448636b2?q=80&w=1000&auto=format&fit=crop" 
            alt="Artisanal latte"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary-container rounded-full" />
      </div>
    </motion.div>
  </section>
);

const BreakfastSection = () => (
  <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
    <div className="lg:col-span-5 order-2 lg:order-1">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl md:text-5xl font-headline mb-16 text-primary italic"
      >
        Breakfast in the Sun
      </motion.h2>
      <div className="space-y-12">
        {BREAKFAST_ITEMS.map((item, idx) => (
          <motion.div 
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-default"
          >
            <div className="flex justify-between items-baseline mb-3">
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.name}</h3>
              <span className="text-primary font-semibold">{item.price}</span>
            </div>
            <p className="text-on-surface-variant leading-relaxed text-sm md:text-base">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
    <div className="lg:col-span-7 order-1 lg:order-2">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <img 
          className="rounded-2xl w-full h-[400px] md:h-[600px] object-cover shadow-2xl" 
          src="https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1000&auto=format&fit=crop" 
          alt="Breakfast spread"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -bottom-8 -left-8 bg-secondary-container p-10 rounded-2xl hidden md:block max-w-xs shadow-xl">
          <p className="text-on-secondary-container italic font-headline text-xl leading-relaxed">
            "The best sourdough in the Eastern Cape, hand-stretched every morning."
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const LunchSection = () => (
  <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
    <div className="flex flex-col items-center mb-20">
      <h2 className="text-4xl md:text-5xl font-headline mb-6">Lunch Offerings</h2>
      <div className="w-24 h-1.5 bg-primary/20 rounded-full" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Harvest Grain Bowl */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10 flex flex-col justify-between"
      >
        <div>
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-xl font-bold">Harvest Grain Bowl</h3>
            <span className="text-primary font-semibold">R 155</span>
          </div>
          <p className="text-on-surface-variant mb-8 text-sm leading-relaxed">
            Quinoa, roasted heritage carrots, avocado, pomegranate, and a tahini-miso dressing.
          </p>
        </div>
        <span className="inline-block w-fit bg-secondary-container text-on-secondary-container text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-widest">
          Vegan
        </span>
      </motion.div>

      {/* Featured: Sea Bass */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="md:row-span-2 bg-primary text-on-primary p-12 rounded-2xl flex flex-col justify-between shadow-2xl shadow-primary/30 relative overflow-hidden"
      >
        <div className="relative z-10">
          <Utensils className="w-10 h-10 mb-8 opacity-80" />
          <h3 className="text-3xl font-headline mb-6">Line-Caught Sea Bass</h3>
          <p className="opacity-90 leading-relaxed text-lg">
            Daily catch from Port Alfred harbor, pan-seared with crushed baby potatoes, charred asparagus, and caper butter sauce.
          </p>
        </div>
        <div className="mt-12 flex justify-between items-end relative z-10">
          <span className="text-4xl font-headline italic">R 195</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">Chef's Signature</span>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
      </motion.div>

      {/* The Rise Burger */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10"
      >
        <div className="flex justify-between items-baseline mb-6">
          <h3 className="text-xl font-bold">The Rise Burger</h3>
          <span className="text-primary font-semibold">R 165</span>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Grass-fed beef, smoked provolone, caramelized balsamic onions, and truffle aioli on brioche.
        </p>
      </motion.div>

      {/* Wild Mushroom Pappardelle */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10"
      >
        <div className="flex justify-between items-baseline mb-6">
          <h3 className="text-xl font-bold">Wild Mushroom Pappardelle</h3>
          <span className="text-primary font-semibold">R 175</span>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Fresh pasta, forest mushrooms, thyme, parmesan shards, and truffle-scented cream.
        </p>
      </motion.div>

      {/* Cape Malay Curry */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-surface-container-low p-10 rounded-2xl border border-outline-variant/10"
      >
        <div className="flex justify-between items-baseline mb-6">
          <h3 className="text-xl font-bold">Cape Malay Curry</h3>
          <span className="text-primary font-semibold">R 180</span>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Traditional spiced lamb or vegetable curry, served with jasmine rice and handmade sambals.
        </p>
      </motion.div>
    </div>
  </section>
);

const DrinksSection = () => (
  <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
    <div className="space-y-16">
      <h2 className="text-4xl md:text-5xl font-headline text-on-surface">Garden Spirits</h2>
      <div className="space-y-10">
        {DRINK_ITEMS.map((item, idx) => (
          <motion.div 
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex gap-8 group cursor-default"
          >
            <div className={`w-16 h-16 shrink-0 ${item.iconBg} rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
              {item.icon === 'cocktail' && <Martini className="w-7 h-7 text-on-secondary-fixed" />}
              {item.icon === 'wine' && <Wine className="w-7 h-7 text-on-tertiary-fixed" />}
              {item.icon === 'coffee' && <Coffee className="w-7 h-7 text-on-primary-fixed" />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">{item.name}</h4>
                <span className="text-primary font-semibold">{item.price}</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <motion.img 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="rounded-2xl aspect-[3/4] object-cover mt-16 shadow-lg" 
        src="https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=1000&auto=format&fit=crop" 
        alt="Hibiscus cocktail"
        referrerPolicy="no-referrer"
      />
      <motion.img 
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="rounded-2xl aspect-[3/4] object-cover shadow-lg" 
        src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop" 
        alt="Bar setting"
        referrerPolicy="no-referrer"
      />
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-surface-container py-24 px-6 md:px-12 border-t border-outline-variant/20">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="text-center md:text-left">
        <span className="text-2xl font-headline italic text-primary">Rise Courtyard Cafe</span>
        <p className="text-sm text-on-surface-variant mt-4 font-medium opacity-70">
          © 2024 Rise Courtyard Cafe. Crafted in Port Alfred.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-10">
        {['Privacy Policy', 'Terms of Service', 'Sustainability'].map((link) => (
          <a 
            key={link} 
            href="#" 
            className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors tracking-wide"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <BreakfastSection />
        <LunchSection />
        <DrinksSection />
      </main>
      <Footer />
      
      {/* Floating Action Button for Mobile Booking */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 md:hidden bg-primary text-on-primary p-4 rounded-full shadow-2xl z-40"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
