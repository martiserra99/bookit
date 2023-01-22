module.exports = {
  env: {
    DB_LOCAL_URI: "mongodb://localhost:27017/bookit",

    CLOUDINARY_CLOUD_NAME: "dbeyagjpm",
    CLOUDINARY_API_KEY: "711743527876921",
    CLOUDINARY_API_SECRET: "6HzyXYe-6n27vNlRUGVKORiqtuc",

    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: 2525,
    SMTP_USER: "7494695c58a620",
    SMTP_PASSWORD: "6c8c4491b6b35c",
    SMTP_FROM_NAME: "BookIT",
    SMTP_FROM_EMAIL: "noreply@bookit.com",
  },
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
};
