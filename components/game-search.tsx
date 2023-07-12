"use client";

import * as Form from "@radix-ui/react-form";
import { useState } from "react";

export default function GameSearchBar() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit pressed");
  };

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <Form.Root className="w-[260px]" onSubmit={handleSubmit}>
      <Form.Field name="q" className="mb-5 grid">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-lg text-white">Search</Form.Label>
          <Form.Message className="text-red-500" match="valueMissing">
            What are you looking for?
          </Form.Message>
        </div>
        <Form.Control
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="text-black"
        />
      </Form.Field>

      <Form.Submit asChild>
        <button className="box-border w-full rounded-sm bg-zinc-200 text-black">
          search
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
