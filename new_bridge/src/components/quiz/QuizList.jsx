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
import QuizItem from './QuizItem';

function QuizList(props) {
  const [quiz, setQuiz] = useState(props.quiz ? props.quiz : []);
  const itemIds = useMemo(() => quiz.map((item) => item._id), [quiz]);
  const [deletedQuiz, setDeletedQuiz] = useState("");
  const [sort, setSort] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const toggleSort = () => {
    let currentSort = sort;
    setSort(!currentSort);
  }

  useEffect(() => {
    setQuiz(props.quiz ? props.quiz : []);
  }, [props.quiz])


  const itemChange = (value) => {
    let setContent = props.setContent;
    setContent({ ...props.content, quiz: [...value] });
  }

  const showDeleteModal = (item_id) => {
    let currentQuiz = quiz;
    let index = currentQuiz.findIndex(x => x._id === item_id);
    setDeletedQuiz(quiz[index]);
    window.deleteModal.showModal();
  }

  const deleteQuestion = (item_id) => {
    let setContent = props.setContent;
    let currentQuiz = quiz;
    let index = currentQuiz.findIndex(x => x._id === item_id);
    currentQuiz.splice(index, 1);
    setContent({ ...props.content, quiz: [...currentQuiz] });
  }

  return (
    <div className='mt-5'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={itemIds}
          strategy={verticalListSortingStrategy}
        >
          {quiz.map((item) => <QuizItem key={item._id} id={item._id}
            name={item.question}
            type={item.type}
            choices={item.choices}
            answer={item.answer}
            answerDescription={item.answerDescription}
            delete={showDeleteModal} setItems={itemChange}
            items={quiz} sort={sort} setSort={setSort} />)}
        </SortableContext>
      </DndContext>
      <dialog id="deleteModal" className="modal font-noto-sans modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold  text-lg">ลบคำถาม</h3>
          <div className="py-4 prose" dangerouslySetInnerHTML={{ __html: deletedQuiz.question }}></div>
          <div className="modal-action">
            <button className="btn-danger" onClick={() => deleteQuestion(deletedQuiz._id)}>Delete</button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setQuiz((items) => {
        const oldIndex = items.findIndex(x => x._id == active.id);
        const newIndex = items.findIndex(x => x._id == over.id);
        let newArray = arrayMove(items, oldIndex, newIndex);
        let setContent = props.setContent;
        setContent({ ...props.content, quiz: [...newArray] });
        return newArray;
      });
    }
  }
}

export default QuizList