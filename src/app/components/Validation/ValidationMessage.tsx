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
import * as propTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ValidatedForm from './ValidatedForm';
import themed from 'components/Theme/themed';

interface IValidationMessageProps {
    className?: string;
    for: string;
    messages?: {
        [validator: string]: string;
    };
}

interface IValidationMessageContext {
    form: ValidatedForm;
}

const ValidationMessage: React.SFC<IValidationMessageProps> = (
    props,
    context: IValidationMessageContext
) => {
    let result = null;

    if (context.form) {
        const value =
            !context.form.getState(props.for) &&
            context.form.validate(props.for);
        if (value && value.error) {
            const message =
                props.messages && props.messages[value.validator.name];
            if (!message) {
                result = (
                    <FormattedMessage
                        id={`validation.${value.validator.name}`}
                        defaultMessage="This field contains invalid data"
                    />
                );
            } else if ('string' === typeof message) {
                result = message;
            } else {
                result = (
                    <FormattedMessage
                        id="validation.field.invalid"
                        defaultMessage="This field contains invalid data"
                    />
                );
            }
        }
    }

    return (
        <span
            className={
                props.className === undefined ? 'text-danger' : props.className
            }
        >
            {result && (
                <span>
                    <span>* </span>
                    {result}
                </span>
            )}
        </span>
    );
};

ValidationMessage.contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};

export default themed(ValidationMessage)`
    margin-left: 15px;
    color: ${props =>
        props.className === undefined ? '#ff0000' : props.className};
`;
