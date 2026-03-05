"use client"

import dynamic from "next/dynamic"

const CycleMap = dynamic(
  () => import("./CycleMap"),
  { ssr: false }
)

type Props = {
  slug: string
}

export default function MapClient({ slug }: Props) {
  return <CycleMap slug={slug} />
}