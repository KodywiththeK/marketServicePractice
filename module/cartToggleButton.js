import { CART_COOKIE_KEY } from "../constants/cart.js";
import { makeDOMwithProperties } from "../utils/dom.js";

export const getCartInfo = () => JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];


const isInCart = ( {id} ) => {
  // 현재 해당 상품이 장바구니 안에 있는지를 판단하여 결과 반환
  // 로컬 스토리지에서 CART_COOKIE_KEY라는 이름으로 키의 값을 받아와서, JSON.parse로 객체로 만들어 주면,
  // originalCartInfo에 배열이 들어가게 되는데, 그 안에는 장바구니에 담긴 물품 정보가 들어가게 될 것
  const originalCartInfo = getCartInfo();
  // Array.find
  return !!originalCartInfo.find((cartInfo) => cartInfo.id ===id)
  // find 는 주어진 판별함수를 만족하는 첫번째 요소의 값을 반환, 없으면 undefined 반환
  // 부정연산자 두번을 통해 해당 요소값의 존재 유무에 대한 정보를 boolean 데이터로 반환하게 됨.
}

const addCartInfo = (productInfo) => {
  console.log('addCartInfo');
  // 장바구니에 해당 물품의 정보 저장
  const originalCartInfo = getCartInfo();
  // null 혹은 undefined || [] => null 이나 undefined가 앞에 나왔을 때, 그 뒤에있는 값을 앞에 할당해주는 문법
  // null, undefined가 아닌 제대로 된 값이 앞에 오면, 앞에 값이 할당된다.
  // ??, []의 차이?

  if (originalCartInfo.findIndex((cartInfo) => cartInfo.id === productInfo.id) !== -1) return;
  // findIndex() - 주어진 판별 함수를 만족하는 배열의 첫번째 요소를 반환. 없으면 -1반환
  // 현재 들어있는 카트 정보를 하나씩 받아와서, 
  // 현재 넣고자 하는 productInfo의 id와 같은 id를 가진 물품이 장바구니 안에 들어가 있다면
  // 그 인덱스를 반환받을 시, 바로 return 해서, 장바구니에 정보가 들어가지 않도록 함.

  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify([
    ...originalCartInfo,
    productInfo
    // localStorage에 아이템을 추가하기 위해서는 setItem() 함수를 사용
    // localStorage.setItem(key, value) => 키 벨류 형태로 저장됨.
  ]));
};

const removeCartInfo = ({ id }) => {
  console.log('removeCartInfo')
  // 장바구니에서 해당 물품의 정보를 삭제하는 함수
  // 삭제하려면 먼저 현재 어떤 물품이 들어있는지를 받아와야 함.
  const originalCartInfo = getCartInfo();
  const newCartInfo = originalCartInfo.filter((cartInfo) => {
    // 매개변수로 받은 id와 같은 id를 가진 값만 false가 나오게 하고 나머지는 true 값을 받음
    return cartInfo.id !== id; 
  })
  localStorage.setItem(CART_COOKIE_KEY, JSON.stringify(newCartInfo))
}


export const getCartToggleButton = (productInfo, removeCartCallback) => {
  let inCart = isInCart(productInfo);

  const cartToggleBtn = makeDOMwithProperties('button', {
    className: 'cart-toggle-btn',
    type: 'button',
    onclick: () => {
      if(inCart) { // 이미 장바구니에 들어가 있으면
        if(!confirm(`[${productInfo.name}]을 장바구니에서 삭제할까요?`)) return;
        // early-return => 조건에 맞지 않으면 그냥 리턴시키고 나머지를 실행하는방향
        // 코드의 양을 줄일 수 있다.
        removeCartInfo(productInfo); // 삭제 기능 동작
        cartImage.src = '../public/assets/cart.png';
        removeCartCallback?.(); //함수가 있으면 수행하고 없으면 undefined
      } else {  // 장바구니안에 상품 없으면 
        addCartInfo(productInfo); // 장바구니 넣는 기능 동작
        cartImage.src = '../public/assets/cartDisabled.png'
        if(confirm("장바구니에 담았습니다. 장바구니 페이지로 이동할까요?")) {
          location.href = '../cart.html';
        }
      }
      inCart = !inCart; // inCart의 불리언 값 반대로 할당해주기
    }
  });
  const cartImage = makeDOMwithProperties('img', {
    className: 'cart-image',
    src: inCart ? '../public/assets/cartDisabled.png' : '../public/assets/cart.png',
    // inCart에 리턴된 값이 true(상품이 카트안에 있으면), cartDisabled, false면 cart 이미지
  }); 
  cartToggleBtn.appendChild(cartImage);

  return cartToggleBtn;
}