export enum Role {
  User = 'User', // Normal user, referred to as patient in the application
  Doctor = 'Doctor', // User that can manage his schedule and access some protected routes
  Admin = 'Admin' // Can access all routes and can register new doctors
}
