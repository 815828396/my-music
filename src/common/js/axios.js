import axios from 'axios'

export function getAxios (url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
    .then(response => {
      resolve(response)
    })
  })
}
