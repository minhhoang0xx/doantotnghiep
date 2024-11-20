import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.HSE.app', // ID của ứng dụng
  appName: 'HSE',       // Tên ứng dụng
  webDir: 'build',      // Thư mục build của ứng dụng (React/Vue/Angular)

  // Thêm server configuration
  server: {
    androidScheme: 'https', // Đảm bảo sử dụng HTTPS khi chạy trên WebView Android
  },

  // Cấu hình plugin
  plugins: {
    SplashScreen: {
      launchShowDuration: 0, // Ẩn splash screen ngay lập tức
    },
    CapacitorBrowser: {
      presentationStyle: 'fullscreen', // Hiển thị trình duyệt toàn màn hình
    },
  }
};

export default config;
