module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      instances: 3,
      exec_mode: "cluster",
      max_memory_restart: "200M",
      error_file: "./logs/err.log", 
      log_file: "./logs/app.log",
      out_file: "./logs/out.log",
      combine_logs: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
