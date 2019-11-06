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

import React from 'react';
import Validation from 'components/Validation';
import Label from 'components/Form/Label';
import Button from 'components/Form/Button';

interface Props {
    onProcess: (params: {
        password: string;
        email: string;
        name: string;
    }) => void;
    onProcessExternal: (password: string) => void;
}

interface State {
    useExternal: boolean;
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

class AccountForm extends React.Component<Props, State> {
    state: State = {
        useExternal: true,
        password: '',
        passwordConfirmation: '',
        name: '',
        email: ''
    };

    isFilled = () => {
        if (this.state.useExternal) {
            return Boolean(
                this.state.password.length &&
                    this.state.passwordConfirmation.length
            );
        } else {
            return Boolean(
                this.state.name.length &&
                    this.state.password.length &&
                    this.state.passwordConfirmation.length &&
                    this.state.email.length
            );
        }
    };

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.target.value
        });
    };

    handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: e.target.value
        });
    };

    handlePasswordConfirmationChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        this.setState({
            passwordConfirmation: e.target.value
        });
    };

    handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value
        });
    };

    handleUseExternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            useExternal: e.target.checked
        });
    };

    handleSubmit = (params: { [key: string]: any }) => {
        if (this.state.useExternal) {
            this.props.onProcessExternal(this.state.password);
        } else {
            this.props.onProcess({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            });
        }
    };

    render() {
        return (
            <Validation.components.ValidatedForm
                onSubmitSuccess={this.handleSubmit}
            >
                <Validation.components.ValidatedFormGroup
                    for="name"
                    disabled={this.state.useExternal}
                >
                    <div>
                        <Label disabled={this.state.useExternal}>Name</Label>
                    </div>
                    <div>
                        <Validation.components.ValidatedControl
                            disabled={this.state.useExternal}
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleNameChange as any}
                            placeholder="Name Surname"
                            validators={
                                this.state.useExternal
                                    ? []
                                    : [Validation.validators.required]
                            }
                        />
                    </div>
                    <div>
                        <Validation.components.ValidationMessage for="name" />
                    </div>
                </Validation.components.ValidatedFormGroup>
                <Validation.components.ValidatedFormGroup
                    for="email"
                    disabled={this.state.useExternal}
                >
                    <div>
                        <Label disabled={this.state.useExternal}>Email</Label>
                    </div>
                    <div>
                        <Validation.components.ValidatedControl
                            disabled={this.state.useExternal}
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleEmailChange as any}
                            placeholder="your_email@mail.com"
                            validators={
                                this.state.useExternal
                                    ? []
                                    : [Validation.validators.required]
                            }
                        />
                    </div>
                    <div>
                        <Validation.components.ValidationMessage for="email" />
                    </div>
                </Validation.components.ValidatedFormGroup>
                <Validation.components.ValidatedFormGroup for="password">
                    <div>
                        <Label>Password</Label>
                    </div>
                    <div>
                        <Validation.components.ValidatedControl
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange as any}
                            validators={[
                                Validation.validators.required,
                                Validation.validators.password
                            ]}
                        />
                    </div>
                    <div>
                        <Validation.components.ValidationMessage for="password" />
                    </div>
                </Validation.components.ValidatedFormGroup>
                <Validation.components.ValidatedFormGroup for="passwordConfirmation">
                    <div>
                        <Label>Repeat password</Label>
                    </div>
                    <div>
                        <Validation.components.ValidatedControl
                            key={`COMPARE_${this.state.password}`}
                            type="password"
                            name="passwordConfirmation"
                            value={this.state.passwordConfirmation}
                            onChange={
                                this.handlePasswordConfirmationChange as any
                            }
                            validators={[
                                Validation.validators.compare(
                                    this.state.password
                                )
                            ]}
                        />
                    </div>
                    <div>
                        <Validation.components.ValidationMessage for="passwordConfirmation" />
                    </div>
                </Validation.components.ValidatedFormGroup>

                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <Validation.components.ValidatedFormGroup for="useExternal">
                        <Validation.components.ValidatedCheckbox
                            name="useExternal"
                            onChange={this.handleUseExternalChange}
                            checked={this.state.useExternal}
                            title="Use LuxTrust validation"
                        />
                    </Validation.components.ValidatedFormGroup>
                </div>

                <Button disabled={!this.isFilled()} type="submit" block>
                    Continue
                </Button>
            </Validation.components.ValidatedForm>
        );
    }
}

export default AccountForm;
