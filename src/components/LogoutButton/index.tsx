'use client'

import { logout } from "@/lib/actions/auth";
import { Button } from "../ui/button";

const LogoutButton = () => {
  return <Button onClick={() => logout()}>Log out</Button>;
};

export default LogoutButton;
