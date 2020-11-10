import axios from 'axios'

var api_url = ''
if(process.env.NODE_ENV === 'production'){
  api_url = 'https://guarded-fjord-13035.herokuapp.com/';
}else{
  api_url = 'http://localhost:3000/';
}

const url = api_url+'api/todos/' 

class PostService {

  static get(){
    return new Promise(async (resolve, reject)=>{
      try{
        const res = await axios.get(url)
        const data = res.data
        resolve(
          data.map(row=>({
            ...row,
            //createdAt: new Date(row.createdAt)
          }))
        )
      }catch(err){
        reject(err)
      }
    })
  }

  static insert(data){
    return axios.post(url, data)
  }

  static delete(id){
    return axios.delete(`${url}${id}`)
  }

  static update(data){
    return axios.put(url, data)
  }

}


export default PostService