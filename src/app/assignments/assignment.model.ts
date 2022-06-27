import { InstantiateExpr } from "@angular/compiler";

export class Assignment {
    public id: number;
    public title: string;
    //should this be text instead? 
    public description: string; 
    public course_id: number;
    public assignment_id: number;
    public assigned_on: Date;
    public due_on: Date;

    constructor(id: number, title: string, description: string, course_id: number, assignment_id: number, assigned_on: string, due_on: string){

        this.id = id;
        this.title = title
        //should this be text instead?
        this.description = description;
        this.course_id = course_id;
        this.assignment_id = assignment_id;
        //this will need to be customized probably
        this.assigned_on = new Date(assigned_on)
        this.due_on = new Date(due_on)
    }
}