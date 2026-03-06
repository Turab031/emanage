import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Master } from '../../services/master';
import { DesignationModel } from '../../models/Department.model';
import { DepartmentModel } from '../../models/Department.model';

@Component({
  selector: 'app-designation',
  imports: [FormsModule, CommonModule],
  templateUrl: './designation.html',
  styleUrl: './designation.css',
})
export class Designation implements OnInit {

  newDesigObj: DesignationModel = {
    designationId: 0,
    departmentId: 0,
    designationName: ''
  };

  masterService = inject(Master);
  designationList = signal<DesignationModel[]>([]);
  deptList = signal<DepartmentModel[]>([]); // ✅ Department list

  ngOnInit(): void {
    this.getAllDesignation();
    this.getAllDepartments(); // ✅ Departments load karo
  }

  // ✅ getDeptName method — HTML mein use hoga
  getDeptName(departmentId: number): string {
    const dept = this.deptList().find(d => d.departmentId === departmentId);
    return dept ? String(dept.departmentName) : 'N/A';
  }

  // GET ALL DEPARTMENTS
  getAllDepartments() {
    this.masterService.getAllDept().subscribe({
      next: (result: any) => {
        this.deptList.set(result);
      }
    });
  }

  // GET ALL DESIGNATIONS
  getAllDesignation() {
    this.masterService.getAllDesignation().subscribe({
      next: (result: any) => {
        this.designationList.set(result);
      }
    });
  }

  // SAVE
  onSaveDesignation() {
    if (this.newDesigObj.departmentId === 0) {
      alert('Please select a Department!');
      return;
    }
    if (!this.newDesigObj.designationName.trim()) {
      alert('Please enter Designation Name!');
      return;
    }

    this.masterService.saveDesignation(this.newDesigObj).subscribe({
      next: () => {
        alert('Designation created successfully');
        this.getAllDesignation();
        this.onReset();
      },
      error: (error) => {
        console.error('Error saving designation', error);
        alert('Error: ' + (error.error || 'Something went wrong'));
      },
    });
  }

  // UPDATE
  onUpdateDesignation() {
    if (this.newDesigObj.departmentId === 0) {
      alert('Please select a Department!');
      return;
    }
    if (!this.newDesigObj.designationName.trim()) {
      alert('Please enter Designation Name!');
      return;
    }

    this.masterService.updateDesignation(this.newDesigObj).subscribe({
      next: () => {
        alert('Designation updated successfully');
        this.getAllDesignation();
        this.onReset();
      },
      error: (error) => {
        console.error('Error updating designation', error);
        alert('Error: ' + (error.error || 'Something went wrong'));
      },
    });
  }

  // EDIT
  onEdit(data: DesignationModel) {
    this.newDesigObj = { ...data };
  }

  // RESET
  onReset() {
    this.newDesigObj = {
      designationId: 0,
      departmentId: 0,
      designationName: ''
    };
  }

  // DELETE
  onDelete(id: number) {
    if (confirm('Are you sure?')) {
      this.masterService.deleteDesignation(id).subscribe({
        next: () => {
          alert('Designation deleted successfully');
          this.getAllDesignation();
          this.onReset();
        },
        error: (error) => {
          console.error('Error deleting designation', error);
          alert('Error: ' + (error.error || 'Something went wrong'));
        },
      });
    }
  }
}