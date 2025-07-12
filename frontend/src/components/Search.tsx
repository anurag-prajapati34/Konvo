import React from 'react'
import {Factory, ScanSearch, SearchCheck, SearchCodeIcon, SearchIcon} from 'lucide-react'
const Search = () => {
  return (
    <div className=' rounded-full overflow-hidden px-3 py-1 bg-[var(--bg-color)] h-10 flex justify-between items-center '>
        <input  placeholder='Search your friends' className='h-full flex-1  outline-none border-none'/>
     
        <SearchIcon size={20} color='black'/>

    </div>
  )
}

export default Search