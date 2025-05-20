import { signIn } from "@/auth";
import { Button } from "../ui/button";
import Icon from "@/icons/github.svg";

const GitHubAuth = () => {
  const handleAuth = async () => {
    await signIn("github");
  };

  return (
    <Button className="flex items-center gap-2" onClick={handleAuth}>
      <Icon />
      GitHub
    </Button>
  );
};

export default GitHubAuth;
