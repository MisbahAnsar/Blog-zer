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

const DialogButton = () => {
  return (
    <div className="gap-4 items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-md mt-1">Write now</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] max-w-[350px]">
          <DialogHeader>
            <DialogTitle>@Username</DialogTitle>
            <DialogDescription>
              Make changes to the world here by sharing your experiences in a blog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 bg-white text-black dark:bg-black dark:text-white">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right font-semibold font-mono">
                Title
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3 tracking-wide"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="username" className="text-right font-semibold font-mono tracking-wider">
                Username
              </Label>
              <textarea
                id="username"
                defaultValue="@peduarte"
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
