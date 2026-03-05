import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartmentModel } from '../../models/Department.model';
import { FormsModule, NgModel } from '@angular/forms';
import { Master } from '../../services/master';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [FormsModule,CommonModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  newDeptObj: DepartmentModel = new DepartmentModel();
  masterService = inject(Master);
  deptList = signal<DepartmentModel[]>([])
  ngOnInit(): void {
    this.getAllDepartments();
  }

  onSaveDept() {
    this.masterService.saveDept(this.newDeptObj).subscribe(({
      next:(result:any)=>{
        alert("department created success")
        this.deptList.set(result)

      },
      error:(error)=>{


      }

    }))
  }
  getAllDepartments() {
    this.masterService.getAllDept().subscribe({
      next: (result: any) => {
        this.deptList.set(result);
      },
    });
  }
}
