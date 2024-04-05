import React, { useState, useEffect } from "react";
import { Model , settings } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "./theme";
import "./quiz.css";

function Quiz(props) {
  let firstModel = new Model({
    firstPageIsStarted: true,
    startSurveyText: "เริ่มทำแบบทดสอบ",
    pages: [
      {
        name: "start",
        elements: [
          {
            name: "start",
            type: "html",
            html: "",
          },
        ],
      },
    ],
  });
  firstModel.applyTheme(themeJson);
  const [content, setContent] = useState();
  const [model, setModel] = useState(firstModel);
  const [result, setResult] = useState({});
  const [complete, setComplete] = useState(props.complete);
  const [percent , setPercent] = useState(0);

  function makeModel(value) {
    let time = value.time;
    let quizes = value.quiz;
    let newQuizes = quizes.map((item, index) => {
      let itemType = {
        choices: "radiogroup",
        text: "text",
        images: "imagepicker",
      }[item.type];
      let choices = item.choices ? item.choices : undefined;
      if (choices) {
        choices = choices.map((choice) => choice.content);
      }
      let modelItem = {
        name: `question-${index}`,
        elements: [
          {
            name: item.question,
            title: item.question,
            html: item.question,
            type: itemType,
            correctAnswer: item.answer,
            choices: choices,
          },
        ],
      };
      return modelItem;
    });
    newQuizes.unshift({
      name: "start",
      elements: [
        {
          name: "start",
          type: "html",
          html: "",
        },
      ],
    });
    let resultModel = {
      showProgressBar: "bottom",
      showTimerPanel: "top",
      maxTimeToFinish: time,
      firstPageIsStarted: true,
      startSurveyText: "เริ่มทำแบบทดสอบ",
      pages: newQuizes,
      completedHtml: "",
      width: "100%",
      minWidth: "500px",
    };
    return resultModel;
  }

  function submitResult(data) {
    let submitProgress = props.submitProgress;
    submitProgress(data);
}

  function getQuestion(data) {
       let quizes = content.quiz;
       let question = quizes.find(item => item.question == data);
       return question;
  }

  function getResult(data) {
    let currentResults = data;
    let content = [];
    let i = 1;
    for (let key in currentResults) {
      const val = currentResults[key];
      let question = getQuestion(key);
      let answer = question.answer;
      let answer_description = question.answerDescription;
      let correct = false;
      if(val == answer){
        correct = true;
      }
      content.push(
        <div className={`p-5 mb-2 w-full shadow-md border-r-4 bg-slate-200 rounded-lg`} key={key}>
          <div className="flex gap-1 justify-start">
            <p className="font-noto-sans text-3xl font-bold">{`${i}.`}</p>
            <div
              className="prose font-noto-sans"
              dangerouslySetInnerHTML={{ __html: key }}
            ></div>
          </div>
          <div className="font-noto-sans text-xl">
            {`คำตอบของคุณคือ`}
            <p className={`font-bold ${correct? "text-green-600":"text-red-600"}`}>{val} {correct? <span>&#10003;</span>:<span>&#10007;</span>}</p>
          </div>
          <div className="font-noto-sans text-xl">
            {`คำตอบที่ถูกต้องคือ`}
            <p className="font-bold">{answer}</p>
          </div>
          <div className="font-noto-sans text-xl">
            {`คำอธิบาย`}
            <p className="font-bold prose" dangerouslySetInnerHTML={{__html: answer_description}}></p>
          </div>
        </div>
      );
      i++;
    }
    return content;
  }

  function getScore() {
    let currentQuizes = content.quiz;
    let currentResult = result;
    let maxScore = currentQuizes.length;
    let score = 0;
    currentQuizes.map((item) => {
      if (currentResult[item.question] == item.answer) {
        score++;
      }
    });
    let targetPercent = Math.floor((score / maxScore) * 100);
    const handlePercent = setInterval(() => {
      setPercent(currentPercent => {
          if (currentPercent < targetPercent) {
              currentPercent++;
              return currentPercent;
          }
          clearInterval(handlePercent);
          return currentPercent;
      });
  }, 100);
    return `${score}/${maxScore}`;
  }

  useEffect(() => {
    if (props.content && typeof props.content == "string") {
      let rawContent = JSON.parse(props.content);
      setContent(JSON.parse(props.content));
      let newModel = new Model(makeModel(rawContent));
      newModel.applyTheme(themeJson);
      newModel.onTextMarkdown.add((_, options) => {
        const text = options.text;
        options.html = text;
      });

      newModel.onComplete.add((sender, options) => {
        setComplete(true);
        setResult(sender.data);
        if(props.user.role == 'student'){
          submitResult(sender.data);
        }
      });
      setModel(newModel);
    } else {
      setContent(props.content);
      let quizModel = new Model({
        firstPageIsStarted: true,
        startSurveyText: "เริ่มทำแบบทดสอบ",
        pages: [
          {
            name: "page1",
            elements: [
              {
                type: "html",
                name: "question1",
                html: "hello",
              },
            ],
          },
        ],
      });
      quizModel.applyTheme(themeJson);
      setModel(quizModel);
    }
    setComplete(props.complete);
    setResult(props.result);
  }, [props]);
  return (
    <div>
      {!complete && (
        <div className="md:w-12/12 w-52 justify-center prose">
          <Survey  model={model} />
        </div>
      )}
      {complete && (
        <div name="result" className="w-12/12 flex flex-col justify-center">
          <div className="card card-normal bg-slate-200 p-5 mb-5 shadow-md">
            <div className="card-body">
              <p className="font-noto-sans text-3xl flex flex-col md:flex-row justify-center items-center gap-5">
                <div className="flex gap-2 justify-center">
                  <p>คะแนนที่ได้</p>
                  <p className="font-bold inline">{getScore()}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <progress
                    class="progress progress-success w-56"
                    value={percent}
                    max="100"
                  ></progress>
                  <div className="font-noto-sans text-sm">{percent} %</div>
                </div>
              </p>
            </div>
          </div>
          {getResult(result)}
        </div>
      )}
    </div>
  );
}

export default Quiz;
