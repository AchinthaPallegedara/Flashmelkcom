import Footer from "@/components/headerAndFooter/Footer";
import Navbar from "@/components/headerAndFooter/Navbar";
import SessionsCard from "@/components/SessionsCard";
import { sessions } from "@/constants";

import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-10 mb-20">
        <div className="grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map((session, index) => (
            <SessionsCard
              key={index}
              link={session.link}
              title={session.title}
              description={session.description}
              price={session.price}
              duration={session.duration}
              softCopies={session.softCopies}
              imgLink={session.imgLink}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
