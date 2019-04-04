export const environment = {
  production: true,
  hospitalApiUrl: 'http://localhost:8091/hospital',
  doctorsUrl: '/doctors',
  avatarsUrl: '/images', // Plus doctor username, example: /upload/image/cvetan
  patientAppointmentsUrl: '/appointments', // Plus patient username, example: /appointments/ognyan
  doctorHoursUrl: '/schedules', // Plus doctor username, example: /schedule/ognyan
  appointmentBookingUrl: '/book', // Plus patient username / doctor username, example: book/joro/ognyan
  likesRetrievalUrl: '/likes',
  authServiceApiUrl: 'http://localhost:8090/spring-security-oauth-server',
  tokenUrl: '/oauth/token',
  registerUserUrl: '/register/user',
  loginUrl: '/login',
  lesionDetectionApiUrl: 'http://localhost:9000/api',
  lesionUrl: '/lesion',
};
