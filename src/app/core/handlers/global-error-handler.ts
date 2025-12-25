import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // Тут ми перехоплюємо всі помилки
    console.error('🔥 Global Error Handler спіймав помилку:', error);
  }
}
