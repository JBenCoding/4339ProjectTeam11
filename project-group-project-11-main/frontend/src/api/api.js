// This file contains all API calls to the API endpoints
// import axios to make API calls
import axios from "axios";

// Create HTTP client with the base URL, and specify that the data sent in the request body is JSON
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ROOT_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login related API calls
// If user logs in successfully, this login sets a header to "apiClient" called "Authorization" with the value of "Bearer <token>" This security token is used to validate API calls
function setAuthHeader(token) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// When user logs out, this function removes the Authorization header from apiClient
function removeAuthHeader() {
  delete apiClient.defaults.headers.common["Authorization"];
}

// parsing out error messages from API calls see https://stackoverflow.com/questions/67089014/how-to-read-error-messages-from-javascript-error-object
function getErrorMessageFromResponseBody(string) {
  let errorString = string;

  try {
    let json = JSON.parse(string);
    if (json.errors) {
      errorString = json.errors[0].msg;
    }
  } catch (parseOrAccessError) {}

  return errorString;
}

// API call to log the user in
export async function loginUser(username, password) {
  try {
    const response = await apiClient.post("/users/login", {
      username,
      password,
    });
    const token = response.data.token;
    localStorage.setItem("authToken", token);
    setAuthHeader(token);
    return token;
  } catch (error) {
    if (error.response.status === 400) {
      let errorString = getErrorMessageFromResponseBody(
        error.response.data.message
      );
      throw new Error(errorString); // API errors get thrown here
    } else throw error;
  }
}

// API call to log the user out
export function logoutUser() {
  localStorage.removeItem("authToken");
  removeAuthHeader();
}

// Org related API calls
// API call to get org name
export async function getOrgName() {
  const response = await apiClient.get(`/org`);
  return response.data;
}

