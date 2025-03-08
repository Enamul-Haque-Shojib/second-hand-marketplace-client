'use client';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContext';
import { loginUser, registerUser } from '@/services/authService';
import createImage from '@/services/imageUpload';

// import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const RegisterForm = () => {
  const {setUser,setIsLoading} = useUser();
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      image: null,
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const imageFile = data.image[0];
      const authImgUrl = await createImage(imageFile);
      const initialData = {
        authName: data.name,
        authImgUrl: authImgUrl,
        email: data.email,
        password: data.password,
      };
      // console.log(initialData);

      const res = await registerUser(initialData);
      console.log(res)
      form.reset();
      router.push('/');
      setIsLoading(true)
      setUser(res?.data?.user)
      toast.success(res.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-[400px]">
      <Card className="w-full max-w-lg shadow-lg border border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-gray-600">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Profile Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          field.onChange(e.target.files);
                          if (file) {
                            setImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        width={80}
                        height={80}
                        alt="Preview"
                        className="w-30 h-20 rounded-lg mt-2"
                      />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email Address" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter Password" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 transition">
                Sign Up
              </Button>
            </form>
          </Form>
          {/* <div className="mt-4 flex justify-center gap-3">
            <Button onClick={() => signIn('github', { callbackUrl: '/dashboard' })} variant="outline">
              Sign in with GitHub
            </Button>
            <Button onClick={() => signIn('google', { callbackUrl: '/dashboard' })} variant="outline">
              Sign in with Google
            </Button>
          </div> */}
          <p className="text-center text-gray-400 mt-4">
            Already have an account? <Link href="/login" className="text-red-500 hover:underline">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
