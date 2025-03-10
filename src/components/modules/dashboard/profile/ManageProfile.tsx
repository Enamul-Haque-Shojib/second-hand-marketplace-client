"use client"

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useUser } from '@/context/UserContext';

import Image from 'next/image';
import React from 'react';
import UpdateProfile from '../../modal/UpdateProfile';
import { Avatar } from '@/components/ui/avatar';

const ManageProfile = () => {
    const {user} = useUser();

  
    return (
        <div>
             <Card className="flex flex-col lg:flex-row shadow-lg hover:shadow-xl transition-all overflow-hidden flex-grow">
        <div className="lg:w-1/2 p-5">
        <Avatar className="w-[200px] h-[200px]">
          {user?.authImgUrl && (
            <Image
              src={user.authImgUrl}
              alt="user"
              width={80} height={80}
              className="h-full w-full rounded-md object-cover"
            />
          )}
          </Avatar>
          
          
        </div>
        <div className="p-6 lg:w-1/2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{user?.authName}</CardTitle>
            <CardDescription className="mt-2 text-gray-600">{user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
          <p>Role: {user?.role}</p>
       
          </CardContent>
          <CardFooter className="flex gap-4 mt-4">
      
          <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <UpdateProfile></UpdateProfile>
        </Dialog>
           
          </CardFooter>
        </div>
            </Card>
        </div>
    );
};

export default ManageProfile;