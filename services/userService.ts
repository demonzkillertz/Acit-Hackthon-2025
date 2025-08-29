import api from './api';

export interface Location {
  id: number;
  bus_id: number;
  lat: number;
  lng: number;
  timestamp: string;
}

export interface Review {
  id: number;
  user_id: number;
  bus_id: number;
  rating: number;
  comment: string;
  timestamp: string;
}

export interface Favorite {
  id: number;
  user_id: number;
  bus_id: number;
}

export interface Alert {
  id: number;
  user_id: number;
  bus_id: number;
  type: string;
  message: string;
  timestamp: string;
}

export interface Route {
  id: number;
  name: string;
  polyline: string;
  stops: any[];
}

export const userService = {
  // Location services
  addLocation: async (busId: number, lat: number, lng: number): Promise<Location> => {
    const response = await api.post('/api/locations', { busId, lat, lng });
    return response.data;
  },

  getLatestLocation: async (busId: number): Promise<Location> => {
    const response = await api.get(`/api/locations/${busId}/latest`);
    return response.data;
  },

  getBusLocations: async (busId: number, limit = 50): Promise<Location[]> => {
    const response = await api.get(`/api/locations/${busId}?limit=${limit}`);
    return response.data;
  },

  // Review services
  addReview: async (userId: number, busId: number, rating: number, comment: string): Promise<Review> => {
    const response = await api.post('/api/reviews', { userId, busId, rating, comment });
    return response.data;
  },

  getBusReviews: async (busId: number): Promise<Review[]> => {
    const response = await api.get(`/api/reviews/bus/${busId}`);
    return response.data;
  },

  getUserReviews: async (userId: number): Promise<Review[]> => {
    const response = await api.get(`/api/reviews/user/${userId}`);
    return response.data;
  },

  // Favorite services
  addFavorite: async (userId: number, busId: number): Promise<Favorite> => {
    const response = await api.post('/api/favorites', { userId, busId });
    return response.data;
  },

  removeFavorite: async (userId: number, busId: number): Promise<void> => {
    await api.delete('/api/favorites', { data: { userId, busId } });
  },

  getUserFavorites: async (userId: number): Promise<Favorite[]> => {
    const response = await api.get(`/api/favorites/user/${userId}`);
    return response.data;
  },

  // Alert services
  addAlert: async (userId: number, busId: number, type: string, message: string): Promise<Alert> => {
    const response = await api.post('/api/alerts', { userId, busId, type, message });
    return response.data;
  },

  getBusAlerts: async (busId: number): Promise<Alert[]> => {
    const response = await api.get(`/api/alerts/bus/${busId}`);
    return response.data;
  },

  getUserAlerts: async (userId: number): Promise<Alert[]> => {
    const response = await api.get(`/api/alerts/user/${userId}`);
    return response.data;
  },

  // Route services
  getAllRoutes: async (): Promise<Route[]> => {
    const response = await api.get('/api/routes');
    return response.data;
  },

  getRouteById: async (routeId: number): Promise<Route> => {
    const response = await api.get(`/api/routes/${routeId}`);
    return response.data;
  },
};
