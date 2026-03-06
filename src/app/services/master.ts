import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DepartmentModel } from '../models/Department.model';
import { DesignationModel } from '../models/Department.model';

@Injectable({
  providedIn: 'root',
})
export class Master {
  apiUrl: string = 'https://localhost:7074/api';
  http = inject(HttpClient);

  // ==================
  // DEPARTMENT MASTER
  // ==================

  getAllDept() {
    return this.http.get(this.apiUrl + '/DepartmentMaster');
  }

  saveDept(obj: DepartmentModel) {
    return this.http.post(this.apiUrl + '/DepartmentMaster', obj, {
      responseType: 'text',
    });
  }

  updateDept(obj: DepartmentModel) {
    return this.http.put(this.apiUrl + `/DepartmentMaster/${obj.departmentId}`, obj, {
      responseType: 'text',
    });
  }

  deleteDept(id: number) {
    return this.http.delete(this.apiUrl + '/DepartmentMaster/' + id, {
      responseType: 'text',
    });
  }

  // ====================
  // DESIGNATION MASTER
  // ====================

  getAllDesignation() {
    return this.http.get(this.apiUrl + '/DesignationMaster');
  }

  saveDesignation(obj: DesignationModel) {
    return this.http.post(this.apiUrl + '/DesignationMaster', obj, {
      responseType: 'text',
    });
  }

  updateDesignation(obj: DesignationModel) {
    return this.http.put(this.apiUrl + `/DesignationMaster/${obj.designationId}`, obj, {
      responseType: 'text',
    });
  }

  deleteDesignation(id: number) {
    return this.http.delete(this.apiUrl + `/DesignationMaster/${id}`, {
      responseType: 'text',
    });
  }
}