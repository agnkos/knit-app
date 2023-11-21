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
  queuedItemId: string,
  position: number,
  createdAt: Date
}

export type StashItem = {
  stashItemId: string,
  name: string,
  skeins: number,
  colorway: string | number,
  dyelot: number,
  purchased: string
}

export type AllStash = Partial<StashItem>[]