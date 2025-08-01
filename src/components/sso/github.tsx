import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { Github } from "lucide-react";

const GitHubAuth = () => {
  const handleAuth = async () => {
    await signIn("github");
  };

  return (
    <Button className="flex items-center gap-2" onClick={handleAuth}>
      <Github />
      GitHub
    </Button>
  );
};

export default GitHubAuth;
