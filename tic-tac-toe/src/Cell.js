export default function Cell({value, id, updateCell, winner}){

   const handleClick = () => {
    if(value === ""){
        updateCell(id)
    }
   }

    return <div className="square" onClick={handleClick}>{`${value}`}</div>
}