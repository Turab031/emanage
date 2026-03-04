import { Component } from '@angular/core';
import { DepartmentModel } from '../../models/Department.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department {
  newDeptObj:DepartmentModel= new DepartmentModel();

  onSaveDept(){
    
  }


}
