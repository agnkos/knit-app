export type Project = {
    name: string,
    needles: string,
    pattern: string,
    projectId: string,
    size: string,
    yarn: string,
    notes: string,
  }
  
  export type AllProjects = Partial<Project>[]