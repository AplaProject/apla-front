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
    left?: React.ReactNode;
}

const Header: React.SFC<Props> = props => (
    <header className={props.className}>
        <div className="header__logo" />
        <div className="header__left">{props.left}</div>
        <div className="header__filler" />
        <div className="header__right">{props.children}</div>
    </header>
);

export default themed(Header)`
    background: linear-gradient(#4a4a4a,#151515);
    height: 60px;
    border-radius: 30px;
    box-shadow: rgba(0,0,0,0.5) 0 0 20px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-items: space-between;
    padding: 0 15px;

    .header__logo {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: url(/img/logoHeader.png) center center no-repeat;
        background-size: auto 26px;
        z-index: 0;
    }

    .header__filler {
        flex: 1;
    }

    .header__right, .header__left {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 10px;
        position: relative;
        z-index: 2;
    }
`;
