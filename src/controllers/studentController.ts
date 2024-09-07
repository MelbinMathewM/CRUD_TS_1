import Student from '../models/studentModel';
import { Request, Response } from "express";

export const loadPage = async (req : Request, res : Response ) : Promise<void> => {
    try{
        const students = await Student.find();
        res.render('student',{students});
    }catch(error){
        res.status(500).json({success : false, message : 'error while rendering page'})
    }
}

export const addStudent = async ( req : Request, res : Response) : Promise<void> => {
    try{
        const { Aname, Aemail, Aage } = req.body;
        const student = new Student({
            name : Aname,
            email : Aemail,
            age : Aage
        })
        const newStudent = await student.save();
        if(newStudent){
            res.status(200).json({ success : true, message : 'added data successfully'})
        }else {
            res.status(400).json({ success : false, message : 'couldn\'t add data'})
        }
    }catch(error){
        res.status(500).json({ success : false, message : 'error adding student data'})
    }
}

export const editStudent = async ( req : Request , res : Response) : Promise<void> => {
    try{
        const { Ename, Eemail, Eage, id } = req.body;
        const updateStudent = await Student.findByIdAndUpdate(id,{
            $set : {
                name : Ename,
                email : Eemail,
                age : Eage
            }
        },{ new : true });
        if(updateStudent){
            res.status(200).json({ success : true, message : 'updated successfully'})
        }else{
            res.status(400).json({ success : false, message : 'couldn\'t update '})
        }
    }catch(error){
        res.status(500).json({ success : false, message : 'error updating data'})
    }
}

export const deleteStudent = async (req : Request, res : Response) : Promise<void> => {
    try{
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if(student){
            res.status(200).json({ success : true, message : 'deleted successfully'})
        }else{
            res.status(400).json({success : false, message : 'couldn\'t delete data'})
        }
    }catch(error){
        res.status(500).json({ success : false, message : 'error deleting data'})
    }
}
