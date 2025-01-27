import Image from "next/image";
import Link from "next/link";

const socialsIcons = [
  {
    svgPath: "/Facebook.svg",
    url: "#",
  },
  {
    svgPath: "/Instagram.svg",
    url: "#",
  },
  {
    svgPath: "/X.svg",
    url: "#",
  },
  {
    svgPath: "/LinkedIn.svg",
    url: "#",
  },
];

const SocialsLinks = ({ className }: { className?: string }) => {
  return (
    <ul className={`inline-flex gap-3 ${className}`}>
      {socialsIcons.map((icon, index) => (
        <li key={index}>
          <Link href={icon.url}>
            <Image
              src={icon.svgPath}
              alt={icon.svgPath.replace(".svg", "")}
              width={24}
              height={24}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SocialsLinks;
