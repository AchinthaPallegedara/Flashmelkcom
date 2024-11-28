// import { Camera, Video, Building2, Mic } from "lucide-react";
// import Navbar from "@/components/headerAndFooter/Navbar";
// import Footer from "@/components/headerAndFooter/Footer";
// import { ServiceCard } from "./ServiceCard";
// import { ServiceDetails } from "./ServiceDetails";

// export default function ServicesPage() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar />
//       <main className="flex-1">
//         <section className="w-full relative py-10 overflow-hidden">
//           <div className="container px-4 md:px-6  z-10">
//             <div className="flex">
//               <div className="flex w-full justify-between items-center">
//                 <h1 className="text-3xl font-anton max-w-[700px]  sm:text-4xl md:text-5xl lg:text-7xl animate-fade-in">
//                   Discover Our Professional Services
//                 </h1>
//                 <p className="max-w-[400px] md:text-xl animate-fade-in-up">
//                   Professional studio spaces for all your creative needs. From
//                   photography to live podcasts, we&apos;ve got you covered.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="w-full pb-12 md:py-24 lg:pt-10 ">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//               <ServiceCard
//                 icon={<Camera className="h-6 w-6" />}
//                 title="Photography"
//                 description="State-of-the-art photography studios equipped with professional lighting and backdrops."
//                 image="/cameraser.jpg"
//               />
//               <ServiceCard
//                 icon={<Video className="h-6 w-6" />}
//                 title="Videography"
//                 description="Versatile video production spaces suitable for various types of shoots and productions."
//                 image="/videoser2.jpg"
//               />
//               <ServiceCard
//                 icon={<Building2 className="h-6 w-6" />}
//                 title="Commercial"
//                 description="Large-scale studios perfect for commercial shoots, product photography, and advertising campaigns."
//                 image="/com.jpg"
//               />
//               <ServiceCard
//                 icon={<Mic className="h-6 w-6" />}
//                 title="Live Podcasts"
//                 description="Soundproof rooms with top-quality audio equipment for professional podcast recordings."
//                 image="/podcast.jpg"
//               />
//             </div>
//           </div>
//         </section>
//         <ServiceDetails
//           title="Photography"
//           description="Our state-of-the-art photography studios are designed to meet the needs of professional photographers and enthusiasts alike."
//           features={[
//             "Professional lighting setups including softboxes, strobes, and continuous lights",
//             "Various backdrop options including white, black, and green screen",
//             "Tethering stations for instant preview and client review",
//             "High-speed internet for quick file transfers",
//             "Makeup and changing rooms for models and clients",
//           ]}
//           pricing="Starting at $50/hour with package deals available for full-day bookings"
//           bgColor="bg-white"
//           image="/cameraser.jpg"
//         />
//         <ServiceDetails
//           imgside="left"
//           title="Videography"
//           description="Our versatile video production spaces are suitable for a wide range of projects, from corporate videos to music videos."
//           features={[
//             "Soundproofed rooms for high-quality audio recording",
//             "Green screen and white cyc wall options",
//             "Professional grade lighting grids with DMX control",
//             "4K-ready camera equipment available for rent",
//             "Editing suites with industry-standard software",
//           ]}
//           pricing="Starting at $75/hour with discounts for multi-day productions"
//           bgColor="bg-tansparent"
//           image="/Videography.jpg"
//         />
//         <ServiceDetails
//           title="Commercial"
//           description="Our large-scale studios are perfect for commercial shoots, product photography, and advertising campaigns."
//           features={[
//             "Expansive floor space to accommodate large sets and equipment",
//             "High ceilings for elaborate lighting setups",
//             "Drive-in access for easy loading and unloading of props and equipment",
//             "On-site prop storage and set building areas",
//             "Client lounges for comfortable viewing and collaboration",
//           ]}
//           pricing="Custom quotes based on project requirements, with rates starting at $500/day"
//           bgColor="bg-white"
//           image="/com.jpg"
//         />
//         <ServiceDetails
//           imgside="left"
//           title="Live podcasts"
//           description="Our podcast studios are designed for professional-quality audio recordings and live streaming."
//           features={[
//             "Professional-grade microphones and audio interfaces",
//             "Acoustic treatment for optimal sound quality",
//             "Multi-camera setup for video podcasting",
//             "Live streaming capabilities with high-speed internet",
//             "Comfortable seating for hosts and guests",
//           ]}
//           pricing="Starting at $30/hour with package deals for regular bookings"
//           bgColor="bg-tansparent"
//           image="/podcast.jpg"
//         />
//       </main>
//       <Footer />
//     </div>
//   );
// }

import { Construction } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center text-xl font-medium">
      <Construction className="size-10 text-main-500" />
      Under Construction
    </div>
  );
};

export default page;
