const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("td_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? "Request failed");
  }
  return data as T;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (name: string, email: string, password: string) =>
    request<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),

  me: () => request<{ user: User }>("/auth/me"),
};

// ─── Webinars ─────────────────────────────────────────────────────────────────
export const webinarApi = {
  list: (params?: { type?: string; category?: string; page?: number }) => {
    const q = new URLSearchParams();
    if (params?.type) q.set("type", params.type);
    if (params?.category) q.set("category", params.category);
    if (params?.page) q.set("page", String(params.page));
    return request<{ webinars: Webinar[]; pagination: Pagination }>(
      `/webinars?${q.toString()}`
    );
  },
  get: (id: string) => request<{ webinar: Webinar }>(`/webinars/${id}`),
  register: (id: string) =>
    request<{ message: string }>(`/webinars/${id}/register`, { method: "POST" }),
  myRegistrations: () =>
    request<{ registrations: Registration[] }>("/webinars/my-registrations"),
};

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminApi = {
  dashboardStats: () =>
    request<{ stats: DashboardStats; recentUsers: User[]; upcomingWebinars: Webinar[] }>(
      "/admin/dashboard"
    ),
  listWebinars: () => request<{ webinars: Webinar[] }>("/admin/webinars"),
  getWebinar: (id: string) => request<{ webinar: Webinar }>(`/admin/webinars/${id}`),
  createWebinar: (data: Partial<Webinar>) =>
    request<{ webinar: Webinar }>("/admin/webinars", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateWebinar: (id: string, data: Partial<Webinar>) =>
    request<{ webinar: Webinar }>(`/admin/webinars/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteWebinar: (id: string) =>
    request<{ message: string }>(`/admin/webinars/${id}`, { method: "DELETE" }),
  listUsers: () => request<{ users: User[] }>("/admin/users"),
  deleteUser: (id: string) =>
    request<{ message: string }>(`/admin/users/${id}`, { method: "DELETE" }),
  listRegistrations: () =>
    request<{ registrations: AdminRegistration[] }>("/admin/registrations"),
  listContacts: () => request<{ contacts: Contact[] }>("/admin/contacts"),
};

// ─── Payments ─────────────────────────────────────────────────────────────────
export const paymentApi = {
  checkout: (webinarId: string) =>
    request<{ url?: string; free?: boolean; message?: string }>("/payments/checkout", {
      method: "POST",
      body: JSON.stringify({ webinarId }),
    }),
  verifySession: (sessionId: string) =>
    request<{ registration: Registration & { webinar: Webinar } }>(`/payments/session/${sessionId}`),
};

// ─── Contact ─────────────────────────────────────────────────────────────────
export const contactApi = {
  submit: (data: { name: string; email: string; company?: string; message: string }) =>
    request<{ message: string }>("/contact", { method: "POST", body: JSON.stringify(data) }),
  subscribe: (email: string) =>
    request<{ message: string }>("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

// ─── Shared Types ─────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  _count?: { registrations: number };
}

export interface Webinar {
  id: string;
  title: string;
  description?: string;
  speaker: string;
  speakerBio?: string;
  imageUrl?: string;
  date: string;
  durationMin?: number;
  category: string;
  type: "LIVE" | "RECORDED";
  price: number | string;
  seats: number;
  isPublished?: boolean;
  zoomJoinUrl?: string;
  zoomPassword?: string;
  createdAt?: string;
  _count?: { registrations: number };
}

export interface Registration {
  id: string;
  registeredAt: string;
  paymentStatus?: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  amountPaid?: number;
  paidAt?: string;
  webinar: Pick<Webinar, "id" | "title" | "speaker" | "date" | "category" | "type" | "zoomJoinUrl">;
}

export interface AdminRegistration extends Registration {
  user: Pick<User, "id" | "name" | "email">;
  webinar: Pick<Webinar, "id" | "title" | "date">;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalWebinars: number;
  totalRegistrations: number;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
}
