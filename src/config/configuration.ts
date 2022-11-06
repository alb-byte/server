export default () => ({
  PORT: process.env.PORT || 3000,
  SERVICEBUS_CONNECTION_STRING: `${process.env.SERVICEBUS_CONNECTION_STRING}`,
});
