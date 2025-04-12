const Persons = (props) => {
  return (
    <ul>
      {props.personsToShow.map((person, index) => (
        <li key={index}>
          {person.name} {person.number} 
          <button onClick={() => props.deletePerson(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  )
}

export default Persons