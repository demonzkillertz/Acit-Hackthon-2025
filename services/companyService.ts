import api from './api';

export interface Bus {
  id: number;
  number: string;
  company_id: number;
  driver_id: number;
  route_id: number;
  driver_name?: string;
  route_name?: string;
}

export interface Company {
  id: number;
  name: string;
}

export const companyService = {
  // Company CRUD
  createCompany: async (name: string): Promise<Company> => {
    const response = await api.post('/api/company/company', { name });
    return response.data;
  },

  updateCompany: async (companyId: number, name: string): Promise<Company> => {
    const response = await api.put(`/api/company/company/${companyId}`, { name });
    return response.data;
  },

  deleteCompany: async (companyId: number): Promise<void> => {
    await api.delete(`/api/company/company/${companyId}`);
  },

  // Bus CRUD
  createBus: async (busData: { number: string; company_id: number; driver_id?: number; route_id?: number }): Promise<Bus> => {
    const response = await api.post('/api/company/bus', busData);
    return response.data;
  },

  updateBus: async (busId: number, busData: { number: string; company_id: number; driver_id?: number; route_id?: number }): Promise<Bus> => {
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
};
