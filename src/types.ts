export type Project = {
  name: string,
  needles: string,
  pattern: string,
  projectId: string,
  size: string,
  yarn: string,
  notes: string,
  imageUrl: string
}

export type AllProjects = Partial<Project>[]

export type QueuedItemType = {
  name: string,
  notes: string,
  queuedItemId: string
}