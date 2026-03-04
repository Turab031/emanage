// import { HttpClient } from '@angular/common/http';
// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   imports: [FormsModule],
//   templateUrl: './login.html',
//   styleUrl: './login.css',
// })
// export class Login {
//   loginObj: any = {
//     email: '',
//     contactNo: '',
//   };

//   http = inject(HttpClient);
//   router = inject(Router);

//   onLogin() {
//     debugger;
//     this.http.post('https://localhost:7074/api/EmployeeMaster/Login', this.loginObj).subscribe({
//       next: (result: any) => {
//         debugger;
//         localStorage.setItem('empLoginUser', JSON.stringify(result.data));
//         this.router.navigateByUrl('dashboard');
//       },
//       error: (error: any) => {
//         debugger;
//       },
//     });
//   }
// }



import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,   // 🔥 VERY IMPORTANT
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],   // 🔥 fix this too
})
export class Login {

  loginObj: any = {
    email: '',
    contactNo: '',
  };

  http = inject(HttpClient);
  router = inject(Router);

  onLogin() {
    this.http.post(
      'https://localhost:7074/api/EmployeeMaster/Login',
      this.loginObj
    ).subscribe({
      next: (result: any) => {

        console.log(result);

        // ⚠ Your backend does NOT return result.data
        // It returns object directly

        localStorage.setItem('empLoginUser', JSON.stringify(result));

        this.router.navigateByUrl('/dashboard');  // 🔥 add slash
      },
      error: (error: any) => {
        alert(error.error);
      },
    });
  }
}