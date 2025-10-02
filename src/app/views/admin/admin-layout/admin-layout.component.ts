import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100">
      <!-- Admin Header -->
      <header class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center">
              <h1 class="text-2xl font-bold text-gray-900">Son Mai Heritage - Admin</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">Xin chào, Admin</span>
              <button 
                (click)="logout()"
                class="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors">
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </header>

      <div class="flex">
        <!-- Sidebar -->
        <nav class="w-64 bg-white shadow-sm min-h-screen">
          <div class="p-4">
            <ul class="space-y-2">
              <li>
                <a 
                  routerLink="/admin/dashboard" 
                  routerLinkActive="bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  </svg>
                  Dashboard
                </a>
              </li>
              <li>
                <a 
                  routerLink="/admin/orders" 
                  routerLinkActive="bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  Quản lý đơn hàng
                </a>
              </li>
              <li>
                <a 
                  routerLink="/admin/payments" 
                  routerLinkActive="bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  Lịch sử giao dịch
                </a>
              </li>
              <li>
                <a 
                  routerLink="/admin/vnpay-history" 
                  routerLinkActive="bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Lịch sử VNPay
                </a>
              </li>
              <li>
                <a 
                  routerLink="/admin/statistics" 
                  routerLinkActive="bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                  Thống kê
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Main Content -->
        <main class="flex-1 p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .router-link-active {
      @apply bg-blue-50 text-blue-700 border-r-2 border-blue-700;
    }
  `]
})
export class AdminLayoutComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login
    this.router.navigate(['/login']);
  }
}
