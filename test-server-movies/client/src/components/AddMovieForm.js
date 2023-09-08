import React, {useState} from "react"

function AddMovieForm(props) {
    const initInputs = {title: "", genre: ""}
    const [inputs, setInputs] = useState(initInputs)

    function handleChange(event) {
        const {name, value} = event.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    }

    function handleSubmit(event) {
        event.preventDefault()
        // post request function witht the new object, so pass in inputs
        props.addMovie(inputs)
        // reset the initial inputs
        setInputs(initInputs) 
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Title"
            />
            <input 
            type="text"
            name="genre"
            value={inputs.genre}
            onChange={handleChange}
            placeholder="Genre"
            />
            <button>Add Movie</button>
        </form>
    )
}

export default AddMovieForm