export enum Role {
  USER = 'USER', // Normal user, referred to as patient in the application
  DOCTOR = 'DOCTOR', // User that can manage his schedule and access some protected routes
  ADMIN = 'ADMIN' // Can access all routes and can register new doctors
}
