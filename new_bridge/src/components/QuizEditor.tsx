import React , {useState , useEffect} from 'react'
import QuizList from './quiz/QuizList'

function QuizEditor(props) {
  const [content , setContent] = useState(props.defaultValue? props.defaultValue: {time: 25 ,quiz: []});

  useEffect(()=>{
       if(props.defaultValue &&  typeof props.defaultValue == 'string'){
        let setParentContent = props.contentChange;
        setParentContent(JSON.parse(props.defaultValue));
       }
       console.log(props.defaultValue);
      setContent(props.defaultValue? props.defaultValue: {time: 25 ,quiz: [{_id: Math.random() ,question: "" , type: "choices" ,answer: undefined , answer_descriptions:""}]});
  }, [props.defaultValue])

  function timeChange(e) {
     let setParentContent = props.contentChange;
     let currentContent = content;
     setParentContent({...currentContent , time: e.target.value});
  }

  function addQuestion() {
    let setParentContent = props.contentChange;
    let currentContent = content;
    let newQuestion = {_id: Math.random() ,question: "" , type: "choices" , answer: undefined , answer_descriptions:""};
    let currentQuiz = currentContent.quiz;
    currentQuiz.push(newQuestion);
    setParentContent({...currentContent , quiz: currentQuiz});
  }


  return (
    <>
    <div >
    <label htmlFor="maxTime" className='label font-noto-sans'>เวลาทำแบบทดสอบ</label>
    <div className='flex items-center gap-5'>
    <input type="text" id="maxTime" className='input input-bordered font-noto-sans' value={content.time} onChange={timeChange} placeholder='เวลาทำแบบทดสอบ' />
    <p className='font-noto-sans'>วินาที</p>
    </div>
    </div>
    <QuizList quiz={content.quiz? content.quiz:[]} content={content} setContent={props.contentChange}/>
    <div className='flex justify-center items-center'>
    <div className='btn bg-slate-400 w-3/12' onClick={addQuestion}>เพิ่มคำถาม</div>
    </div>
    </>
  )
}

export default QuizEditor