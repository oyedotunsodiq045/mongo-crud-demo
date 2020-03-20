const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));

const CourseSchema = new Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

// Course Model
const Course = mongoose.model('Course', CourseSchema);

// Create course
async function createCourse() {
  // course object (based on Course class)
  const course = new Course({
    name: 'Angular Course',
    author: 'Sodiq Oyedotun',
    tags: ['angular', 'frontend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
}

// Get all courses
async function getCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// Get courses
// where author contains - Abiodun, isPublished is true,
// sort name in ascending order
// and output only name and tags field to console
async function getCourses() {
  const courses = await Course.find({
    author: /.*aBiOdUn.*/i,
    isPublished: true
  })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, author: 1, tags: 1 });

  console.log(courses);
}

// Get Course
// where author starts with Gbolahan
async function getCourses() {
  const courses = await Course.find({ author: /^gbolahan/i });
  console.log(courses);
}

// Get Course
// where author ends with Oyedotun
async function getCourses() {
  const courses = await Course.find({ author: /oYedotun$/i });
  console.log(courses);
}

// Get count of all courses
// where name contains the word course
async function getCourses() {
  const courses = await Course.find({ name: /.*course.*/i, isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .count();

  console.log(courses);
}

// Get Course
// Pagination
async function getCourses() {
  pageNumber = 2;
  pageSize = 10;

  // api/v1/courses?pageNumber=2&pageSize=10

  const courses = await Course.find({
    author: /.*aBiOdUn.*/i,
    isPublished: true
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log(courses);
}

// Update course
// Approach: Query first
// findById()
// Modify its properties
// save()
// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;

// course.isPublished = false;
// course.author = 'Major Stark';

//   course.set({
//     isPublished: true,
//     author: 'Sodiq of Little Rock',
//     name: 'Ruby on Rails'
//   });

//   const result = await course.save();

//   console.log(result);
// }

// Approach: Update first
// Update directly
// Optionally: get the updated document
// async function updateCourse(id) {
//   const result = await Course.update(
//     { _id: id },
//     {
//       $set: {
//         isPublished: true,
//         author: 'Gbolahan of Lagos',
//         name: 'Python Django'
//       }
//     }
//   );

//   console.log(result);
// }

// Approach: Update first
// Get the document that was updated
// the original document before the update operation
// async function updateCourse(id) {
//   const course = await Course.findByIdAndUpdate(id, {
//     $set: {
//       isPublished: true,
//       author: 'Abiodun of Canada',
//       name: 'React Native'
//     }
//   });

//   console.log(course);
// }

// Approach: Update first
// Get the updated document
async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        isPublished: false,
        author: 'Sodiq of Little Rock',
        name: 'Ruby on Rails'
      }
    },
    { new: true }
  );

  console.log(course);
}

// Remove Course
// Delete one document
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);
}

// Remove Course
// Delete many document
async function removeCourse(id) {
  // const result = await Course.deleteMany({ _id: id });
  const course = await Course.findByIdAndRemove({ _id: id });
  console.log(course);
}

// createCourse();
// getCourses();
// updateCourse('5e6bb56f8082dd51bc68a18c');
removeCourse('5e6ba63f37db4e061c4d5a27');