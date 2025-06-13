import FormInput from "@/components/form-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/modals";
import { X } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCreateSchedule } from "./actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSchema = z
  .object({
    start: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time")
      .or(z.literal("")),
    close: z
      .string()
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid close time")
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.start === "" && data.close === "") {
        return true;
      }

      if (data.start === "" || data.close === "") {
        return false;
      }

      return data.start < data.close;
    },
    {
      message:
        "Both times must be filled and start time must be before close time",
      path: ["close"],
    },
  );

const scheduleSchema = z.object(
  DAYS.reduce((acc, day) => {
    acc[day.toLowerCase()] = timeSchema;
    return acc;
  }, {} as Record<string, typeof timeSchema>),
);

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;

type Props = {
  id?: number;
};

const ScheduleFormModal: React.FC<Props> = ({ id }) => {
  const { closeModal } = useModal();

  const methods = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: DAYS.reduce((acc, day) => {
      acc[day.toLowerCase()] = { start: "", close: "" };
      return acc;
    }, {} as ScheduleFormValues),
  });

  const {
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = methods;

  const createSchedule = async () => {
    if (!id) {
      toast.error("Restaurant ID is required");

      return {
        success: false,
      };
    }

    const isValid = await trigger();

    if (!isValid) {
      const key = Object.keys(errors)[0];

      toast.error(errors[key]?.close?.message || errors[key]?.start?.message);

      return {
        success: false,
      };
    }

    await handleCreateSchedule(methods.getValues(), id);

    return {
      success: true,
    };
  };

  const [state, formAction, pending] = useActionState(createSchedule, {
    success: false,
  });

  useEffect(() => {
    if (state.success) {
      closeModal("scheduleForm");
    }
  }, [state.success, closeModal]);

  return (
    <div>
      <Dialog open>
        <DialogContent className="sm:max-w-[425px] [&>button:first-of-type]:hidden">
          <DialogHeader>
            <DialogTitle>Create restaurant schedule</DialogTitle>
            <DialogDescription>
              Enter restaurant schedule for each day
            </DialogDescription>
            <DialogClose
              asChild
              onClick={() => {
                closeModal("scheduleForm");
              }}
            >
              <Button className="absolute right-4 top-4 size-6 p-0">
                <X className="size-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogClose>
          </DialogHeader>
          <FormProvider {...methods}>
            <form action={formAction}>
              <div className="flex flex-col gap-2">
                {DAYS.map((day) => (
                  <div key={day} className="flex gap-4 items-center">
                    <p className="text-sm w-[20%] font-medium">{day}</p>
                    <div className="flex flex-1 justify-center gap-2 items-center">
                      <FormInput
                        name={`${day.toLowerCase()}.start`}
                        className="w-[64px]"
                        type="time"
                        value={watch(`${day.toLowerCase()}.start`)}
                        onChange={(e) => {
                          setValue(
                            `${day.toLowerCase()}.start`,
                            e.target.value,
                          );
                        }}
                      />
                      <p>-</p>
                      <FormInput
                        name={`${day.toLowerCase()}.close`}
                        className="w-[64px]"
                        type="time"
                        value={watch(`${day.toLowerCase()}.close`)}
                        onChange={(e) => {
                          setValue(
                            `${day.toLowerCase()}.close`,
                            e.target.value,
                          );
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <DialogFooter className="mt-6">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" disabled={pending}>
                  Save
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleFormModal;
