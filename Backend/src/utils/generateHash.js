const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'password123';
  const saltRounds = 10;
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Password hash for "password123":');
    console.log(hash);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash();
