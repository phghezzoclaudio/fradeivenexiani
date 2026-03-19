import fs from "fs"
import path from "path"
import { Page } from "@/types/page"

export function getCityPage(city: string, slug: string): Page {
  const filePath = path.join(process.cwd(), "data", city, `${slug}.json`)
  const file = fs.readFileSync(filePath, "utf-8")
  return JSON.parse(file)
}