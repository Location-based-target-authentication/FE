import { map } from "es-toolkit/compat";
import { Link, useLocation } from "react-router";

import { generateNavbarInfo } from "./index.const";

function NavItem({ Icon, label, active, to }) {
  return (
    <Link to={to} className="flex flex-col items-center text-gray-400">
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

  return (
    <nav className="fixed bottom-0 left-0 flex w-full justify-around border-t bg-white py-3 shadow-md">
      {map(navbarInfo, ({ label, activeIcon, notActiveIcon, to, isActvie }) => (
        <NavItem
          key={to}
          Icon={isActvie ? activeIcon : notActiveIcon}
          label={label}
          active={isActvie}
          to={to}
        />
      ))}
    </nav>
  );
}

export { Navbar };
