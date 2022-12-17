import studentsModel from '../db/models/students.model';
export async function checkStudentsCache() {
    const studentsCache = await studentsModel.findOne({ name: "students" });
    if (!studentsCache) {
        const newData = new studentsModel({
            name: "students",
        });
        await newData.save();
    };
};