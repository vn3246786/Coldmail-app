


export function findError(response){

    return (
      response==="server error"||
      response==="accesstoken not found"||
      response==="invalid token"||
      response==="you are not authorized"||
      response==="username or password is incorrect"||
    response==='password is incorrect'||
    response==='username already exists'||
    response==='email already exists'
    )
  }

