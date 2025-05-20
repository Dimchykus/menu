import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props extends React.ComponentProps<"input"> {
  name: string;
  title?: string;
}

const FormInput: React.FC<Props> = ({ name, title, ...props }) => {
  const { register } = useFormContext();

  return (
    <div>
      {title && <Label htmlFor="email" className="mb-2">{title}</Label>}
      <Input {...register(name)} {...props} />
    </div>
  );
};

export default FormInput;
