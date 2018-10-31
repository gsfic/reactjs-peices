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
            }), () => console.log('Counter updated...'))
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

class UnorderedList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: ['To Do 1', 'To Do 2', 'To Do 3', 'To Do 4', 'To Do 5']
        }
    }
    
    render() {
        const {todos} = this.state;
        return (
            <div>
                <ul>
                    {
                        todos.map((todo, i) => (
                            <li key={i}>{todo}</li>
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
    }

    addToDo() {
        console.log('Adding to do ...');
    }
    inputChanged(e) {
        console.log('Input changed ' + e.target.value);
        this.props.inputChanged(e.target.value);
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
    state = {
        todos: []
    }

    inputChanged(item) {
        this.state.todos.push(item);
    }
    render() {
        return (
            <div>
                <UnorderedList inputChanged={this.inputChanged} />
                <InteractionInput />
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
        whenCustomersLoaded.then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
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
