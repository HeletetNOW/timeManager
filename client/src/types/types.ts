export type tagType = {
  id: number;
  tagName: string;
  projects: projectType[];
  timers: timerType[];
};

export type subProjectType = {
  sumTime: number;
  id: number;
  status: boolean;
  subProjectName: string;
  description: string;
  project: projectType;
  timers: timerType[];
};

export type projectType = {
  id: number;
  status: boolean;
  sumTime: number;
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
  subProjects: subProjectType[];
};
