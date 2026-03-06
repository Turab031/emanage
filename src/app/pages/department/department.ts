import { Component, inject, OnInit, signal } from '@angular/core';
import { DepartmentModel } from '../../models/Department.model';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department',
  imports: [FormsModule, CommonModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  newDeptObj: DepartmentModel = new DepartmentModel();
  masterService = inject(Master);
  deptList = signal<DepartmentModel[]>([]);

  ngOnInit(): void {
    this.getAllDepartments();
  }

  onSaveDept() {
    this.masterService.saveDept(this.newDeptObj).subscribe({
      next: (result: any) => {
        alert('Department created successfully');
        this.getAllDepartments();
        this.newDeptObj = new DepartmentModel();
      },
      error: (error) => {
        alert(error.error);
        console.error('Error saving department', error);
      },
    });
  }

  onEdit(data: DepartmentModel) {
    this.newDeptObj = { ...data };
  }

  onReset() {
    this.newDeptObj = new DepartmentModel();
  }

  onUpdateDept() {
    this.masterService.updateDept(this.newDeptObj).subscribe({
      next: (result: any) => {
        alert('Department updated successfully');
        this.getAllDepartments();
        this.newDeptObj = new DepartmentModel();
      },
      error: (error) => {
        alert(error.error);
        console.error('Error updating department', error);
      },
    });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure?');
    if (isDelete) {
      this.masterService.deleteDept(id).subscribe({
        next: (result: any) => {
          alert('Department deleted successfully');
          this.getAllDepartments(); // ✅ list refresh → isActive=false wala gayab
          this.newDeptObj = new DepartmentModel();
        },
        error: (error) => {
          alert(error.error);
          console.error('Error deleting department', error);
        },
      });
    }
  }

  getAllDepartments() {
    this.masterService.getAllDept().subscribe({
      next: (result: any) => {
        this.deptList.set(result); // ✅ backend already sirf active bhej raha hai
      },
    });
  }
}