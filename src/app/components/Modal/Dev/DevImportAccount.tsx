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

import Modal from '../';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Form/Button';
import Validation from 'components/Validation';
import Label from 'components/Form/Label';

interface State {
    privateKey: string;
    password: string;
}

const PRIVATE_KEY_LENGTH = 64;

class DevImportAccount extends Modal<
    void,
    { privateKey: string; password: string },
    State
> {
    public static className = ' ';

    state: State = {
        privateKey: '',
        password: ''
    };

    handlePrivateKeyChange: React.ChangeEventHandler<HTMLInputElement> = e =>
        this.setState({
            privateKey: e.target.value
        });

    handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = e =>
        this.setState({
            password: e.target.value
        });

    handleSubmit = () => {
        const { privateKey, password } = this.state;
        if (
            Validation.validators.password.validate(password) &&
            64 === privateKey.length
        ) {
            this.props.onResult({
                privateKey,
                password
            });
        }
    };

    render() {
        return (
            <ModalWindow
                title="Import account"
                width={400}
                controls={
                    <>
                        <Button
                            block
                            color="link"
                            onClick={this.props.onCancel}
                        >
                            Cancel
                        </Button>
                        <Button block onClick={this.handleSubmit}>
                            Create
                        </Button>
                    </>
                }
            >
                <Validation.components.ValidatedForm>
                    <Validation.components.ValidatedFormGroup for="privateKey">
                        <div>
                            <Label>Private key</Label>
                        </div>
                        <div>
                            <Validation.components.ValidatedControl
                                type="text"
                                name="privateKey"
                                value={this.state.privateKey}
                                onChange={this.handlePrivateKeyChange as any}
                                validators={[
                                    Validation.validators.required,
                                    Validation.validators.minlength(
                                        PRIVATE_KEY_LENGTH
                                    )
                                ]}
                            />
                        </div>
                        <div>
                            <Validation.components.ValidationMessage for="privateKey" />
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
                </Validation.components.ValidatedForm>
            </ModalWindow>
        );
    }
}
export default DevImportAccount;
