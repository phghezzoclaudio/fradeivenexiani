import routes from "@/data/Cycleroutes.json"
import Link from "next/link"

export default function Page(){

 return(

  <div>

   <h1>Cicloturismo</h1>

   <ul>
    {routes.map(route=>(
     <li key={route.slug}>
      <Link href={`/cicloturismo/${route.slug}`}>
       {route.name} ({route.distance} km)
      </Link>
     </li>
    ))}
   </ul>

  </div>

 )

}