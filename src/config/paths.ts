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
    path: "/goal",
    getHref: () => "/goal"
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
    },
    agreement: {
      path: "/auth/agreement",
      getHref: () => "/auth/agreement"
    },
    phoneNumber: {
      path: "/auth/phoneNumber",
      getHref: () => "/auth/phoneNumber"
    }
  }
} as const;
