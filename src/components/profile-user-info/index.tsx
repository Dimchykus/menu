import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { handleUpdateUserInfo } from "./actions";
import { getUser } from "@/lib/actions/auth";
import { OrderDishesButton } from "./order-dishes-button";

const ProfileUserInfo = async () => {
  const user = await getUser();

  return (
    <div className="max-w-[500px] w-full">
      <p className="text-2xl font-bold mb-6">Setting</p>

      <form action={handleUpdateUserInfo}>
        <Label>Name</Label>
        <Input name="name" className="mb-2" defaultValue={user?.name ?? ""} />
        <Label>Email</Label>
        <Input name="email" className="mb-2" defaultValue={user?.email ?? ""} />
        <Button className="w-full mt-2" type="submit">
          Update
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t">
        <OrderDishesButton />
      </div>
    </div>
  );
};

export default ProfileUserInfo;
