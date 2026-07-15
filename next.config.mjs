/** @type {import('next').NextConfig} */
const nextConfig = {
  // The cloned pages inject the theme's own jQuery/Elementor scripts once on
  // mount; StrictMode's double-invoke would double-init sliders/counters.
  reactStrictMode: false,
  // Original WordPress URLs use trailing slashes (e.g. /about-us/). Match them
  // so the mirrored internal links resolve without redirects.
  trailingSlash: true,
};

export default nextConfig;
