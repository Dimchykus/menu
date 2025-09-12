import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props extends React.ComponentProps<"input"> {
  name: string;
  title?: string;
  dataTestId?: string;
}

const FormInput: React.FC<Props> = ({ name, title, dataTestId, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];

  return (
    <div>
      {title && (
        <Label htmlFor={name} className="mb-2">
          {title}
        </Label>
      )}
      <Input
        {...register(name)}
        id={name}
        data-testid={dataTestId}
        className={`${props.className || ""} ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
        }`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message as string}</p>
      )}
    </div>
  );
};

export default FormInput;
