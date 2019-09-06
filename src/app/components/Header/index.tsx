/*---------------------------------------------------------------------------------------------
 *  Copyright (c) EGAAS S.A. All rights reserved.
 *  See LICENSE in the project root for license information.
 *---------------------------------------------------------------------------------------------*/

import React from 'react';
import themed from 'components/Theme/themed';
import media from 'components/Theme/media';
import HeaderButton from 'components/Main/Header/HeaderButton';
import { Menu } from 'react-feather';

interface Props {
    className?: string;
    tools?: React.ReactNode;
    onMenuClick?: () => any;
}

const Header: React.SFC<Props> = props => (
    <header className={props.className}>
        <div className="header__menu">
            <HeaderButton content={null} onClick={props.onMenuClick}>
                <div className="header__menu__icon">
                    <Menu size={24} color="#fff" />
                </div>
            </HeaderButton>
        </div>
        <div className="header__logo">
            <img src="/img/logoHeader.png" />
        </div>
        {props.children && (
            <>
                <div className="header__body">{props.children}</div>
            </>
        )}
        {props.tools && <div className="header__tools">{props.tools}</div>}
    </header>
);

export default themed(Header)`
    background: #3873a6;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;

    & .header__logo {
        padding: 12px 0 10px 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        position: relative;
        user-select: none;
        flex: 0;
        height: 100%;

        > img {
            height: 18px;
            vertical-align: middle;
        }

        &:after {
            content: ' ';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }

    .header__body {
        align-self: center;
        color: #fff;
        font-size: 15px;
        font-weight: bold;
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-items: flex-start;
        align-items: center;
        height: 100%;
    }
    
    .header__menu {
        height: 100%;
        width: ${props => props.theme.menuSizeFolded}px;
        display: none;

        > div, > div > button {
            width: 100%;
        }

        .header__menu__icon {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
        }
    }

    .header__tools {
        align-self: center;
        padding-right: 14px;
    }

    @media (${media.md}) {
        height: 50px;

        & .header__logo {
            padding: 17px 0 15px 10px;
        }

        .header__menu {
            display: block;
        }
    }

    @media (${media.sm}) {
        .header__menu {
            width: 50px;
        }
    }
`;