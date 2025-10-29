const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      PROFILE: '/auth/profile'
    },
    DESTINATIONS: {
      LIST: '/destinations',
      DETAIL: '/destinations',
      CREATE: '/destinations',
      UPDATE: '/destinations',
      DELETE: '/destinations',
      BY_CATEGORY: '/destinations/category'
    },
    BOOKINGS: {
      LIST: '/bookings',
      CREATE: '/bookings',
      UPDATE: '/bookings',
      CANCEL: '/bookings',
      USER_BOOKINGS: '/bookings/user',
      DETAIL: '/bookings'
    },
    PAYMENTS: {
      INITIALIZE: '/payments/initialize',
      VERIFY: '/payments/verify',
      HISTORY: '/payments/history',
      CREATE: '/payments',
      UPDATE: '/payments',
      DETAIL: '/payments'
    },
    GUIDES: {
      LIST: '/guides',
      DETAIL: '/guides',
      UPDATE: '/guides',
      CREATE: '/guides'
    },
    TRAVELERS: {
      LIST: '/travelers',
      DETAIL: '/travelers',
      UPDATE: '/travelers',
      CREATE: '/travelers'
    },
    ADMIN: {
      USERS: '/admin/users',
      BOOKINGS: '/admin/bookings',
      DASHBOARD: '/admin/dashboard/stats',
      ASSIGN_ROLE: '/admin/assign-role'
    },
    UPLOAD: {
      PROFILE_IMAGE: '/upload/profile',
      DESTINATION_IMAGE: '/upload/destination'
    }
  }
};

export default API_CONFIG;