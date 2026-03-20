export type ParagraphBlock = {
  type: "paragraph"
  text: string
}

export type HeadingBlock = {
  type: "heading"
  text: string
}

export type ImageBlock = {
  type: "image"
  src: string
  alt?: string
}

export type ListBlock = {
  type: "list"
  items: string[]
}

export type Block =
  | ParagraphBlock
  | HeadingBlock
  | ImageBlock
  | ListBlock

export type Page = {
  slug: string
  title: string
  excerpt?: string
  content: Block[]
  seo?: {
    title: string
    description: string
  }
}