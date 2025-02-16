export const paths = {
  home: {
    path: "/",
    getHref: () => "/"
  },

  map: {
    search: {
      path: "/map/search",
      getHref: () => "/map/search"
    }
  }
} as const;
