const initState = {
    data: [],
};
const ShareWebsiteReducer = (state = initState, action) => {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type){

    }
    return newState;
};

export default ShareWebsiteReducer