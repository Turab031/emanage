import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DepartmentModel } from '../models/Department.model';

@Injectable({
  providedIn: 'root',
})
export class Master {
  apiUrl: string = 'https://localhost:7074/api';
  http = inject(HttpClient);

  getAllDept() {
    return this.http.get(this.apiUrl + '/DepartmentMaster/GetAllDepartments');
  }

  saveDept(obj: DepartmentModel) {
    return this.http.post(this.apiUrl + '/DepartmentMaster/AddDepartment', obj, {
      responseType: 'text', // ✅ add this
    });
  }
  updateDept(obj: DepartmentModel) {
    return this.http.put(this.apiUrl + '/DepartmentMaster/UpdateDepartment', obj, {
      responseType: 'text',
    });
  }

  deleteDept(id: number) {
    return this.http.delete(this.apiUrl + '/DepartmentMaster/DeleteDepartment/' + id, {
      responseType: 'text', // ✅ plain text response fix too
    });
  }
}
