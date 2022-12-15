import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js"
import { getProductList } from "./productList.js";


export const getProductSection = (sectionName, productInfoList) => {
  const productListSection = makeDOMwithProperties('section', {className: 'product-list-section'});
  // 섹션 태그 생성
  const sectionTitle = makeDOMwithProperties('div', {className: 'section-title'});
  // 섹션 title 생성
  const titleHighLight = makeDOMwithProperties('span', {className: 'section-title-highlight'});
  // 섹션 titleHigLight 생성
  const title = makeDOMwithProperties('span', {innerHTML: sectionName});
  // 섹션 이름
  appendChildrenList(sectionTitle, [titleHighLight, title]);
  // 관계 형성
  const productListContainer = getProductList(productInfoList);
  // 상품목록을 컨테이너에 넣고
  appendChildrenList(productListSection, [sectionTitle, productListContainer]);
  // 상품 컨테이너와 섹션title을 섹션안에 넣고
  return productListSection
  // 반환
}