import { ArrowLeft } from "@/components/ui/arrow-left";

import { useCallback, useMemo } from "react";

import { includes } from "es-toolkit/compat";
import { useLocation, useNavigate } from "react-router";

import { HEADER_TITLE_MAP, NOT_VISIBLE_HEADER_PAGES } from "./index.const";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = useCallback(() => navigate(-1), [navigate]);

  const headerTitle = useMemo(
    () => HEADER_TITLE_MAP.get(location.pathname),
    [location.pathname]
  );

  const isVisibleHeader = useMemo(() => {
    return (
      !includes(NOT_VISIBLE_HEADER_PAGES, location.pathname) && headerTitle
    );
  }, [location.pathname, headerTitle]);

  const memoizedHeader = useMemo(() => {
    if (!isVisibleHeader) return null;

    return (
      <div className="relative flex h-[56px] w-full items-center justify-center bg-white p-4">
        <button
          onClick={goBack}
          className="absolute left-4 flex items-center justify-center"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="absolute left-1/2 -translate-x-1/2 text-lg font-medium">
          {headerTitle}
        </div>
      </div>
    );
  }, [isVisibleHeader, goBack, headerTitle]);

  return memoizedHeader;
}

export { Header };
