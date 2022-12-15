export const fetchSectionListData = async() => {
  try {
    const response = await fetch('./public/mock/sectionListData.json');
    // console.log(response)
    // response는 status, ok 값 등이 들어가게 된다. 이외에 body는 json 이라는 함수를 통해 읽을 수 있기 때문에
    const data = await response.json();
    // console.log(data)
    // json 을 통해 분해해서 body를 추출해줄 때도 await 필요. 프라미스가 반환되기 때문.
    // 해당 json에 있는 데이터(sectionInfoList : Array(3)) 가 data에 배열 형태로 반환되어있음.
    return data?.sectionInfoList || [];
    // null 이나 undefined가 오면 뒤의 default value(빈 배열) 반환   
  } catch (error) {
    console.log(error);
    return [];
  }
};