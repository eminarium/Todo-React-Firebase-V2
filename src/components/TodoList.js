import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    TextField,
    List,
    Container
} from '@material-ui/core'
import Todo from './Todo'
import '../App.css';
import db from '../firebase'
import firebase from 'firebase'

function TodoList(props) {

    const { listId } = useParams();

    const IMG_SRC = 'https://source.unsplash.com/random'
    //const list = props.location.state.list
    const [list, setList] = useState(null)
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const myList = db.collection('lists').doc(listId);

        myList.get().then(snapshot => setList(snapshot.data()))

        myList.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setTodos(snapshot.docs.map(doc =>
                ({
                    id: doc.id,
                    complete: doc.data().complete,
                    task: doc.data().task
                })
            ))
        })
    }, [listId])

    const addTodo = (event) => {
        // Prevent default behaviour of a form (Prevent page refresh)
        event.preventDefault();

        // Add current value of input as a new todo
        db.collection('lists').doc(listId).collection('todos').add({
            task: input,
            complete: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        // Clear up input field after submit
        setInput('');
    }

    return (
        <div>
            <div
                className="App"
                style={{
                    backgroundImage: `url(${IMG_SRC})`,
                    opacity: 0.8,
                    zIndex: -1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }}
            />
            <Container
                maxWidth="sm"
            >
                <br/>
                <h1>{list ? list.title : null}</h1>
                <br/>
                <form onSubmit={addTodo}>
                    <TextField
                        value={input}
                        placeholder="Add a task..."
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        fullWidth
                        onChange={(event) => setInput(event.target.value)}
                        style={{ backgroundColor: 'whitesmoke', padding: 10, borderRadius: 5 }}
                    />
                </form>
                <br/>
                {
                    // Show corresponding header if there are incomplete tasks
                    (todos.filter(todo => todo.complete === false).length > 0) ?
                        <h3>Things Yet To do</h3>
                        :
                        null
                }

                <List>
                    {
                        // List only not yet completed tasks
                        todos.map(todo => (
                            !todo.complete ?
                                <Todo key={todo.id} todo={todo} listId={listId} />
                                :
                                null
                        ))
                    }
                </List>

                {
                    // Show corresponding header if there are completed tasks
                    (todos.filter(todo => todo.complete === true).length > 0) ?
                        <h3>Completed Tasks</h3>
                        :
                        null
                }

                <List>
                    {
                        // List only completed tasks
                        todos.map(todo => (
                            todo.complete ?
                                <Todo key={todo.id} todo={todo} listId={listId} />
                                :
                                null
                        ))
                    }
                </List>
            </Container>
        </div>
    );
}

export default TodoList;
