/**
* Function to set the Auth token in API calls
*/
export const prepareHeaders = (headers, { getState }) => {
    const token = getState().auth?.token;
    
    // If we have a token set in state we should pass in Auth headers.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
}