import { InstantiateExpr } from "@angular/compiler";

export class Assignment {
    public id: number;
    public title: string;
    //should this be text instead? 
    public description: string; 
    public course_id: number;
    public assignment_id: number;
    public assigned_on: string;
    public due_on: string;

    constructor(
        id: number, 
        title: string, 
        description: string, 
        course_id: number, 
        assignment_id: number, 
        assigned_on: string, 
        due_on: string
    ){
        this.id = id;
        this.title = title
        //should this be text instead?
        this.description = description;
        this.course_id = course_id;
        this.assignment_id = assignment_id;
        //this will need to be customized probably
        this.assigned_on = this.formatDate(assigned_on).toDateString()
        this.due_on = this.formatDate(due_on).toDateString()
    }

    formatDate(date: string){
       return new Date(parseInt(date.slice(0, 4)), parseInt(date.slice(5, 7)), parseInt(date.slice(8, 10)))
    }

}