export const login = (user) => {
    const response = {
      token: '1a2b3c4dff',
      data: {
        userId: user.userId,
        firstName: 'test',
        lastName: 'test'
      }
    };
    return new Promise(resolve => setTimeout(resolve(response), 1000));
  };
  
  export const logout = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
  };