import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import _textTitle from '../atoms/_textTitle';
import ButtonGroup from 'components/molecules/ButtonGroup';
import _blank from '../atoms/_blank';
import _timePicker from '../atoms/input/_timePicker';

import { mediumCategoriesProps } from '../../lib/types/findme';

interface FindMeQuestionProps {
  question: mediumCategoriesProps;
  color?: string;
  onAnswerChange?: (userAnswerList: Object) => void;
  initUserAnswer?: Object;
  questionState?: {
    code: string;
    state: 'current' | 'checked' | 'unchecked' | 'disabled';
  }[];
}

const FindMeQuestion = ({
  question,
  color,
  onAnswerChange,
  initUserAnswer,
  questionState,
}: FindMeQuestionProps) => {
  const [questionArray, setQuestionArray] = useState([]);
  const [userAnswerList, setUserAnswerList] = useState({});
  const questionRefs = useRef({});

  useEffect(() => {
    if (!question) return;
    questionRefs.current = {};

    questionComponent(question);
  }, [question]);

  useEffect(() => {
    questionComponent(question);
    const currentQuestionState = questionState.findIndex((e) => e.state === 'current');
    if (currentQuestionState && currentQuestionState !== -1) {
      const questionRefsCurrent = questionRefs.current[questionState[currentQuestionState]?.code];
      if (questionRefsCurrent) {
        questionRefsCurrent.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    } else {
      let currentEl = null;
      if (currentQuestionState === 0) {
        for (let i = 0; i < Object.values(questionRefs.current).length; i++) {
          if (Object.values(questionRefs.current)[i]) {
            currentEl = Object.values(questionRefs.current)[i] as any;
            currentEl.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
            });
            break;
          }
        }
      }
      // Object.values(questionRefs.current).map((e) => {
      //   if (e) {
      //     const currentEl = e as any;
      //     currentEl.scrollIntoView({
      //       behavior: 'smooth',
      //       block: 'center',
      //     });
      //   }
      // });
    }
  }, [questionState]);

  useEffect(() => {
    setUserAnswerList(initUserAnswer);
  }, [initUserAnswer]);

  useEffect(() => {
    onAnswerChange && onAnswerChange({ ...userAnswerList });
  }, [userAnswerList]);

  const clickHandler = (e) => {
    calculateScore(e.currentTarget.name);
  };
  const onChangeTime = (e) => {
    const value = e.split(':');
    if (value[1] < 10) {
      value[1] = '0' + value[1];
    }
    if (value[2] < 10) {
      value[2] = '0' + value[2];
    }
    setUserAnswerList((prevState) => ({
      ...prevState,
      [value[0]]: value[0] + '_' + value[1] + ':' + value[2],
    }));
  };

  const calculateScore = (value) => {
    const calc = value.split('_');
    const searchRow = question.questionList.find((q) => q.code === calc[0]); // 질문
    const scoreRange = [searchRow.minScore, searchRow.maxScore];

    const scoreArray = [];
    for (let i = scoreRange[0]; i <= scoreRange[1]; i += 1) {
      scoreArray.push(i);
    }
    if (searchRow.reverse) {
      scoreArray.reverse();
    }
    setUserAnswerList((prevState) => ({ ...prevState, [calc[0]]: value }));
  };

  const questionComponent = (question) => {
    const questionArray = [];
    const questionList = question.questionList;

    for (let i = 0; i < question.questionList.length; i++) {
      if (questionList[i].id === '지시문') {
        questionArray.push(
          <_textTitle
            key={i + '_textTitle'}
            text={questionList[i].description}
            color={color}
            size="1em"
            bold={true}
            backgroundFlag={true}
            styleProp="margin:1em 0 1em 0;"
          />
        );
      } else if (questionList[i].answerType === 'input') {
        const text = questionList[i].id + '. ' + questionList[i].description;
        const hFlag = questionList[i].code === 'gsq04';
        const timeRemark = {
          gsq02: [
            '0~23시로 표시해주십시오.',
            ' 예) 밤 12시 → 0시, 오후2시 → 14시',
            '교대 근무자는 밤에 주무시는 때를 기준으로 대답해 주십시오.',
          ],
          gsq03: [
            '0~23시로 표시해주십시오.',
            '예) 밤 12시 → 0시, 오후2시 → 14시',
            '교대 근무자는 밤에 주무시고 아침에 일어날 때를 기준으로 대답해 주십시오.',
          ],
          gsq04: ['실제 수면시간은 잠자리에 누워 있는 시간과는 다를 수 있음을 유의하십시오.'],
        };
        questionArray.push(
          <QuestionWrapper
            className="questionWrapper"
            key={i + '_questionWrapper'}
            ref={(el) => (questionRefs.current[questionList[i].code] = el)}
            highlighted={
              questionState &&
              questionState.find((q) => q.code === questionList[i].code)?.state === 'current'
            }
            disabled={
              questionState.find((q) => q.code === questionList[i].code)?.state === 'disabled'
            }
            color={color}
          >
            <_textTitle
              key={i + '_textTitle'}
              text={text}
              size="1.05em"
              bold={false}
              styleProp="margin:1em 0 1em 0;"
            />
            <TimeRemarkWrapper>
              <_textTitle
                key={i + '_textTitle_1'}
                text={timeRemark[questionList[i].code][0]}
                size="0.9em"
                bold={false}
                styleProp="margin:0 0 0 0;"
              />
              <_textTitle
                key={i + '_textTitle_2'}
                text={timeRemark[questionList[i].code][1]}
                size="0.9em"
                color="#8C8C8C"
                bold={false}
                styleProp="margin:0 0 0 0;"
              />
              <_textTitle
                key={i + '_textTitle_3'}
                text={timeRemark[questionList[i].code][2]}
                size="0.9em"
                bold={false}
                styleProp="margin:0 0 0 0;"
              />
            </TimeRemarkWrapper>
            <_timePicker
              color={color}
              key={i + '_timePicker'}
              name={questionList[i].code}
              value={userAnswerList[questionList[i].code]}
              onTimeChange={onChangeTime}
              hFlag={hFlag}
            />
          </QuestionWrapper>
        );
        questionArray.push(<_blank key={i + '_blank'} height={30} />);
      } else {
        const text = questionList[i].id + '. ' + questionList[i].description;
        const answerOptions = questionList[i].answerOptions.slice();
        if (questionList[i].reverse) {
          answerOptions.reverse();
        }

        questionArray.push(
          <QuestionWrapper
            className="questionWrapper"
            key={i + '_questionWrapper'}
            ref={(el) => (questionRefs.current[questionList[i].code] = el)}
            highlighted={
              questionState &&
              questionState.find((q) => q.code === questionList[i].code)?.state === 'current'
            }
            disabled={
              questionState.find((q) => q.code === questionList[i].code)?.state === 'disabled'
            }
            color={color}
          >
            <_textTitle
              key={i + '_textTitle'}
              text={text}
              size="1.05em"
              bold={false}
              styleProp="margin:1em 0 1em 0;"
            />
            <ButtonGroup
              checkIcon={true}
              key={i + '_buttonGroup'}
              buttonList={answerOptions}
              uniqueKeyList={answerOptions.map(
                (answer, index) => questionList[i].code + '_' + answer + '_' + index
              )}
              color={color}
              currentTextFlag={true}
              currentButtonList={[userAnswerList[questionList[i].code]]}
              vertical={answerOptions.length > 2}
              disabledButtonList={
                questionState &&
                questionState.find((q) => q.code === questionList[i].code)?.state === 'disabled'
                  ? answerOptions.map((e) => true)
                  : []
              }
              clickHandler={clickHandler}
            />
          </QuestionWrapper>
        );
        questionArray.push(<_blank key={i + '_blank'} height={30} />);
      }
    }
    setQuestionArray(questionArray);
  };

  return <>{questionArray}</>;
};
const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
`;

const TimeRemarkWrapper = styled.div`
  background-color: #ffffff;
  padding: 10px 25px 10px 25px;
  border: 1px solid #00898930;
  text-align: -webkit-center;
  border-radius: 4px;
`;

const QuestionWrapper = styled.div`
  margin: 0 1em 1em 1em;
  background-color: ${({ highlighted, color }) => (highlighted ? `${color}66` : 'transparent')};

  transition: background-color 0.3s ease-in-out;
  ${({ highlighted, color }) =>
    highlighted &&
    `background-color: ${color}10; 
    border : 1px solid ${color}00;
    margin: 0 0 0 0;
    padding: 0em 1em 1em 1em;`}
  ${({ disabled }) => disabled && `opacity: 0.3;`}
`;

export default FindMeQuestion;
