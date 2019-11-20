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
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

import themed from 'components/Theme/themed';

interface Props {
    className?: string;
    to: string;
}

const BackButton: React.SFC<Props> = props => (
    <Link className={props.className} to={props.to}>
        <ArrowLeft color="#7b6340" size={24} />
    </Link>
);

export default themed(BackButton)`
    display: block;
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 20px;
    background: #d8d1c7;
    text-align: center;
    text-decoration: none;

    &:hover {
        background: #eee6db;
    }

    > svg {
        vertical-align: middle;
    }
`;
