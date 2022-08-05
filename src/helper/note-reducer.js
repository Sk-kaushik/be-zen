export const noteReducer = (state, action) => {
  switch (action.type) {
    case 'title':
      return { ...state, title: action.payload };

    case 'tagline':
      return { ...state, tagline: action.payload };

    case 'body':
      return { ...state, body: action.payload };

    case 'pin':
      return { ...state, pinned: !state.pinned };

    case 'reset':
      return { title: '', tagline: '', body: '', pinned: false };

    case 'update':
      return action.payload;

    default:
      return state;
  }
};
