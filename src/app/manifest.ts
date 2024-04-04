import { MetadataRoute } from "next"
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SH Portfolio Maker",
    short_name: "SH Portfolio Maker",
    description: "SH Portfolio Maker offers a comprehensive, complimentary platform designed to craft elegant, structured, and animated portfolios tailored to showcase your professional profile. Sign in effortlessly and begin presenting your work with sophistication and ease.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}