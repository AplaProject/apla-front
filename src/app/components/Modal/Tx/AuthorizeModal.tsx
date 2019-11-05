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

import Modal from '../';
import Validation from 'components/Validation';
import ModalWindow from 'containers/Modal/ModalWindow';
import Button from 'components/Form/Button';
import ValidatedForm from 'components/Validation/ValidatedForm';

class AuthorizeModal extends Modal<void, string> {
    public static className = ' ';

    private _form: ValidatedForm;

    handleSubmit = () => {
        const form = this._form.validateAll();
        if (form.valid) {
            this.props.onResult(form.payload.password.value);
        }
    };

    render() {
        return (
            <ModalWindow
                title={
                    <FormattedMessage
                        id="modal.authorization.title"
                        defaultMessage="Authorization"
                    />
                }
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
                >
                    <div className="pb">
                        <FormattedMessage
                            id="modal.authorization.password"
                            defaultMessage="Please enter your password to perform this action"
                        />
                    </div>
                    <Validation.components.ValidatedFormGroup for="password">
                        <Validation.components.ValidatedControl
                            type="password"
                            name="password"
                            noValidate
                            validators={[
                                Validation.validators.password,
                                Validation.validators.required
                            ]}
                        />
                        <Validation.components.ValidationMessage for="password" />
                    </Validation.components.ValidatedFormGroup>
                </Validation.components.ValidatedForm>
            </ModalWindow>
        );
    }
}
export default AuthorizeModal;
