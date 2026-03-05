import Link from "next/link"

type Props={
 slug:string
 name:string
 distance:number
 difficulty?:string
 description?:string
}

export default function CycleRouteCard({
 slug,
 name,
 distance,
 difficulty,
 description
}:Props){

 return(

  <Link
   href={`/cicloturismo/${slug}`}
   className="block bg-white rounded-xl shadow hover:shadow-lg p-6"
  >

   <h3 className="text-xl font-bold mb-2">
    {name}
   </h3>

   <p className="text-sm text-gray-600 mb-2">
    🚴 {distance} km {difficulty && `• ${difficulty}`}
   </p>

   {description && (
    <p className="text-sm text-gray-500">
     {description}
    </p>
   )}

  </Link>

 )

}