import Image from "next/image";
import React from "react";

const CompanyLogo = ({
  width = 100,
  height = 100,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <div className={`items-center gap-2 w-full ${className}`}>
      <Image
        src="/assets/images/logo.png"
        alt="logo"
        width={width}
        height={height}
        className={`h-auto`}
      />
      <strong className="text-5xl font-medium">Stora</strong>
    </div>
  );
};

export default CompanyLogo;
