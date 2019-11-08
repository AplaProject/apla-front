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
import propTypes from 'prop-types';
import media from 'components/Theme/media';

const StyledItem = themed.button`
    border-radius: 0;
    border: 0;
    outline: 0;
    background: 0;
    transition: background .15s;
    width: 100%;
    padding: 0 20px;
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    text-decoration: none;
    color: #4c4c4c;
    cursor: pointer;
    display: block;
    text-align: left;
    position: relative;
    white-space: nowrap;

    &.item_hasicon {
        padding-left: 40px;
    }

    > .item__icon {
        position: absolute;
        left: 12px;
        top: 0;
        bottom: 0;

        > em {
            font-weight: 500;
            font-size: 15px;
            line-height: 40px;
            margin-right: 12px;
        }
    }

    &:last-child > .item__title {
        border-bottom: 0;
    }

    > .item__title {
        border-bottom: solid 1px #dbd9d6;
        line-height: 37px;
    }

    &[disabled] {
        color: ${props => props.theme.dropdownMenuDisabled};
    }

    &:hover {
        background: #f2f0ed;
    }

    @media (${media.md}) {
        height: 50px;
        font-size: 15px;
        line-height: 50px;

        > .item__icon {
            > em {
                font-size: 15px;
                line-height: 50px;
            }
        }
    }
`;

interface Props {
    icon?: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Item: React.SFC<Props> = (props, context) => {
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = e => {
        context.closeDropdown();
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <StyledItem
            disabled={props.disabled}
            onClick={handleClick}
            className={classNames({ item_hasicon: !!props.icon })}
        >
            <div className="item__title">
                {props.icon && (
                    <div className="item__icon">
                        <em className={props.icon} />
                    </div>
                )}
                <div>{props.children}</div>
            </div>
        </StyledItem>
    );
};

Item.contextTypes = {
    closeDropdown: propTypes.func.isRequired
};

export default Item;
