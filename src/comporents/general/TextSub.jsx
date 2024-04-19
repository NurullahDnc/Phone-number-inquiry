import React from 'react'

const TextSub = ({text, length}) => {
    return (
        <div>
            {text.length > length ?
                `${text.substring(0, length)}...` : text
            }
        </div>
    )
}

export default TextSub
