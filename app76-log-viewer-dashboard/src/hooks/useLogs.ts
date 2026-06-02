import { useEffect, useState } from "react";
import { getLogs } from "../services/logService";
import type { LogEntry } from "../models/LogEntry";

export function useLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadLogs() {
      const data = await getLogs();

      setLogs(data);
      setLoading(false);
    }

    loadLogs();
  }, []);

  return {
    logs,
    loading,
  };
}