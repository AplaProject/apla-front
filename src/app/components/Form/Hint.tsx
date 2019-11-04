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
import themed from 'components/Theme/themed';

interface Props {
    className?: string;
    icon?: string;
}

const Hint: React.SFC<Props> = props => (
    <div className={props.className}>
        {props.icon && (
            <div className="hint__icon">
                <em className="fa fa-info-circle" />
            </div>
        )}
        <div className="hint__content">{props.children}</div>
    </div>
);

export default themed(Hint)`
    display: flex;
    flex-direction: row;

    & .hint__icon {
        width: 50px;
        text-align: center;

        > .fa {
            color: #4c4c4c;
            font-size: 18px;
            vertical-align: middle;
        }
    }

    & .hint__content {
        color: #838383;
        flex: 1;
    }
`;
