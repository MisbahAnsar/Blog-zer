"use client";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/utils/api";
import Avatar from "@/components/ui/avatar";

interface DropdownMenuCheckboxesProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DropdownMenuCheckboxes({
  setIsLoggedIn,
}: DropdownMenuCheckboxesProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="outline-none">
          <div>
          <Avatar />
          </div>
          
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-7">
        <DropdownMenuLabel>Blog-zer</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem className="font-mono"><button onClick={handleProfile}>Profile</button></DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem className="font-mono">Coming soon ~</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <button className="font-mono mx-2" onClick={handleLogout}>
          Logout
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
