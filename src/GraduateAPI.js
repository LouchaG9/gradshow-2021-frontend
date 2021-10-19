import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class GraduateAPI {

  // GET ALL GRADUATES ------------------------------
  async getGraduates(){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/graduate`)
    // convert response payload into json - store as data
    const data = await response.json()
    // return data
    return data
  }

  // GET SINGLE GRADUATE ------------------------------
  async getGraduate(id){
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/graduate/${id}`)
    // convert response payload into json - store as data
    const data = await response.json()
    // return data
    return data
  }
}

export default new GraduateAPI()

