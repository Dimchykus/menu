import { startTransition, useActionState, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import { useModal } from "@/hooks/modals";
import { X } from "lucide-react";

const MenuFormModal: React.FC<ModalPropsMap["menuForm"]> = (props) => {
  const { closeModal } = useModal();
  const defaultState = {
    success: false,
    fields: {
      name: "",
      description: "",
      restaurantId: 1,
    },
    errors: null,
  };
  const formRef = useRef<HTMLFormElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boundAction = (state: any, formData: FormData) => {
    if (props?.restaurantId) {
      formData.set("restaurantId", props.restaurantId.toString());
    }
    return handleCreateMenu(state, formData);
  };

  const [formState, formAction] = useActionState(boundAction, defaultState);

  const methods = useForm<MenuFormState>({
    defaultValues: {
      restaurantId: props?.restaurantId || 1,
    },
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    if (formState?.success) {
      closeModal("menuForm");
    }
  }, [formState]);

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
            action={formAction}
            className="grid gap-4"
            onSubmit={(evt) => {
              evt.preventDefault();
              handleSubmit(() => {
                startTransition(() =>
                  formAction(new FormData(formRef.current!)),
                );
              })(evt);
            }}
          >
            <FormInput
              name="name"
              title="Name"
              defaultValue={formState?.fields?.name}
            />
            <FormInput
              name="description"
              title="Description"
              defaultValue={formState?.fields?.description || ""}
            />

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
