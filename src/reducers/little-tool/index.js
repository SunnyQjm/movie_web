const initState = {
    data: [],
};
const LittleToolReducer = (state = initState, action) => {
    let newState = {};
    Object.assign(newState, state);
    switch (action.type){

    }
    return newState;
};

export default LittleToolReducer;