const PersonForm = (props) => {
    return (
    <div>
        <form onSubmit={props.addNewName}>
        <div> name: 
          <input id ="name" value ={props.newName} onChange={props.handleNameChange}/>
        </div>

        <div> 
          number: <input id ="number" value ={props.newNumber} onChange={props.handleNumberChange} /> 
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
    )
}

export default PersonForm
