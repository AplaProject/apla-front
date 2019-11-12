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
import { Validator } from './Validators';
import * as propTypes from 'prop-types';

import themed from 'components/Theme/themed';
import ValidatedForm, { IValidatedControl } from './ValidatedForm';

export interface IValidatedCheckboxProps {
    validators?: Validator[];
    name: string;
    title?: React.ReactNode;
    className?: string;
    defaultChecked?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    checked?: boolean;
    disabled?: boolean;
}

interface IValidatedCheckboxState {
    checked: boolean;
}

class ValidatedCheckbox
    extends React.Component<IValidatedCheckboxProps, IValidatedCheckboxState>
    implements IValidatedControl {
    constructor(props: IValidatedCheckboxProps) {
        super(props);

        this.state = {
            checked: props.checked || props.defaultChecked || false
        };
    }

    componentDidMount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._registerElement(this);
        }
    }

    componentWillUnmount() {
        if (this.context.form) {
            (this.context.form as ValidatedForm)._unregisterElement(this);
        }
    }

    componentWillReceiveProps(props: IValidatedCheckboxProps) {
        if (this.props.checked !== props.checked) {
            this.setState({
                checked: props.checked
            });
            (this.context.form as ValidatedForm).updateState(
                props.name,
                props.checked
            );
        }
    }

    getValue() {
        return this.state.checked;
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            checked: e.target.checked
        });

        if (this.props.onChange) {
            this.props.onChange(e);
        }

        (this.context.form as ValidatedForm).emitUpdate(
            this.props.name,
            String(e.target.checked)
        );
    };

    onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        (this.context.form as ValidatedForm).updateState(this.props.name);

        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };

    render() {
        return (
            <div
                className={this.props.className}
            >
                <label>
                    <input
                        type="checkbox"
                        name={this.props.name}
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        checked={this.state.checked}
                        disabled={this.props.disabled}
                    />
                    <em className="fa fa-check" />
                    <span className="checkbox__label">{this.props.title}</span>
                </label>
            </div>
        );
    }
}

(ValidatedCheckbox as React.ComponentClass).contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};

export default themed(ValidatedCheckbox)`
    & input {
        position: absolute;
        top: -999999px;
        left: -999999px;
    }

    & input:checked + .fa.fa-check {
        background: #f2f0ed;

        &:before {
            visibility: visible;
        }
    }

    & .fa.fa-check {
        width: 18px;
        height: 18px;
        border-radius: 4px;
        border: solid 1px #7a623e;
        background: #fff;
        text-align: center;
        
        &:before {
            color: #7a623e;
            visibility: hidden;
            font-size: 12px;
        }
    }

    & .checkbox__label {
        margin-left: 10px;
        font-size: 13px;
        font-weight: 400;
    }
`;