import MapClient from "@/components/MapClient"

export default async function Page({
 params
}:{
 params:Promise<{slug:string}>
}){

 const {slug}=await params

 return(

  <div>

   <h1 className="text-3xl font-bold mb-6">
    {slug}
   </h1>

   <MapClient slug={slug}/>

  </div>

 )

}