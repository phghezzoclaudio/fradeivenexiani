"use client"

import dynamic from "next/dynamic"

const CicloturismoMap = dynamic(
  () => import("./CicloturismoMap"),
  { ssr: false }
)

export default function CicloturismoMapClient() {
  return <CicloturismoMap />
}