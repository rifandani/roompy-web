import { createContext } from 'react';
// files
import { UserContextState } from '../utils/interfaces';

const UserContext = createContext<UserContextState>(null);

export default UserContext;
