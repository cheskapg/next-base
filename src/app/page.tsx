"use client"
import Insurance from "./components/Insurance";
import Physician from "./components/Physicians";

export default function Home() {
  return (
    <main>

     <section className="xl:padding-1 wide:padding-r padding-b">
       <Insurance/>

     <Physician/>
 
   
     </section>
   </main>
  );
}
