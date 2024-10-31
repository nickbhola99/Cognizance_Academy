import React, {useState} from 'react'
import ReactCardFlip from 'react-card-flip'
import "./FlashCardComponent.css"
//uses ReactCardFlip to create a flippable flashcard
export const FlashCard = ({props}) => {   
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
            <div className='card front' onClick={handleClick}>
                <h2>{props.title}</h2>
            </div>
            <div className='card back' onClick={handleClick}>
                <h2>{props.backInfo}</h2>
            </div>
        </ReactCardFlip>
    )
}