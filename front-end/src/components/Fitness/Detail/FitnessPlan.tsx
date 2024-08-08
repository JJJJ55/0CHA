import React, { useEffect, useState } from 'react';
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
    border: 1px solid ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.bgColor};
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox  */
    & input[type='number'] {
      -moz-appearance: textfield;
    }
    &:focus {
      outline: 1px solid ${(props) => props.theme.mainColor};
      border: none;
    }
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

type ExerciseDetailType = {
  id: number;
  set: number;
  weight: number | '';
  count: number | '';
  is_complete: boolean;
};

interface FitnessPlanProps {
  exercise: {
    name: string;
    id: number;
    detail: ExerciseDetailType[];
  };
  index: number;
  onDelete: () => void;
  onChangeSet: (index: number, updatedSets: ExerciseDetailType[]) => void;
}

const FitnessPlan = (props: FitnessPlanProps): JSX.Element => {
  const [sets, setSets] = useState<ExerciseDetailType[]>(props.exercise.detail);

  useEffect(() => {
    setSets(props.exercise.detail);
  }, [props.exercise.detail]);

  const handleAddSet = () => {
    const newSet: ExerciseDetailType = {
      id: sets.length + 1,
      set: sets.length + 1,
      weight: '',
      count: '',
      is_complete: false,
    };
    const updatedSets = [...sets, newSet];
    setSets(updatedSets);
    props.onChangeSet(props.index, updatedSets);
  };

  const handleRemoveSet = () => {
    const updatedSets = sets.slice(0, -1);
    setSets(updatedSets);
    props.onChangeSet(props.index, updatedSets);
  };

  const handleInputChange = (index: number, field: keyof ExerciseDetailType, value: number | '') => {
    const updatedSets = sets.map((set, idx) => {
      if (idx === index) {
        return { ...set, [field]: value };
      }
      return set;
    });
    setSets(updatedSets);
    props.onChangeSet(props.index, updatedSets);
  };

  return (
    <>
      <s.Container>
        <s.PlanHeaderArea>
          <span style={{ fontWeight: 600 }}>{props.index + '. ' + props.exercise.name}</span>
          <s.DeleteText onClick={props.onDelete}>운동 삭제</s.DeleteText>
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
            {sets.map((data, index) => (
              <s.Tr key={data.id}>
                <s.Td>{data.set}</s.Td>
                <s.Td>
                  <s.ValueInput
                    type="number"
                    value={data.weight}
                    onChange={(e) => handleInputChange(index, 'weight', e.target.value ? Number(e.target.value) : '')}
                  />
                </s.Td>
                <s.Td>
                  <s.ValueInput
                    type="number"
                    value={data.count}
                    onChange={(e) => handleInputChange(index, 'count', e.target.value ? Number(e.target.value) : '')}
                  />
                </s.Td>
                <s.Td>
                  {data.is_complete ? (
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
          <s.PlanSetBtn onClick={handleRemoveSet}>세트 삭제</s.PlanSetBtn>
          <s.PlanSetBtn onClick={handleAddSet}>세트 추가</s.PlanSetBtn>
        </s.SetBtnArea>
      </s.Container>
    </>
  );
};

export default FitnessPlan;
