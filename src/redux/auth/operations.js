import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://watertracker-back-i1qk.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

// _________________________________________________________________
// credentials - данные с формы регистрации

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/register", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (e) {
      if (e.response && e.response.data) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/login", credentials);
      console.log(data); 
      setAuthHeader(data.token);
      return data;
    } catch (e) {
      if (e.response && e.response.data) {
        return thunkAPI.rejectWithValue(e.response.data);
      }
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    clearAuthHeader();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      setAuthHeader(state.auth.token);
      const { data } = await axios.get("/users/current");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      return state.auth.token !== null;
    },
  }
);
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/confirm-oauth", { code });

      if (!response.data || !response.data.data) {
        throw new Error("Invalid response format from server");
      }

      const { accessToken } = response.data.data;

      setAuthHeader(accessToken);

      const { data: userResponse } = await axios.get("/users/current");
      const userData = userResponse.data || userResponse;

      return {
        token: accessToken,
        user: {
          name: userData.name || "",
          email: userData.email || "",
          gender: userData.gender || "woman",
          avatarUrl: "",
          daylyNorm: userData.daily_norma || 2000,
        },
      };
    } catch (error) {
      console.error("Error in Google login:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to get user data"
      );
    }
  }
);

// _________________________________________________________________
// export const fetchUserInfo = createAsyncThunk(
//   "settingModal/fetchUserInfo",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const token = state.auth.token;
//     setAuthHeader(token);

//     try {
//       const { data } = await axios.get("/users/current");

//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const updateUserInfo = createAsyncThunk(
//   "settingModal/updateUserInfo",
//   async (userInfo, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const token = state.auth.token;
//     setAuthHeader(token);

//     try {
//       const { data } = await axios.patch("/users/current", userInfo);
//       return data;
//     } catch (error) {
//       console.error("Error from API:", error.response?.data || error.message);
//       console.error("Full Error Object:", error);
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updateUserAvatar = createAsyncThunk(
//   "settingModal/updateUserAvatar",
//   async (formData, thunkAPI) => {
//     const state = thunkAPI.getState();
//     const token = state.auth.token;
//     setAuthHeader(token);

//     console.log("Sending avatar to API...");
//     try {
//       const { data } = await axios.patch("/users/avatar", formData);
//       return data;
//     } catch (error) {
//       console.error("Error from API:", error.response?.data || error.message); // Лог помилки
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const updateUserEmail = createAsyncThunk(
//   "user/updateUserEmail",
//   async (newEmail, thunkAPI) => {
//     try {
//       const response = await axios.patch("/users/current", { email: newEmail });
//       return { email: response.data.email };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Error updating email"
//       );
//     }
//   }
// );

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async ({old_password, new_password}, thunkAPI) => {
    try {
      const response = await axios.patch("/users/current", {
        old_password,
        new_password
      });
      return response.data.message;
    } catch (error) {
      console.log(error.response?.data?.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error updating password"
      );
    }
  }
);

// _________________________________________________________________

export const getUser = createAsyncThunk("users/get", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  try {
    setAuthHeader(state.auth.token);
  const { data } = await axios.get("users/current");
  return data;
} catch (error) {
  thunkAPI.rejectWithValue(error.message);
}
});

export const updateUserData = createAsyncThunk(
"users/patch",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
      try {
      setAuthHeader(state.auth.token);
    const { data } = await axios.patch("users/current", credentials);
    return { data };
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
}
);

export const updateUserDailyNorm = createAsyncThunk(
"users/dailyNorm",
async (credentials, thunkAPI) => {
  const state = thunkAPI.getState();
  try {
    setAuthHeader(state.auth.token);
    const { data } = await axios.patch("users/water-rate", credentials);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
}
);

export const updateUserPhoto = createAsyncThunk(
"users/avatar",
  async (credentials, thunkAPI) => {
    const state = thunkAPI.getState();
      try {
      setAuthHeader(state.auth.token);
    const { data } = await axios.patch("users/avatar", credentials);
    return data;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
}
);