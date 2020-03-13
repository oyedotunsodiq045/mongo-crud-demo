const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
        name: 'Node.js Course',
        author: 'Sodiq Oyedotun',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

createCourse();