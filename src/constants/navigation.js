import { PiTelevisionSimpleBold } from "react-icons/pi";
import { BiMoviePlay } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";

export const navigation =[
  {
    label : "TV Shows",
    href  : 'TV',
    icon  :<PiTelevisionSimpleBold/> 
  },{
    label : "Movies",   
    href  : 'movie' ,
    icon  : <BiMoviePlay/>
  }
] 

export const mobileNavigation =[
  {
    label:"Home",
    href :"/",
    icon :<AiFillHome/>
  },
  ...navigation,
  {
    label:"Search",
    href:"/search",
    icon:<IoSearchOutline/>
  }
]
