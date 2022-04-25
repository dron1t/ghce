import React from "react";

interface SetInput {
    setInput(arg: string): void;
    inputName: string;
}

interface InputTextState {
    textValue: string;
}

export default class InputText extends React.Component<SetInput, InputTextState> {

    constructor(props: SetInput) {
        super(props);
        this.state = {textValue: ""}
    }

    setInputText = (arg: React.FormEvent<HTMLInputElement>) : void => {
        this.props.setInput(arg.currentTarget.value);
        this.setState({textValue: arg.currentTarget.value})
    }

    render() {
        return (
            <div className={"search-row"}>
                <input type={"number"} value={this.state.textValue} name={this.props.inputName} onChange={this.setInputText} />
            </div>
        );
    }
}
