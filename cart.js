import { CART_COOKIE_KEY } from "./constants/cart.js";
import { getCartInfo } from "./module/cartToggleButton.js";
import { setPayInfo } from "./module/payModule.js";
import { getProductList } from "./module/productList.js";
import { makeDOMwithProperties } from "./utils/dom.js";
// 1. 장바구니에 있는 물품 장보 가져오기
// 2. 물품 장보 - productList와 연결
// 3. section 아래의 cart-pay-container 앞에 삽입하기

const sectionDOM = document.getElementsByTagName('section')[0];
const cartPayContainerDOM = document.getElementById('cart-pay-container');

const cartInfo = getCartInfo();

const reloadPage = () => location.reload();
// 페이지를 새로고침 해주는 메소드


if(cartInfo.length<1) {
  //장바구니에 상품이 없다는 언지해주기
  const noticeDOM = makeDOMwithProperties('div', {
    innerHTML : '장바구니에 상품이 없습니다.',
    className: 'product-list-con',
  });
  sectionDOM.insertBefore(noticeDOM, cartPayContainerDOM);
} else {
  const productListDOM = getProductList(cartInfo, reloadPage);
  sectionDOM.insertBefore(productListDOM, cartPayContainerDOM);
  // A.insertBefore(B, C); => B가 A를 부모로하고 C 앞에 위치한 형제요소가 된다.
}

const cartALLDeleteButtonDOM = document.getElementById('remove-all-button');
cartALLDeleteButtonDOM.onclick = () => {
  // 전체삭제 버튼을 클릭했을 떄, 로컬스토리지에 들어있는 장바구니 물품 목록 정보 모두 삭제되어야 함.
  localStorage.removeItem(CART_COOKIE_KEY); 
  // removeItem을 사용하면 key를 인자로 넘겨서, 해당 키에 해당하는 키 벨류 쌍을 삭제하는 메소드
  // localStorage.clear();
  // 모든 키-벨류 쌍이 모두 삭제한다.
  // 지금은 로컬스토리지를 장바구니 용도로만 사용하기 때문에 clear를 사용해도 되지만, 
  // 다양한 용도로 사용된다면, 다른 정보도 삭제될 수도 있다.
  location.reload(); // 새로고침
};

setPayInfo();