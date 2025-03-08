
'use client';


import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import createImage from '@/services/imageUpload';

import { addItem } from '@/services/itemService';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';

// import { useToast } from '@/hooks/use-toast';
// import { useSession } from 'next-auth/react';

const AddItemForm = () => {
    // const {data: session} = useSession();
    //     const email = session?.user?.email || "";

const {user} = useUser()
    const [imagePreview, setImagePreview] = useState<string | null>(null);
   

    const form = useForm({
        defaultValues: {
            title: '',
            image: null,
            description: '',
            condition:'',
            price: '',
            category: ''
        },
    });



 

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const imageFile = data.image?.[0];
        const image = await createImage(imageFile);

        const initialData= {
            title: data.title,
            image,
            description: data.description,
            userId: user?._id,
        
            condition: data.condition,
            price: parseFloat(data.price),
            category: data.category,
        };

    console.log(initialData)

        try {
            
           const res = await addItem(initialData);
            console.log(res);
             form.reset();
             toast.success(res.message);
            // toast({ title: "Success", description: "Project added successfully!" });
        } catch (error) {
            // toast({ variant: "destructive", title: "Error", description: "Failed to add project." });
            console.error('Error submitting form:', error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <Card className="w-full max-w-2xl text-black shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Add New Item</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter item name" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="image" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Image</FormLabel>
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
                                    {imagePreview && <Image src={imagePreview} width={100} height={100} alt="Preview" className="rounded-lg mt-2" />}
                                </FormItem>
                            )} />

                            <FormField control={form.control} name="description" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Item description" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />


                            <FormField control={form.control} name="price" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter GitHub link" required {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

<FormField
          control={form.control}
          name="condition"
          rules={{ required: "Condition is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Condition</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent  className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                    <SelectGroup>
                      <SelectLabel>Condition</SelectLabel>
                      {/* {deliverMen.map((man) => ( */}
                        {/* <SelectItem key={man._id} value={man.authId}>
                          {man.authId}
                        </SelectItem> */}
                      {/* ))} */}
                      <SelectItem value='Brand New'>Brand New</SelectItem>
                      <SelectItem value='Like New'>Like New</SelectItem>
                      <SelectItem value='Excellent'>Excellent</SelectItem>
                      <SelectItem value='Good'>Good</SelectItem>
                      <SelectItem value='Fair (Acceptable)'>Fair (Acceptable)</SelectItem>
                      <SelectItem value='Needs Repair / For Parts'>Needs Repair / For Parts</SelectItem>
                    
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Choose the Condition.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="category"
          rules={{ required: "Category man is required." }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Condition</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent  className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      
                      <SelectItem value='Electric'>Electric</SelectItem>
                      <SelectItem value='Laptop'>Laptop</SelectItem>
                      <SelectItem value='Book'>Book</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Choose the Category.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

                            <Button type="submit" className="w-full bg-[#ff004f] hover:bg-red-700 transition">
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddItemForm;
