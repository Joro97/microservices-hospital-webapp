export const environment = {
  production: true,
  hospitalApiUrl: 'http://localhost:8000/api',
  lesionDetectionApiUrl: 'http://localhost:9000/api',
  loginUrl: '/login',
  doctorsUrl: '/doctors',
  avatarsUrl: '/images', // Plus doctor username, example: /upload/image/cvetan
  lesionUrl: '/lesion',
  patientAppointmentsUrl: '/appointments', // Plus patient username, example: /appointments/ognyan
  doctorHoursUrl: '/schedules', // Plus doctor username, example: /schedule/ognyan
  appointmentBookingUrl: '/book', // Plus patient username / doctor username, example: book/joro/ognyan
  likesRetrievalUrl: '/likes'
};
