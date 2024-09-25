import kv from "@vercel/kv";

import { revalidatePath } from "next/cache";

interface Data {
  name: string;
  age: number;
}

export default async function Page({ params }: { params: { id: string } }) {
  const key = `test:${params.id}`;

  const data = await kv.get<Data>(key);

  async function handleSubmit(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const age = formData.get("age");

    await kv.set(key, { name, age });

    revalidatePath(`/server-action/form/${params.id}`);
  }

  return (
    <>
      <h1>form with data</h1>
      <h2>
        서버에 저장된 정보:{data?.name} {data?.age}
      </h2>

      <form action={handleSubmit}>
        <label htmlFor="name">이름:</label>

        <input
          type="text"
          id="name"
          name="name"
          defaultValue={data?.name}
          placeholder="이름을 입력해주세요"
        />

        <label htmlFor="age">나이:</label>
        <input
          type="number"
          id="age"
          name="age"
          defaultValue={data?.age}
          placeholder="나이를 입력해주세요"
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
