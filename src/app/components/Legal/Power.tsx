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
}

const Power: React.SFC<Props> = props => (
    <div className={props.className}>
        <a
            className="power__wrapper"
            rel="noreferrer noopener"
            target="_blank"
            href="https://apla.io"
        >
            <div className="power__title">Powered by Apla</div>
        </a>
    </div>
);

export default themed(Power)`
    text-align: center;
    margin: 10px 0;

    .power__wrapper {
        display: inline-block;
        opacity: 0.2;
        background: url(/icons/iconBlack.svg) 0 center no-repeat;
        background-size: 21px;
        text-decoration: none;
        transition: opacity .15s ease-in-out;

        &:hover {
            opacity: 0.4;
        }
    }

    .power__title {
        text-align: left;
        margin-left: 27px;
        color: #000;
        font-size: 14px;
        font-weight: 500;
    }
`;
