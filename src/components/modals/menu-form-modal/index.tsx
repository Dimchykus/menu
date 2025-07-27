import { useEffect, useRef } from "react";
import { FormProvider } from "react-hook-form";
import { handleCreateMenu, MenuFormState } from "./actions";
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
import { getMenuById } from "@/lib/db/actions/menu";
import { Menu } from "@/lib/db/schema/menu";
import useFormAction from "@/lib/hooks/use-form-action";

const MenuFormModal: React.FC<ModalPropsMap["menuForm"]> = (props) => {
  const { closeModal } = useModal();

  const formRef = useRef<HTMLFormElement>(null);

  const methods = useFormAction<MenuFormState>({
    extraParams: {
      restaurantId: props?.restaurantId?.toString() || "",
      id: props?.id?.toString() || "",
    },
    onAction: handleCreateMenu,
    onSuccess: () => {
      closeModal("menuForm");
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (props?.id) {
      getMenuById(props.id).then((menu: Menu | null) => {
        if (menu) {
          reset({
            name: menu.name,
            description: menu.description || "",
          });
        }
      });
    }

    return () => {
      reset({
        name: "",
        description: "",
      });
    };
  }, [props?.id, reset]);

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px] [&>button:first-of-type]:hidden">
        <DialogHeader>
          <DialogTitle>
            {typeof props !== "boolean" && props?.id ? "Edit" : "Create"} menu
          </DialogTitle>
          <DialogDescription>Enter menu information</DialogDescription>
          <DialogClose
            asChild
            data-testid="close-modal"
            onClick={() => {
              closeModal("menuForm");
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
            <FormInput name="name" title="Name" />
            <FormInput name="description" title="Description" />
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

export default MenuFormModal;
