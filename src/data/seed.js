import { generateId } from "../lib/storage.js";

const makeCard = (title, content = "", name) => ({
  id: generateId(),
  title,
  content,
  name
});

export const seed = {
  topics: [
    {
      id: generateId(),
      name: "Cloud",
      icon: "Cloud",
      cards: [
        makeCard(
          "EC2 basics",
          "EC2 is a virtual server used to run applications.",
          "Cloud"
        ),
        makeCard(
          "S3 storage",
          "S3 stores objects in buckets and scales automatically.",
          "Cloud"
        ),
      ],
    },
    {
      id: generateId(),
      name: "Database",
      icon: "Database",
      cards: [
        makeCard("Schema design", "Plan collections to fit your queries.", "Database"),
        makeCard(
          "Indexes",
          "Indexes help speed up reads but slow down writes.",
          "Database"
        ),
      ],
    },
    {
      id: generateId(),
      name: "CICD",
      icon: "CiCd",
      cards: [
        makeCard("Pipelines", "Automate builds and deployments.", "CICD"),
        makeCard("Runners", "Agents that execute your CI jobs."),
      ],
    },
    {
      id: generateId(),
      name: "Default",
      icon: "Default",
      cards: [
        makeCard("Pipelines", "Automate builds and deployments.", "Default"),
        makeCard("Runners", "Agents that execute your CI jobs.", "Default"),
      ],
    },
    {
      id: generateId(),
      name: "Backend",
      icon: "Backend",
      cards: [
        makeCard("APIs", "Understand REST vs RPC patterns.", "Backend"),
        makeCard("Authentication", "Sessions vs tokens."),
      ],
    },
    {
      id: generateId(),
      name: "Frontend",
      icon: "Frontend",
      cards: [
        makeCard("React basics", "Learn React components and hooks.", "Frontend"),
        makeCard("Styling", "Use Tailwind or CSS for UI design."),
      ],
    },
    {
      id: generateId(),
      name: "Networking",
      icon: "Networking",
      cards: [
        makeCard("HTTP basics", "HTTP works on a request and response format.", "Networking"),
        makeCard("DNS", "DNS resolves human readable names into IPs.", "Networking"),
      ],
    },
    {
      id: generateId(),
      name: "DevOps",
      icon: "DevOps",
      cards: [
        makeCard("CI pipelines", "Setup automated CI workflows.", "DevOps"),
        makeCard("Monitoring", "Track application metrics and logs.", "DevOps"),
      ],
    },
    {
      id: generateId(),
      name: "Security",
      icon: "Security",
      cards: [
        makeCard("Encryption", "Use SSL/TLS to secure data in transit.", "Security"),
        makeCard("Authentication", "Implement secure login mechanisms.", "Security"),
      ],
    },
    {
      id: generateId(),
      name: "Linux",
      icon: "Linux",
      cards: [
        makeCard(
          "Permissions",
          "Linux uses rwx flags for user, group, and others.",
          "Linux"
        ),
        makeCard(
          "Processes",
          "Every process has a PID and is managed by the kernel.",
          "Linux"
        ),
      ],
    },

    {
      id: generateId(),
      name: "Tools",
      icon: "Tools",
      cards: [
        makeCard("CLI tools", "Use command line utilities effectively.", "Tools"),
        makeCard("IDE setup", "Configure editors for productivity."),
      ],
    },
    {
      id: generateId(),
      name: "Architecture",
      icon: "Architecture",
      cards: [
        makeCard(
          "Monolith vs Microservices",
          "Understand system design choices.",
          "Architecture"
        ),
        makeCard("Scalability", "Plan for horizontal and vertical scaling.", "Architecture"),
      ],
    },
    {
      id: generateId(),
      name: "Docs",
      icon: "Docs",
      cards: [
        makeCard("Markdown", "Write documentation using Markdown.", "Docs"),
        makeCard("Versioning", "Keep track of doc changes over time.", "Docs"),
      ],
    },
    {
      id: generateId(),
      name: "Microservices",
      icon: "Microservices",
      cards: [
        makeCard(
          "Service decomposition",
          "Break monoliths into independent services.",
          "Microservices"
        ),
        makeCard(
          "Inter-service communication",
          "Use REST, gRPC, or messaging queues.",
          "Microservices"
        ),
      ],
    },
    {
      id: generateId(),
      name: "Deployment",
      icon: "Deployment",
      cards: [
        makeCard("Docker", "Containerize your applications.", "Deployment"),
        makeCard("Kubernetes", "Deploy apps in clusters.", "Deployment"),
        
      ],
    },
    {
      id: generateId(),
      name: "Storage",
      icon: "Storage",
      cards: [
        makeCard("Databases", "Choose SQL or NoSQL storage.", "Storage"),
        makeCard("Backups", "Implement backup and recovery plans.", "Storage"),
      ],
    },
    {
      id: generateId(),
      name: "File",
      icon: "File",
      cards: [
        makeCard(
          "File formats",
          "Understand different types like txt, pdf, csv.",
          "File"
        ),
        makeCard(
          "File operations",
          "Read, write, and manage files programmatically.", "File"
        ),
      ],
    },

    {
      id: generateId(),
      name: "Files",
      icon: "Files",
      cards: [
        makeCard("File management", "Organize and structure files.", "Files"),
        makeCard("Version control", "Track file changes efficiently."),
      ],
    },
    {
      id: generateId(),
      name: "Folder",
      icon: "Folder",
      cards: [
        makeCard("Project structure", "Organize folders logically.", "Folder"),
        makeCard("Access control", "Manage permissions on folders.", "Folder"),
      ],
    },
    {
      id: generateId(),
      name: "FolderOpen",
      icon: "FolderOpen",
      cards: [
        makeCard("Open folders", "Quick access to project directories.", "FolderOpen"),
        makeCard("Recent projects", "Track recently opened folders.", "FolderOpen"),
      ],
    },
    {
      id: generateId(),
      name: "Git",
      icon: "FolderGit2",
      cards: [
        makeCard("Git repos", "Manage repository folders.", "Git"),
        makeCard("Branching", "Handle multiple branches inside folders.", "Git"),
      ],
    },
    {
      id: generateId(),
      name: "Code",
      icon: "Code",
      cards: [
        makeCard("Snippets", "Store reusable code blocks.", "Code"),
        makeCard("Linting", "Keep code clean with linters.", "Code"),
      ],
    },
  ],
};
