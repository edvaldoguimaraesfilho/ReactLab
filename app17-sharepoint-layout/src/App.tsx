import { HeroSection } from "./components/HeroSection";
import { LeftNavigation } from "./components/LeftNavigation";
import { NewsSection } from "./components/NewsSection";
import { QuickLinks } from "./components/QuickLinks";
import { TopBar } from "./components/TopBar";

import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <TopBar />

      <div className="page-layout">
        <LeftNavigation />

        <main className="main-content">
          <HeroSection />
          <QuickLinks />
          <NewsSection />
        </main>
      </div>
    </div>
  );
}

export default App;