import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Image
        src={"/flashmelkIcon.svg"}
        alt="flashmelk_logo"
        width={40}
        height={40}
      />
      <p className="text-3xl font-anton">FLASH ME LK</p>
    </div>
  );
};

export default Logo;
