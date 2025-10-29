import api from '../api/api';

const uploadService = {
  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.UPLOAD.PROFILE_IMAGE, formData, {
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
      const response = await api.post(API_CONFIG.ENDPOINTS.UPLOAD.DESTINATION_IMAGE, formData, {
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