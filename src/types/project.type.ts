import { Tag } from '@prisma/client'

export interface ICreateProject {
  dto: {
    title: string
    description: string
    github: string
    demo?: string
    tag: ETag
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
    tag?: ETag
    user_owner?: string
  }
}

export interface IProject {
  id: number
  title: string
  description: string
  github: {
    href: string
  }
  demo: {
    href: string
  }
  tag: Tag
  user_owner: string
}

export interface IByID {
  id: string
}

enum ETag {
  JS,
  TS,
  PY
}