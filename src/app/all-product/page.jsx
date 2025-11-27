
import AllProducts from '@/component/product/AllProducts'

export default async function Page() {
  // Server-side fetch
  const res = await fetch("http://localhost:3000/api/event");
  const events = await res.json();

  return (
    <div>
      <AllProducts events={events} />
    </div>
  );
}
