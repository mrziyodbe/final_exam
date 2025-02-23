module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "./frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
    {
      name: "backend",
      cwd: "./backend",
      script: "dist/main.js",
      env: {
        NODE_ENV: "production",
        PORT: 4000,
      },
    },
  ],
};
