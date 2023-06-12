const Schema = `#graphql
  # Querys

  type Query {
    projects: [Project!]!
    project(id: ID!): Project
  }

  type Mutation {
    # Auth
    login(email: EmailAddress!, password: String!): AuthResponse
    register(dto: RegisterUserInput): User
    # Projects
    addProject(dto: CreateProjectInput): Project
    deleteProject(id: ID!): Project
    updateProject(idProject: ID!, dto: UpdateProjectInput): Project
  }

  # Types

  type Project {
    id: ID
    title: String!
    description: String!
    github: URL!
    demo: URL
    tag: Tag
    user_owner: String!
    image: [Image!]!
  }

  type AuthResponse {
    user: User!
    token: JWT!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String
    projects: [Project!]!
    role: Rol!
  }

  type Image {
    id: ID!
    filename: String!
    url: URL! 
    project_owner: Int!
  }

  # Enum

  enum Rol {
    ADMIN
    USER
  }

  enum Tag {
    JS
    PY
    TS
  }

  # inputs

  input RegisterUserInput {
    name: String!
    username: String!
    email: EmailAddress!
    password: String!
    role: RoleType! 
  }

  input CreateProjectInput {
    title: String!
    description: String!
    github: URL!
    demo: URL
    tag: Tag!
    user_owner: EmailAddress!
  }

  input UpdateProjectInput {
    title: String!
    description: String!
    github: URL!
    demo: URL
    tag: Tag!
    user_owner: EmailAddress!
  }

  scalar RoleType
`

export default Schema;

