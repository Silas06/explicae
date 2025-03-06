export interface ITopic {
  idTopic: number
  title: string
  slug: string
  order: number
  topics: ITopic[]
  status: string
  serie: Serie | null
  archives: any
  exercices: any
  videos: any
  newOrder: number
  report?: {
    totalExercices: string
    totalMaterial: string
    totalVideos: string
    totalLesson: string
  }
}

export interface Serie {
  ID: number
  title: string
  title_extended: string
}

export interface IExercise {
  idExercice: number
  title: string
  slug: string
  duration: number
  order: number
  questionCount: number
  IDModelVestibular: number
  IDMaterialCategory: number
  registry_date: string
  updateDate: string
  category: number
  date_update: string
}
export interface IArchive {
  idArchive: number,
  title: string,
  url: string,
  slug: string,
  slugfix: string,
  questionCount: number,
  registry_date: string,
  IDModelVestibular: number,
  IDMaterialType: number,
  IDMaterialCategory: number,
  duration: number,
  date_update: string,
}

export interface IExerciseExibition {
  exercises?: IExercise[]
  title?: string
  count: string
}

export interface IArchiveExibition {
  archives?: IArchive[]
  title?: string
  count: string
}
