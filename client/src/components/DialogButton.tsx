import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Avatar from "./ui/avatar";

const DialogButton = () => {
  
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");  // State for title
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userData = await api.getUser(); // Fetch authenticated user
        setUsername(userData.username);  // Only set the username
      } catch (error: any) {
        setError(error.message || "Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault;
    try{
      const response = await api.createPost({title, content});
      setTitle("");
      setContent("");
      alert("Post created successfull");
    } catch(error) {
      setError(error.message || "failed to create post")
    } finally{
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="gap-4 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-md mt-1">Write now</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-w-[350px]">
          <DialogHeader>
            <DialogTitle 
              className="text-start text-xl flex gap-1 tracking-wider">
              <Avatar width={29} height={29} /> 
              @{username || "Username"}
            </DialogTitle>
            <DialogDescription className="text-md text-start">
              Make changes to the world here by sharing your experiences in a blog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 bg-white text-black dark:bg-black dark:text-white">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-semibold font-mono">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) =>setTitle(e.target.value)}
                className="col-span-3 tracking-wide"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="username" className="text-right font-semibold font-mono tracking-wider">
                Content
              </Label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="col-span-3 border border-gray-700 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent rounded-md p-2 bg-white text-black dark:bg-black dark:text-white resize-none"
                rows={1}
                style={{
                  lineHeight: "1.5",
                  minHeight: "10rem",
                  maxHeight: "15rem",
                  boxSizing: "border-box",
                }}
                onInput={(e) => {
                  const textarea = e.target;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogButton;
