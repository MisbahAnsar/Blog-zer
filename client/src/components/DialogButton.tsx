// DialogButton.tsx
import { Button } from "@/components/ui/button"; // Ensure you import Button from the right path
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
import { Post } from '../lib/type';

interface DialogButtonProps {
  onNewPost: (post: Post) => void;
  buttonText: string;
  className?: string;
}

const DialogButton: React.FC<DialogButtonProps> = ({ onNewPost, buttonText }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");  
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userData = await api.getUser();
        setUsername(userData.username);
      } catch (error: any) {
        setError(error.message || "Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.createPost({
        title,
        content
      });
      onNewPost(response.data);
      setTitle("");
      setContent("");
    } catch (error: any) {
      setError(error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="gap-4 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="px-8 py-5 border border-black text-xl" variant="outline">{buttonText}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-w-[350px]">
          <DialogHeader>
            <DialogTitle className="text-start text-xl flex gap-1 tracking-wider">
              <Avatar width={29} height={29} />
              @{username || "Username"}
            </DialogTitle>
            <DialogDescription className="text-md text-start">
              Make changes to the world here by sharing your experiences in a blog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 bg-white text-black dark:bg-black dark:text-white">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right font-semibold font-mono">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3 tracking-wide"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right font-semibold font-mono tracking-wider">
                Content
              </Label>
              <textarea
                id="content"
                value={content}
                placeholder="write here..."
                onChange={(e) => setContent(e.target.value)}
                className="box-size-textarea col-span-3 border border-gray-700 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent rounded-md p-2 bg-white text-black dark:bg-black dark:text-white resize-none"
                style={{
                  lineHeight: "1.5",
                  minHeight: "10rem",
                  maxHeight: "15rem",
                  boxSizing: "border-box",
                }}
                onInput={(e) => {
                  const textarea = e.target as HTMLTextAreaElement;
                  textarea.style.height = "auto";
                  textarea.style.height = `${textarea.scrollHeight}px`;
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              {loading ? "Posting..." : "Post"}
            </Button>
          </DialogFooter>
          {error && <div className="text-red-500">{error}</div>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogButton;
