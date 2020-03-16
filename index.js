const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB...', err));


const CourseSchema = new Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// Course Model
const Course = mongoose.model('Course', CourseSchema);

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
// async function getCourses() {
//     const courses = await Course.find();
//     console.log(courses);
// } 

// Get courses
// where author is Sodiq, isPublished is true,
// sort name in ascending order
// and output only name and tags field to console
async function getCourses() {
    const courses = await Course
        .find({ author: 'Sodiq', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
}

// createCourse();
getCourses();