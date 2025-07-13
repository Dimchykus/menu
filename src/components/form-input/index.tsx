import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props extends React.ComponentProps<"input"> {
  name: string;
  title?: string;
  dataTestId?: string;
}

const FormInput: React.FC<Props> = ({ name, title, dataTestId, ...props }) => {
  const { register } = useFormContext();

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
        {...props}
      />
    </div>
  );
};

export default FormInput;
