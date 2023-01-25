module.exports = {
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/bookit",
    DB_URI:
      "mongodb+srv://marti:123456789@cluster0.ooeshmn.mongodb.net/bookit?retryWrites=true&w=majority",

    STRIPE_API_KEY:
      "pk_test_51MS2hcFzoMTg0nHRwnotCx8KEPSSWKsazzTI6er2Q251BhhLrtcrKhXPQ4rUF5Sxn5iAJGL6tbbmWgl5pVFwbMeB00EDaXrqFZ",
    STRIPE_SECRET_KEY:
      "sk_test_51MS2hcFzoMTg0nHRc9qj9cMkqtCp8wIlm9ZcT5wQVp1TKq5zQKVZZc2tgrJrWweGPUbiBcRZqmBIGSOTNXe4IUV500F7arbB7R",
    STRIPE_WEBHOOK_SECRET: "whsec_Fc6HyoEnmM9S7Rg9QEPLDhx399VqFvQr",

    CLOUDINARY_CLOUD_NAME: "dbeyagjpm",
    CLOUDINARY_API_KEY: "711743527876921",
    CLOUDINARY_API_SECRET: "6HzyXYe-6n27vNlRUGVKORiqtuc",

    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: 2525,
    SMTP_USER: "7494695c58a620",
    SMTP_PASSWORD: "6c8c4491b6b35c",
    SMTP_FROM_NAME: "BookIT",
    SMTP_FROM_EMAIL: "noreply@bookit.com",

    NEXTAUTH_URL: "https://bookit-rho.vercel.app",
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
};
