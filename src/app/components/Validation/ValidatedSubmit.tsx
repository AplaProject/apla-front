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
import { Button, ButtonProps } from 'react-bootstrap';
import * as propTypes from 'prop-types';

import ValidatedForm from './ValidatedForm';

interface IValidatedSubmitProps extends ButtonProps {
    className?: string;
    disabled?: boolean;
}

const ValidatedSubmit: React.SFC<IValidatedSubmitProps> = (props, context: { form: ValidatedForm }) => (
    <Button
        type="submit"
        onClick={props.onClick && props.onClick}
        className={props.className}
        bsClass={props.bsClass}
        active={props.active}
        block={props.block}
        bsStyle={props.bsStyle}
        bsSize={props.bsSize}
        componentClass={props.componentClass}
        disabled={(context.form ? context.form.isPending() : false) || props.disabled}
    >
        {props.children}
    </Button>
);

ValidatedSubmit.contextTypes = {
    form: propTypes.instanceOf(ValidatedForm)
};

export default ValidatedSubmit;