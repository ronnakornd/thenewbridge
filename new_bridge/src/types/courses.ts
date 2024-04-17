interface UserType {
    id: Number,
    attributes: {
        firstName: String,
        lastName: String,
        nickName: String,
    }
}

interface CourseType {
    id: number;
    attributes: {
          name:String,
          subject:String,
          description:String,
          lessons: {
             data:LessonType[]
          },
          editors: {
             data:UserType[]
          }
    };
  }
  interface LessonType {
     id: number,
     attributes: {
       name:String,
       modules: {
          data: ModuleType[]
       }
     }
  }

  interface ModuleType {
     id:Number,
     attributes: {
        name:String,
        type:String,
        content:String,
        description:String,
        resource: {
           data: FileType[]
        },
        video: {
          data: FileType
        }
     }
  }

  interface FileType {
     id: Number,
     attributes: {
        name: String,
        url: String
     }
  }

export type {CourseType,LessonType,ModuleType}