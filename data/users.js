const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = async (inputPassword, hashedPassword) => {
  return bcrypt.compare(inputPassword, hashedPassword);
};

const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$r9z7X8y9W0V2u3T4s5R6q7p8o9n0m1l2k3j4i5h6g7f8e9d0c1b',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date()
  },
  {
    id: 2,
    username: 'user',
    password: '$2a$10$r9z7X8y9W0V2u3T4s5R6q7p8o9n0m1l2k3j4i5h6g7f8e9d0c1b',
    email: 'user@example.com',
    role: 'user',
    createdAt: new Date()
  }
];

const findByUsername = (username) => {
  return users.find(user => user.username === username);
};

const findById = (id) => {
  return users.find(user => user.id === id);
};

const findByEmail = (email) => {
  return users.find(user => user.email === email);
};

module.exports = {
  users,
  findByUsername,
  findById,
  findByEmail,
  hashPassword,
  comparePassword
};
