import React from 'react'

const TextSub = ({text, length}) => {
    return (
        <span>
            {text.length > length ?
                `${text.substring(0, length)}...` : text
            }
        </span>
    )
}

export default TextSub
