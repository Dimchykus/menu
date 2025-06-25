import { auth } from "@/auth";
import {
  Menu,
  SelectSchedule,
  type Restaurant as RestaurantI,
} from "@/lib/db/schema/menu";
import Image from "next/image";
import EditScheduleBtn from "./edit-schedule-btn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capitalizeFirstLetter } from "@/utils/text";
import Link from "next/link";
import EditRestaurantBtn from "./edit-restaurant-btn";
import { ChevronRight, MapPin, Phone } from "lucide-react";

interface Props {
  restaurant: RestaurantI;
  schedule: SelectSchedule[];
  menus: Menu[];
}

const isCurrentlyOpen = (
  schedule: SelectSchedule[],
  currentDay: string,
): boolean => {
  const currentSchedule = schedule.find(
    (s) => s.dayOfWeek.toLowerCase() === currentDay,
  );

  if (!currentSchedule) return false;

  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();

  const [openHour, openMinute] = currentSchedule.open.split(":").map(Number);
  const [closeHour, closeMinute] = currentSchedule.close.split(":").map(Number);

  const openTime = openHour * 100 + openMinute;
  const closeTime = closeHour * 100 + closeMinute;

  return currentTime >= openTime && currentTime <= closeTime;
};

const Restaurant: React.FC<Props> = async ({ restaurant, schedule, menus }) => {
  const session = await auth();
  const today = new Date()
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  const isOpen = isCurrentlyOpen(schedule, today);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <Image
        width={400}
        height={400}
        src={
          "https://www.lakelawnresort.com/wp-content/uploads/2016/05/LakeLawnResort_1878bar-1900x855-c-default.jpg"
        }
        alt={restaurant.name}
        className="h-32 object-cover rounded mb-2"
      />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {isOpen ? "Open" : "Closed"}
          </div>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed text-sm">
          {restaurant.description}
        </p>
        <div className="mt-4 mb-6">
          {menus.length > 0 ? (
            <div className="space-y-2">
              {menus.map((menu) => (
                <Link
                  key={menu.id}
                  href={`/restaurant/${restaurant.id}/menu/${menu.id}`}
                  className="flex items-center p-2 border rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <span className="flex flex-col">
                    <span className="text-lg font-medium">{menu.name}</span>
                    <span className="text-xs text-gray-500">
                      {menu.description}
                    </span>
                  </span>
                  <ChevronRight className="ml-auto" />
                </Link>
              ))}
            </div>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-2">Menus</h3>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                Restaurant has no menus yet.
              </p>
            </>
          )}
        </div>
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="border rounded-lg p-2 bg-primary/10">
              <MapPin />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                Address
              </p>
              <p className="text-gray-800 text-sm font-medium">
                {restaurant.address}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="border rounded-lg p-2 bg-primary/10">
              <Phone />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                Phone
              </p>
              <p className="text-gray-800 text-sm font-medium">
                {restaurant.phone}
              </p>
            </div>
          </div>
        </div>
        {schedule.length > 0 && (
          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="hover:no-underline cursor-pointer">
                Schedule
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 text-balance">
                {schedule.map((schedule) => {
                  const isToday = schedule.dayOfWeek.toLowerCase() === today;
                  return (
                    <div
                      key={schedule.id}
                      className={`flex items-center justify-between p-2 rounded-sm transition-colors ${
                        isToday
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50"
                      }`}
                    >
                      <p className="font-medium text-sm">
                        {capitalizeFirstLetter(schedule.dayOfWeek)}
                      </p>
                      <div className="flex items-center gap-2 w-[150px] justify-center">
                        <p
                          className={`text-sm ${
                            isToday
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {schedule.open} - {schedule.close}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
        <div className="flex gap-1 flex-wrap">
          {session?.user?.userId && (
            <>
              <EditScheduleBtn id={restaurant.id} />
              <EditRestaurantBtn id={restaurant.id} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
