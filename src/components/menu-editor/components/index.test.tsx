import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ModalProvider } from "@/context/modals";

import EditDishButton from "./edit-dish-button";
import NewDishButton from "./new-dish-button";
import NewMenuButton from "./new-menu-button";
import NewRestaurantButton from "./new-restautant-button";
import EditCategoryButton from "./edit-category-button";
import EditMenuButton from "./edit-menu-button";
import EditRestaurantButton from "./edit-restautant-button";
import NewCategoryButton from "./new-category-button";
import DeleteCategoryButton from "./delete-category-button";
import DeleteDishButton from "./delete-dish-button";
import DeleteMenuButton from "./delete-menu-button";
import DeleteRestaurantButton from "./delete-restautant-button";
import PreviewMenuButton from "./preview-menu-button";
import { EditButton } from "./action-button";

vi.mock("./actions", () => ({
  handleDeleteDish: vi.fn(),
  handleDeleteCategory: vi.fn(),
  handleDeleteMenu: vi.fn(),
  handleDeleteRestaurant: vi.fn(),
}));

const renderWithModalProvider = (component: React.ReactElement) => {
  return render(<ModalProvider>{component}</ModalProvider>);
};

describe("Menu Editor Components", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Edit Dish Button", () => {
    it("should render and open modal when clicked", () => {
      renderWithModalProvider(<EditDishButton id={1} categoryId={2} />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-pencil")).toBeInTheDocument();

      fireEvent.click(button);
    });
  });

  describe("New Dish Button", () => {
    it("should render and open modal when clicked", () => {
      renderWithModalProvider(<NewDishButton categoryId={1} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-circle-plus")).toBeInTheDocument();
      expect(screen.getByText("Add Dish")).toBeInTheDocument();

      fireEvent.click(button);
    });
  });

  describe("New Menu Button", () => {
    it("should render and open modal when clicked", () => {
      renderWithModalProvider(<NewMenuButton restaurantId={1} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-circle-plus")).toBeInTheDocument();
      expect(screen.getByText("Add Menu")).toBeInTheDocument();

      fireEvent.click(button);
    });
  });

  describe("New Restaurant Button", () => {
    it("should render and open modal when clicked", () => {
      renderWithModalProvider(<NewRestaurantButton />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-circle-plus")).toBeInTheDocument();
      expect(screen.getByText("Add Restaurant")).toBeInTheDocument();

      fireEvent.click(button);
    });
  });

  describe("Edit Category Button", () => {
    it("should render and open modal when clicked", () => {
      renderWithModalProvider(<EditCategoryButton id={1} menuId={2} />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-pencil")).toBeInTheDocument();

      fireEvent.click(button);
    });
  });

  describe("Edit Menu Button", () => {
    it("should render and open modal when clicked", () => {
      renderWithModalProvider(<EditMenuButton id={1} restaurantId={2} />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-pencil")).toBeInTheDocument();

      fireEvent.click(button);
    });
  });

  describe("Edit Restaurant Button", () => {
    it("should render and open modal when clicked", () => {
      renderWithModalProvider(<EditRestaurantButton id={1} />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-pencil")).toBeInTheDocument();

      fireEvent.click(button);
    });
  });

  describe("New Category Button", () => {
    it("should render and open modal when clicked", () => {
      renderWithModalProvider(<NewCategoryButton menuId={1} />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-circle-plus")).toBeInTheDocument();
      expect(screen.getByText("Add Category")).toBeInTheDocument();

      fireEvent.click(button);
    });
  });

  describe("Delete Category Button", () => {
    it("should render and call delete action when clicked", async () => {
      const { handleDeleteCategory } = await import("./actions");

      render(<DeleteCategoryButton id={1} />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-trash")).toBeInTheDocument();

      fireEvent.click(button);
      expect(handleDeleteCategory).toHaveBeenCalledWith(1);
    });
  });

  describe("Delete Dish Button", () => {
    it("should render and call delete action when clicked", async () => {
      const { handleDeleteDish } = await import("./actions");

      render(<DeleteDishButton id={1} />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-trash")).toBeInTheDocument();

      fireEvent.click(button);
      expect(handleDeleteDish).toHaveBeenCalledWith(1);
    });
  });

  describe("Delete Menu Button", () => {
    it("should render and call delete action when clicked", async () => {
      const { handleDeleteMenu } = await import("./actions");

      render(<DeleteMenuButton id={1} />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-trash")).toBeInTheDocument();

      fireEvent.click(button);
      expect(handleDeleteMenu).toHaveBeenCalledWith(1);
    });
  });

  describe("Delete Restaurant Button", () => {
    it("should render and call delete action when clicked", async () => {
      const { handleDeleteRestaurant } = await import("./actions");

      render(<DeleteRestaurantButton id={1} />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-trash")).toBeInTheDocument();

      fireEvent.click(button);
      expect(handleDeleteRestaurant).toHaveBeenCalledWith(1);
    });
  });

  describe("Preview Menu Button", () => {
    it("should render and navigate to href when clicked", () => {
      const href = "/restaurant/1/menu/2";

      render(<PreviewMenuButton href={href} />);

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(document.querySelector(".lucide-eye")).toBeInTheDocument();

      fireEvent.click(link);
    });
  });

  describe("Action Button", () => {
    it("should render edit button with pencil icon", () => {
      const onClick = vi.fn();

      render(<EditButton onClick={onClick} />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-pencil")).toBeInTheDocument();
      expect(button).toHaveAttribute("title", "Edit");

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
    });

    it("should render delete button with trash icon", () => {
      const onClick = vi.fn();

      render(<EditButton onClick={onClick} delete />);

      const button = screen.getByTitle("Edit");
      expect(button).toBeInTheDocument();
      expect(document.querySelector(".lucide-trash")).toBeInTheDocument();

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
    });

    it("should render button with custom children text", () => {
      const onClick = vi.fn();

      render(
        <EditButton onClick={onClick} size="default" children="Custom Text" />,
      );

      const button = screen.getByTitle("Custom Text");
      expect(button).toBeInTheDocument();
      expect(screen.getByText("Custom Text")).toBeInTheDocument();
      expect(document.querySelector(".lucide-pencil")).toBeInTheDocument();

      fireEvent.click(button);
      expect(onClick).toHaveBeenCalled();
    });
  });
});
