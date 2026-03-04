export class DepartmentModel{
    departmentId:number
    departmentName:String
    isActive:boolean

    constructor(){
        this.departmentId=0;
        this.departmentName="";
        this.isActive=false
    }
}