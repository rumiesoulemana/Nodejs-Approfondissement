// module.exports = {
//   apps: [
//     {
//       name: "app",
//       script: "./www/app.js",
//       env_production: {
//         NODE_ENV: "production",
//       },
//     },
//   ],
// };

module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js", // Assurez-vous que le chemin vers votre fichier app.js est correct
      instances: 3, // Déployer avec 3 instances en parallèle
      exec_mode: "cluster", // Utiliser le mode cluster pour exécuter les instances en parallèle
      max_memory_restart: "200M", // Limite de mémoire de 200 Mo
      error_file: "./logs/err.log", // Fichier de log pour les erreurs
      log_file: "./logs/app.log", // Fichier de log général (pour info et erreur)
      out_file: "./logs/out.log", // Fichier de log pour les sorties standard
      combine_logs: true, // Combiner les logs stdout et stderr dans les fichiers définis ci-dessus
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

