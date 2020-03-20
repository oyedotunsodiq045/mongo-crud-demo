const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    maxlength: [50, 'Author can not be more than 50 characters']
  },
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean
});

module.exports = mongoose.model('Course', CourseSchema);
