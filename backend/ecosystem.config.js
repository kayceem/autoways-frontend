module.exports = {
  apps: [{
    name: 'autoways-backend',
    script: './app.js',
    instances: process.env.PM2_INSTANCES || 2,
    exec_mode: 'cluster',
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 5000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_restarts: 10,
    min_uptime: '10s',
    listen_timeout: 10000,
    kill_timeout: 5000,
    wait_ready: true,
    // Advanced production features
    instance_var: 'INSTANCE_ID',
    post_update: ['npm install'],
    // Monitoring
    pmx: true,
    automation: false,
    // Graceful shutdown
    shutdown_with_message: true
  }]
};
