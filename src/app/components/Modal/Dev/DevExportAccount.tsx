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
    password: string;
}

class DevExportAccount extends Modal<void, string, State> {
    public static className = ' ';

    state: State = {
        password: ''
    };

    handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = e =>
        this.setState({
            password: e.target.value
        });

    handleSubmit = () => {
        const { password } = this.state;
        if (Validation.validators.password.validate(password)) {
            this.props.onResult(password);
        }
    };

    render() {
        return (
            <ModalWindow
                title="Export account"
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
                            Export
                        </Button>
                    </>
                }
            >
                <Validation.components.ValidatedForm>
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
export default DevExportAccount;
