export interface CourseAssignmentInterface {
        id: number,
        course_id: number,
        assignment_id: number,
        assignedOn: Date,
        dueOn: Date,
        title: string,
        description: string,
        program_id: number,
        course_name: string
}
