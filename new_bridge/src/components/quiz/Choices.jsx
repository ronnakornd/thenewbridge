import React, { useEffect, useState, useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ChoiceItem from './ChoiceItem';

function Choices(props) {
  const [choice, setChoice] = useState(props.choice ? props.choice : []);
  const [answer, setAnswer] = useState(props.answer ? props.answer : "");
  const itemIds = useMemo(() => choice.map((item) => item._id), [choice]);
  const [sort, setSort] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setChoice(props.choice ? props.choice : [{ _id: Math.random(), content: "", type: "text" }]);
    setAnswer(props.answer ? props.answer : "");
  }, [props.choice, props.answer])


  const itemChange = (value) => {
    let setChoices = props.setChoices;
    setChoices([...value]);
  }

  const deleteChoice = (item_id) => {
    let setChoices = props.setChoices;
    let currentChoices = choice;
    let index = currentChoices.findIndex(x => x._id === item_id);
    currentChoices.splice(index, 1);
    setChoices([...currentChoices]);
  }

  const addChoice = () => {
    let setChoices = props.setChoices;
    let currentChoices = choice;
    currentChoices.push({ _id: Math.random(), content: "", type: "text" });
    setChoices([...currentChoices]);
  }

  return (
    <div className='mt-1'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={itemIds}
          strategy={verticalListSortingStrategy}
        >
          {choice.map((item,index) => <ChoiceItem key={item._id} id={item._id}
            content={item.content}
            type={props.type}
            answer={props.answer}
            setAnswer={props.setAnswer}
            last={index+1 == choice.length? true:false}
            delete={() => deleteChoice(item._id)} setItems={itemChange}
            items={choice} sort={sort} setSort={setSort} 
            addChoice={addChoice} deleteChoice={()=>deleteChoice(item._id)}
            />)}
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setChoice((items) => {
        const oldIndex = items.findIndex(x => x._id == active.id);
        const newIndex = items.findIndex(x => x._id == over.id);
        let newArray = arrayMove(items, oldIndex, newIndex);
        let setChoices = props.setChoices;
        setChoices([...newArray]);
        return newArray;
      });
    }
  }
}

export default Choices