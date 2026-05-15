import { AppHeader } from "./components/AppHeader";
import { InfoCard } from "./components/InfoCard";
import { appInfo } from "./data/appInfo";

function App() {
  return (
    <main className="app-container">
      <AppHeader
        appNumber={appInfo.appNumber}
        appName={appInfo.appName}
        block={appInfo.block}
      />

      <section className="content-area">
        <InfoCard
          title="Bem-vindo ao React moderno"
          description={appInfo.description}
          concept={appInfo.concept}
        />
      </section>
    </main>
  );
}

export default App;