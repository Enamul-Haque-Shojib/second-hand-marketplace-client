/* eslint-disable @typescript-eslint/no-explicit-any */


"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import createImage from "@/services/imageUpload";
import { updateUser } from "@/services/authService";

const UpdateProfile = () => {
  const { user, setUser } = useUser();
  const [imagePreview, setImagePreview] = useState<string>("");


  const form = useForm({
    defaultValues: {
      authName: "",
      authImgUrl: null,
      email: "",
      role: "",
    },
  });

  useEffect(() => {
    const fetchItem = async () => {
      if (user) {
        try {
          const res = await fetch(
            `https://second-hand-marketplace-server.vercel.app/api/auth/one-auth/${user?.email}`
          );
          if (!res.ok) throw new Error("Failed to fetch item");
          const data = await res.json();
          const userData = data.data;

          form.reset({
            authName: userData?.authName,
            authImgUrl: userData?.authImgUrl,
            email: userData?.email,
            role: userData?.role,
          });

          setImagePreview(userData?.authImgUrl || "");
        } catch (error) {
          console.error(error);
        } 
      }
    };

    fetchItem();
  }, [form, user?.email, user]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let image: string = imagePreview;

    if (typeof data.authImgUrl === "object") {
      image = await createImage(data.authImgUrl[0]);
    }

    const updatedUser = {
      authName: data?.authName,
      authImgUrl: image,
      email: data?.email,
      role: data?.role,
    };

    try {
      if (!user?._id) return;
      const res = await updateUser(updatedUser, user?._id);
      setUser(res?.data);
      toast.success(res.message);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }
  };



  return (
 
      <DialogContent className="w-full max-w-md rounded-lg bg-white shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Edit Profile</DialogTitle>
          <DialogDescription className="text-gray-500">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="authName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="authImgUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">Profile Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="border p-2 rounded-md"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(e.target.files);
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setImagePreview(imageUrl);
                        }
                      }}
                    />
                  </FormControl>
                  {imagePreview && (
                    <div className="mt-3 flex justify-center">
                      <Image
                        src={imagePreview || ""}
                        width={100}
                        height={100}
                        alt="Profile Preview"
                        className="rounded-md border p-1"
                      />
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" type="email" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex justify-end space-x-2">
              <Button type="submit" className="bg-[#ff004f] hover:bg-red-600 transition">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>

  );
};

export default UpdateProfile;

