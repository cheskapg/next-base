// import RegionSpecificDetails from "../interface/RegionSpecificDetails";
// import { format } from "@/node_modules/date-fns/format";
// import { isToday } from "@/node_modules/date-fns/isToday";

// /* eslint-disable @next/next/no-img-element */
// export default function Facility({
//   region,
//   visitDate,
//   center,
//   isVirtual,
// }: {
//   region: RegionSpecificDetails;
//   visitDate: any;
//   center: any;
//   isVirtual: boolean;
// }) {
//   const date = new Date(visitDate); // Replace with your actual datetime
//   const formattedDate = format(date, "MMM d - h:mm a ");
//   const formattedDayOfWeek = isToday(date) ? "Today, " : format(date, "EEEE, ");
//   // Get timezone abbreviation

//   return (
//     <div className="flex border-b border-poise-2 gap-4 items-center py-3 px-6">
//       <div className="size-10 overflow-hidden rounded-full">
//         <img
//           src="/assets/images/location-sample.png"
//           className={`object-cover h-full `}
//           alt="location image"
//         />
//       </div>
//       <div>
//         <div className="text-sm">
//           {!isVirtual ? center[0].CenterName : "Virtual Visit"}
//         </div>

//         <div suppressHydrationWarning className="text-sm font-bold">
//           {formattedDayOfWeek}
//           {formattedDate}
//           {
//             date
//               .toLocaleTimeString("en-us", { timeZoneName: "short" })
//               .split(" ")[2]
//           }
//         </div>
//         {/* <div className="text-sm font-bold">Today, May 16 - 12:45 pm EDT</div> */}
//       </div>
//     </div>
//   );
// }
