import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import localStorage from "redux-persist/lib/storage";

interface FilterState {
  [key: string]: any;
}

const initialState: FilterState = { 

  //h
  timeReportPurschase: [dayjs().startOf('year').format('YYYY-MM-DD'),dayjs().endOf('year').format('YYYY-MM-DD')],
  brand_name: '',
  category_id: [],
  commission_id: [],
  inventory_id: [],
  inventory_id_radio: "all",
  inventory_target_id: "all",
  inventory_transfer_id: "all",
  product_name: "",
  status: "all",
  sidebarCollapsed: "true",
  mainSearch: "",
  unit_name: "",
  limitProduct: 10,
  price: 0,
  payment_method: ["all", "1", "2", "3", "4"],
  time_change: [],
  row_selected: [],
  general_price_book_id: [],
  collapse: false,
  sold_price_before_tax: 0,
  sold_price_after_tax: 0,
  isCheckAllCategories: false,
  isCheckAllInventory: false,
  brand_id: [],
  position_id: [],
  stock: "all",
  timeSelect: "thisMonth",
  timeSelectReport: [dayjs().startOf('year').format('YYYY-MM-DD'),dayjs().endOf('year').format('YYYY-MM-DD')],
  timeSelectCustom:[dayjs().startOf('month').format('YYYY-MM-DD'),dayjs().endOf('month').format('YYYY-MM-DD')],
  timeSelectHour: null,
  timeSelectReportSell: [dayjs().startOf('month').format('YYYY-MM-DD'),dayjs().endOf('month').format('YYYY-MM-DD')],
  timeSelectHourFrom: null,
  timeSelectHourTo: null,
  user_input: [],
  supplier: [],
  timeChangeSell: [],
  timeChangeDebt: [],
  totalDebtFrom: null,
  totalDebtTo: null,
  totalRevenueFrom: null,
  totalRevenueTo: null,
  is_cod: "all",
  statusCheckGroup: [],
  type_report: "import",
  type_report_preOrder: 'product',
  type_report_product: 'selling',
  type_report_customer: 'selling',
  type_report_employee: 'selling',
};


const filtersSlice = createSlice({
  name: "filters",
  initialState: initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state[action.payload.key] = action.payload.value;
      // Save to localStorage after each state change
      localStorage.setItem("filterState", JSON.stringify(state));
    },
    resetFilter: () => {
      return initialState;
    },
  },
});

export const { setFilter, resetFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
