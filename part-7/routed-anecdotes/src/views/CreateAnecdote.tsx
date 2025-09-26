import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CreateAnecdote() {

    const [formData, setFormData] = useState({
        content: "",
        author: "",
        info: ""
    });

    const resetForm = () => {
        setFormData({
            content: "",
            author: "",
            info: ""
        });
    }

  return (
    <div className="max-w-screen-md mx-auto w-[95%]">
      <h1 className="text-2xl font-semibold pb-2">Create New Anecdote</h1>
      <form className="flex flex-col gap-4">
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
            onChange={(e) => setFormData({...formData, content: e.target.value})}
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
            onChange={(e) => setFormData({...formData, author: e.target.value})}
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
            onChange={(e) => setFormData({...formData, info: e.target.value})}
            className="p-2 border border-neutral-500/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Form Buttons */}
        <div className="flex gap-2">
          <Button variant={"default"} type="submit">
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
