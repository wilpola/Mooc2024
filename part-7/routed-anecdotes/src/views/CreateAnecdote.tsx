import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Anecdote } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateAnecdote() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Anecdote>({
    content: "",
    author: "",
    info: "",
    id: crypto.randomUUID(),
    votes: 0,
  });

  const resetForm = () => {
    setFormData({
      content: "",
      author: "",
      info: "",
      id: crypto.randomUUID(),
      votes: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnecdote = {
      content: formData.content,
      author: formData.author,
      info: formData.info,
      id: formData.id,
      votes: 0,
    };
    const x = window.localStorage.getItem("anecdotes");
    if (x) {
      const a = JSON.parse(x);
      a.push(newAnecdote);
      window.localStorage.setItem("anecdotes", JSON.stringify(a));
    }
    resetForm();
    toast.success("Anecdote created successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-screen-md mx-auto w-[95%]">
      <h1 className="text-2xl font-semibold pb-2">Create New Anecdote</h1>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        onReset={resetForm}
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="content" className="font-medium">
            Content
          </Label>
          <Input
            type="text"
            id="content"
            name="content"
            placeholder="Anecdote content..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            autoFocus
            className="p-2 border border-neutral-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="author" className="font-medium">
            Author
          </Label>
          <Input
            type="text"
            id="author"
            name="author"
            placeholder="Author name..."
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            className="p-2 border border-neutral-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="info" className="font-medium">
            URL for more info
          </Label>
          <Input
            type="text"
            id="info"
            name="info"
            placeholder="More info..."
            value={formData.info}
            onChange={(e) => setFormData({ ...formData, info: e.target.value })}
            className="p-2 border border-neutral-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Form Buttons */}
        <div className="flex gap-2">
          <Button variant={"default"} type="submit" onClick={handleSubmit}>
            Create
          </Button>
          <Button variant={"outline"} type="reset" onClick={resetForm}>
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
