import { PiTelevisionSimpleBold } from "react-icons/pi";
import { BiMoviePlay } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { RiLiveLine } from "react-icons/ri";

export const navigation = [
  {
    label: "TV Shows",
    href: "TV", // Match this with your React Router path
    icon: <PiTelevisionSimpleBold />,
  },
  {
    label: "Movies",
    href: "movie", // Match this with your React Router path
    icon: <BiMoviePlay />,
  },
  {
    label: "LiveStream",
    href: "Livestream", // Update to match React Router path
    icon: <RiLiveLine />,
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/", // Root path
    icon: <AiFillHome />,
  },
  ...navigation,
  {
    label: "Search",
    href: "/search", // Search path
    icon: <IoSearchOutline />,
  },
];
