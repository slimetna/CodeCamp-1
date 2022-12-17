const axios = require('axios');
import studentsModel from '../db/models/students.model';
import { checkStudentsCache } from '../utils/checkData';

export async function getAllstudents(req: any, res: any){
    await checkStudentsCache();
    let students = await gate(req, res);
    
    res.send(students);
}

export async function getStudentById(req: any, res: any){
    await checkStudentsCache();
    let students = await gate(req, res);

    let { id } = req.params || { id: null };
    if(!id) return res.send({code: 404, error: "No id provided"});

    let student = students.find((student: any) => student.login === id);
    if(!student) return res.send({code: 404, error: "Student not found"});
    
    res.send(student);
};

export async function getStudentByIdCache(req: any, res: any){
    await checkStudentsCache();
    let students = await gate(req, res);

    let { login } = req.body || { login: null };
    if(!login) return res.send({code: 404, error: "No id provided"});

    let student = students.find((student: any) => student.login === login);
    if(!student) return res.send({code: 404, error: "Student not found"});
    
    return student;
};

async function gate(req: any, res: any) {
    let studentsData = await studentsModel.findOne({name: "students"}) || new studentsModel({name: "students", students: []});
    let students = studentsData.students;
    if(Date.now() - studentsData.lastEdit > 172800000 || !students || students.length <= 0){ // 2 days
        students = await getStudents(req, res);
        studentsData.students = students;
        studentsData.lastEdit = Date.now();
        await studentsData.save();
    };
    return students;
};

export async function getStudents(req: any, res: any){
    const { authenticator } = req.cookies || {authenticator: null};
    if(!authenticator) { 
        res.send({status: 400, message: "Wrong Token"});
        return;
    };
    const response = await axios.get('https://intra-api.etna-alternance.net/trombi',{
        headers: {
            Cookie: "authenticator="+authenticator
        }
    });

    let data: any = response.data;

    const students = [];

    for (const property in data) {
        const arrayOfPromo: any = data[property];
        
        for(let i = 0; i < arrayOfPromo.length; i++){
            const promo = arrayOfPromo[i];
            let promoData = await axios.get(`https://intra-api.etna-alternance.net/trombi/${promo.id}`, {
                headers: {
                    Cookie: "authenticator="+authenticator
                }
            });  
            promoData = promoData.data;
            const studentsData = promoData.students;
            for(let j = 0; j < studentsData.length; j++){
                students.push({
                    login: studentsData[j].login,
                    firstname: studentsData[j].firstname,
                    lastname: studentsData[j].lastname,
                    promo: promo,
                    img: `https://auth.etna-alternance.net/api/users/${studentsData[j].login}/photo`,
                });
            }
        }
    };

    return students;
};