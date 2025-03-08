'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContext';
import { loginUser } from '@/services/authService';

// import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const LoginForm = () => {
  const {setUser,setIsLoading} = useUser();
  const router = useRouter();
  
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
   
    // const result = await signIn('credentials', {
    //   redirect: false,
    //   email: data.email,
    //   password: data.password,
    // });

 
    // if (result?.error) {
    //   console.error('Login failed:', result.error);
 
    // } else {

    //   router.push('/');
    // }

    try{
    const initialData = {
        email: data.email,
        password: data.password,
      };

      const res = await loginUser(initialData);
     
      form.reset();
      setIsLoading(true)
      setUser(res?.data?.user)
      router.push('/');
      toast.success(res.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.message);
    }


  };

  return (
    <div className="flex items-center justify-center min-h-screen w-[400px]">
      <Card className="w-full h-full max-w-lg shadow-lg border border-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold text-gray-600">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Login
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
            Don`t have an account? <Link href="/register" className="text-red-500 hover:underline">Sign Up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
