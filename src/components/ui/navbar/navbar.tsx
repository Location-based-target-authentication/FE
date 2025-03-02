import { useMemo } from "react";

import { includes, map } from "es-toolkit/compat";
import { Link, useLocation } from "react-router";

import { generateNavbarInfo, NOT_VISIBLE_NAVBAR_PAGES } from "./index.const";

interface NavItemProps {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  active: boolean;
  to: string;
}

function NavItem({ Icon, label, active, to }: NavItemProps) {
  return (
    <Link to={to} className="flex flex-1 flex-col items-center text-gray-400">
      <Icon />
      <span
        className={`${active ? "font-semibold text-black" : "text-gray-300"}`}
      >
        {label}
      </span>
    </Link>
  );
}

function Navbar() {
  const location = useLocation();
  const navbarInfo = generateNavbarInfo(location.pathname);

  const isVisibleNavbar = useMemo(() => {
    return !includes(NOT_VISIBLE_NAVBAR_PAGES, location.pathname);
  }, [location.pathname]);

  const memoizedNavbar = useMemo(() => {
    if (!isVisibleNavbar) return null;

    return (
      <nav className="absolute bottom-0 left-1/2 z-40 flex w-[375px] -translate-x-1/2 justify-around border-t bg-white py-3 shadow-top">
        {map(
          navbarInfo,
          ({ label, activeIcon, notActiveIcon, to, isActvie }) => (
            <NavItem
              key={to}
              Icon={isActvie ? activeIcon : notActiveIcon}
              label={label}
              active={isActvie}
              to={to}
            />
          )
        )}
      </nav>
    );
  }, [isVisibleNavbar, navbarInfo]);

  return memoizedNavbar;
}

export { Navbar };
