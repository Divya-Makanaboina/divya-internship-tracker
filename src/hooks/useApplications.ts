import { useState, useEffect, useCallback } from "react";
import { Application } from "@/types/application";

const STORAGE_KEY = "internship-applications";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setApplications(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored applications:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever applications change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
    }
  }, [applications, isLoaded]);

  const addApplication = useCallback((app: Omit<Application, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newApp: Application = {
      ...app,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setApplications((prev) => [...prev, newApp]);
    return newApp;
  }, []);

  const updateApplication = useCallback((id: string, updates: Partial<Omit<Application, "id" | "createdAt">>) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, ...updates, updatedAt: new Date().toISOString() }
          : app
      )
    );
  }, []);

  const deleteApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }, []);

  return {
    applications,
    isLoaded,
    addApplication,
    updateApplication,
    deleteApplication,
  };
}
