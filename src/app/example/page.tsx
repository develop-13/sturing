"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";

function page() {
  const [image, setImage] = useState<Blob | null>(null);

  const onChangHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!image) {
        return;
      }

      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {}
  };

  return (
    <form className="w-1/2 mx-auto py-10" onSubmit={onSubmitHandler}>
      <input type="file" name="" id="" onChange={onChangHandler} />
      <button className="bg-black px-4 py-2 rounded-lg text-white">
        upload
      </button>
    </form>
  );
}

export default page;
