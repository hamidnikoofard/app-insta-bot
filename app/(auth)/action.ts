import { API_BASE_URL } from '@/lib/fetch';

type LoginFormData = {
  phone_number: string;
  password: string;
};

type SignupFormData = {
  phone_number: string;
  password: string;
  first_name: string;
  last_name: string;
};

export const loginAction = async (data: LoginFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to login', { cause: response.statusText });
    }
    const result = await response.json();
    return {
      success: true,
      message: 'ورود با موفقیت انجام شد',
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: 'شماره تلفن یا پسورد اشتباه است',
    };
  }
};

export const signupAction = async (data: SignupFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signup/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to signup', { cause: response.statusText });
    }
    const result = await response.json();
    return {
      success: true,
      message: 'ثبت نام با موفقیت انجام شد',
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: 'ثبت نام با موفقیت انجام شد' + error,
    };
  }
};
