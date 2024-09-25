export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
}

async function fetchData(params: { id: string }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const data = res.json();
  return data;
}

async function page({
  params,
}: {
  params: { id: string };
  children?: React.ReactNode;
}) {
  const data = await fetchData(params);
  console.log(data);

  return (
    <div>
      <h1>{data.title}</h1>
    </div>
  );
}

export default page;
