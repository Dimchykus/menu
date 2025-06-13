import EditRestaurants from "./edit-restaurant";

const MenuEditor = async () => {
  return (
    <div className="py-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Menu Editor</h2>
          <p className="text-muted-foreground">
            Manage your restaurants, menus, categories and dishes
          </p>
        </div>
        <EditRestaurants />
      </div>
    </div>
  );
};

export default MenuEditor;
