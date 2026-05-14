// Definiamo la struttura che ogni progetto deve avere
export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[]; // Esempio: ["Next.js", "API", "CSS"]
}

// Esportiamo l'oggetto con tutti i tuoi progetti
export const projectsData: Record<string, Project> = {
  "taskflow-premium": {
    title: "TaskFlow Premium",
    description: "Un task manager avanzato con filtri dinamici, persistenza nel localStorage e un'interfaccia utente curata in ogni dettaglio con uno stile Dark Mode e accenti Teal.",
    link: "https://taskflow-premium.vercel.app",
    tags: ["Next.js", "TypeScript", "LocalStorage"]
  },
  "taskflow-app-s": {
    title: "TaskFlow App S",
    description: "La versione essenziale di TaskFlow, focalizzata sulla semplicità d'uso e sulla gestione rapida delle attività quotidiane.",
    link: "https://taskflow-app-s.vercel.app/",
    tags: ["React", "JavaScript", "Vercel"]
  },
  "app-meteo": {
    title: "App Meteo",
    description: "Applicazione meteo che interroga le API di OpenWeather per fornire dati in tempo reale. Include icone dinamiche che cambiano in base alle condizioni atmosferiche.",
    link: "https://alessandros0tgiu.github.io/app-meteo/",
    tags: ["API Rest", "Fetch", "GitHub Pages"]
  }
};