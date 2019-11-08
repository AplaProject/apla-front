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
import DropdownAnimation from 'components/Animation/Dropdown';

const StyledDropdown = themed.div`
    display: inline-block;
    position: relative;
    line-height: normal;
    background: ${props => props.theme.dropdownMenuBackground};
    box-shadow: 0 0 15px rgba(0,0,0,.15);
    border-radius: 16px;
    padding: 8px 0;
    border-top: none;
    text-align: left;
    overflow: hidden;
`;

interface Props {
    className?: string;
    active?: boolean;
    align?: 'left' | 'right';
    direction?: 'up' | 'down';
    width?: number;
}

const Dropdown: React.SFC<Props> = props => (
    <DropdownAnimation
        visible={props.active}
        align={props.align}
        direction={props.direction}
    >
        <StyledDropdown
            style={{ width: props.width ? `${props.width}px` : 'auto' }}
        >
            {props.children}
        </StyledDropdown>
    </DropdownAnimation>
);

export default Dropdown;
