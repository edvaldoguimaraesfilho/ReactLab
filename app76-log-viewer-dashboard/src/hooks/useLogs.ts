import { useEffect, useState } from "react";
import { getLogs } from "../services/logService";
import { LogEntry } from "../models/LogEntry";

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getLogs();
      setLogs(data);
      setLoading(false);
    }

    load();
  }, []);

  return {
    logs,
    loading,
  };
}