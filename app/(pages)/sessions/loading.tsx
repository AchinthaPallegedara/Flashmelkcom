import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <Loader className="animate-spin" />
    </div>
  );
};

export default loading;
