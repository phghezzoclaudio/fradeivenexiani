import fs from "fs"
import path from "path"
import { Page } from "@/types/page"

export function getCityPage(city: string, slug: string): Page {

  const filePath = path.join(
    process.cwd(),
    "data",
    city,
    `${slug}.json`
  )

  // 🔍 DEBUG
  console.log("CITY:", city)
  console.log("SLUG:", slug)
  console.log("PATH:", filePath)

  // 🔥 CONTROLLO ESISTENZA FILE
  if (!fs.existsSync(filePath)) {
    console.error("FILE NOT FOUND:", filePath)
    throw new Error("Page not found")
  }

  const file = fs.readFileSync(filePath, "utf-8")

  return JSON.parse(file)
}