import { useEffect, useRef } from "react";
import { FormProvider } from "react-hook-form";
import { handleCreateMenu } from "./actions";
import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { ModalPropsMap } from "@/context/modals";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/lib/hooks/use-modals";
import { X } from "lucide-react";
import { getDishById } from "@/lib/db/actions/menu";
import { Dish } from "@/lib/db/schema/menu";
import useFormAction from "@/lib/hooks/use-form-action";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const menuSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Min price is 0"),
  // image: z.instanceof(File).optional(),
});

export type MenuFormState = z.infer<typeof menuSchema>;

const DishFormModal: React.FC<ModalPropsMap["dishForm"]> = (props) => {
  const { closeModal } = useModal();

  const formRef = useRef<HTMLFormElement>(null);

  const methods = useFormAction<MenuFormState>({
    extraParams: {
      categoryId: props?.categoryId?.toString() || "",
      id: props?.id?.toString() || "",
    },
    defaultValues: {
      price: 0,
      image: undefined,
    },
    resolver: zodResolver(menuSchema),
    onAction: handleCreateMenu,
    onSuccess: () => {
      closeModal("dishForm");
    },
  });

  const {
    reset,
    formState: { errors },
    watch,
  } = methods;

  useEffect(() => {
    if (props?.id) {
      getDishById(props.id).then((dish: Dish | null) => {
        if (dish) {
          reset({
            name: dish.name,
            description: dish.description || "",
            price: dish.price || 0,
          });
        }
      });
    }

    return () => {
      reset({
        name: "",
        description: "",
        price: 0,
      });
    };
  }, []);

  const [name, description, price] = watch(["name", "description", "price"]);

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px] [&>button:first-of-type]:hidden">
        <DialogHeader>
          <DialogTitle>
            {typeof props !== "boolean" && props?.id ? "Edit" : "Create"} menu
          </DialogTitle>
          <DialogDescription>Enter dish information</DialogDescription>
          <DialogClose
            asChild
            onClick={() => {
              closeModal("dishForm");
            }}
          >
            <Button className="absolute right-4 top-4 size-6 p-0">
              <X className="size-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            ref={formRef}
            className="grid gap-4"
            action={methods.handleAction}
          >
            <FormInput name="name" title="Name" value={name} />
            <FormInput
              name="description"
              title="Description"
              value={description}
            />
            <FormInput name="price" type="number" title="Price" value={price} />
            <FormInput
              name="image"
              type="file"
              title="Image"
              accept="image/png, image/gif, image/jpeg"
            />
            {Object.keys(errors || {}).length > 0 && (
              <div className="text-red-500 text-sm space-y-1">
                {Object.entries(errors || {}).map(([field, error]) => (
                  <p key={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
                    {error.message}
                  </p>
                ))}
              </div>
            )}
            <DialogFooter>
              <Button type="submit">
                {typeof props !== "boolean" && props?.id ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default DishFormModal;
