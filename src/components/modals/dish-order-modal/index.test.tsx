import { expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ModalProvider } from "@/context/modals";
import ModalContainer from "@/views/modals";
import { getAllMenuData, handleUpdateMenuOrder } from "./actions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/auth", () => ({
  auth: vi.fn().mockResolvedValue({}),
}));

vi.mock("./actions", () => ({
  getAllMenuData: vi.fn().mockResolvedValue({}),
  handleUpdateMenuOrder: vi.fn().mockResolvedValue({}),
}));

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false, // Disable retries in tests
      },
    },
  });
}

const restaurant1 = {
  restaurantName: "A restaurant 1",
  restaurantId: 1,
  order: 1,
  menus: {
    1: {
      menuName: "A menu 1",
      menuId: 1,
      order: 1,
      categories: {
        1: {
          categoryName: "A category",
          categoryId: 1,
          order: 1,
          dishes: {
            1: {
              dishName: "A dish",
              dishId: 1,
              order: 1,
            },
            2: {
              dishName: "A dish",
              dishId: 2,
              order: 2,
            },
          },
        },
        2: {
          categoryName: "A category",
          categoryId: 1,
          order: 1,
          dishes: {
            1: {
              dishName: "A dish",
              dishId: 1,
              order: 1,
            },
            2: {
              dishName: "A dish",
              dishId: 2,
              order: 2,
            },
          },
        },
      },
    },
    2: {
      menuName: "A menu 2",
      menuId: 1,
      order: 1,
      categories: {
        1: {
          categoryName: "A category",
          categoryId: 1,
          order: 1,
          dishes: {
            1: {
              dishName: "A dish",
              dishId: 1,
              order: 1,
            },
            2: {
              dishName: "A dish",
              dishId: 2,
              order: 2,
            },
          },
        },
        2: {
          categoryName: "A category",
          categoryId: 1,
          order: 1,
          dishes: {
            1: {
              dishName: "A dish",
              dishId: 1,
              order: 1,
            },
            2: {
              dishName: "A dish",
              dishId: 2,
              order: 2,
            },
          },
        },
      },
    },
  },
};

const restaurant2 = {
  restaurantName: "A restaurant 2",
  restaurantId: 1,
  order: 1,
  menus: {
    1: {
      menuName: "A menu 1",
      menuId: 1,
      order: 1,
      categories: {
        1: {
          categoryName: "A category",
          categoryId: 1,
          order: 1,
          dishes: {
            1: {
              dishName: "A dish",
              dishId: 1,
              order: 1,
            },
            2: {
              dishName: "A dish",
              dishId: 2,
              order: 2,
            },
          },
        },
        2: {
          categoryName: "A category",
          categoryId: 1,
          order: 1,
          dishes: {
            1: {
              dishName: "A dish",
              dishId: 1,
              order: 1,
            },
            2: {
              dishName: "A dish",
              dishId: 2,
              order: 2,
            },
          },
        },
      },
    },
    2: {
      menuName: "A menu 2",
      menuId: 1,
      order: 1,
      categories: {
        1: {
          categoryName: "A category",
          categoryId: 1,
          order: 1,
          dishes: {
            1: {
              dishName: "A dish",
              dishId: 1,
              order: 1,
            },
            2: {
              dishName: "A dish",
              dishId: 2,
              order: 2,
            },
          },
        },
        2: {
          categoryName: "A category",
          categoryId: 1,
          order: 1,
          dishes: {
            1: {
              dishName: "A dish",
              dishId: 1,
              order: 1,
            },
            2: {
              dishName: "A dish",
              dishId: 2,
              order: 2,
            },
          },
        },
      },
    },
  },
};

const mockedData = {
  1: restaurant1,
  2: restaurant2,
};

test("Dish Order Modal", async () => {
  vi.mocked(getAllMenuData).mockResolvedValue(mockedData);

  const queryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider defaultValues={{ dishOrder: true }}>
        <ModalContainer />
      </ModalProvider>
    </QueryClientProvider>,
  );

  await vi.dynamicImportSettled();

  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
});

test("Dish Order Modal - Update Dish Order", async () => {
  vi.mocked(getAllMenuData).mockResolvedValue(mockedData);

  const queryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider defaultValues={{ dishOrder: true }}>
        <ModalContainer />
      </ModalProvider>
    </QueryClientProvider>,
  );

  await vi.dynamicImportSettled();

  await waitFor(() => {
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  const menuUpButtons = screen.getAllByTestId("menu-up-button");
  expect(menuUpButtons).toHaveLength(4);

  await waitFor(() => {
    const menuNames = screen.getAllByTestId("menu-name");
    expect(menuNames).toHaveLength(4);
    expect(menuNames[0].textContent).include(restaurant1.menus[1].menuName);
    expect(menuNames[1].textContent).include(restaurant1.menus[2].menuName);
  });

  const updatedMockedData = {
    ...mockedData,
    1: {
      ...mockedData[2],
      menus: {
        ...mockedData[2].menus,
        2: {
          ...mockedData[2].menus[2],
          order: 2,
        },
      },
    },
  };

  vi.mocked(getAllMenuData).mockResolvedValue(updatedMockedData);

  fireEvent.click(menuUpButtons[1]);

  await waitFor(() => {
    const menuNames = screen.getAllByTestId("menu-name");
    expect(menuNames).toHaveLength(4);
    expect(menuNames[0].textContent).include(restaurant1.menus[2].menuName);
    expect(menuNames[1].textContent).include(restaurant1.menus[1].menuName);
  });
});
