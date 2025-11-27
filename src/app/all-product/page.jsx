
// import AllProducts from '@/component/product/AllProducts'

// export default async function Page() {
//   // Server-side fetch
//   const res = await fetch("http://localhost:3000/api/event");
//   const events = await res.json();

//   return (
//     <div>
//       <AllProducts events={events} />
//     </div>
//   );
// }


// import AllProducts from '@/component/product/AllProducts';
// import clientPromise from "@/lib/mongodb";  // <-- তোমার mongo config

// export default async function Page() {
//   const client = await clientPromise;
//   const db = client.db("productVault");

//   const products = await db
//     .collection("events")
//     .find({})
//     .toArray();

//   return (
//     <div>
//       <AllProducts events={JSON.parse(JSON.stringify(products))} />
//     </div>
//   );
// }


import AllProducts from '@/component/product/AllProducts'

export default async function Page() {

  const res = await fetch("/api/event", {
    cache: "no-store", // always fetch fresh data
  });

  const events = await res.json();

  return (
    <div>
      <AllProducts events={events} />
    </div>
  );
}
