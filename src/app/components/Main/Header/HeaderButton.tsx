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
import classNames from 'classnames';

import themed from 'components/Theme/themed';
import DropdownButton from 'components/Button/DropdownButton';

interface Props {
    className?: string;
    disabled?: boolean;
    warning?: boolean;
    badge?: number;
    align?: 'left' | 'right';
    menuWidth?: number;
    content: React.ReactNode;
    onClick?: () => any;
}

const StyledHeaderButton = themed(DropdownButton)`
    background: 0;
    padding: 0;
    border: 0;
    outline: 0;
    transition: background ease-in-out .17s;
    min-width: 40px;
    height: 40px;
    color: #fff;
    font-size: 22px;
    border-radius: 20px;
    margin-left: 20px;
    
    &._warning {
        background: ${props => props.theme.menubarBackgroundSecondary};
        color: ${props => props.theme.menubarForegroundActive};
    }
    
    &._active {
        color: ${props => props.theme.menubarForegroundActive};
    }

    .dropdown__badge {
        position: absolute;
        top: 0;
        right: 5px;
        background: #ff4e81;
        display: block;
        width: 16px;
        height: 16px;
        padding: 0;
        line-height: 16px;
        font-size: 12px;
        font-weight: bold;
        font-style: normal;
        border-radius: 8px;
    }
`;

const HeaderButton: React.SFC<Props> = props => (
    <StyledHeaderButton
        className={classNames(props.className, {
            _warning: props.warning,
            _active: !!props.badge
        })}
        content={props.content}
        disabled={props.disabled}
        align={props.align}
        menuWidth={props.menuWidth}
        onClick={props.onClick}
    >
        {props.children}
        {props.badge ? (
            <em className="dropdown__badge">
                {props.badge > 9 ? '*' : props.badge}
            </em>
        ) : null}
    </StyledHeaderButton>
);

export default HeaderButton;
