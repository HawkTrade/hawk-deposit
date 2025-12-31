"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Toast Test Gallery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        <Button
          onClick={() =>
            toast("Event has been created", {
              description: "Sunday, December 03, 2023 at 9:00 AM",
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Default Toast
        </Button>

        <Button onClick={() => toast.success("Event has been created")}>
          Success Toast
        </Button>

        <Button onClick={() => toast.info("New notification received")}>
          Info Toast
        </Button>

        <Button onClick={() => toast.warning("Low disk space")}>
          Warning Toast
        </Button>

        <Button onClick={() => toast.error("Event has not been created")}>
          Error Toast
        </Button>

        <Button
          onClick={() =>
            toast("Event has been created", {
              action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
              },
            })
          }
        >
          Action Toast
        </Button>

        <Button
          onClick={() => {
            const promise = () =>
              new Promise((resolve) => setTimeout(resolve, 2000));
            toast.promise(promise, {
              loading: "Loading...",
              success: (data) => {
                return `Toast has been added`;
              },
              error: "Error",
            });
          }}
        >
          Promise Toast
        </Button>
      </div>
    </div>
  );
}
