import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user } = useAuth();

  const initials = user?.username.substring(0, 2).toUpperCase();

  if (!user) return null;

  return (
    <div className="w-full mx-auto p-6 bg-[#f4f8ff]">
      <Card className={"max-w-2xl m-auto"}>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Manage your account information.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-slate-100">
              <AvatarImage />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p className="text-sm text-slate-500">@{user.username}</p>
            </div>
          </div>

          <div className="border-t border-slate-100 my-4"></div>

          {/* Details Form */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={user.name}
                readOnly
                className="bg-slate-50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                defaultValue={user.email || "No email provided"}
                readOnly
                className="bg-slate-50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                defaultValue={user.username}
                readOnly
                className="bg-slate-50"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                defaultValue={user.password}
                readOnly
                className="bg-slate-50"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button className={"hover:cursor-pointer"}>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
