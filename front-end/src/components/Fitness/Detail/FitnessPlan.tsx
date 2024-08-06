import React from 'react';
import styled from 'styled-components';
import { ReactComponent as off } from '../../../asset/img/svg/pickOff.svg';
import { ReactComponent as on } from '../../../asset/img/svg/pickOn.svg';
import IconSvg from '../../Common/IconSvg';

const s = {
  Container: styled.section`
    width: 100%;
  `,
  PlanHeaderArea: styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: ${(props) => props.theme.textColor};
    margin: 0 auto 10px;
  `,
  DeleteText: styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
  `,
  PlanTable: styled.table`
    width: 80%;
    color: ${(props) => props.theme.textColor};
    text-align: center;
    margin: 30px auto;
  `,
  TableHead: styled.thead`
    font-size: 14px;
  `,
  TableBody: styled.tbody``,
  Th: styled.th``,
  Tr: styled.tr``,
  Td: styled.td`
    vertical-align: middle;
    width: 20%;
    padding: 5px;
  `,
  ValueInput: styled.input`
    width: 50px;
    height: fit-content;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    padding: 0;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
  `,

  SetBtnArea: styled.div`
    width: 50%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  PlanSetBtn: styled.div`
    font-size: 14px;
    width: 100px;
    text-align: center;
    line-height: 40px;
    height: 40px;
    color: ${(props) => props.theme.mainColor};
    cursor: pointer;
  `,
  ListLine: styled.hr`
    width: 90%;
    background: #212121;
    height: 1px;
    border: 0;
    margin: 30px auto;
  `,
};
type ExerciseType = {
  name: string;
  detail: ExerciseDetailType[];
};

type ExerciseDetailType = {
  id: number;
  set: number;
  weight: number;
  count: number;
  is_complete: boolean;
};
interface FitnessDataProps {
  exercise: ExerciseType[];
}

const FitnessPlan = (props: FitnessDataProps): JSX.Element => {
  return (
    <>
      {props.exercise.map((data, index) => (
        <s.Container key={index}>
          <s.PlanHeaderArea>
            <span style={{ fontWeight: 600 }}>{index + 1 + '. ' + data.name}</span>
            <s.DeleteText>운동 삭제</s.DeleteText>
          </s.PlanHeaderArea>
          <s.PlanTable>
            <s.TableHead>
              <s.Tr>
                <s.Th>세트</s.Th>
                <s.Th>무게</s.Th>
                <s.Th>횟수</s.Th>
                <s.Th>완료</s.Th>
              </s.Tr>
            </s.TableHead>
            <s.TableBody>
              {data.detail.map((detail, index) => (
                <s.Tr key={index}>
                  <s.Td>{detail.set}</s.Td>
                  <s.Td>
                    <s.ValueInput value={detail.weight} />
                  </s.Td>
                  <s.Td>
                    <s.ValueInput value={detail.count} />
                  </s.Td>
                  <s.Td>
                    {detail.is_complete ? (
                      <IconSvg width="30" height="30" Ico={on} cursor="pointer" />
                    ) : (
                      <IconSvg width="30" height="30" Ico={off} cursor="pointer" />
                    )}
                  </s.Td>
                </s.Tr>
              ))}
            </s.TableBody>
          </s.PlanTable>
          <s.SetBtnArea>
            <s.PlanSetBtn>세트 삭제</s.PlanSetBtn>
            <s.PlanSetBtn>세트 추가</s.PlanSetBtn>
          </s.SetBtnArea>
          {index + 1 === props.exercise?.length || <s.ListLine />}
        </s.Container>
      ))}
    </>
  );
};

export default FitnessPlan;
