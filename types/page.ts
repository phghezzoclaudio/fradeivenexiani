export type TextSection = {
  type: "text"
  title: string
  content: string
}

export type ListSection = {
  type: "list"
  title: string
  items: string[]
}

export type Section = TextSection | ListSection

export type Page = {
  title: string
  sections: Section[]
}