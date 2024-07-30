import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Text from '../../../components/Common/Text';
import TextArea from '../../../components/Common/TextArea';
import { ReactComponent as Logo } from '../../../asset/img/svg/0CHA.svg';

// 배치 구체화

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding: 20px;
  `,
  InfoHeader: styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    padding-left: 10%;
  `,
  PlusInfoArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  GenderArea: styled.div`
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
  `,
  GenderOption: styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;

    input {
      accent-color: ${(props) => props.theme.mainColor};
    }

    label {
      margin-left: 5px;
      color: ${(props) => props.theme.textColor};
    }
  `,
  MeasurementArea: styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    input {
      width: 100%;
    }

    span {
      margin-left: 10px;
      color: ${(props) => props.theme.textColor};
    }
  `,
  LocationArea: styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    select {
      width: 48%;
    }
  `,
  SubmitBtnArea: styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
  `,
  SelectBox: styled.select`
    width: 30%;
    height: 40px;
    margin: 5px;
  `,
  Option: styled.option`
    background-color: ${(props) => props.theme.optionBgColor};
    color: ${(props) => props.theme.optionTextColor};
  `,
};

const cities = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
];

const districts: Record<string, string[]> = {
  서울특별시: [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ],
  부산광역시: [
    '강서구',
    '금정구',
    '기장군',
    '남구',
    '동구',
    '동래구',
    '부산진구',
    '북구',
    '사상구',
    '사하구',
    '서구',
    '수영구',
    '연제구',
    '영도구',
    '중구',
    '해운대구',
  ],
  대구광역시: ['군위군', '달서구', '달성군', '동구', '남구', '북구', '서구', '수성구', '중구'],
  인천광역시: ['강화군', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '옹진군', '중구'],
  광주광역시: ['광산구', '남구', '동구', '서구', '북구'],
  대전광역시: ['동구', '대덕구', '서구', '유성구', '중구'],
  울산광역시: ['남구', '동구', '북구', '울주군', '중구'],
  세종특별자치시: ['세종시'],
  경기도: [
    '수원시',
    '고양시',
    '용인시',
    '과천시',
    '광명시',
    '광주시',
    '구리시',
    '군포시',
    '김포시',
    '남양주시',
    '동두천시',
    '부천시',
    '성남시',
    '시흥시',
    '안산시',
    '안성시',
    '안양시',
    '양주시',
    '여주시',
    '오산시',
    '의왕시',
    '의정부시',
    '이천시',
    '파주시',
    '평택시',
    '포천시',
    '하남시',
    '화성시',
    '가평군',
    '양평군',
    '연천군',
  ],
  강원도: [
    '강릉시',
    '동해시',
    '삼척시',
    '속초시',
    '원주시',
    '춘천시',
    '태백시',
    '고성군',
    '양구군',
    '양양군',
    '영월군',
    '인제군',
    '정선군',
    '철원군',
    '평창군',
    '홍천군',
    '화천군',
    '횡성군',
  ],
  충청북도: [
    '청주시',
    '충주시',
    '제천시',
    '괴산군',
    '단양군',
    '보은군',
    '영동군',
    '옥천군',
    '음성군',
    '증평군',
    '진천군',
  ],
  충청남도: [
    '계룡시',
    '공주시',
    '논산시',
    '당진시',
    '보령시',
    '서산시',
    '아산시',
    '천안시',
    '금산군',
    '부여군',
    '서천군',
    '예산군',
    '청양군',
    '태안군',
    '홍성군',
  ],
  전라북도: [
    '군산시',
    '김제시',
    '남원시',
    '익산시',
    '전주시',
    '정읍시',
    '고창군',
    '무주군',
    '부안군',
    '순창군',
    '완주군',
    '임실군',
    '장수군',
    '진안군',
  ],
  전라남도: [
    '광양시',
    '나주시',
    '목포시',
    '순천시',
    '여수시',
    '강진군',
    '고흥군',
    '곡성군',
    '구례군',
    '담양군',
    '무안군',
    '보성군',
    '신안군',
    '영광군',
    '영암군',
    '완도군',
    '장성군',
    '장흥군',
    '진도군',
    '함평군',
    '해남군',
    '화순군',
  ],
  경상북도: [
    '경산시',
    '경주시',
    '구미시',
    '김천시',
    '문경시',
    '상주시',
    '안동시',
    '영주시',
    '영천시',
    '포항시',
    '고령군',
    '봉화군',
    '성주군',
    '영덕군',
    '영양군',
    '예천군',
    '울릉군',
    '울진군',
    '의성군',
    '청도군',
    '청송군',
    '칠곡군',
  ],
  경상남도: [
    '창원시',
    '거제시',
    '김해시',
    '밀양시',
    '사천시',
    '양산시',
    '진주시',
    '거창군',
    '고성군',
    '남해군',
    '산청군',
    '의령군',
    '창녕군',
    '하동군',
    '함안군',
    '함양군',
    '합천군',
  ],
  제주특별자치도: ['제주시', '서귀포시'],
};

