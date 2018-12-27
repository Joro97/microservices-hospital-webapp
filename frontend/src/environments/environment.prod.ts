export const environment = {
  production: true,
  apiUrl: 'http://localhost:8000/api',
  loginUrl: '/login',
  allDoctorsUrl: '/doctors',
  registerDoctorUrl: '/doctors/register',
  fileUploadUrl: '/upload/image', // Plus doctor username, example: /upload/image/cvetan
  fileRetrievalUrl: '/image', // Plus doctor username, example: /image/joro
  patientAppointmentsUrl: '/appointments', // Plus patient username, example: /appointments/ognyan
  doctorsHoursUrl: '/schedule' // Plus doctor username, example: /schedule/ognyan
};
