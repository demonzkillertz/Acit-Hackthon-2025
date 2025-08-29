import api from './api';

export interface Bus {
  id: number;
  plate_number: string;
  company_id: number;
  driver_id?: number;
  model: string;
  capacity: number;
  amenities?: string[];
  status: string;
  driver_name?: string;
  route_name?: string;
  start_location?: string;
  end_location?: string;
  latitude?: number;
  longitude?: number;
  speed?: number;
  heading?: number;
}

export interface Company {
  id: number;
  name: string;
  description?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  logo_url?: string;
  website?: string;
  established_year?: number;
  fleet_size?: number;
  rating?: number;
  total_reviews?: number;
}

export interface Route {
  id: number;
  company_id: number;
  bus_id?: number;
  route_name: string;
  start_location: string;
  end_location: string;
  distance_km?: number;
  estimated_duration?: number;
  base_fare?: number;
  is_active: boolean;
}

export const companyService = {
  // Company CRUD
  createCompany: async (data: { name: string; description?: string }): Promise<Company> => {
    const response = await api.post('/api/company/company', data);
    return response.data;
  },

  getCompany: async (companyId: number): Promise<Company> => {
    const response = await api.get(`/api/company/company/${companyId}`);
    return response.data;
  },

  updateCompany: async (companyId: number, data: { name?: string; description?: string }): Promise<Company> => {
    const response = await api.put(`/api/company/company/${companyId}`, data);
    return response.data;
  },

  deleteCompany: async (companyId: number): Promise<void> => {
    await api.delete(`/api/company/company/${companyId}`);
  },

  // Bus CRUD
  createBus: async (busData: { 
    plate_number: string; 
    company_id: number; 
    model: string; 
    capacity: number; 
    driver_id?: number 
  }): Promise<Bus> => {
    const response = await api.post('/api/company/bus', busData);
    return response.data;
  },

  updateBus: async (busId: number, busData: { 
    plate_number?: string; 
    model?: string; 
    capacity?: number; 
    driver_id?: number 
  }): Promise<Bus> => {
    const response = await api.put(`/api/company/bus/${busId}`, busData);
    return response.data;
  },

  deleteBus: async (busId: number): Promise<void> => {
    await api.delete(`/api/company/bus/${busId}`);
  },

  // Get company buses
  getCompanyBuses: async (companyId: number): Promise<Bus[]> => {
    const response = await api.get(`/api/company/buses?companyId=${companyId}`);
    return response.data;
  },

  // Get bus info
  getBusInfo: async (busId: number): Promise<Bus> => {
    const response = await api.get(`/api/company/bus/${busId}`);
    return response.data;
  },

  // Get time gaps
  getTimeGaps: async (companyId: number, routeId: number): Promise<any> => {
    const response = await api.get(`/api/company/routes/gaps?companyId=${companyId}&routeId=${routeId}`);
    return response.data;
  },

  // Get all companies (for public view)
  getAllCompanies: async (): Promise<Company[]> => {
    const response = await api.get('/api/company/companies');
    return response.data;
  },

  // Get company routes
  getCompanyRoutes: async (companyId: number): Promise<Route[]> => {
    const response = await api.get(`/api/company/${companyId}/routes`);
    return response.data;
  },

  // Get company stats
  getCompanyStats: async (companyId: number): Promise<{
    totalBuses: number;
    activeBuses: number;
    totalRoutes: number;
    totalReviews: number;
    averageRating: number;
  }> => {
    const response = await api.get(`/api/company/${companyId}/stats`);
    return response.data;
  },
};
