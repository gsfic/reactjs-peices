import React, { Component } from 'react';
import './App.scss';


const App1 = (props) => {
    const {name} = props;
    return (
        <div>
            Hello 1 {name}
        </div>        
    );
}

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            counter: 0
        };
    }

    
    componentDidMount() {
        setInterval(() => {
            this.setState((prevState) => ({
                counter: prevState.counter + 1,
            }))
        }, 1000)
        
    }


    render() {
        const {counter} = this.state;
        return (
            <div>
                Number of seconds : {counter}
            </div>
        );
    }
}

class DeleteItem extends Component {

    constructor(props) {
        super(props);
        this.deleteToDo = this.deleteToDo.bind(this);
        this.deletingItem = this.deletingItem.bind(this);
        this.state = {
            deletedItem: 0
        }
        
    }
    deleteToDo() {
        // make a separate copy of the array
        
        this.props.deletingItem(this.state.deletedItem);
    }


    deletingItem(e) {
        this.setState({
            deletedItem: e.target.value
        })
    }
    
    render() {
        const {todos} = this.props;
        return (
            <div>
                <input onChange={this.deletingItem} type="number" min="0" max="100"/>
                <button onClick={this.deleteToDo}>Delete</button>
            </div>
        );
    }
}
class UnorderedList extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {todos} = this.props;
        return (
            <div>
                <ul>
                    {
                        todos.map((todo, i) => (
                            <li key={i}>{i+1} - {todo}</li>
                        ))
                    }
                    
                    
                </ul>
            </div>
        );
    }
}

class InteractionInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            valueInput: ''
        }
        this.inputChanged = this.inputChanged.bind(this);
        this.addToDo = this.addToDo.bind(this);
        
    }

    addToDo() {
        
        this.props.inputChanged(this.state.valueInput);
    }

    
    inputChanged(e) {
        this.setState({
            valueInput: e.target.value
        });
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.inputChanged} />
                <button value="" onClick={this.addToDo}>Add To Do</button>
            </div>
        );
    }
}

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.inputChanged = this.inputChanged.bind(this);
        this.deletingItem = this.deletingItem.bind(this);
    }

    inputChanged(item) {
        this.setState({
            todos: this.state.todos.concat([item])
        });
    }
    deletingItem(index) {
        var array = [...this.state.todos];
        array.splice(index, 1);
        this.setState({todos: array});
    }
    
    render() {
        const {todos} = this.state;
        return (
            <div>
                <UnorderedList todos={todos} />
                <InteractionInput  inputChanged={this.inputChanged}/>
                <DeleteItem deletingItem={this.deletingItem}/>
            </div>
        );
    }
}



class App extends Component {
  constructor() {
        super();
        this.state = {
            customers: []
        }

    }

    componentDidMount() {
        let whenCustomersLoaded = fetch('http://localhost:8082/api/customers');
        whenCustomersLoaded.then(res => res.json());
        whenCustomersLoaded.then(customers => this.setState({customers}));
    }
    
    render() {
        return (
            <div>
	    		
	    		Hello All...
                <App1 name="Amine TABOU" />
                <Counter />

			    <ToDoList />
			</div>
        );
    }
}

export default App;
