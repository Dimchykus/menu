"use client";

import { login } from "@/lib/actions/auth";
import { Button } from "../ui/button";

const LoginButton = () => {
  return <Button onClick={() => login()}>Log in</Button>;
};

export default LoginButton;
