export const paths = {
  home: {
    path: "/",
    getHref: () => "/"
  },

  map: {
    path: "/map",
    getHref: () => "/map"
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
  }
} as const;
