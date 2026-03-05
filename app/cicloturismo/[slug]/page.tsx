import MapClient from "@/components/MapClient"

export default function Page({
 params
}:{
 params:{slug:string}
}){

 const {slug} = params

 return(

  <div>

   <h1>{slug}</h1>

   <MapClient slug={slug}/>

   <a href={`/gpx/${slug}.gpx`} download>
    Scarica GPX
   </a>

  </div>

 )

}