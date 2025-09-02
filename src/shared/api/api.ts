import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "../const/localstorage";



export const $api = axios.create({
  baseURL: __API__,
  withCredentials: true, // ВАЖНО! Нужно для отправки cookie (refreshToken)
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👉 Добавим перехватчик ошибок
$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('⚡️ Interceptor triggered', error.response?.status, error.config.url);
    const originalRequest = error.config;

    // Если ошибка 401
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('token') && // токен есть
      !originalRequest.url.includes('/user/login') // и это не запрос логина
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.get(`${__API__}/user/refresh`, {
          withCredentials: true,
        });

        const newAccessToken = res.data.accessToken;
        const newUser = res.data.user;

        localStorage.setItem('token', newAccessToken);
        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(newUser));

        // Обновим заголовок
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return $api(originalRequest); // повторяем оригинальный запрос
      } catch (e) {
        console.log('Refresh failed — logging out');

        localStorage.removeItem('token');
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        // window.location.href = '/login';
      }
  }

    return Promise.reject(error);
  }
);