import { useState } from "react";

import {
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";

import { SimulationForm } from "./components/SimulationForm";
import { SimulationResult } from "./components/SimulationResult";

import type { InstallmentSimulation } from "./models/InstallmentSimulation";

function App() {
  const [simulation, setSimulation] =
    useState<InstallmentSimulation>({
      amount: 1000,
      installments: 12,
      interestRate: 2,
    });

  const monthlyInterest =
    simulation.interestRate / 100;

  const totalPayment =
    simulation.amount *
    Math.pow(
      1 + monthlyInterest,
      simulation.installments
    );

  const monthlyPayment =
    totalPayment /
    simulation.installments;

  const totalInterest =
    totalPayment - simulation.amount;

  return (
    <FluentProvider theme={webLightTheme}>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "48px",
          boxSizing: "border-box",
        }}
      >
        <section
          style={{
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          <SimulationForm
            simulation={simulation}
            onSimulationChange={setSimulation}
          />

          <SimulationResult
            monthlyPayment={monthlyPayment}
            totalPayment={totalPayment}
            totalInterest={totalInterest}
          />
        </section>
      </main>
    </FluentProvider>
  );
}

export default App;