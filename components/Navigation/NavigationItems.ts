import { BsSearch } from "react-icons/bs";
import { FiUser, FiSettings, FiUsers } from "react-icons/fi";
import { CgPill } from "react-icons/cg";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineTrophy } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { GiCrossedSabres } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { IoLogoGameControllerA } from "react-icons/io";

export const PlayerNavigationItems = [
  {
    title: "Feed",
    href: "/player/feed",
    top: false,
    side: true,
    icon: BsSearch,
  },
  {
    title: "Matches",
    href: "/player/matches",
    top: false,
    side: true,
    icon: CgPill,
  },
  {
    title: "Tournaments",
    href: "/player/tournaments",
    top: true,
    side: true,
    icon: AiOutlineTrophy,
  },
  {
    title: "Disputes",
    href: "/player/disputes",
    top: true,
    side: true,
    icon: GiCrossedSabres,
  },
  {
    title: "Account",
    href: "/player/account",
    top: true,
    side: true,
    icon: FiUser,
  },
  {
    title: "Wallet",
    href: "/player/wallet",
    top: false,
    side: true,
    icon: IoWalletOutline,
  },
  {
    title: "Settings",
    href: "/player/settings",
    top: false,
    side: false,
    icon: FiSettings,
  },
  {
    title: "Support",
    href: "support",
    top: false,
    side: false,
    icon: BiSupport,
  },
];


export const AdminNavigationItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    top: true,
    side: true,
    icon: MdDashboard,
  },
  {
    title: "Manage Challenges",
    href: "/admin/challenges",
    top: true,
    side: true,
    icon: CgPill,
  },
  {
    title: "Manage Players",
    href: "/admin/players",
    top: true,
    side: true,
    icon: FiUsers,
  },
  {
    title: "Manage Games",
    href: "/admin/games",
    top: true,
    side: true,
    icon: IoLogoGameControllerA,
  },
  {
    title: "Account",
    href: "/admin/account",
    top: true,
    side: true,
    icon: FiUser,
  },
];