/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';


import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
import { TItem } from '@/types/item';
import { CategoriesFilter } from '@/constant';


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

        const initialData:TItem= {
            title: data.title,
            image,
            description: data.description,
            userId: user?._id,
        
            condition: data.condition,
            price: parseFloat(data.price),
            category: data.category,
        };

    

        try {
            
           const res = await addItem(initialData);
            
             form.reset();
             toast.success(res.message);
            // toast({ title: "Success", description: "Project added successfully!" });
        } catch (error:any) {
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
                                        <Input placeholder="Enter Price" required {...field} />
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
                    <SelectValue placeholder="Select a condition" />
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
              <FormLabel>Select Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  required
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent  className="w-auto p-0 bg-white border border-gray-200 shadow-lg rounded-md z-50">
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {
                        CategoriesFilter.map((category, index) =><SelectItem key={index} value={category.title}>{category.title}</SelectItem>)
                      }
                      
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
                                Add Item
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddItemForm;
