import React, {useState} from "react"

function Movie(props) {
    const {title, genre, _id} = props
    const [editMode, setEditMode] = useState(false)

    const [editedMovie, setEditedMovie] = useState({
        title,
        genre
    })

    function handleMovieEdit(event) {
        const {name, value} = event.target
        setEditedMovie(preEditedMovie => ({
            ...preEditedMovie,
            [name]: value
        }))
    }

    function changeEditMode() {
        setEditMode(prevEditMode => !prevEditMode)
        // console.log(editMode)
    }

    function saveEdits() {
        props.handleEdit(_id, editedMovie)
        setEditMode(prevEditMode => !prevEditMode)
    }
    return(
        <div className="movie">
            { !editMode ?
                <>
                    <h1>{title}</h1>
                    <p>{genre}</p>
                    <button onClick={() => props.deleteMovie(_id)} className="delete-btn">Delete</button>
                    <button onClick={changeEditMode}>Edit</button>
            </> :
            <>
                <input 
                    type="text"
                    name="title"
                    value={editedMovie.title}
                    onChange={handleMovieEdit}
                />
                <input 
                    type="text"
                    name="genre"
                    value={editedMovie.genre}
                    onChange={handleMovieEdit}
                />
                <button onClick={saveEdits}>Save Edits</button>
            </>
            }
        </div>
    )
}

export default Movie