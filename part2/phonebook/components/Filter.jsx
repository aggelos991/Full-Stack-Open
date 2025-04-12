const Filter = (props) => {
  return (
    <div>
      filter shown with: <input id ="filter" 
      value={props.filter} 
      onChange={props.handleFilterChange} />
    </div>
  )
}

export default Filter