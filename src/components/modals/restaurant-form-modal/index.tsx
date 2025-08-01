import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModal } from "@/lib/hooks/use-modals";
import { X } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import Form from "next/form";
import { handleCreateRestaurant } from "./actions";
import { ModalPropsMap } from "@/context/modals";
import { getRestaurantById } from "@/lib/db/actions/menu";
import { toast } from "sonner";

const RestaurantFormModal: React.FC<ModalPropsMap["restaurantForm"]> = (
  props,
) => {
  const { closeModal } = useModal();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
  });

  const [state, formAction, pending] = useActionState(handleCreateRestaurant, {
    success: false,
    restaurant: null,
    error: "",
  });

  useEffect(() => {
    if (state.success) {
      closeModal("restaurantForm");
    }
  }, [state.success, closeModal]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  useEffect(() => {
    if (props?.id) {
      getRestaurantById(props.id).then((restaurant) => {
        if (restaurant) {
          setFormValues({
            name: restaurant.name,
            description: restaurant.description || "",
            address: restaurant.address || "",
            phone: restaurant.phone || "",
          });
        }
      });
    }

    return () => {
      setFormValues({
        name: "",
        description: "",
        address: "",
        phone: "",
      });
    };
  }, [props?.id]);

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px] [&>button:first-of-type]:hidden">
        <DialogHeader>
          <DialogTitle>
            {typeof props !== "boolean" && props?.id ? "Edit" : "Create"}{" "}
            restaurant
          </DialogTitle>
          <DialogDescription>Enter restaurant information</DialogDescription>
          <DialogClose
            asChild
            data-testid="close-modal"
            onClick={() => {
              closeModal("restaurantForm");
            }}
          >
            <Button className="absolute right-4 top-4 size-6 p-0">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <Form action={formAction} className="p-0">
          <div className="grid gap-4 pb-2">
            {props?.id && <input type="hidden" name="id" value={props.id} />}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Imperia"
                className="col-span-3"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="Trampoline park"
                className="col-span-3"
                value={formValues.description}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Address
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St"
                className="col-span-3"
                value={formValues.address}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                placeholder="123-456-7890"
                className="col-span-3"
                value={formValues.phone}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
          </div>
          {state?.fieldErrors &&
            ("name" in state?.fieldErrors ||
              "description" in state?.fieldErrors) && (
              <p className="text-red-700 text-sm mb-2">
                {state?.fieldErrors?.name || state?.fieldErrors?.description}
              </p>
            )}
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {typeof props !== "boolean" && props?.id ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantFormModal;
