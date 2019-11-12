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
import { FormattedMessage } from 'react-intl';
import keyring from 'lib/keyring';

import Modal from '../';
import Validation from 'components/Validation';
import ModalWindow from 'containers/Modal/ModalWindow';
import ValidatedForm from 'components/Validation/ValidatedForm';
import Button from 'components/Form/Button';
import Label from 'components/Form/Label';

interface Params {
    encKey: string;
}

interface Result {
    oldPassword: string;
    newPassword: string;
}

interface State {
    newPassword: string;
    newPasswordKey: string;
    newPasswordRepeat: string;
}

class AuthChangePasswordModal extends Modal<Params, Result, State> {
    public static className = ' ';

    state: State = {
        newPassword: '',
        newPasswordKey: Math.random().toString(),
        newPasswordRepeat: ''
    };

    private _form: ValidatedForm;

    handleSubmit = () => {
        const form = this._form.validateAll();

        if (!form.valid) {
            return;
        }

        const privateKey = keyring.decryptAES(
            this.props.params.encKey,
            form.payload.password_old.value
        );

        if (!keyring.validatePrivateKey(privateKey)) {
            this.props.notify('INVALID_PASSWORD', {});
        } else {
            this.props.onResult({
                oldPassword: form.payload.password_old.value,
                newPassword: form.payload.password_new.value
            });
        }
    };

    onNewPasswordChange = (value: string) => {
        this.setState({
            newPassword: value,
            newPasswordKey: Math.random().toString()
        });
    };

    onNewPasswordRepeatChange = (value: string) => {
        this.setState({
            newPasswordRepeat: value
        });
    };

    render() {
        return (
            <ModalWindow
                title={
                    <FormattedMessage
                        id="auth.password.change"
                        defaultMessage="Change password"
                    />
                }
                width={500}
                controls={
                    <>
                        <Button
                            block
                            color="link"
                            onClick={this.props.onCancel}
                        >
                            <FormattedMessage
                                id="cancel"
                                defaultMessage="Cancel"
                            />
                        </Button>
                        <Button block onClick={this.handleSubmit}>
                            <FormattedMessage
                                id="confirm"
                                defaultMessage="Confirm"
                            />
                        </Button>
                    </>
                }
            >
                <Validation.components.ValidatedForm
                    ref={(l: any) => (this._form = l)}
                    style={{ minWidth: '300px' }}
                >
                    <Validation.components.ValidatedFormGroup for="password_old">
                        <Label>
                            <FormattedMessage
                                id="general.password.old"
                                defaultMessage="Old password"
                            />
                        </Label>
                        <Validation.components.ValidatedControl
                            key="password_old"
                            name="password_old"
                            type="password"
                            validators={[Validation.validators.password]}
                        />
                        <Validation.components.ValidationMessage for="password_old" />
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="password_new">
                        <Label>
                            <FormattedMessage
                                id="general.password.new"
                                defaultMessage="New password"
                            />
                        </Label>
                        <Validation.components.ValidatedControl
                            name="password_new"
                            type="password"
                            value={this.state.newPassword}
                            validators={[Validation.validators.password]}
                            onChange={(e: any) =>
                                this.onNewPasswordChange(e.target.value)
                            }
                        />
                        <Validation.components.ValidationMessage for="password_new" />
                    </Validation.components.ValidatedFormGroup>
                    <Validation.components.ValidatedFormGroup for="password_new_repeat">
                        <Label>
                            <FormattedMessage
                                id="general.password.repeat"
                                defaultMessage="Repeat password"
                            />
                        </Label>
                        <Validation.components.ValidatedControl
                            key={this.state.newPasswordKey}
                            name="password_new_repeat"
                            type="password"
                            value={this.state.newPasswordRepeat}
                            validators={[
                                Validation.validators.password,
                                Validation.validators.compare(
                                    this.state.newPassword
                                )
                            ]}
                            onChange={(e: any) =>
                                this.onNewPasswordRepeatChange(e.target.value)
                            }
                        />
                        <Validation.components.ValidationMessage for="password_new_repeat" />
                    </Validation.components.ValidatedFormGroup>
                </Validation.components.ValidatedForm>
            </ModalWindow>
        );
    }
}

export default AuthChangePasswordModal;
