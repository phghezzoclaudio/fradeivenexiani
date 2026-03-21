import Image from "next/image"
import { Block } from "@/types/page"

export default function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {

    case "heading":
      return (
        <h2 className="text-2xl font-bold mt-6">
          {block.text}
        </h2>
      )

    case "paragraph":
      return (
        <p className="mt-4 leading-relaxed">
          {block.text}
        </p>
      )

    case "image":

      
      if (!block.src) return null

      return (
        <div className="mt-6">
          <Image
            src={block.src}
            alt={block.alt || ""}
            width={800}
            height={500}
            className="rounded-xl"
          />
        </div>
      )

    case "list":
      return (
        <ul className="list-disc pl-6 mt-4 space-y-1">
          {block.items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )

    default:
      return null
  }
}