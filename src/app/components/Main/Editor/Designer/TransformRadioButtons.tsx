// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

import * as React from 'react';
import RadioButton from './RadioButton';

import imgLowercase from 'images/constructor/tt-lower.svg';
import imgUppercase from 'images/constructor/tt-upper.svg';

interface IRadioButtonsProps {
    onSelect?: any;
    initialValue?: string;
}

interface IRadioButtonsState {
    value: string;
    initialValue?: string;
}

export default class RadioButtons extends React.Component<IRadioButtonsProps, IRadioButtonsState> {

    constructor(props: IRadioButtonsProps) {
        super(props);
        this.state = {
            value: props.initialValue || ''
        };
    }

    componentWillReceiveProps(props: IRadioButtonsProps) {
        if (this.state.value !== props.initialValue) {
            this.setState({
                value: props.initialValue
            });
        }
    }

    render() {
        return (
            <div>
                <RadioButton value="uppercase" onClick={this.selectRadio.bind(this, 'uppercase')} selectedValue={this.state.value}>
                    <img src={imgUppercase} title="UPPERCASE" />
                </RadioButton>
                <RadioButton value="lowercase" onClick={this.selectRadio.bind(this, 'lowercase')} selectedValue={this.state.value}>
                    <img src={imgLowercase} title="lowercase" />
                </RadioButton>
            </div>
        );
    }
    selectRadio(value: string) {
        let newValue: string = (value === this.state.value ? '' : value);
        this.setState({
            value: newValue
        });
        if (this.props.onSelect) {
            this.props.onSelect(newValue);
        }
    }
}
