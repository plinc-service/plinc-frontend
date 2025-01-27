import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import Navlinks from "../Navlinks";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between py-4 px-8 container bg-white">
      <Link href="/">
        <Image
          src={"/logo-plinc.svg"}
          alt="plinc logo"
          width={69}
          height={30}
          priority
          style={{
            width: "auto",
            height: "auto",
          }}
        />
      </Link>
      <nav>
        <Navlinks />
      </nav>
      <div>
        <Button className="rounded-full">Télécharger l&apos;appli</Button>
      </div>
    </header>
  );
};

export default Navbar;
