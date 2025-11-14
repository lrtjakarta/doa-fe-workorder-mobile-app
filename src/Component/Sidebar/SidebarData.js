import { decodeToken } from "react-jwt";

import {
  IconLayoutDashboard,
  IconUsers,
  IconUser,
  IconAffiliate,
  IconUserCircle,
  IconBriefcase,
  IconDatabase,
  IconCalendarClock,
} from "@tabler/icons-react";
import { filterSidebarByRole } from "Utils/FilterSidebar";

const token = localStorage.getItem("access_token");

const decodedToken = decodeToken(token);
const permissions = decodedToken?.permissions;

const _sidebarData = [
  {
    title: "Dashboard",
    path: "/app/admin",
    expand: false,
    icon: <IconLayoutDashboard />,
  },
  {
    title: "Management User",
    expand: false,
    icon: <IconUsers />,
    subNav: [
      {
        title: "User",
        permission: "users:all",
        path: "/app/admin/user",
        icon: <IconUser />,
      },
      {
        title: "Role",
        permission: "roles:all",
        path: "/app/admin/role",
        icon: <IconUser />,
      },
      {
        title: "Profil",
        permission: "profile:all",
        path: "/app/admin/profile",
        icon: <IconUser />,
      },
      {
        title: "Organisasi",
        permission: "organization:all",
        path: "/app/admin/division",
        icon: <IconAffiliate />,
      },
      {
        title: "Jabatan",
        permission: "jobrole:all",
        path: "/app/admin/job-role",
        icon: <IconUserCircle />,
      },
      {
        title: "Halaman",
        // permission: "jobrole:all",
        path: "/app/admin/page",
        icon: <IconAffiliate />,
      },
    ],
  },
  {
    title: "Lost & Found",
    expand: false,
    icon: <IconUsers />,
    subNav: [
      {
        title: "Dashboard",
        permission: "users",
        path: "/app/manajemenBarang/dashboard",
        icon: <IconUser />,
      },
      {
        title: "Penemuan",
        permission: "roles",
        path: "/app/manajemenBarang/penemuan",
        icon: <IconUser />,
      },
      {
        title: "Pengaduan",
        permission: "profile",
        path: "/app/manajemenBarang/pengaduan",
        icon: <IconUser />,
      },
      {
        title: "Pemindahan",
        path: "/app/manajemenBarang/pemindahan",
        icon: <IconAffiliate />,
      },
      {
        title: "Penghapusbukuan",
        path: "/app/manajemenBarang/penghapusbukuan",
        icon: <IconUserCircle />,
      },
    ],
  },
  // {
  //   title: "Medical",
  //   expand: false,
  //   icon: <MedicalServicesIcon style={{ color: "#000" }} />,
  //   subNav: [
  //     {
  //       title: "Pemeriksaan Kesehatan",
  //       path: "/app/admin/mastermedical",
  //       icon: <LocalHospitalIcon />,
  //     },
  //     {
  //       title: "Kategori Kesehatan",
  //       path: "/app/admin/categorymedical",
  //       icon: <LocalHospitalIcon />,
  //     },
  //   ],
  // },
  {
    title: "Operasional",
    expand: false,
    icon: <IconBriefcase />,
    subNav: [
      // {
      //   title: "Stasiun",
      //   path: "/app/admin/station",
      //   icon: <DateRangeIcon />,
      // },
      // {
      //   title: "No KA",
      //   path: "/app/admin/noka",
      //   icon: <TrainIcon style={{ color: "#000" }} />,
      // },
      // {
      //   title: "Kode Dinas",
      //   path: "/app/admin/trainroute",
      //   icon: <TrainIcon style={{ color: "#000" }} />,
      // },
      // {
      //   title: "Time Table KA",
      //   path: "/app/admin/timetable",
      //   icon: <DateRangeIcon style={{ color: "#000" }} />,
      // },
      {
        title: "Dinas Bulanan",
        path: "/app/admin/work-order/monthly",
        icon: <IconCalendarClock />,
      },
      {
        title: "Master Data",
        path: "/app/admin/work-order/master",
        icon: <IconDatabase />,
      },
      // {
      //   title: "Dinas Harian",
      //   path: "/app/admin/dailywork",
      //   icon: <DateRangeIcon style={{ color: "#000" }} />,
      // },
      // {
      //   title: "Serah Terima Penyelia",
      //   path: "/app/admin/dailyschedule",
      //   icon: <DateRangeIcon style={{ color: "#000" }} />,
      // },
      // {
      //   title: "Kejadian",
      //   path: "/app/admin/incident",
      //   icon: <DateRangeIcon style={{ color: "#000" }} />,
      // },
      // {
      //   title: "Cabin Ride",
      //   path: "/app/admin/cabinride",
      //   icon: <AirlineSeatReclineNormalIcon style={{ color: "#000" }} />,
      // },
    ],
  },
];

export const SidebarData = _sidebarData;
// export const SidebarData = filterSidebarByRole(_sidebarData, permissions);
