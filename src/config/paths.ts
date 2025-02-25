export const paths = {
  home: {
    path: "/",
    getHref: () => "/"
  },

  map: {
    search: {
      path: "/map/search",
      getHref: () => "/map/search"
    },
    certification: {
      path: "/map/certification",
      getHref: () => "/map/certification",

      sucess: {
        path: "/map/certification/success",
        getHref: () => "/map/certification/success"
      }
    }
  },

  profile: {
    reward: {
      path: "/profile/reward",
      getHref: () => "/profile/reward"
    }
  }
} as const;
