import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CollaboratorState} from '../interface';
import {CollaboratorParams} from '../../interfaces/collaborator';
import {PAGINATION_DEFAULT} from '../../common/constants';

const initialState = {
  listCollaborator: [],
  pagination: PAGINATION_DEFAULT,
} as CollaboratorState;

const collaboratorSlice = createSlice({
  name: 'collaborator',
  initialState,
  reducers: {
    setListCollaborator(state, action: PayloadAction<CollaboratorParams[]>) {
      state.listCollaborator = action.payload;
    },
    setPaginationCollaborator(state, action) {
      state.pagination = action.payload;
    },
    resetCollaboratorState() {
      return initialState;
    },
  },
});

export const {
  setListCollaborator,
  resetCollaboratorState,
  setPaginationCollaborator,
} = collaboratorSlice.actions;

export default collaboratorSlice.reducer;
