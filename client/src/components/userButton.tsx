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
import { api } from "../utils/api";
import Avatar from "./ui/avatar";

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
        <DropdownMenuCheckboxItem><button onClick={handleProfile}>Profile</button></DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Activity Bar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Panel</DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <Button onClick={handleLogout} variant="danger">
          Logout
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
