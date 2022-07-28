import {
  GET_BURGERS,
  GET_PRODUCT,
  GET_COMBOS,
  GET_BEVERAGES,
  GET_INGREDIENTS,
  GET_POTATOES,
  GET_VEGGIE,
  GET_PRODUCT_BY_ID,
  GET_BURGER_BASE,
  SET_CATEGORY,
  
} from '../actions/actions';

const initialState = {
  burgers: [],
  copyBurgers: [],
  products: [],
  combos: [],
  beverages: [],
  ingredients: [],
  potatoes: [],
  veggie: [],
  category: '',
  productDetail: [],
  burgerBase: {},
};

const rootReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_BURGERS:
      return {
        ...state,
        burgers: action.payload,
        copyBurgers: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case GET_COMBOS:
      return {
        ...state,
        combos: action.payload,
      };
    case GET_BEVERAGES:
      return {
        ...state,
        beverages: action.payload,
      };
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };
    case GET_POTATOES:
      return {
        ...state,
        potatoes: action.payload,
      };
    case GET_VEGGIE:
      return {
        ...state,
        veggie: action.payload,
      };
      case GET_PRODUCT_BY_ID:
        return {
          ...state,
          productDetail: action.payload,
        }
      case GET_BURGER_BASE:
        return {
          ...state,
          burgerBase: action.payload,
        }
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
