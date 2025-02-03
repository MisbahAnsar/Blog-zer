// User schema for MongoDB

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: false
    },
}, {timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
});

// Instance method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

module.exports = mongoose.model('User', userSchema);