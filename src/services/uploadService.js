import api from '../api/api';

const uploadService = {
  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/api/upload/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Profile image upload failed';
    }
  },

  uploadDestinationImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/api/upload/destination', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Destination image upload failed';
    }
  }
};

export default uploadService;