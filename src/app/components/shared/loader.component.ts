import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loading()) {
      <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded shadow-lg flex items-center gap-3">
          <div class="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          <span>Cargando...</span>
        </div>
      </div>
    }
  `
})
export class GlobalLoaderComponent {
  private loadingService = inject(LoadingService);
  loading = this.loadingService.loading;
}