const Total = ({course}) => (
    <p>
      <b>total of {course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</b>
    </p>
  )

  export default Total