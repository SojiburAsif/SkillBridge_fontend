"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { createTutorProfile } from "./CreateProfileForm";


const profileSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 chars"),
  experience: z.string().min(2, "Experience is required"),
  price: z.string().min(1, "Price is required"),
  categoryId: z.string().uuid("Invalid category id"),
});

export function CreateProfileFormClient() {
  const form = useForm({
    defaultValues: { bio: "", experience: "", price: "", categoryId: "" },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating profile...");

      const parsed = profileSchema.safeParse(value);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0].message, { id: toastId });
        return;
      }

      try {
        // ✅ Pass FormData directly to server action
        const formData = new FormData();
        Object.entries(parsed.data).forEach(([k, v]) => formData.append(k, String(v)));

        await createTutorProfile(formData);

        toast.success("Profile created successfully 🎉", { id: toastId });
      } catch (err: any) {
        toast.error(err?.message || "Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="max-w-xl mx-auto rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Create Tutor Profile</CardTitle>
        <CardDescription>Submit your professional information</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="bio">
              {(field) => (
                <>
                  <FieldLabel>Bio</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </form.Field>

            <form.Field name="experience">
              {(field) => (
                <>
                  <FieldLabel>Experience</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </form.Field>

            <form.Field name="price">
              {(field) => (
                <>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </form.Field>

            <form.Field name="categoryId">
              {(field) => (
                <>
                  <FieldLabel>Category ID</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            </form.Field>
          </FieldGroup>

          <Button type="submit" className="w-full mt-6">
            Submit Profile
          </Button>
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  );
}
