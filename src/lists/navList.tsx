import type { ReactNode } from "react";
import { SiCoinmarketcap } from "react-icons/si";
import { PiGearSixFill } from "react-icons/pi";
import { IoPersonSharp } from "react-icons/io5";
import { IoPeopleSharp } from "react-icons/io5";
import { MdForum } from "react-icons/md";
import { MdReport } from "react-icons/md";
interface NavListProps {
  id: number;
  name: string;
  icon: ReactNode;
}
export const navList: NavListProps[] = [
  { id: 1, name: "profile", icon: <IoPersonSharp /> },
  { id: 2, name: "marketplace", icon: <SiCoinmarketcap /> },
  { id: 3, name: "members", icon: <IoPeopleSharp /> },
  { id: 4, name: "bookings", icon: <MdForum /> },
  { id: 5, name: "reports", icon: <MdReport /> },
  { id: 6, name: "settings", icon: <PiGearSixFill /> },
];
