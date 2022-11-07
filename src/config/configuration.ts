export default () => ({
  PORT: process.env.PORT || 3000,
  //# --- DATABASE ---
  DB_HOST: `${process.env.DB_HOST}`,
  DB_PORT: `${process.env.DB_PORT}`,
  DB_USERNAME: `${process.env.DB_USERNAME}`,
  DB_PASSWORD: `${process.env.DB_PASSWORD}`,
  DB_NAME: `${process.env.DB_NAME}`,
  SERVICEBUS_CONNECTION_STRING: `${process.env.SERVICEBUS_CONNECTION_STRING}`,
});
