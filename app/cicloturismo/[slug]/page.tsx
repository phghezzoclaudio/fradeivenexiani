import MapClient from "@/components/MapClient"

export default async function Page({
 params
}:{
 params: Promise<{ slug: string }>
}){

 const { slug } = await params

 return (

  <div>

   <h1>{slug}</h1>

   <MapClient slug={slug}/>

  </div>

 )

}