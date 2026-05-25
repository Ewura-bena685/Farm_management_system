import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

const handleError = error => {
  const isNetworkError = !error.response
  const message = isNetworkError
    ? 'Unable to reach backend. Please check your connection or start the server.'
    : error.response.data?.detail || error.message || 'Unexpected server error.'

  return {
    success: false,
    status: error.response?.status || 503,
    message,
    data: null
  }
}

export const fetchDashboard = async () => {
  try {
    const response = await api.get('/dashboard')
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const fetchLivestock = async () => {
  try {
    const response = await api.get('/livestock')
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const addLivestock = async payload => {
  try {
    const response = await api.post('/livestock', payload)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const fetchVaccinationSchedule = async () => {
  try {
    const response = await api.get('/vaccination-schedule')
    return { success: true, data: response.data.schedule }
  } catch (error) {
    return handleError(error)
  }
}

export const fetchFeedSchedule = async () => {
  try {
    const response = await api.get('/feed-schedule')
    return { success: true, data: response.data.schedule }
  } catch (error) {
    return handleError(error)
  }
}

export const fetchEggForecast = async () => {
  try {
    const response = await api.get('/egg-forecast')
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const requestVetAdvice = async payload => {
  try {
    const response = await api.post('/vet-advice', payload)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const createPen = async payload => {
  try {
    const response = await api.post('/pens', payload)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const getPensByFarmer = async farmer_id => {
  try {
    const response = await api.get(`/pens/farmer/${farmer_id}`)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const fetchMoMoBalance = async () => {
  try {
    const response = await api.get('/momo/balance')
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export const payForFeed = async payload => {
  try {
    const response = await api.post('/momo/pay', payload)
    return { success: true, data: response.data }
  } catch (error) {
    return handleError(error)
  }
}

export default api
