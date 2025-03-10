"use client"


import { getAllItems } from '@/services/itemService';
import React from 'react';
import Product from './Product';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@/context/UserContext';

const AllProducts = () => {   
const {products, setProducts} = useUser();
    

    const form = useForm({
        defaultValues: {
          search: '',
        },
      });
    
      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      
        try{
          const res = await getAllItems('search',data.search);
          form.reset();
          
            setProducts(res.data);
        } catch (error) {
          console.error('Error submitting form:', error);
    
        }
    
    
      };
    return (
        <div className='w-full bg-white rounded-lg p-6"'>
            <h1>All products</h1>
            <div>
            
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Search</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Search" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 transition">
                Search
              </Button>
            </form>
          </Form>
            </div>
            <div className='grid grid-cols-3 gap-5'>
            {
                products.map((product) =>
                <Product 
                key={product._id}
                product = {product}
                ></Product>
                )
            }
            
            </div>
        </div>
    );
};

export default AllProducts;