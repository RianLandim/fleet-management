// import createJiti from "jiti";

// const jiti = createJiti(new URL(import.meta.url).pathname);

// Import env here to validate during build. Using jiti we can import .ts files :)
// jiti("./src/env.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/fotos-gratis/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/configuracoes",
        destination: "/painel/configuracoes",
        permanent: false,
      },
      {
        source: "/mudarNomeEmpresa",
        destination: "/painel/configuracoes/mudarNomeEmpresa",
        permanent: false,
      },
      {
        source: "/mudarEmail",
        destination: "/painel/configuracoes/mudarEmail",
        permanent: false,
      },
      {
        source: "/mudarSenha",
        destination: "/painel/configuracoes/mudarSenha",
        permanent: false,
      },
      {
        source: "/",
        destination: "/entrar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
