export const ENDPOINT_URL = import.meta.env.VITE_ENDPOINT_URL;
export const NODE_ENV = import.meta.env.VITE_NODE_ENV;
export const SUPPRESS_LOGOUT_BY_SERVER_CONNECTION_FAILD = import.meta.env
  .VITE_SUPPRESS_LOGOUT_BY_SERVER_CONNECTION_FAILD;
export const USE_ENC = import.meta.env.VITE_USE_ENC;
export const MEDIUM_REQUEST_TIMEOUT = Number(
  import.meta.env.VITE_MEDIUM_REQUEST_TIMEOUT
);
export const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY;
export const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const isProduction = NODE_ENV === "production";
export const isDevelopment = NODE_ENV === "development";
