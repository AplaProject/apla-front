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
import classNames from 'classnames';

type Theme = 'primary' | 'link';

interface Props extends React.HTMLProps<HTMLButtonElement> {
    block?: boolean;
    color?: Theme;
}

const Button: React.SFC<Props> = props => {
    const { color, block, ...buttonProps } = props;
    const className = classNames(
        props.className,
        `button_theme-${color || 'primary'}`,
        {
            button_block: block
        }
    );

    return (
        <button {...buttonProps} className={className}>
            {props.children}
        </button>
    );
};

export default themed(Button)`
    background: #d8d1c7;
    border: 0;
    text-transform: uppercase;
    color: #7a623e;
    border-radius: 31px;
    padding: 10px 20px;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;

    &:hover {
        background: #dcd6cd;
        text-decoration: none;
        color: #7a623e;
    }

    &:disabled {
        background: #ece9e4;
        color: #c5bcad;
    }

    &.button_block {
        box-sizing: border-box;
        width: 100%;        
    }

    &.button_theme-link {
        background: 0;

        color: #7e6744;
        font-size: 14px;

        &:hover {
            color: #a9926f;
        }
    }
`;
