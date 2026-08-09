// Mocked data — stands in for a real DB/API for this build.

export const student = {
  name: "Pavitra",
  track: "Data Science",
  trackColor: "amber",
  totalDays: 60,
  currentDay: 12,
  streak: 10, // active streak (day 7 was missed, saved by a Comeback Card, streak continued)
  longestStreak: 10,
  comebackCards: { total: 3, used: 1, remaining: 2 },
  completionPercent: Math.round((11 / 60) * 100), // 11 days actually completed
  badges: [
    { id: "b1", label: "First Commit", icon: "flame", earned: true },
    { id: "b2", label: "7-Day Flame", icon: "trophy", earned: true },
    { id: "b3", label: "Comeback Kid", icon: "shield", earned: true },
    { id: "b4", label: "Halfway There", icon: "flag", earned: false },
  ],
  rank: 143,
  totalStudents: 2840,
};

// Status per day: 'done' | 'missed-saved' | 'missed' | 'today' | 'upcoming'
export const calendar = Array.from({ length: 60 }, (_, i) => {
  const day = i + 1;
  let status = "upcoming";
  if (day < 12) status = "done";
  if (day === 7) status = "missed-saved"; // missed but covered by comeback card
  if (day === 12) status = "today";
  return { day, status };
});

export const days = {
  1: {
    day: 1,
    track: "Data Science",
    title: "Set up your toolkit",
    brief:
      "Install Python, set up a virtual environment, and get Jupyter or VS Code running. Push a hello-world notebook.",
    checklist: [
      "Install Python 3.11+ and create a virtual environment",
      "Install pandas, numpy, and matplotlib",
      "Create a notebook that loads and prints a sample dataset",
      "Push it to a public GitHub repo",
    ],
    resources: ["Python.org install guide", "VS Code Python extension"],
    status: "done",
  },
  7: {
    day: 7,
    track: "Data Science",
    title: "Clean a messy dataset",
    brief:
      "Take a raw CSV with missing values and inconsistent formatting, and clean it into an analysis-ready dataset.",
    checklist: [
      "Handle missing values with a documented strategy",
      "Standardise column names and data types",
      "Write a short README explaining your cleaning steps",
    ],
    resources: ["pandas.DataFrame.dropna docs", "Kaggle: Data Cleaning course"],
    status: "missed-saved",
  },
  12: {
    day: 12,
    track: "Data Science",
    title: "Build a correlation heatmap",
    brief:
      "Using a sales or health dataset of your choice, generate a correlation heatmap and write three sentences on what it reveals.",
    checklist: [
      "Load a dataset with at least 5 numeric columns",
      "Compute the correlation matrix",
      "Plot it as a heatmap with seaborn or matplotlib",
      "Write a short interpretation of the strongest relationships",
    ],
    resources: ["seaborn.heatmap docs", "Towards Data Science: reading correlation matrices"],
    status: "today",
  },
};
