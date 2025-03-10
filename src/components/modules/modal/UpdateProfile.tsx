

"use client";


import { Button } from "@/components/ui/button";
import { Form, FormControl,FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import Image from "next/image";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";



import { toast } from 'sonner';




import { useUser } from "@/context/UserContext";

import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import createImage from "@/services/imageUpload";
import { updateUser } from "@/services/authService";


const UpdateProfile = () => {
    const {user, setUser} = useUser();
console.log(user)

    const [imagePreview, setImagePreview] = useState<string>('');
 
    const [loading, setLoading] = useState<boolean>(true);

    const form = useForm({
                        defaultValues: {
                            authName: '',
                            authImgUrl: null,
                            email: '',
                            role: '',
                        },
                    });

           useEffect(() => {
            const fetchItem = async () => {
                if(user){
                    try {
                        const res = await fetch(`http://localhost:5000/api/auth/one-auth/${user?.email}`);
                        if (!res.ok) throw new Error("Failed to fetch item");
                        const data = await res.json();
                        const userData = data.data;
                     console.log(userData)
        
                        form.reset({
                            authName: userData?.authName,
                            authImgUrl: userData?.authImgUrl,
                            email: userData?.email,
                            role: userData?.role,
                        });
        
                
                        setImagePreview(userData?.authImgUrl || '');
                    } catch (error) {
                        console.error(error);
                    } finally {
                        setLoading(false);
                    }
                }
                
            };
    
            fetchItem();
        }, [form, user?.email,user]);

  

    

           const onSubmit: SubmitHandler<FieldValues> = async (data) => {
            let image : string;
            image = imagePreview;
         
    
            if (typeof data.authImgUrl === 'object') {
                image = await createImage(data.authImgUrl[0]);
            }
    
         

            const updatedUser = {
                authName: data?.authName,
                authImgUrl: image,
                email: data?.email,
                role: data?.role,
            };
    
           
    
            try {
                const res = await updateUser(updatedUser, user?._id);
               setUser(res?.data)
                toast.success(res.message);
            } catch (error) {
                console.error("Error submitting form:", error);
               toast.error(error.message);
            }
        };

    if (loading) return <p className="text-center text-gray-500">Loading  Profile...</p>;

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
             <DialogContent className="sm:max-w-[425px]">
           <DialogHeader>
             <DialogTitle>Edit profile</DialogTitle>
             <DialogDescription>
               Make changes to your profile here. Click save when you're done.
             </DialogDescription>
           </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control} name="authName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter name" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="authImgUrl" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            field.onChange(e.target.files);
                                            if (file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                setImagePreview(imageUrl);
                                            }
                                        }} />
                                    </FormControl>
                                    {imagePreview && <Image src={imagePreview || ''} width={100} height={100} alt="Preview" className="rounded-lg mt-2" />}
                                </FormItem>
                            )} />

                     


                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter price" type="email" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />




                            <Button type="submit" className="w-full bg-[#ff004f] hover:bg-red-700 transition">
                                Submit
                            </Button>
                        </form>
                    </Form>
              <DialogFooter>
             <Button type="submit">Save changes</Button>
           </DialogFooter>
         </DialogContent>
      
        </div>
    );
};

export default UpdateProfile;
