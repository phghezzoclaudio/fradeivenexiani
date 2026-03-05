import routes from "@/data/Cycleroutes.json"
import CycleRouteCard from "./cicloturismo/CycleRouteCard"

export default function CicloturismoList(){

 return(

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

   {routes.map((route) => (

    <CycleRouteCard
      key={route.slug}
      slug={route.slug}
      name={route.name}
      distance={route.distance}
      difficulty={route.difficulty}
      description={route.description}
    />

   ))}

  </div>

 )

}