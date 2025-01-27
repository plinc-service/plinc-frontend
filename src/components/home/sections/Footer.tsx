import Image from "next/image";
import Link from "next/link";
import Navlinks from "../Navlinks";
import SocialsLinks from "../SocialsLinks";

const Footer = () => {
  return (
    <section className="bg-brand-lowest">
      <div className="container pt-11 pb-16 flex flex-col items-center">
        <div className="grid grid-cols-3 items-center pb-[60px] border-b border-neutral-low w-full">
          <Link href="/" className="inline-block">
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
          <Navlinks />
          <SocialsLinks className="justify-center" />
        </div>
        <div className="flex justify-center items-center">
          <ul className="inline-flex items-center gap-6 text-neutral-high text-sm mt-8">
            <li>
              <p>2024 Plinc. All right reserved.</p>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Terms of Service</Link>
            </li>
            <li>
              <Link href="#">Cookies Settings</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
