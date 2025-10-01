"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();

  // helper for classes
  const getClasses = (href: string, isAccount = false) => {
    const isActive = pathname === href;

    if (isAccount) {
      return {
        item: "border-0 bg-black text-center",
        link: "text-white text-decoration-none d-flex flex-column align-items-center",
        icon: "fs-1 text-white mb-1",
      };
    }

    if (isActive) {
      // active → red text/icon, white background
      return {
        item: "border-0 bg-white text-center",
        link: "text-danger text-decoration-none d-flex flex-column align-items-center",
        icon: "fs-1 text-danger mb-1",
      };
    } else {
      // inactive → white text, red icon, black background
      return {
        item: "border-0 bg-black text-center",
        link: "text-white text-decoration-none d-flex flex-column align-items-center",
        icon: "fs-1 text-danger mb-1",
      };
    }
  };

  // treat both Dashboard and Courses as the same active path
  const isDashboardActive = pathname === "/Dashboard";

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block z-2 bg-black"
      id="wd-kambaz-navigation"
      style={{ width: "110px" }}
    >
      {/* Northeastern Logo */}
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>
      <br />

      {/* Account */}
      <ListGroupItem className={getClasses("/Account", true).item}>
        <Link
          href="/Account"
          id="wd-account-link"
          className={getClasses("/Account", true).link}
        >
          <FaRegCircleUser className={getClasses("/Account", true).icon} />
          Account
        </Link>
      </ListGroupItem>
      <br />

      {/* Dashboard */}
      <ListGroupItem className={isDashboardActive ? getClasses("/Dashboard").item : getClasses("").item}>
        <Link
          href="/Dashboard"
          id="wd-dashboard-link"
          className={isDashboardActive ? getClasses("/Dashboard").link : getClasses("").link}
        >
          <AiOutlineDashboard className={isDashboardActive ? getClasses("/Dashboard").icon : getClasses("").icon} />
          Dashboard
        </Link>
      </ListGroupItem>
      <br />

      {/* Courses (same link as Dashboard, same active state) */}
      <ListGroupItem className={isDashboardActive ? getClasses("/Dashboard").item : getClasses("").item}>
        <Link
          href="/Dashboard"
          id="wd-courses-link"
          className={isDashboardActive ? getClasses("/Dashboard").link : getClasses("").link}
        >
          <LiaBookSolid className={isDashboardActive ? getClasses("/Dashboard").icon : getClasses("").icon} />
          Courses
        </Link>
      </ListGroupItem>
      <br />

      {/* Calendar */}
      <ListGroupItem className={getClasses("/Calendar").item}>
        <Link
          href="/Calendar"
          id="wd-calendar-link"
          className={getClasses("/Calendar").link}
        >
          <IoCalendarOutline className={getClasses("/Calendar").icon} />
          Calendar
        </Link>
      </ListGroupItem>
      <br />

      {/* Inbox */}
      <ListGroupItem className={getClasses("/Inbox").item}>
        <Link
          href="/Inbox"
          id="wd-inbox-link"
          className={getClasses("/Inbox").link}
        >
          <FaInbox className={getClasses("/Inbox").icon} />
          Inbox
        </Link>
      </ListGroupItem>
      <br />

      {/* Labs */}
      <ListGroupItem className={getClasses("/Labs").item}>
        <Link
          href="/Labs"
          id="wd-labs-link"
          className={getClasses("/Labs").link}
        >
          <LiaCogSolid className={getClasses("/Labs").icon} />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