// Events related API calls
// API call to get all events for org
export const getEvents = async () => {
  try {
    const response = await apiClient.get("/events/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to consolidate API calls (getEventById, getEventAttendees, getServices)
export const getAllEventsServices = async function(id) {
  try {
    // assigns the responses of each request to a constant variable
    const retrieveEventsByID = await apiClient.get(`/events/id/${id}`)
    const retrieveAttendeesFromEvents = await apiClient.get(`/events/attendees/${id}`)
    const retrieveServices = await apiClient.get(`/services`)

    // assigns the responses of the requests to each variable
    // only when the promise has been resolved.
    const [firstResult, secondResult, thirdResult] = await Promise.all([
      retrieveEventsByID, retrieveAttendeesFromEvents, retrieveServices
    ])

    // returns all of the responses as an array
    return [firstResult.data, secondResult.data, thirdResult.data]

    // outputs any/all errors caught during the requests
  } catch (error) {
    throw error.response.data;
  }
};

// API call to GET single event by ID
export const getEventById = async (id) => {
  try {
    const response = await apiClient.get(`/events/id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to GET events based on search query
export const searchEvents = async (query) => {
  try {
    let params = {};
    if (query.searchBy === "name") {
      params.searchBy = query.searchBy;
      params.name = query.name || "";
    } else if (query.searchBy === "date") {
      params.searchBy = "date";
      params.eventDate = query.eventDate || "";
    }
    const response = await apiClient.get(`/events/search`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to GET events for which a client is signed up
export const getClientEvents = async (id) => {
  try {
    const response = await apiClient.get(`/events/client/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to GET events for which a client is not signed up
export const getNonClientEvents = async (id) => {
  try {
    const response = await apiClient.get(`/events/client/${id}/not-registered`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to GET all attendees for an event
export const getEventAttendees = async (id) => {
  try {
    const response = await apiClient.get(`/events/attendees/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to GET all events for a given service
export const getEventsByServiceId = async (id) => {
  try {
    const response = await apiClient.get(`/events/service/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to POST new event
export const createEvent = async (eventData) => {
  try {
    const response = await apiClient.post("/events/", eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to PUT update event
export const updateEvent = async (id, eventData) => {
  try {
    const response = await apiClient.put(`/events/update/${id}`, eventData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to PUT add attendee to event
export const registerAttendee = async (eventId, clientId) => {
  try {
    const response = await apiClient.put(
      `/events/register`,
      {},
      {
        params: {
          event: eventId,
          client: clientId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to PUT remove attendee from event
export const deregisterAttendee = async (eventId, clientId) => {
  try {
    const response = await apiClient.put(
      `/events/deregister`,
      {},
      {
        params: {
          event: eventId,
          client: clientId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API call to DELETE event by ID
export const deleteEvent = async (id) => {
  try {
    const response = await apiClient.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to get events for last two month for dashboard
export const getAttendance = async () => {
  try {
    const response = await apiClient.get("/events/attendance");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Clients related API calls
// API call to GET all clients for org
export const getClients = async () => {
  try {
    const response = await apiClient.get("clients");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to GET single client by ID
export const getClientById = async (id) => {
  try {
    const response = await apiClient.get(`/clients/id/${id}`);
    const client = response.data;
    
    // Set up path module in backend app.js to serve static files
    const baseUrl = 'http://localhost:3000/'; // path to uploads
    if (client.profilePicture) {
      if (!client.profilePicture.startsWith(baseUrl)) {
        client.profilePicture = `${baseUrl}${client.profilePicture}`; //fix for base url duplication issue
      }
    }

    return client;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to GET entries based on search query
export const searchClients = async (query) => {
  try {
    let params = {};
    if (query.searchBy === "name") {
      params.searchBy = query.searchBy;
      params.firstName = query.firstName || "";
      params.lastName = query.lastName || "";
    } else if (query.searchBy === "number") {
      params.searchBy = query.searchBy;
      params.phoneNumber = query.phoneNumber || "";
    }
    const response = await apiClient.get("/clients/search", {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to GET client info and events that
// the client is and is not registered.
export const getAllClientInfo = async function(id) {
  try {
    // assigns the responses of each request to a constant variable
      const clientdetails = await apiClient.get(`/clients/id/${id}`)
      const eventsClientisRegistered = await apiClient.get(`/events/client/${id}`)
      const eventsClientisNotRegistered = await apiClient.get(`/events/client/${id}/not-registered`)

      // assigns the responses of the requests to each variable
      // only when the promise has been resolved.
      const [firstresult, secondresult, thirdresult] = await Promise.all([clientdetails, eventsClientisRegistered, eventsClientisNotRegistered])

      // returns all of the responses as an array
      return [firstresult.data, secondresult.data, thirdresult.data]

      // outputs any/all errors caught during the requests
  } catch (error) {
      throw error.firstresult.data, error.secondresult.data, error.thirdresult.data
  }
}

// API call to POST new client with ***FormData***
export const createClient = async (formData) => {
  try {
    const response = await apiClient.post("/clients", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to PUT update client with FormData
export const updateClient = async (id, formData) => {
  try {
    const response = await apiClient.put(`/clients/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to DELETE client's profile picture by client ID
export const deleteProfilePicture = async (clientId) => {
  try {
    const response = await apiClient.delete(`/clients/${clientId}/profilePicture`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to delete client
export const deleteClientbyId = async (id) => {
  try {
    const response = await apiClient.delete(`/clients/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to get events for dashboard
export const getClientsByZipCode = async () => {
  try {
    const response = await apiClient.get("/clients/byzip");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API calls related to services
// API call to get all services for org
export const getServices = async () => {
  try {
    const response = await apiClient.get("/services/");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to GET single service by ID
export const getServiceById = async (id) => {
  try {
    const response = await apiClient.get(`/services/id/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to GET services based on search query
export const searchServices = async (query) => {
  try {
    let params = {};
    params.searchBy = query.searchBy;
    if (query.searchBy === "name") {
      params.name = query.name || "";
    } else if (query.searchBy === "description") {
      params.description = query.description;
    }
    const response = await apiClient.get("/services/search", {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to POST new service
export const createService = async (newService) => {
  try {
    const response = await apiClient.post("/services", newService);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to PUT update service
export const updateService = async (id, updatedService) => {
  try {
    const response = await apiClient.put(
      `/services/update/${id}`,
      updatedService
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// API call to DELETE service by ID
export const deleteService = async (id) => {
  try {
    const response = await apiClient.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
