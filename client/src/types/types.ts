export type tagType = {
  id: number;
  tagName: string;
  projects: projectType[];
};

export type subProjectType = {
  id: number;
  status: boolean;
  subProjectName: string;
  description: string;
  project: projectType;
};

export type projectType = {
  id: number;
  status: boolean;
  projectName: string;
  description: string;
  subProjects: subProjectType[];
  tags: tagType[];
  timers: timerType[];
};

export type timerType = {
  id: number;
  timerName: string;
  startTime: Date;
  pauseTimer: boolean;
  sumTime: number;
  addTimer: Date;
  tags: tagType[];
  projects: projectType[];
};
