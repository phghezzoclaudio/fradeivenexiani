import fs from "fs"
import path from "path"
import { Page } from "@/types/page"

export function getCityPages(city: string) {
  const dir = path.join(process.cwd(), "data", city)
  const files = fs.readdirSync(dir)

  return files.map((file) => {
    const filePath = path.join(dir, file)
    const content = fs.readFileSync(filePath, "utf-8")
    const data: Page = JSON.parse(content)

    return {
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt || "",
      type: (data as any).type || "page",
    }
  })
}