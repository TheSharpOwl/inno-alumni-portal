import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser, loginRegularUser, registerRegularUser } from 'src/api';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    let accessToken;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
      accessToken = window.sessionStorage.getItem('alumniToken') || ''
    } catch (err) {
      console.error(err);
    }

    try {
      if (isAuthenticated && accessToken) {
        const userInfo = await getCurrentUser({ accessToken });
        const user = {
          ...userInfo,
          id: '5e86809283e28b96d2d38537',
          avatar: '/assets/avatars/avatar-miron-vitold.png',
          name: 'Daniel Atonge',
          email: 'd.atonge@innopolis.university'
        };

        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user
        });
      } else {
        dispatch({
          type: HANDLERS.INITIALIZE
        });
      }
    } catch (err) {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }

  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-miron-vitold.png',
      name: 'Daniel Atonge',
      email: 'd.atonge@innopolis.university'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password) => {

    const { access_token: accessToken } = await loginRegularUser({ email, password });
    const userInfo = await getCurrentUser({ accessToken });

    console.log(userInfo);
    try {
      window.sessionStorage.setItem('authenticated', 'true');
      window.sessionStorage.setItem('alumniToken', accessToken);
    } catch (err) {
      console.error(err);
    }

    const user = {
      ...userInfo,
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-miron-vitold.png',
      name: 'Daniel Atonge',
      email: 'd.atonge@innopolis.university'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signUp = async (email, name, password, confirmPassword) => {
    const registeredUser = await registerRegularUser({ name, email, password, confirmPassword });

    console.log(registeredUser);

  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
