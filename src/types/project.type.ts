
export interface ICreateProject {
  dto: {
    title: string
    description: string
    github: string
    demo?: string
    tag: Tag
    user_owner: string
  }
}

export interface IUpdateProject {
  idProject: string
  dto: {
    title?: string
    description?: string
    github?: string
    demo?: string
    tag?: Tag
    user_owner?: string
  }
}

export interface IByID {
  id: string
}

enum Tag {
  JS,
  TS,
  PY
}