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
import Panel from 'components/Panel';
import PanelHeading from 'components/Panel/PanelHeading';
import Validation from 'components/Validation';
import Label from 'components/Form/Label';
import Button from 'components/Form/Button';
import Link from 'components/Form/Link';
import Hint from 'components/Typo/Hint';
import LinkExternal from 'components/Form/LinkExternal';

interface Props {
    isValidated: boolean;
    activationEmail: string;
    onLogin: (password: string) => void;
}

const SignIn: React.SFC<Props> = props => (
    <Panel>
        {props.isValidated ? (
            <div>
                <PanelHeading>Please SIGN IN</PanelHeading>
                <Validation.components.ValidatedForm
                    onSubmitSuccess={values => props.onLogin(values.password)}
                >
                    <Validation.components.ValidatedFormGroup for="password">
                        <div>
                            <Label>Password</Label>
                        </div>
                        <div>
                            <Validation.components.ValidatedControl
                                type="password"
                                name="password"
                                validators={[
                                    Validation.validators.required,
                                    Validation.validators.password
                                ]}
                            />
                        </div>
                        <div>
                            <Validation.components.ValidationMessage for="password" />
                        </div>
                        <div
                            style={{ textAlign: 'right', marginBottom: '20px' }}
                        >
                            <Link to="/recover">Forgot your password</Link>
                        </div>
                    </Validation.components.ValidatedFormGroup>
                    <Button block type="submit">
                        SIGN IN
                    </Button>
                </Validation.components.ValidatedForm>
            </div>
        ) : (
            <div>
                <PanelHeading>Important Information</PanelHeading>
                <Hint icon="info-circle">
                    <div>
                        Please wait until your account has been validated by the
                        service provider
                    </div>
                    <br />
                    <div>
                        You will receive an email with further instructions
                    </div>
                    <br />
                    <div>
                        In case of any questions, please contact your service
                        provider at the following email:&nbsp;
                        <LinkExternal href={`mailto:${props.activationEmail}`}>
                            {props.activationEmail}
                        </LinkExternal>
                    </div>
                </Hint>
            </div>
        )}
    </Panel>
);

export default SignIn;
