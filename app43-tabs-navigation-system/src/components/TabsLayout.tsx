import { useState } from "react";

import {
  Card,
  Tab,
  TabList,
  Title1,
} from "@fluentui/react-components";

import type {
  SelectTabData,
  SelectTabEvent,
} from "@fluentui/react-components";

import { tabs } from "../data/tabs";

import { DashboardTab } from "./DashboardTab";
import { ProjectsTab } from "./ProjectsTab";
import { ReportsTab } from "./ReportsTab";
import { SettingsTab } from "./SettingsTab";

export function TabsLayout() {
  const [selectedTab, setSelectedTab] =
    useState("dashboard");

  function handleTabSelect(
    _event: SelectTabEvent,
    data: SelectTabData
  ) {
    setSelectedTab(data.value as string);
  }

  function renderTabContent() {
    if (selectedTab === "dashboard") {
      return <DashboardTab />;
    }

    if (selectedTab === "projects") {
      return <ProjectsTab />;
    }

    if (selectedTab === "reports") {
      return <ReportsTab />;
    }

    return <SettingsTab />;
  }

  return (
    <Card
      style={{
        padding: "32px",
        width: "100%",
        maxWidth: "1100px",
      }}
    >
      <Title1>Enterprise Tabs Navigation</Title1>

      <TabList
        selectedValue={selectedTab}
        onTabSelect={handleTabSelect}
        style={{
          marginTop: "24px",
          marginBottom: "32px",
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {renderTabContent()}
    </Card>
  );
}