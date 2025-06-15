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
import { getCategoryById } from "@/lib/db/actions/menu";
import { Category } from "@/lib/db/schema/menu";
import useFormAction from "@/lib/hooks/use-form-action";

const CategoryFormModal: React.FC<ModalPropsMap["categoryForm"]> = (props) => {
  const { closeModal } = useModal();

  const formRef = useRef<HTMLFormElement>(null);

  const methods = useFormAction<MenuFormState>({
    extraParams: {
      menuId: props?.menuId?.toString() || "",
      id: props?.id?.toString() || "",
    },
    onAction: handleCreateMenu,
    onSuccess: () => {
      closeModal("categoryForm");
    },
  });

  const { reset } = methods;

  useEffect(() => {
    if (props?.id) {
      getCategoryById(props.id).then((category: Category | null) => {
        if (category) {
          reset({
            name: category.name,
            description: category.description || "",
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
  }, []);

  return (
    <Dialog open>
      <DialogContent className="sm:max-w-[425px] [&>button:first-of-type]:hidden">
        <DialogHeader>
          <DialogTitle>
            {typeof props !== "boolean" && props?.id ? "Edit" : "Create"} menu
          </DialogTitle>
          <DialogDescription>Enter category information</DialogDescription>
          <DialogClose
            asChild
            onClick={() => {
              closeModal("categoryForm");
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

export default CategoryFormModal;
