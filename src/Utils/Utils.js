
const getError = (error) => {
  return error?.response?.data?.message || error?.message || 'Unknown error';
};


export default getError;
