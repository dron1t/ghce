import React from "react";

interface SetInput {
    setInput(arg: string): void;
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
        console.log(arg.currentTarget.value)
        this.props.setInput(arg.currentTarget.value);
        this.setState({textValue: arg.currentTarget.value})
    }

    render() {
        return (
            <div className={"search-row"}>
                <input type={"number"} value={this.state.textValue} name={"encounter"} onChange={this.setInputText} />
            </div>
        );
    }
}
