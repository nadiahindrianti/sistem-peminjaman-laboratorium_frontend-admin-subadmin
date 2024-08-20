import {FiSearch} from 'react-icons/fi'
const Searching = ({value, onChange}) => {

    return (
        <>
        <div className="d-flex align-items-center py-2 px-3 border rounded-2">
            <FiSearch/>
            <input
                type="text"
                placeholder="Search"
                value={value}
                onChange={onChange}
                style={{border: 'none', outline: 'none', backgroundColor: 'white'}} 
                className='px-3'/>
        </div>
        </>
    )
}
export default Searching