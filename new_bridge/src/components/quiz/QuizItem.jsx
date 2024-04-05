import React, { useState, useEffect } from 'react'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import QuillEditor from '../QuillEditor';
import Choices from './Choices';
function QuizItem(props) {
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

    const [name, setName] = useState(props.name);
    const [type, setType] = useState(props.type);
    const [answerDescription , setAnswerDescription] = useState(props.answerDescription);
    const [choices, setChoices] = useState(props.choices);
    const [answer, setAnswer] = useState(props.answer);
    const showDeleteModal = props.delete;

    const questionChange = (value) => {
        let items = props.items;
        let setItems = props.setItems;
        let index = items.findIndex(x => x._id == props.id);
        items[index].question = value;
        setName(value);
        setItems([...items]);
    }


    const choicesChange = (value) => {
        let items = props.items;
        let setItems = props.setItems;
        let index = items.findIndex(x => x._id == props.id);
        items[index].choices = value;
        setChoices([...value]);
        setItems([...items]);
    }

    const answerChange = (value) => {
        let items = props.items;
        let setItems = props.setItems;
        let index = items.findIndex(x => x._id == props.id);
        items[index].answer = value;
        setAnswer(value);
        setItems([...items]);
    }

    const answerDescriptionChange = (value) => {
        let items = props.items;
        let setItems = props.setItems;
        let index = items.findIndex(x => x._id == props.id);
        items[index].answerDescription = value;
        setAnswerDescription(value);
        setItems([...items]);
    }

    const typeChange = (event) => {
        let value = event.target.value;
        let items = props.items;
        let setItems = props.setItems;
        let index = items.findIndex(x => x._id == props.id);
        items[index].type = value;
        setType(value);
        setItems([...items]);
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
            <div className=' bg-slate-200 mb-1 flex justify-between  w-12/12 rounded-lg' ref={setNodeRef} style={style} {...attributes} {...listeners}>
                <div className='w-10 text-white  bg-slate-600 cursor-grab flex justify-center items-center rounded-lg' onMouseEnter={sortStart} onMouseLeave={sortEnd}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><path fill="currentColor" d="M10 13a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm0-4a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm-4 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2Zm5-9a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM7 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0ZM6 5a1 1 0 1 1 0-2a1 1 0 0 1 0 2Z"></path></svg>
                </div>
                <div className='p-2 flex flex-col gap-1'>
                    <label htmlFor="" className='font-noto-sans'>คำถาม</label>
                    <QuillEditor defaultValue={name} contentChange={questionChange} />
                    <label htmlFor="" className='font-noto-sans'>ประเภท</label>
                    <select className='select select-bordered font-noto-sans' value={type} onChange={typeChange} name={props.type} id="">
                        <option value="choices" >ตัวเลือก</option>
                        <option value="text" >เติมคำ</option>
                        <option value="images">รูปภาพ</option>
                    </select>
                    <label htmlFor="" className='font-noto-sans'>คำตอบ</label>
                    {{
                        choices:
                            <Choices choice={choices} answer={answer} setChoices={choicesChange} setAnswer={answerChange} type={type} />,
                        text:
                            <>
                                <input className='input input-bordered' value={answer} onChange={(e) => answerChange(e.target.value)} type="text" /></>,
                        images:
                            <Choices choice={choices} answer={answer} setChoices={choicesChange} setAnswer={answerChange} type={type} />
                    }[type]
                    }
                    <label htmlFor="" className='font-noto-sans'>คำอธิบายคำตอบ</label>
                    <QuillEditor defaultValue={answerDescription} contentChange={answerDescriptionChange} />
                </div>
                <div  className='h-full flex p-1  justify-center items-center text-red-400 cursor-pointer hover:text-red-300 text-3xl'>
                <svg onClick={() => showDeleteModal(props.id)} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z"></path></svg>
                </div>
            </div>

        </>
    )
}

export default QuizItem