interface dataType {
  gender: string;
  height: string;
  weight: string;
  location1: string;
  location2: string;
}

const PlusInfoPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    gender: '',
    height: '',
    weight: '',
    location1: '',
    location2: '',
  });

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // 키 - 체중 필드에 대해 제약조건 규정
    if ((name === 'height' || name === 'weight') && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setData({
      ...data,
      [name]: value,
      // location1이 변경되면 location2 초기화
      ...(name === 'location1' && { location2: '' }),
    });
  };

  const handleSubmit = () => {
    // 제출 로직 작성 (예: API 호출)
    console.log('Form submitted:', data);
    alert('정보가 제출되었습니다.');
  };

  return (
    <>
      <s.Container>
        <s.InfoHeader>
          <Text size="24px" color="mainColor" children="회원가입 완료" margin="5px" />
          <Text type="guide" size="18px" children="더 나은 서비스를 위해" margin="5px" />
          <Text type="guide" size="18px" children="추가 정보를 입력해주세요." />
        </s.InfoHeader>
        <s.PlusInfoArea>
          <s.GenderArea>
            <s.GenderOption>
              <input
                type="radio"
                id="male"
                name="gender"
                value="남성"
                checked={data.gender === '남성'}
                onChange={handleChangeValue}
              />
              <label htmlFor="male">남성</label>
            </s.GenderOption>
            <s.GenderOption>
              <input
                type="radio"
                id="female"
                name="gender"
                value="여성"
                checked={data.gender === '여성'}
                onChange={handleChangeValue}
              />
              <label htmlFor="female">여성</label>
            </s.GenderOption>
          </s.GenderArea>
          <s.MeasurementArea>
            <Input
              type="text"
              height="40px"
              name="height"
              placeholder="키"
              value={data.height}
              onChange={handleChangeValue}
            />
            <Text type="guide" children="cm" width="30px" />
          </s.MeasurementArea>
          <s.MeasurementArea>
            <Input
              type="text"
              height="40px"
              name="weight"
              placeholder="체중"
              value={data.weight}
              onChange={handleChangeValue}
            />
            <Text type="guide" children="kg" width="30px" />
          </s.MeasurementArea>
          <s.LocationArea>
            <s.SelectBox name="location1" value={data.location1} onChange={handleChangeValue}>
              <s.Option value="" children="시/도" />
              {cities.map((city) => (
                <s.Option key={city} value={city} children={city} />
              ))}
            </s.SelectBox>
            <s.SelectBox
              name="location2"
              value={data.location2}
              onChange={handleChangeValue}
              disabled={!data.location1}
            >
              <s.Option value="" children="시/군/구" />
              {data.location1 &&
                districts[data.location1]?.map((district) => (
                  <s.Option key={district} value={district} children={district} />
                ))}
            </s.SelectBox>
          </s.LocationArea>
          <s.SubmitBtnArea>
            <Button width="100%" height="40px" children="다음에 입력하기" onClick={handleSubmit} margin="5px 0" />
            <Button width="100%" height="40px" type="main" children="입력완료" onClick={handleSubmit} margin="5px 0 " />
          </s.SubmitBtnArea>
        </s.PlusInfoArea>
      </s.Container>
    </>
  );
};

export default PlusInfoPage;
