export interface GetProject {
  id: number
  title: string
  startDate: string
  endDate: string
  description: string
}

export interface Project {
  title: string
  startDate: Date
  endDate: Date
  description: string
}

export interface GetTask {
  id: number
  title: string
  startDate: string
  endDate: string
  projectId: number
}

export interface EditTask{
  id: number
  title: string
  startDate: Date
  endDate: Date
  projectId: number
}

export interface TableData{
  timespan: number
  offset: number
}

export interface Task {
  title: string
  startDate: Date
  endDate: Date
  projectId: number
}

export interface GetEditTaskDialogData {
  task: GetTask
  projects: GetProject[]
}
