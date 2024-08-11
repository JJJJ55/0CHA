import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Off } from '../../../asset/img/svg/pickOff.svg';
import { ReactComponent as On } from '../../../asset/img/svg/pickOn.svg';
import IconSvg from '../../Common/IconSvg';
import { useLocation } from 'react-router';

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
  hidden: styled.div`
    display: none;
  `,
};

type ExerciseDetailType = {
  sequence: number;
  weight: number | '';
  count: number | '';
  complete: boolean;
};

interface FitnessPlanProps {
  exercise: {
    exerciseName: string;
    exerciseId: number;
    sequence: number;
    sets: ExerciseDetailType[];
  };
  index: number;
  onDelete: () => void;
  onChangeSet: (index: number, updatedSets: ExerciseDetailType[]) => void;
}

const TestPlan = (props: FitnessPlanProps): JSX.Element => {
  const [sets, setSets] = useState<ExerciseDetailType[]>(props.exercise.sets);
  const path = useLocation().pathname;

  useEffect(() => {
    setSets(props.exercise.sets);
  }, [props.exercise.sets]);

  useEffect(() => {
    console.log(`Sets for exercise ${props.index}:`, sets);
  }, [sets, props.index]);

  const handleAddSet = () => {
    const newSet: ExerciseDetailType = {
      sequence: sets.length + 1,
      weight: '',
      count: '',
      complete: false,
    };
    const updatedSets = [...sets, newSet];
    setSets(updatedSets);
    props.onChangeSet(props.index, updatedSets);
    console.log(`Added set to exercise ${props.index}:`, newSet);
  };

  const handleRemoveSet = () => {
    if (sets.length === 0) return;
    const updatedSets = sets.slice(0, -1);
    setSets(updatedSets);
    props.onChangeSet(props.index, updatedSets);
    console.log(`Removed last set from exercise ${props.index}`);
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
    console.log(`Updated set ${index} for exercise ${props.index}:`, updatedSets[index]);
  };

  const handleCompleteToggle = (index: number) => {
    if (path === '/play') {
      const updatedSets = sets.map((set, idx) => {
        if (idx === index) {
          return { ...set, complete: !set.complete };
        }
        return set;
      });
      setSets(updatedSets);
      props.onChangeSet(props.index, updatedSets);
      console.log(`Toggled completion for set ${index} of exercise ${props.index}`);
    }
  };

  return (
    <s.Container>
      <s.PlanHeaderArea>
        <s.hidden>{(props.exercise.sequence = props.index + 1)}</s.hidden>
        <span style={{ fontWeight: 600 }}>{props.index + 1 + '. ' + props.exercise.exerciseName}</span>
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
            <s.Tr key={data.sequence}>
              <s.Td>{data.sequence}</s.Td>
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
                {data.complete ? (
                  <IconSvg
                    width="30"
                    height="30"
                    Ico={On}
                    cursor="pointer"
                    onClick={() => handleCompleteToggle(index)}
                  />
                ) : (
                  <IconSvg
                    width="30"
                    height="30"
                    Ico={Off}
                    cursor="pointer"
                    onClick={() => handleCompleteToggle(index)}
                  />
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
  );
};

export default TestPlan;