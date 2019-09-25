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

import Protypo from '../Protypo';

export interface ILongTextProps {
    link: string;
}

interface ILongTextContext {
    protypo: Protypo;
}

const LongText: React.SFC<ILongTextProps> = (props, context: ILongTextContext) => {
    const onClick = () => {
        context.protypo.displayData(props.link);
    };

    return (
        <button className="btn btn-link p0" onClick={onClick}>
            {props.children}...
        </button>
    );
};

LongText.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default LongText;