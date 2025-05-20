import SwitchThemeButton from "../switch-theme-button";

const AuthHeader = () => {
  return (
    <header className="h-[80px] flex w-full">
      <div className="ml-auto">
        <SwitchThemeButton />
      </div>
    </header>
  );
};
export default AuthHeader;
