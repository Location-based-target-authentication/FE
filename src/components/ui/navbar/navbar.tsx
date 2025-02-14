import { map } from "es-toolkit/compat";
import { Link, useLocation } from "react-router";

import { generateNavbarInfo } from "./index.const";

function NavItem({ Icon, label, active, to }) {
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

  return (
    <nav className="fixed bottom-0 left-1/2 flex w-1/2 -translate-x-1/2 justify-around border-t bg-white py-3 shadow-top">
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
