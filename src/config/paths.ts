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
  },

  goal: {
    root: {
      path: "/goal",
      getHref: () => "/goal"
    },
    create: {
      path: "/goal/create",
      getHref: () => "/goal/create"
    },
    date: {
      path: "/goal/date",
      getHref: () => "/goal/date"
    }
  },

  auth: {
    login: {
      path: "/auth/login",
      getHref: () => "/auth/login"
    },
    kakaoCallback: {
      path: "/auth/callback/kakao",
      getHref: () => "/auth/callback/kakao"
    },
    googleCallback: {
      path: "/auth/callback/google",
      getHref: () => "/auth/callback/google"
    }
  },

  user: {
    myPage: {
      path: "/user/my-page",
      getHref: () => "/user/my-page"
    },
    account: {
      path: "/user/account",
      getHref: () => "/user/account"
    }
  }
} as const;
