import React, { useState, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImageUpload from '../ImageUpload';


function ChoiceItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id, disabled: !props.sort });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [choice, setChoice] = useState(props.content);
  const [answer, setAnswer] = useState(props.answer);
  const [isAnswer, setIsAnswer] = useState(props.content == props.answer ? true : false);


  useEffect(() => {
    setChoice(props.content);
    setAnswer(props.answer);
    setIsAnswer(props.content == props.answer ? true : false);
  }, [props.answer, props.content]);

  const choiceChange = (event) => {
    let items = props.items;
    let setItems = props.setItems;
    let index = items.findIndex(x => x._id == props.id);
    items[index].content = event.target.value;
    setChoice(event.target.value);
    setItems([...items]);
  }
  
  const imageChange = (value) => {
    let items = props.items;
    let setItems = props.setItems;
    let index = items.findIndex(x => x._id == props.id);
    items[index].content = value;
    setChoice(value);
    setItems([...items]);
  }


  const answerChange = (event) => {
    let setQuizAnswer = props.setAnswer;
    if (event.target.checked) {
      setAnswer(event.target.value);
      setQuizAnswer(event.target.value);
    }
    setIsAnswer(event.target.checked);
  }


  const sortStart = () => {
    let setSort = props.setSort;
    setSort(true);
  }

  const sortEnd = () => {
    let setSort = props.setSort;
    setSort(false);
  }

  return (
    <>
      <div className=' bg-slate-200 mb-1 flex w-full ' ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <div className='w-10 text-slate-500   cursor-grab flex justify-center items-center' onMouseEnter={sortStart} onMouseLeave={sortEnd}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><path fill="currentColor" d="M10 13a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm0-4a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm-4 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm5-9a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM7 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM6 5a1 1 0 1 1 0-2a1 1 0 0 1 0 2Z"></path></svg>
        </div>
        <div className='p-1 flex justify-center items-center gap-2'>

          {{
            choices:
              <input type="text" className='input input-bordered' name={props.id} value={choice} onChange={choiceChange} />,
            images:
              <ImageUpload defaultValue={choice} contentChange={imageChange} />
          }[props.type]
          }
          <div className='flex gap-2 mx-2'>
            <label htmlFor="isanswer" className='font-noto-sans'>ถูกต้อง</label>
            <input type="checkbox" id="isanswer" name="isanswer" value={choice} onChange={answerChange} checked={isAnswer}></input>
          </div>
        </div>
        <div onClick={props.deleteChoice} className='flex justify-center items-center text-red-500 cursor-pointer hover:text-red-300 text-3xl'>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 11h10v2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"></path></svg>
        </div>
        {props.last &&
          <div onClick={props.addChoice} className='flex justify-center items-center text-blue-500 cursor-pointer hover:text-blue-300 text-3xl'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"></path></svg>
          </div>
        }
      </div>

    </>
  )

}

export default ChoiceItem