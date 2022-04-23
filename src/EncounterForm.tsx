import React from "react";
import InputText from "./InputText";

interface EncounterFormProps {
    type: string
}

interface EncounterState {
    encounters: Array<string>
    originalEncounters: Array<string>
    inputValue: string
}

export default class EncounterForm extends React.Component<EncounterFormProps, EncounterState> {

    daysToExpirePart: string = ";" + new Date(2147483647 * 1000).toUTCString();

    constructor(props: EncounterFormProps) {
        super(props);
        let cookies = document.cookie
        let encounters = []
        if (cookies) {
            let encountersArr = cookies.split(";");
            let encountersStr = "";

            let searchedEncounter = encountersArr.filter(f => f.indexOf(this.props.type) > -1);
            if (searchedEncounter.length > 0) {
                encountersStr = searchedEncounter[0].substring((this.props.type + "=").length);
                encountersStr = encountersStr.replaceAll("=", "");
                encounters = JSON.parse(encountersStr);
            }
        }
        this.state = {encounters: encounters, inputValue: "", originalEncounters: encounters}
    }

    getEncounters(): Array<string> {
        return this.state.encounters;
    }

    search = (e: any): void => {
        e.stopPropagation();
        if (this.state.inputValue && +this.state.inputValue > 0) {
            this.setState({encounters: this.state.originalEncounters.filter(k => k === this.state.inputValue)})
        } else {
            this.setState({encounters: this.state.originalEncounters})
        }
    }

    add = (): void => {
        if (this.state.inputValue && +this.state.inputValue > 0) {
            const encounters = this.state.originalEncounters;
            encounters.push(this.state.inputValue);
            encounters.sort();
            this.setState({encounters: encounters, originalEncounters: encounters})
            document.cookie = this.props.type + "=" + JSON.stringify(encounters) + this.daysToExpirePart;
        } else {
            this.setState({encounters: this.state.originalEncounters})
        }
    }

    setValue = (arg: string): void => {
        this.setState({inputValue: arg});
    }

    remove = (arg: string) : void => {
        let index = this.state.originalEncounters.indexOf(arg, 0)
        if (index > -1) {
            let encounters = this.state.originalEncounters;
            encounters.splice(index, 1);
            this.setState({encounters: encounters, originalEncounters: encounters});
            document.cookie = this.props.type + "=" + JSON.stringify(encounters) + this.daysToExpirePart;
        }
    }

    render() {
        return (
            <div className={"panel-inner"}>
                <div className={"panel-actions"}>
                    <InputText setInput={this.setValue}></InputText>
                    <button type={"button"} onClick={this.search}>Search</button>
                    <button type={"button"} onClick={this.add}>Add</button>
                </div>


                    {this.getEncounters().map(s => {
                        return (<div className="row"> <span className={"row-content"}> {s} </span> <button className={"remove-btn"} type={"button"} onClick={() => this.remove(s)}>-</button> </div>)
                    })}

            </div>
        );
    }
}
