// Definiamo la struttura che ogni progetto deve avere
export interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

// Esportiamo l'oggetto con tutti i tuoi progetti aggiornati
export const projectsData: Record<string, Project> = {
  "taskflow-premium": {
    title: "TaskFlow Dark",
    description: "Il mio progetto più avanzato a livello di architettura. Un task manager sviluppato con Next.js e TypeScript che offre prestazioni elevate e gestione dei dati tramite LocalStorage API, garantendo la persistenza dei task anche dopo la chiusura del browser. Presenta un layout responsive curato con CSS Moderno (Flexbox/Grid).",
    link: "https://taskflow-premium.vercel.app",
    tags: ["Next.js", "TypeScript", "LocalStorage", "React", "Tailwind/CSS"]
  },
  "taskflow-app-s": {
    title: "TaskFlow App",
    description: "Versione snella ed immediata focalizzata sulla semplicità d'uso. Sviluppata in React con Vite per la massima leggerezza, utilizza JavaScript ES6+ e una gestione dello stato reattiva (useState) per un'esperienza utente fluida.",
    link: "https://taskflow-app-s.vercel.app/",
    tags: ["React", "JavaScript", "Vite", "Vercel", "State Management"]
  },
  "app-meteo": {
    title: "App Meteo",
    description: "Un'applicazione meteo avanzata che integra le API di WeatherAPI.com per fornire dati in tempo reale, previsioni a 7 giorni e suggerimenti di ricerca. Include grafici dinamici della temperatura con Recharts, un sistema di multi-lingua (i18n) e un motore di effetti atmosferici personalizzato (pioggia, lampi) con animazioni CSS e Glassmorphism.",
    link: "https://alessandros0tgiu.github.io/app-meteo/",
    tags: [
      "React",
      "TypeScript",
      "Recharts",
      "i18next",
      "WeatherAPI",
      "CSS Glassmorphism",
      "Vite"
    ]
  },
  "barbershop": {
    title: "Barbershop Luxury",
    description: "Web Application Premium multi-portale (Cliente/Admin) progettata per la digitalizzazione dell'agenda di un salone di lusso a Sassari. Gestisce la prevenzione dei conflitti di orario in tempo reale tramite griglie orarie dinamiche a intervalli di 30 minuti. Sviluppata con Next.js App Router e TypeScript, l'app utilizza localStorage ed eventi di sistema per simulare la persistenza reattiva dei dati. L'architettura include già la predisposizione strutturale per la migrazione a un backend cloud centralizzato con Supabase e Prisma ORM.",
    link: "https://barbershop-s.vercel.app/",
    tags: ["Next.js", "TypeScript", "Prisma/Supabase Ready", "LocalStorage API", "Tailwind/CSS3"]
  }
};