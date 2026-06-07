const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:10000/api';

export const adminApi = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    return response.json();
  },

  verify: async (token: string) => {
    const response = await fetch(`${API_BASE}/admin/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};

export const ordersApi = {
  getAll: async (token: string) => {
    const response = await fetch(`${API_BASE}/orders`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
};

export const requestsApi = {
  getAll: async (token: string) => {
    const response = await fetch(`${API_BASE}/custom-requests`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  updateStatus: async (requestId: string, status: string, token: string) => {
    const response = await fetch(`${API_BASE}/custom-requests/${requestId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    return response.json();
  }
};

export const subscriptionsApi = {
  getAll: async (token: string) => {
    const response = await fetch(`${API_BASE}/subscriptions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  },

  update: async (id: string, status: string, token: string) => {
    const response = await fetch(`${API_BASE}/subscriptions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    return response.json();
  }
};
