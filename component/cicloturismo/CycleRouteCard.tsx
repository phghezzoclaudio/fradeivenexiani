import Link from "next/link"

type Props = {
 slug: string
 name: string
 description: string 
 distance: number
 difficulty?: string
}

export default function CycleRouteCard({
 slug,
 name,
 distance,
 difficulty
}: Props){

 return(

  <Link
   href={`/cicloturismo/${slug}`}
   className="block bg-white rounded-xl shadow hover:shadow-lg transition p-6"
  >

   <h3 className="text-xl font-bold mb-2 text-venice-red">
    {name}
   </h3>

   <div className="flex gap-4 text-sm text-gray-600">

    <span>🚴 {distance} km</span>

    {difficulty && <span>⛰ {difficulty}</span>}

   </div>

  </Link>

 )

}