export const environment = {
  production: true,
  hospitalApiUrl: 'http://myminikube.info/api',
  doctorsUrl: '/doctors',
  avatarsUrl: '/images', // Plus doctor username, example: /upload/image/cvetan
  patientAppointmentsUrl: '/appointments', // Plus patient username, example: /appointments/ognyan
  doctorHoursUrl: '/schedules', // Plus doctor username, example: /schedule/ognyan
  appointmentBookingUrl: '/book', // Plus patient username / doctor username, example: book/joro/ognyan
  likesRetrievalUrl: '/likes',
  authServiceUrl: 'http://myminikube.info/spring-security-oauth-server',
  loginUrl: '/login',
  tokenUrl: '/oauth/token',
  registerUserUrl: '/register/user',
  lesionDetectionApiUrl: 'http://myminikube.info/api',
  lesionUrl: '/lesion',
};
