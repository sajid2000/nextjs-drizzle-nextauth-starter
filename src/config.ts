import { env } from "./env";

const currentYear = new Date().getFullYear().toString();
const websiteLaunchYear = "2024";

export default {
  metadata: {
    title: env.NEXT_PUBLIC_APP_NAME,
    icons: [{ rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" }],
    description: "A simple next.js template including drizzle and lucia auth",
  },
  appName: env.NEXT_PUBLIC_APP_NAME,
  appUrl: env.NEXT_PUBLIC_APP_URL,
  language: "en-us",
  locale: "en-US",
  socialBanner: "/static/images/twitter-card.png",
  // owner
  author: "Sajid",
  email: "sajid153957@gmail.com",
  github: "https://github.com/sajid2000",
  linkedin: "https://www.linkedin.com/in/sajid-bin-islam-05561316b/",
  // copywrite
  copywriteYears: currentYear === websiteLaunchYear ? currentYear : `${websiteLaunchYear}-${currentYear}`,
};
