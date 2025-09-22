//List utility app
import IMAGES from "../assets/images"
import { BOTTOM_TAB_ROUTES ,HOME_ROUTES, ROOT_ROUTES} from "../routes"
import Product from "../screens/Product/Product"

export const LIST_UTILITY_APP = [
  {
    id: 1,
    name: 'Bán hàng',
    icon: IMAGES.COMMON.icon_sell,
    routeKey: BOTTOM_TAB_ROUTES.SELL,
  },
  {
    id: 2,
    name: 'Hoá đơn',
    icon: IMAGES.COMMON.icon_invoice,
    routeKey: BOTTOM_TAB_ROUTES.INVOICE,
  }, 
  {
    id: 3,
    name: 'Đặt hàng',
    icon: IMAGES.COMMON.icon_purchase,
    routeKey: BOTTOM_TAB_ROUTES.PURCHASE,
  },
  {
    id: 4,
    name: 'Trả hàng',
    icon: IMAGES.COMMON.icon_return,
    routeKey: "RETURN",
  },
  {
    id: 5,
    name: 'Hàng hoá',
    icon: IMAGES.COMMON.icon_product,
    routeKey:  ROOT_ROUTES.HOME_STACK,
    screen:HOME_ROUTES.PRODUCT,
  },
  {
    id: 6,
    name: 'Kiểm kho',
    icon: IMAGES.COMMON.icon_inventory_count,
    routeKey: "INVENTORY_COUNT",
    screen:Product,
  },
  {
    id: 7,
    name: 'Nhập hàng',
    icon: IMAGES.COMMON.icon_input_product,
    routeKey: "INPUT_PRODUCT",
  },
  {
    id: 8,
    name: 'Trả hàng nhập',
    icon: IMAGES.COMMON.icon_return_input,
    routeKey: "RETURN_IMPORT",
  },  
]
export const LIST_UTILITY_TRANSACTION = [
  {
    id: 1,
    name: 'Bán hàng',
    icon: IMAGES.COMMON.icon_sell,
    routeKey: BOTTOM_TAB_ROUTES.SELL,    
  },
  {
    id: 2,
    name: 'Hoá đơn',
    icon: IMAGES.COMMON.icon_invoice,
    routeKey: BOTTOM_TAB_ROUTES.INVOICE,
  },
  {
    id: 3,
    name: 'Đặt hàng',
    icon: IMAGES.COMMON.icon_purchase,
    routeKey: BOTTOM_TAB_ROUTES.PURCHASE,
  },
  {
    id: 4,
    name: 'Trả hàng',
    icon: IMAGES.COMMON.icon_return,
    routeKey: "RETURN",
  },
  {
    id: 5,
    name: 'Sổ quỹ',
    icon: IMAGES.COMMON.icon_cashbook,
    routeKey: "CASH_BOOK",
  },
  
]
export const LIST_UTILITY_PRODUCT = [
  {
    id: 1,
    name: 'Hàng hoá',
    icon: IMAGES.COMMON.icon_product,
    routeKey: "PRODUCT",
  },
  {
    id: 2,
    name: 'Kiểm kho',
    icon: IMAGES.COMMON.icon_inventory_count,
    routeKey: "INVENTORY_COUNT",
  },
  {
    id: 3,
    name: 'Nhập hàng',
    icon: IMAGES.COMMON.icon_input_product,
    routeKey: "INPUT_PRODUCT",
  },
  
  {
    id: 4,
    name: 'Trả hàng nhập',
    icon: IMAGES.COMMON.icon_return_input,
    routeKey: "RETURN_IMPORT",
  },
  {
    id: 5,
    name: 'Chuyển hàng',
    icon: IMAGES.COMMON.icon_transfer_product,
    routeKey: "TRANSFER_PRODUCT",
  }
]
export const formatCash = (num: number) => {
  if (!num) {
    return "";
  } else {
    const roundedNum = Math.round(num);
    return roundedNum.toLocaleString("en-US");
  }
};