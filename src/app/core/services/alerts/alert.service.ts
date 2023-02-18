import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import 'sweetalert2-themes/bootstrap-4/bootstrap-4.min.css';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  showErrorAlert(title: string, text: string, footer?: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      footer: footer
    });
  }

  showSuccessAlert(title: string, text: string, footer?: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      footer: footer
    });
  }

  showInfoAlert(title: string, text: string, footer?: string) {
    Swal.fire({
      icon: 'info',
      title: title,
      text: text,
      footer: footer
    });
  }

  showConfirmationAlert(
    title: string,
    text: string,
    confirmButtonText: string,
    cancelButtonText: string
  ) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });
  }
}
