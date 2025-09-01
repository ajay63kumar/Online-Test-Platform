import axios from "axios";
import CryptoJS from "crypto-js";

export default class ApiService {
  static BASE_URL = "http://localhost:8052/api";
  static ENCRYPTION_KEY = "ajay-kumar-testSkill";

  // ---------- Encryption ----------
  static encrypt(data) {
    return CryptoJS.AES.encrypt(data, this.ENCRYPTION_KEY).toString();
  }

  static decrypt(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.ENCRYPTION_KEY);
      return bytes.toString(CryptoJS.enc.Utf8) || null;
    } catch {
      return null;
    }
  }
   // ---------- Token ----------
  static saveToken(token) {
    const encrypted = this.encrypt(token);
    localStorage.setItem("token", encrypted);
  }

  static getToken() {
    const encrypted = localStorage.getItem("token");
    if (!encrypted) return null;
    return this.decrypt(encrypted);
  }

  // ---------- Role ----------
  static saveRole(role) {
    const encrypted = this.encrypt(role);
    localStorage.setItem("role", encrypted);
  }

  static getRole() {
    const encrypted = localStorage.getItem("role");
    if (!encrypted) return null;
    return this.decrypt(encrypted);
  }

  // ---------- Clear Auth ----------
  static clearAuth() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static getHeader() {
    const token = this.getToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
    // ---------- Auth ----------
  static async loginUser(loginData) {
    const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData);
    return response.data; // {status, message, role, token}
  }

  static async registerUser(registerData) {
    const response = await axios.post(`${this.BASE_URL}/auth/register`, registerData);
    return response.data;
  }

  
    static async getLoggedInUserInfo() {
        const response = await axios.get(`${this.BASE_URL}/users/current`,
            { headers: this.getHeader() });
        return response.data;

    }
    // ---------- Auth Helpers ----------
  static logout() {
    this.clearAuth();
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static isAdmin() {
    return this.getRole() === "ADMIN";
  }
    static isTeacher() {
    return this.getRole() === "TEACHER";
  }
  //-------------TestAttempt----------------
static async submitTest(testId, score) {
  const response = await axios.post(
    `${this.BASE_URL}/testAttempt/submit/${testId}`, // no query param
    { score }, // send in body
    {
      headers: this.getHeader(),
    }
  );
  return response.data;
}
// -----------------------  User Performace tracking------------------->
static async submitUserWhichPerformance(username) {
  try {
    const response = await axios.get(`${this.BASE_URL}/testAttempt/performance`, {
      params: { username }, // send username as query param
      headers: this.getHeader() // include auth token if needed
    });
    return response.data; // your Response DTO
  } catch (error) {
    console.error("Error fetching user performance:", error);
    throw error;
  }
}



  // Search leaderboard by test name
static async searchLeaderBoard(testName) {
  try {
    const response = await axios.get(
      `${this.BASE_URL}/testAttempt/leaderboard/search`,
      {
        headers: this.getHeader(),
        params: { testName }, // query param sent as ?testName=...
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard by test name:", error);
    throw error; // rethrow so UI can handle (toast, alert, etc.)
  }
}


  static async  userAttemptedTests(){
    const response = await axios.get(`${this.BASE_URL}/testAttempt/attempt`,{
      headers: this.getHeader(),
    });
     return response.data;
  }

  // ---------- Users ----------
  static async getAllUsers() {
    const response = await axios.get(`${this.BASE_URL}/users/all`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getUserById(userId) {
    const response = await axios.get(`${this.BASE_URL}/users/${userId}`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async updateUser(userId, userData) {
    const response = await axios.put(
      `${this.BASE_URL}/users/update/${userId}`,
      userData,
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async deleteUser(userId) {
    const response = await axios.delete(
      `${this.BASE_URL}/users/delete/${userId}`,
      { headers: this.getHeader() }
    );
    return response.data;
  }
    

    // ---------- Question ----------
    static async addQuestion(formData) {
        const response = await axios.post(`${this.BASE_URL}/questions/add`, formData
             ,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    static async updateQuestion(formData) {
        const response = await axios.put(`${this.BASE_URL}/questions/update`, formData ,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    static async getAllQuestions() {
        const response = await axios.get(`${this.BASE_URL}/questions/all`,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    static async getQuestionById(questionId) {
        const response = await axios.get(`${this.BASE_URL}/questions/${questionId}`,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    // ---------- Test ----------

//    static async uploadPdf(testId, file) {
//     const formData = new FormData();
//     formData.append("file", file);

//     const response = await axios.post(
//         `${this.BASE_URL}/tests/${testId}/upload-pdf`,
//         formData,
//         {
//             headers: {
//                 ...this.getHeader(), // keep your token or auth headers
//                 // ❌ Do NOT hardcode Content-Type here, axios will set it with boundary
//             },
//         }
//     );
//     return response.data;
// }
 static createTestFromPdf(formData) {
    return axios.post(`${this.BASE_URL}/tests/upload-pdf`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

 static saveTest(testDTO) {
    return axios.post(`${this.BASE_URL}/tests/add`, testDTO);
  }


    static async addTest(formData) {
        const response = await axios.post(`${this.BASE_URL}/tests/add`, formData ,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }
    static async updateTest(testId, formData) {
    const response = await axios.put(`${this.BASE_URL}/tests/${testId}`, formData, {
        headers: this.getHeader()
    });
    return response.data;
}


    // static async updateTest(formData) {
    //     const response = await axios.put(`${this.BASE_URL}/tests`, formData ,
    //             {
    //                 headers: this.getHeader()
    //             });
    //     return response.data;
    // }

    static async getAllTests() {
        const response = await axios.get(`${this.BASE_URL}/tests/all`,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    static async getTestById(testId) {
        const response = await axios.get(`${this.BASE_URL}/tests/${testId}`,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    static async deleteTest(testId){
      const response = await axios.delete(`${this.BASE_URL}/tests/${testId}`)
    }

    // ---------- Subject ----------
    static async addSubject(formData) {
        const response = await axios.post(`${this.BASE_URL}/subjects/add`, formData ,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    static async updateSubject(formData) {
        const response = await axios.put(`${this.BASE_URL}/subjects/update`, formData ,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    static async getAllSubjects() {
        const response = await axios.get(`${this.BASE_URL}/subjects/all` ,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    static async getSubjectById(subjectId) {
        const response = await axios.get(`${this.BASE_URL}/subjects/${subjectId}` ,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

    static async deleteSubject(subjectId) {
        const response = await axios.delete(`${this.BASE_URL}/subjects/${subjectId}`,
                {
                    headers: this.getHeader()
                });
        return response.data;
    }

  
}

