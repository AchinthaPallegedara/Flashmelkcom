import Image from "next/image";

const Logo = () => {
  return (
    <>
      <div className="flex items-center justify-center space-x-2 dark:hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/Orangelogo.png`}
          alt="flashmelk_logo"
          width={140}
          height={30}
        />
      </div>
      <div className="hidden dark:flex items-center justify-center space-x-2 ">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/Blacklogo.png`}
          alt="flashmelk_logo"
          width={140}
          height={30}
        />
      </div>
    </>
  );
};

export default Logo;
