import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import { callFetchProductFilterApi,callDetailProductAPI, callDescriptionFetchProductAPI  } from '../../apis/product';


export const fetchFilterProduct = createAsyncThunk(
  'product/fetchFilterProduct',
  async (params?: Record<string, any>) => {
    try {
      const response = await callFetchProductFilterApi(params);
      if(response.status === 500){
        return {
          pagination: {
            total: 0,
          },
          data: [],
          total_stock_by_product: 0,
        };
      }
      return response;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized error:", error);
      } else {
        console.error(error?.response?.data?.message);
      }
    }
  }
);
export const fetchDetailProduct = createAsyncThunk(
  'product/fetchDetailProduct',
   async ( query: any) => {
     try {
       const response = await callDetailProductAPI(query);
       return response.data;
     } catch (error: any) {
       console.error(error?.response?.data?.message || 'Something went wrong!');
     }
   }
);
export const fetchDescriptionProduct = createAsyncThunk(
  'product/fetchDescriptionProduct',
  async (query: any) => {
    try {
      const response = await callDescriptionFetchProductAPI(query);
      return response.data.data;
    } catch (error: any) {
      console.error(error?.response?.data?.message || 'Something went wrong!');
    }
  }
);
const initialState: any = {
  isFetching: true,
  pagination: {
    total: 0,
    per_page: 10,
    current_page: 1,
    last_page: 1,
  },
  result: [],
  total_stock_by_product: {},
};
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetDescription: (state) => {
      state.description = null;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchFilterProduct.pending, (state) => {
      state.isFetching = true;
    });

    builder.addCase(fetchFilterProduct.rejected, (state) => {
      state.isFetching = false;
    });

    builder.addCase(fetchFilterProduct.fulfilled, (state, action) => {
      state.isFetching = false;
      state.pagination = action.payload?.pagination;
      state.result = action.payload?.data;
      state.total_stock_by_product = action.payload?.total_stock_by_product;
    });
    builder.addCase(fetchDescriptionProduct.fulfilled, (state, action) => {
      state.isFetching = false;
      state.description = action.payload;
    });
    builder.addCase(fetchDescriptionProduct.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchDescriptionProduct.rejected, (state) => {
      state.isFetching = false;
    });
  }
});
export const { resetDescription } = productSlice.actions;
export const productReducer = productSlice.reducer;