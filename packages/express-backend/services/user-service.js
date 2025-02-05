// services/user-service.js
import User from "../models/user.js";

// Find all users
export const findAllUsers = () => {
  return User.find({});
};

// Find users by name
export const findUserByName = (name) => {
  return User.find({ name });
};

// Find users by job
export const findUserByJob = (job) => {
  return User.find({ job });
};

// Find users by both name and job
export const findUserByNameAndJob = (name, job) => {
  return User.find({ name, job });
};

// Create a new user
export const createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

// Find user by id
export const findUserById = (id) => {
  return User.findById(id);
};

// Delete user by id
export const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};
