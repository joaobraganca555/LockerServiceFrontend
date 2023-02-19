import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

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

  // Success toast
  showSuccessToast(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

  // Warning toast
  showWarningToast(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

  // Info toast
  showInfoToast(message: string) {
    Swal.fire({
      toast: true,
      position: 'top',
      icon: 'info',
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }
}
