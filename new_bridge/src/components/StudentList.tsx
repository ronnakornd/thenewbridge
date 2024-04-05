import React from 'react'

function StudentList({students}) {
  return (
    <>
    {students.map(student =>
       {
        return (
            <div className="flex w-3/4 items-center justify-between gap-2 bg-stone-300 p-2">
            <div className="flex items-center w-2/4 gap-2">
            <img
              className="w-10 h-10 rounded-full border border-2 border-stone-600"
              src={student.attributes.profileImage.data?
                import.meta.env.VITE_DOMAIN +
                student.attributes.profileImage.data.attributes.url:"/images/profile.jpg"
            }
            ></img>
            <p>{`${student.attributes.firstName} ${student.attributes.lastName}`}</p>
            </div>
            <div className='flex items-center gap-2  w-full gap-1'>
            <div className='w-full flex items-center gap-1'><progress className="progress" value={10} max="100"></progress> <p>{10}%</p></div>
            <div className='btn btn-sm'>ดูผลการเรียน</div>
            </div>
          </div>

        )
       }
    )
    }
    </>
  )
}

export default StudentList