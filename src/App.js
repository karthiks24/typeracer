import React, {Component, Fragment} from 'react';
import './App.css';
import {fetchText} from './Redux/ActionCreator'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading-bar'

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            staticText: 'hhh',
            inputText: '',
            completed: false,
            loading: this.props.loading

        }
    }

    componentDidMount(){
        this.props.apiCall();
    }
    componentWillReceiveProps(props){
        this.setState({
            staticText: props.text
        })
    }

    handleInputChange = event => {
        const value = event.target.value;
        console.log(value)
        const {staticText = ''} = this.state;
        const lastLetter = value[value.length - 1];

        if (staticText === value) {
            // End of word, time to reset input
            console.log('inside')
            this.setState(
                {

                    inputText: value,
                    done: value === staticText
                }
            );
            return;
        }
        this.setState({
            inputText: value
        });
    }

    render() {
        const {
            staticText = "",
            inputText = "",
            completed
        } = this.state;
        const activeText = staticText.slice(0, inputText.length) || "";
        let inActiveText = staticText.slice(
            inputText.length,
            staticText.length
        );

        let activeMatching = "";
        let matchFound = true;

        [...activeText].forEach((letter, index) => {
            if (matchFound && letter === inputText[index]) {
                activeMatching += letter;
            } else {
                matchFound = false;
            }
        });

        const activeNotMatching = activeMatching
            ? activeText.split(activeMatching)[1]
            : activeText;

        return (
            <div className="App">
                { this.props.text ? this.props.text.length > 1?

                    <Fragment>
                !completed && <div>Type the below Words</div>
                <div>
                <p>
                    <span className=" matching-string">{activeMatching}|</span>
                    <span className=" not-matching-string">{activeNotMatching}</span>
                    <span className="inactive-string">{inActiveText}</span>
                </p>
                </div>
                <div>
                    { completed? <span>"You have completed the Race"</span>:
                    <textarea
                        className="text-input"
                        value={this.state.inputText}
                        onChange={this.handleInputChange}
                        placeholder="Please type here"
                    />}
                </div>
                    </Fragment>:'':''
                    }
            </div>
        );
    }
}
const mapStateToProps = (state) => (
    {text: state.text,
     loading: state.loading})
const mapDispatchToProps = (dispatch) => ({


    apiCall: () => {
        dispatch(fetchText());
    }

})

export default connect(mapStateToProps,mapDispatchToProps) (App);
