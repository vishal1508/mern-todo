import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    const saltRounds = 12; // Higher is better, but slower. 10–12 is typical for production.
    return await bcrypt.hash(password, saltRounds);
  };
  
  const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  };

  export {hashPassword,comparePassword}